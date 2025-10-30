import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import logoSun from "@/assets/logo-sun.png";

const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
  email: z.string()
    .trim()
    .email("Adresse email invalide")
    .max(255, "L'email ne peut pas dépasser 255 caractères"),
  message: z.string()
    .trim()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(2000, "Le message ne peut pas dépasser 2000 caractères")
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log("Form submitted with validated data:", { 
      nameLength: data.name.length,
      emailLength: data.email.length,
      messageLength: data.message.length 
    });
    
    toast({
      title: "Message envoyé ! ☀️",
      description: "Merci pour votre message. Nous vous répondrons bientôt.",
    });
    
    form.reset();
  };

  return (
    <section id="contact" className="py-24 bg-gradient-dawn">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Contact
          </h2>
          <p className="font-poppins text-lg text-muted-foreground max-w-2xl mx-auto">
            Rejoignez notre communauté lumineuse et ne manquez jamais un rayon de positivité.
          </p>
        </div>

        <Card className="shadow-soft animate-fade-in">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-poppins">Votre Nom</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Marie Dupont"
                            maxLength={100}
                            className="font-poppins"
                            {...field}
                          />
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
                        <FormLabel className="font-poppins">Votre Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="marie@exemple.com"
                            maxLength={255}
                            className="font-poppins"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-poppins">Votre Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Partagez votre lumière avec nous..."
                          rows={6}
                          maxLength={2000}
                          className="font-poppins resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-[hsl(var(--navbar-bg))] hover:bg-[hsl(var(--navbar-bg))]/90 text-white"
                  disabled={form.formState.isSubmitting}
                >
                  <Send className="mr-2 h-5 w-5" />
                  Envoyer un Rayon de Soleil
                </Button>
              </form>
            </Form>

            <div className="mt-8 pt-8 border-t border-border text-center">
              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <Mail className="h-5 w-5 text-[hsl(var(--navbar-bg))]" />
                <p className="font-poppins text-sm">
                  Ou écrivez-nous directement à{" "}
                  <a href="mailto:contact@tantquelesoleilbrille.com" className="text-[hsl(var(--navbar-bg))] hover:underline">
                    contact@tantquelesoleilbrille.com
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
