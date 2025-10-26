import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('t');
    const eventId = url.searchParams.get('event');

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

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_PUBLISHABLE_KEY') ?? ''
    );

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
    console.error('Error verifying ticket:', error);
    return new Response(
      JSON.stringify({
        valid: false,
        reason: 'ERROR',
        error: (error as Error).message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
