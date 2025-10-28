import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting helper
async function checkRateLimit(supabase: any, key: string, limit: number, windowMinutes: number): Promise<{ allowed: boolean; resetAt?: Date }> {
  const now = new Date();
  const windowStart = new Date(now.getTime() - windowMinutes * 60 * 1000);

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

  // Rate limiting: 10 requests per 10 minutes per IP
  const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const rateLimitKey = `checkout:${clientIp}`;
  const rateLimit = await checkRateLimit(supabase, rateLimitKey, 10, 10);
  
  if (!rateLimit.allowed) {
    return new Response(
      JSON.stringify({ 
        error: 'Too many requests. Please try again later.',
        code: 'RATE_LIMIT_EXCEEDED'
      }),
      { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPESOLEIL') || '', {
      apiVersion: '2023-10-16',
    });

    // Validate input with Zod
    const checkoutSchema = z.object({
      eventId: z.string().uuid('Invalid event ID'),
      sessionId: z.string().uuid('Invalid session ID'),
      firstName: z.string().trim().min(2, 'First name must be at least 2 characters').max(100, 'First name must be less than 100 characters')
        .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'First name contains invalid characters'),
      name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters')
        .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Name contains invalid characters'),
      email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
      phone: z.string().trim().regex(/^\+?[0-9\s-]{8,20}$/, 'Invalid phone number').optional().or(z.literal('')),
      quantity: z.number().int().min(1).max(30)
    });

    const body = await req.json();
    const validationResult = checkoutSchema.safeParse(body);
    
    if (!validationResult.success) {
      console.log('Validation error:', validationResult.error.issues);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid input data. Please check your information.',
          code: 'INVALID_INPUT',
          details: validationResult.error.issues[0]?.message
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { eventId, sessionId, firstName, name, email, phone, quantity } = validationResult.data;

    // Get event details
    const { data: event, error: eventError } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single();

    if (eventError || !event) {
      console.error('Event lookup error:', eventError);
      return new Response(
        JSON.stringify({ 
          error: 'The requested event could not be found.',
          code: 'EVENT_NOT_FOUND'
        }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get session details and check availability
    const { data: session, error: sessionError } = await supabase
      .from('event_sessions')
      .select('*')
      .eq('id', sessionId)
      .eq('event_id', eventId)
      .single();

    if (sessionError || !session) {
      console.error('Session lookup error:', sessionError);
      return new Response(
        JSON.stringify({ 
          error: 'The requested session could not be found.',
          code: 'SESSION_NOT_FOUND'
        }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if enough places are available
    const availablePlaces = session.capacity - session.booked_count;
    if (availablePlaces < quantity) {
      return new Response(
        JSON.stringify({ 
          error: `Only ${availablePlaces} places available for this session.`,
          code: 'INSUFFICIENT_CAPACITY'
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        event_id: eventId,
        session_id: sessionId,
        user_email: email,
        user_first_name: firstName,
        user_name: name,
        user_phone: phone,
        quantity: quantity,
        amount_cents: event.price_cents * quantity,
        status: 'pending',
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error('Order creation error:', orderError);
      return new Response(
        JSON.stringify({ 
          error: 'Unable to process your reservation. Please try again.',
          code: 'ORDER_CREATION_FAILED'
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `${event.name} - ${session.session_name}`,
            },
            unit_amount: event.price_cents,
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/ticket/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/?canceled=true`,
      customer_email: email,
      metadata: {
        order_id: order.id,
        event_id: eventId,
        session_id: sessionId,
      },
    });

    // Update order with Stripe session ID
    await supabase
      .from('orders')
      .update({ stripe_session_id: stripeSession.id })
      .eq('id', order.id);

    console.log('Checkout session created:', stripeSession.id);

    return new Response(
      JSON.stringify({ sessionId: stripeSession.id, url: stripeSession.url }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Checkout session creation error:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
    });
    return new Response(
      JSON.stringify({ 
        error: 'An error occurred while processing your request. Please try again.',
        code: 'CHECKOUT_ERROR'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
