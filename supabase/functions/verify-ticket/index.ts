import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting helper
async function checkRateLimit(supabase: any, key: string, limit: number, windowMinutes: number): Promise<{ allowed: boolean; resetAt?: Date }> {
  const now = new Date();
  
  // Clean old entries
  await supabase.from('rate_limits').delete().lt('reset_at', now.toISOString());

  // Get current attempts
  const { data: existing } = await supabase
    .from('rate_limits')
    .select('*')
    .eq('key', key)
    .gte('reset_at', now.toISOString())
    .maybeSingle();

  if (existing && existing.count >= limit) {
    return { allowed: false, resetAt: new Date(existing.reset_at) };
  }

  // Increment or create
  if (existing) {
    await supabase
      .from('rate_limits')
      .update({ count: existing.count + 1, updated_at: now.toISOString() })
      .eq('id', existing.id);
  } else {
    const resetAt = new Date(now.getTime() + windowMinutes * 60 * 1000);
    await supabase
      .from('rate_limits')
      .insert({ key, count: 1, reset_at: resetAt.toISOString() });
  }

  return { allowed: true };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  // Rate limiting: 30 requests per 5 minutes per IP (prevent brute force)
  const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const rateLimitKey = `verify:${clientIp}`;
  const rateLimit = await checkRateLimit(supabase, rateLimitKey, 30, 5);
  
  if (!rateLimit.allowed) {
    // Add delay to slow down brute force attempts
    await new Promise(resolve => setTimeout(resolve, 2000));
    return new Response(
      JSON.stringify({ 
        valid: false,
        reason: 'RATE_LIMIT',
        message: 'Too many verification attempts. Please try again later.'
      }),
      { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('t');
    const eventId = url.searchParams.get('event');

    // Validate token with Zod
    const tokenSchema = z.string().trim()
      .min(10, 'Token too short')
      .max(100, 'Token too long')
      .regex(/^[A-Za-z0-9_-]+$/, 'Invalid token format');

    if (!token) {
      return new Response(
        JSON.stringify({
          valid: false,
          reason: 'MISSING_TOKEN',
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const tokenValidation = tokenSchema.safeParse(token);
    if (!tokenValidation.success) {
      console.log('Token validation failed:', tokenValidation.error.issues);
      return new Response(
        JSON.stringify({
          valid: false,
          reason: 'INVALID_TOKEN',
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate eventId if provided
    if (eventId) {
      const eventIdSchema = z.string().uuid();
      const eventIdValidation = eventIdSchema.safeParse(eventId);
      if (!eventIdValidation.success) {
        console.log('Event ID validation failed');
        return new Response(
          JSON.stringify({
            valid: false,
            reason: 'INVALID_EVENT_ID',
          }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }

    // Get ticket with related order and event
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .select(`
        *,
        orders (*),
        events (*)
      `)
      .eq('qr_token', token)
      .single();

    if (ticketError || !ticket) {
      console.log('Ticket not found:', token);
      return new Response(
        JSON.stringify({
          valid: false,
          reason: 'UNKNOWN_TOKEN',
        }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Check if order is paid
    if (ticket.orders.status !== 'paid') {
      return new Response(
        JSON.stringify({
          valid: false,
          reason: 'UNPAID',
          event: {
            id: ticket.events.id,
            name: ticket.events.name,
          },
          attendee: {
            name: ticket.attendee_name,
            email: ticket.attendee_email,
          },
          order: {
            id: ticket.orders.id,
            status: ticket.orders.status,
          },
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Check event match if specified
    if (eventId && ticket.event_id !== eventId) {
      return new Response(
        JSON.stringify({
          valid: false,
          reason: 'EVENT_MISMATCH',
          event: {
            id: ticket.events.id,
            name: ticket.events.name,
          },
          expectedEvent: eventId,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Ticket is valid
    console.log('Valid ticket verified:', token);
    
    return new Response(
      JSON.stringify({
        valid: true,
        reason: null,
        event: {
          id: ticket.events.id,
          name: ticket.events.name,
          date: ticket.events.event_date,
          location: ticket.events.location,
        },
        attendee: {
          name: ticket.attendee_name,
          email: ticket.attendee_email,
        },
        order: {
          id: ticket.orders.id,
          status: ticket.orders.status,
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Ticket verification error:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
    });
    return new Response(
      JSON.stringify({
        valid: false,
        reason: 'ERROR',
        message: 'Unable to verify ticket. Please try again.',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
