import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  email: z.string().email("Email invalide").max(255),
  phone: z.string().min(10, "Numéro de téléphone invalide").optional(),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

interface ReservationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ReservationModal = ({ open, onOpenChange }: ReservationModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: ReservationFormValues) => {
    setIsSubmitting(true);
    
    try {
      // TODO: Intégrer avec Stripe et le backend
      console.log("Données de réservation:", data);
      
      toast({
        title: "☀️ Réservation en cours",
        description: "Nous préparons votre inscription au Club d'Écriture...",
      });

      // Simuler l'envoi
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "✨ Soleil sur toi, ta place est confirmée!",
        description: "Vous recevrez un email de confirmation sous peu.",
      });

      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
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
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-poppins font-semibold text-sm mb-1">Prochaine Session</h4>
              <p className="font-poppins text-sm text-muted-foreground">
                Date à confirmer • Atelier d'écriture créative
              </p>
              <p className="font-poppins text-sm font-semibold text-primary mt-1">
                Tarif: 25€
              </p>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Nom complet
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                  <FormLabel>Téléphone (optionnel)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+33 6 12 34 56 78" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-gradient-sun shadow-glow"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Réservation en cours..." : "Confirmer ma Réservation"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
