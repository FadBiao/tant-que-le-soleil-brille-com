import { useState } from "react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Calendar, Mail, User, Ticket } from "lucide-react";

const reservationSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères").max(100),
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  email: z.string().email("Email invalide").max(255),
  phone: z.string({ required_error: "Le téléphone est requis" }).trim().min(10, "Numéro de téléphone invalide"),
  sessionId: z.string().min(1, "Veuillez choisir une séance"),
  quantity: z.number().min(1, "Minimum 1 place").max(30, "Maximum 30 places"),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

interface ReservationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ReservationModal = ({ open, onOpenChange }: ReservationModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessions, setSessions] = useState<any[]>([]);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [eventPrice, setEventPrice] = useState<number>(65);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      firstName: "",
      name: "",
      email: "",
      phone: "",
      sessionId: "",
      quantity: 1,
    },
  });

  // Load sessions when modal opens
  React.useEffect(() => {
    if (open) {
      loadSessions();
    }
  }, [open]);

  const loadSessions = async () => {
    try {
      const { data: events, error: eventsError } = await supabase
        .from('events')
        .select('*, event_sessions(*)')
        .eq('status', 'active')
        .order('event_date', { ascending: true })
        .limit(1);

      if (eventsError) throw eventsError;
      if (!events || events.length === 0) {
        toast({
          title: "Aucun événement disponible",
          description: "Il n'y a pas d'événement actif pour le moment.",
          variant: "destructive",
        });
        return;
      }

      const event = events[0];
      setSessions(event.event_sessions || []);
      setEventPrice(event.price_cents / 100);
    } catch (error) {
      console.error('Error loading sessions:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les séances disponibles.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: ReservationFormValues) => {
    setIsSubmitting(true);
    setCheckoutUrl(null);
    
    try {
      toast({
        title: "☀️ Réservation en cours",
        description: "Nous préparons votre inscription au Club d'Écriture...",
      });

      // Get the first active event
      const { data: events, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'active')
        .order('event_date', { ascending: true })
        .limit(1);

      if (eventsError || !events || events.length === 0) {
        throw new Error('Aucun événement disponible');
      }

      const event = events[0];
      // Pre-open a tab to avoid popup blockers in iframe environments
      // Note: pas d'ouverture d'onglet à l'avance pour éviter un onglet blanc en sandbox

      // Create checkout session
      const { data: sessionData, error: sessionError } = await supabase.functions.invoke(
        'create-checkout-session',
        {
          body: {
            eventId: event.id,
            sessionId: data.sessionId,
            firstName: data.firstName,
            name: data.name,
            email: data.email,
            phone: data.phone,
            quantity: data.quantity,
          },
        }
      );

      if (sessionError || !sessionData) {
        console.error('Session creation error:', sessionError);
        throw new Error(sessionError?.message || 'Erreur lors de la création de la session');
      }

      console.log('Checkout session response:', sessionData);

      // In iframe contexts, prefer showing a user-clickable link instead of auto-redirects
      if (sessionData.url) {
        setCheckoutUrl(sessionData.url);
        toast({
          title: "Lien de paiement prêt",
          description: "Cliquez sur \"Ouvrir le paiement Stripe\" pour continuer dans un nouvel onglet.",
        });
        setIsSubmitting(false);
      } else {
        throw new Error('URL de paiement non disponible');
      }
    } catch (error) {
      console.error('Reservation error:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[860px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl flex items-center gap-2">
            <Ticket className="h-6 w-6 text-primary" />
            Réserver ma Place
          </DialogTitle>
          <DialogDescription className="font-poppins">
            Rejoignez notre Club d'Écriture et laissez votre créativité briller ☀️
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4 p-4 bg-gradient-dawn rounded-lg border-l-4 border-primary">
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-poppins font-semibold text-sm mb-1">Lieu de l'Atelier</h4>
                <p className="font-poppins text-sm text-muted-foreground">
                  Café Poésie, 10 Pass. Thiéré<br />
                  75011 Paris, France
                </p>
                <p className="font-poppins text-sm font-semibold text-primary mt-2">
                  Tarif: {eventPrice}€ par personne
                </p>
              </div>
            </div>
            
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Prénom
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Votre prénom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Nom
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Votre nom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="votre@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input type="tel" inputMode="tel" autoComplete="tel" placeholder="+33 6 12 34 56 78" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sessionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choisir une séance</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        const session = sessions.find(s => s.id === e.target.value);
                        setSelectedSession(session);
                        // Reset quantity when changing session
                        form.setValue('quantity', 1);
                      }}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">-- Sélectionner une séance --</option>
                      {sessions
                        .filter((session) => {
                          const available = session.capacity - session.booked_count;
                          return available > 0;
                        })
                        .map((session) => {
                          const available = session.capacity - session.booked_count;
                          return (
                            <option key={session.id} value={session.id}>
                              {session.session_name} ({session.start_time.slice(0, 5)} - {session.end_time.slice(0, 5)}) - {available} place{available > 1 ? 's' : ''} restante{available > 1 ? 's' : ''}
                            </option>
                          );
                        })}
                      {sessions.filter(s => s.capacity - s.booked_count <= 0).length > 0 && (
                        <option disabled>─── Séances complètes ───</option>
                      )}
                      {sessions
                        .filter((session) => {
                          const available = session.capacity - session.booked_count;
                          return available <= 0;
                        })
                        .map((session) => (
                          <option key={session.id} value={session.id} disabled>
                            {session.session_name} ({session.start_time.slice(0, 5)} - {session.end_time.slice(0, 5)}) - COMPLET
                          </option>
                        ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedSession && (
              <>
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de places</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={Math.min(30, selectedSession.capacity - selectedSession.booked_count)}
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        />
                      </FormControl>
                      <p className="text-sm text-muted-foreground mt-1">
                        Il reste {selectedSession.capacity - selectedSession.booked_count} places disponibles pour cette séance
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm font-semibold">
                    Total: {form.watch('quantity') * eventPrice}€
                  </p>
                </div>
              </>
            )}

            {checkoutUrl && (
              <div className="p-4 bg-muted rounded-md border border-border space-y-3">
                <Button asChild size="lg" className="w-full bg-gradient-sun shadow-glow">
                  <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">
                    Ouvrir le paiement Stripe
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground">
                  Si un bloqueur empêche l'ouverture, copiez ce lien et ouvrez-le dans un nouvel onglet :
                  <br />
                  <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className="underline break-all">
                    {checkoutUrl}
                  </a>
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-sun shadow-glow"
              size="lg"
              disabled={isSubmitting || !!checkoutUrl}
            >
              {isSubmitting ? "Réservation en cours..." : "Confirmer ma Réservation"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
