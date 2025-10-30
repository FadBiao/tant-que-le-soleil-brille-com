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
    
    const event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);

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
        .select('*, events(*), event_sessions(*)')
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

      // Decrement session capacity
      if (order.session_id) {
        const { error: decrementError } = await supabase.rpc(
          'decrement_session_capacity',
          {
            p_session_id: order.session_id,
            p_quantity: order.quantity || 1,
          }
        );

        if (decrementError) {
          console.error('Failed to decrement session capacity:', decrementError);
        }
      }

      // Create tickets (one for each quantity)
      const tickets = [];
      for (let i = 0; i < (order.quantity || 1); i++) {
        const qrToken = generateQRToken();
        tickets.push({
          qr_token: qrToken,
          order_id: orderId,
          event_id: order.event_id,
          session_id: order.session_id,
          attendee_name: order.user_name,
          attendee_first_name: order.user_first_name,
          attendee_email: order.user_email,
        });
      }

      const { data: createdTickets, error: ticketError } = await supabase
        .from('tickets')
        .insert(tickets)
        .select();

      if (ticketError || !createdTickets || createdTickets.length === 0) {
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

      // Generate QR codes for all tickets
      const qrCodes = createdTickets.map(ticket => ({
        qrUrl: `https://tant-que-le-soleil-brille-com.lovable.app/ticket/verify?t=${ticket.qr_token}`,
        qrImageUrl: generateQRCodeSVG(`https://tant-que-le-soleil-brille-com.lovable.app/ticket/verify?t=${ticket.qr_token}`),
        ticketNumber: createdTickets.indexOf(ticket) + 1
      }));

      // Get session details
      const sessionDetails = order.event_sessions;
      const sessionName = sessionDetails?.session_name || 'Séance non spécifiée';
      const sessionTime = sessionDetails 
        ? `${sessionDetails.start_time.slice(0, 5)} - ${sessionDetails.end_time.slice(0, 5)}`
        : '';

      // Format event date
      const eventDate = new Date(order.events.event_date);
      const formattedDate = eventDate.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
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
              .details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #FDB022; }
              .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; padding: 20px; background: #f9f9f9; border-radius: 5px; }
              .important { background: #FFF8E1; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #FDB022; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>☀️ Bonjour ${order.user_first_name || order.user_name} !</h1>
                <h2>Votre place est bien confirmée !</h2>
              </div>
              <div class="content">
                <p>Merci pour votre réservation au CLUB SOLEIL SUR TOI 🌞</p>
                
                <div class="details">
                  <h3>🗓️ Séance choisie : ${sessionName}</h3>
                  <p><strong>👥 Nombre de places réservées :</strong> ${order.quantity || 1}</p>
                  <p><strong>📍 Lieu :</strong> Café Poésie<br/>10 Pass. Thiéré, 75011 Paris</p>
                  <p><strong>🕑 Heure :</strong> ${sessionTime}</p>
                  <p><strong>📅 Date :</strong> ${formattedDate}</p>
                </div>

                <p><strong>Voici ${qrCodes.length > 1 ? 'vos tickets de réservation avec QR Codes' : 'votre ticket de réservation avec QR Code'} :</strong></p>
                
                ${qrCodes.map(qr => `
                  <div class="qr-code">
                    ${qrCodes.length > 1 ? `<h4 style="margin-bottom: 10px;">Billet ${qr.ticketNumber} sur ${qrCodes.length}</h4>` : ''}
                    <img src="${qr.qrImageUrl}" alt="QR Code ${qr.ticketNumber}" />
                    <p style="text-align: center; margin-top: 10px;">
                      <a href="${qr.qrUrl}" class="button">Voir la confirmation ${qrCodes.length > 1 ? `du billet ${qr.ticketNumber}` : ''}</a>
                    </p>
                  </div>
                `).join('')}

                <div class="important">
                  <p><strong>⚠️ Informations importantes :</strong></p>
                  <ul>
                    <li>Vous trouverez ci-dessus ${qrCodes.length > 1 ? 'vos tickets de réservation' : 'votre ticket de réservation'} à présenter le jour de l'événement (version imprimée ou numérique acceptée).</li>
                    <li>${qrCodes.length > 1 ? 'Chaque QR code correspond à une place et doit être' : 'Le QR code doit être'} scanné individuellement pour validation à l'entrée.</li>
                    <li>Merci d'apporter ${qrCodes.length > 1 ? 'ces tickets' : 'ce ticket'} le jour de la séance.</li>
                    <li>${qrCodes.length > 1 ? 'Ces billets sont nominatifs et non remboursables' : 'Ce billet est nominatif et non remboursable'} après validation.</li>
                  </ul>
                </div>

                <p style="text-align: center; font-size: 18px; color: #FDB022; margin: 30px 0;">
                  "Tant que le Soleil Brille" ☀️<br/>
                  <em>Un instant d'écriture et de partage.</em>
                </p>
                
                <p>Pour toutes infos complémentaires, contactez-nous à l'adresse :<br/>
                <a href="mailto:tantquelesoleilbrille@gmail.com" style="color: #FDB022;">tantquelesoleilbrille@gmail.com</a></p>
              </div>
              
              <div class="footer">
                <p>Nous avons hâte de vous retrouver !</p>
                <p>© ${new Date().getFullYear()} Tant que le Soleil Brille</p>
              </div>
            </div>
          </body>
        </html>
      `;

      const emailText = `
Bonjour ${order.user_first_name || order.user_name},

Merci pour votre réservation au CLUB SOLEIL SUR TOI 🌞
Votre place est bien confirmée !

🗓️ Séance choisie : ${sessionName}
👥 Nombre de places réservées : ${order.quantity || 1}
📍 Lieu : Café Poésie, 10 Pass. Thiéré, 75011 Paris
🕑 Heure : ${sessionTime}
📅 Date : ${formattedDate}

${qrCodes.length > 1 ? 'Vos QR Codes :' : 'Votre QR Code :'}
${qrCodes.map(qr => `${qrCodes.length > 1 ? `Billet ${qr.ticketNumber}: ` : ''}${qr.qrUrl}`).join('\n')}

⚠️ INFORMATIONS IMPORTANTES :
- Vous trouverez ci-dessus ${qrCodes.length > 1 ? 'vos tickets de réservation' : 'votre ticket de réservation'} à présenter le jour de l'événement (version imprimée ou numérique acceptée).
- ${qrCodes.length > 1 ? 'Chaque QR code correspond à une place et doit être' : 'Le QR code doit être'} scanné individuellement pour validation à l'entrée.
- Merci d'apporter ${qrCodes.length > 1 ? 'ces tickets' : 'ce ticket'} le jour de la séance.
- ${qrCodes.length > 1 ? 'Ces billets sont nominatifs et non remboursables' : 'Ce billet est nominatif et non remboursable'} après validation.

"Tant que le Soleil Brille" ☀️ – Un instant d'écriture et de partage.

Pour toutes infos complémentaires, contactez-nous à l'adresse : tantquelesoleilbrille@gmail.com

Nous avons hâte de vous retrouver !

L'équipe Tant que le Soleil Brille
      `;

      const { error: emailError } = await resend.emails.send({
        from: 'Tant que le Soleil Brille <info@tantquelesoleilbrille.com>',
        to: [order.user_email],
        subject: `🎟️ Confirmation de réservation - ${sessionName}`,
        html: emailHtml,
        text: emailText,
      });

      if (emailError) {
        console.error('Email error:', emailError);
      } else {
        console.log('Confirmation email sent to:', order.user_email);
      }

      // Get updated session information for organizer email
      const { data: allSessions, error: sessionsError } = await supabase
        .from('event_sessions')
        .select('*')
        .eq('event_id', order.event_id)
        .order('start_time');

      if (!sessionsError && allSessions) {
        // Build session availability info
        const sessionInfo = allSessions.map(session => {
          const remainingPlaces = session.capacity - session.booked_count;
          return `
            <tr style="border-bottom: 1px solid #e0e0e0;">
              <td style="padding: 12px;">${session.session_name}</td>
              <td style="padding: 12px;">${session.start_time.slice(0, 5)} - ${session.end_time.slice(0, 5)}</td>
              <td style="padding: 12px; text-align: center;">${remainingPlaces} / ${session.capacity}</td>
              <td style="padding: 12px; text-align: center;">
                <span style="background-color: ${remainingPlaces > 5 ? '#4CAF50' : remainingPlaces > 0 ? '#FF9800' : '#F44336'}; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px;">
                  ${remainingPlaces > 5 ? 'Disponible' : remainingPlaces > 0 ? 'Bientôt complet' : 'Complet'}
                </span>
              </td>
            </tr>
          `;
        }).join('');

        // Create organizer email
        const organizerEmailHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 700px; margin: 0 auto; padding: 20px; }
                .header { text-align: center; padding: 20px; background: linear-gradient(135deg, #FDB022 0%, #FF8A3D 100%); color: white; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .booking-details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #4CAF50; }
                .sessions-table { width: 100%; border-collapse: collapse; background: white; margin: 20px 0; border-radius: 5px; overflow: hidden; }
                .sessions-table th { background: #FDB022; color: white; padding: 12px; text-align: left; }
                .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; padding: 20px; background: #f9f9f9; border-radius: 5px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🎉 Nouvelle Réservation Confirmée !</h1>
                </div>
                <div class="content">
                  <div class="booking-details">
                    <h3>📋 Détails de la réservation</h3>
                    <p><strong>Participant :</strong> ${order.user_first_name || ''} ${order.user_name}</p>
                    <p><strong>Email :</strong> ${order.user_email}</p>
                    <p><strong>Téléphone :</strong> ${order.user_phone || 'Non renseigné'}</p>
                    <p><strong>Séance réservée :</strong> ${sessionName}</p>
                    <p><strong>Horaire :</strong> ${sessionTime}</p>
                    <p><strong>Nombre de places :</strong> ${order.quantity || 1}</p>
                    <p><strong>Montant payé :</strong> ${(order.amount_cents / 100).toFixed(2)} €</p>
                    <p><strong>Date de réservation :</strong> ${new Date().toLocaleDateString('fr-FR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</p>
                  </div>

                  <h3>📊 Disponibilité des séances (${formattedDate})</h3>
                  <table class="sessions-table">
                    <thead>
                      <tr>
                        <th>Séance</th>
                        <th>Horaire</th>
                        <th style="text-align: center;">Places restantes</th>
                        <th style="text-align: center;">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${sessionInfo}
                    </tbody>
                  </table>

                  <p style="text-align: center; font-size: 18px; color: #FDB022; margin: 30px 0;">
                    ☀️ Un email de confirmation avec QR code${qrCodes.length > 1 ? 's' : ''} a été envoyé au participant.
                  </p>
                </div>
                
                <div class="footer">
                  <p>© ${new Date().getFullYear()} Tant que le Soleil Brille - Notification automatique</p>
                </div>
              </div>
            </body>
          </html>
        `;

        // Send email to organizer
        const { error: organizerEmailError } = await resend.emails.send({
          from: 'Tant que le Soleil Brille <info@tantquelesoleilbrille.com>',
          to: ['tantquelesoleilbrille@gmail.com'],
          subject: `✅ Nouvelle inscription - ${order.user_first_name || ''} ${order.user_name} - ${sessionName}`,
          html: organizerEmailHtml,
        });

        if (organizerEmailError) {
          console.error('Organizer email error:', organizerEmailError);
        } else {
          console.log('Organizer notification email sent');
        }
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
