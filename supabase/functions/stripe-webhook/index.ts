import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { Resend } from 'https://esm.sh/resend@2.0.0';
import { encodeBase64Url } from 'https://deno.land/std@0.224.0/encoding/base64url.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Generate a secure random QR token
function generateQRToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return encodeBase64Url(bytes);
}

// Generate QR code SVG
function generateQRCodeSVG(data: string): string {
  // Simple QR code generation using data URL
  // In production, use a proper QR library like qrcode
  const size = 256;
  const qrData = encodeURIComponent(data);
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${qrData}`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const signature = req.headers.get('stripe-signature');
  
  if (!signature) {
    console.error('Webhook missing signature');
    return new Response(
      JSON.stringify({ 
        error: 'Invalid request',
        code: 'MISSING_SIGNATURE'
      }), 
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPESOLEIL') || '', {
      apiVersion: '2023-10-16',
    });

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

    const body = await req.text();
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';
    
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    console.log('Webhook event:', event.type);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.order_id;

      if (!orderId) {
        console.error('Webhook session missing order_id in metadata');
        return new Response(
          JSON.stringify({ 
            error: 'Invalid session data',
            code: 'MISSING_ORDER_ID'
          }), 
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Update order status
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .update({
          status: 'paid',
          stripe_payment_intent_id: session.payment_intent as string,
        })
        .eq('id', orderId)
        .select('*, events(*)')
        .single();

      if (orderError || !order) {
        console.error('Order update failed:', orderError);
        return new Response(
          JSON.stringify({ 
            error: 'Unable to process order',
            code: 'ORDER_UPDATE_FAILED'
          }), 
          {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Generate QR token
      const qrToken = generateQRToken();

      // Create ticket
      const { data: ticket, error: ticketError } = await supabase
        .from('tickets')
        .insert({
          qr_token: qrToken,
          order_id: orderId,
          event_id: order.event_id,
          attendee_name: order.user_name,
          attendee_email: order.user_email,
        })
        .select()
        .single();

      if (ticketError || !ticket) {
        console.error('Ticket creation failed:', ticketError);
        return new Response(
          JSON.stringify({ 
            error: 'Unable to generate ticket',
            code: 'TICKET_CREATION_FAILED'
          }), 
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Generate QR code URL
      const qrUrl = `https://tant-que-le-soleil-brille-com.lovable.app/ticket/verify?t=${qrToken}`;
      const qrImageUrl = generateQRCodeSVG(qrUrl);

      // Format event date
      const eventDate = new Date(order.events.event_date);
      const formattedDate = eventDate.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      // Send confirmation email with QR code
      const emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { text-align: center; padding: 20px; background: linear-gradient(135deg, #FDB022 0%, #FF8A3D 100%); color: white; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .qr-code { text-align: center; margin: 30px 0; }
              .qr-code img { max-width: 256px; border: 2px solid #FDB022; border-radius: 10px; }
              .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #FDB022 0%, #FF8A3D 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
              .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>☀️ Soleil sur toi !</h1>
                <h2>Ta place est confirmée</h2>
              </div>
              <div class="content">
                <p>Bonjour ${order.user_name},</p>
                <p>Nous sommes ravis de confirmer ta réservation pour :</p>
                
                <div class="details">
                  <h3>${order.events.name}</h3>
                  <p><strong>📅 Date :</strong> ${formattedDate}</p>
                  <p><strong>📍 Lieu :</strong> ${order.events.location}</p>
                  <p><strong>💰 Montant payé :</strong> ${(order.amount_cents / 100).toFixed(2)} €</p>
                </div>

                <p><strong>Voici ton billet avec QR Code :</strong></p>
                
                <div class="qr-code">
                  <img src="${qrImageUrl}" alt="QR Code" />
                </div>

                <p style="text-align: center;">
                  <a href="${qrUrl}" class="button">Voir ma confirmation</a>
                </p>

                <p><strong>Le jour J :</strong> Présente simplement ce QR code (sur ton téléphone ou imprimé) à l'entrée. L'organisatrice le scannera pour confirmer ta présence.</p>

                <p>Nous avons hâte de te voir briller avec nous ! ✨</p>
                
                <p>Soleil sur toi,<br>L'équipe Tant que le Soleil Brille</p>
              </div>
              
              <div class="footer">
                <p>Si tu as des questions, réponds simplement à cet email.</p>
                <p>© ${new Date().getFullYear()} Tant que le Soleil Brille</p>
              </div>
            </div>
          </body>
        </html>
      `;

      const emailText = `
Soleil sur toi, ${order.user_name} !

Ta réservation est confirmée pour :

${order.events.name}
📅 ${formattedDate}
📍 ${order.events.location}
💰 ${(order.amount_cents / 100).toFixed(2)} €

Ton QR Code : ${qrUrl}

Le jour J, présente ce QR code à l'entrée.

Nous avons hâte de te voir briller avec nous ! ✨

Soleil sur toi,
L'équipe Tant que le Soleil Brille
      `;

      const { error: emailError } = await resend.emails.send({
        from: 'Tant que le Soleil Brille <onboarding@resend.dev>',
        to: [order.user_email],
        subject: `🎟️ Ta réservation - ${order.events.name}`,
        html: emailHtml,
        text: emailText,
      });

      if (emailError) {
        console.error('Email error:', emailError);
      } else {
        console.log('Confirmation email sent to:', order.user_email);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Webhook processing error:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
      name: (error as Error).name,
    });
    return new Response(
      JSON.stringify({ 
        error: 'Webhook processing failed',
        code: 'WEBHOOK_ERROR'
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
