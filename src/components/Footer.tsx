import { Instagram, Music, Mic, Send } from "lucide-react";
import logo from "@/assets/logo-sun.png";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const emailSchema = z.object({
  email: z.string().trim().email("Adresse email invalide").max(255, "L'email ne peut pas dépasser 255 caractères"),
});

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      emailSchema.parse({ email });
      
      toast({
        title: "Inscription confirmée ! ☀️",
        description: "Merci de rejoindre notre communauté lumineuse.",
      });
      
      setEmail("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erreur",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-background">
      {/* Newsletter Section */}
      <div id="newsletter" className="bg-[hsl(var(--navbar-bg))] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-8">
              As-tu reçu mon message ?
            </h2>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Input
                type="email"
                placeholder="Ton email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={255}
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-white h-14 text-base px-6 rounded-full"
                required
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-white text-[hsl(var(--navbar-bg))] hover:bg-white/90 h-14 px-8 rounded-full font-semibold uppercase"
              >
                <Send className="mr-2 h-5 w-5" />
                S'inscrire
              </Button>
            </form>
            
            <p className="font-poppins text-base text-white/80">
              Inscris-toi à ma newsletter et je t'enverrai des questions rares,
              des rappels honnêtes, et bien plus encore.
            </p>
          </div>
        </div>
      </div>

      {/* Links & Social Section */}
      <div className="bg-white py-8 border-t border-border">
        <div className="container mx-auto px-4">
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-6 font-poppins text-sm">
            <a href="/" className="text-[hsl(var(--navbar-bg))] hover:underline uppercase font-medium">
              Accueil
            </a>
            <a href="/#livre" className="text-[hsl(var(--navbar-bg))] hover:underline uppercase font-medium">
              Le Livre
            </a>
            <a href="/#club" className="text-[hsl(var(--navbar-bg))] hover:underline uppercase font-medium">
              Club de Lecture
            </a>
            <a href="/#podcasts" className="text-[hsl(var(--navbar-bg))] hover:underline uppercase font-medium">
              Podcasts
            </a>
            <a href="/#contact" className="text-[hsl(var(--navbar-bg))] hover:underline uppercase font-medium">
              Contact
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-4 mb-6">
            <a 
              href="https://www.instagram.com/tantquelesoleilbrille/?igsh=ZWJwNjRybGpjajQ1#" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[hsl(var(--navbar-bg))] hover:bg-[hsl(var(--navbar-bg))]/80 text-white p-3 rounded-full transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="https://open.spotify.com/show/4Em0fs1GTP0nytKUlzZ02W?si=88c80c1efdd248af" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[hsl(var(--navbar-bg))] hover:bg-[hsl(var(--navbar-bg))]/80 text-white p-3 rounded-full transition-colors"
              aria-label="Spotify"
            >
              <Music className="h-5 w-5" />
            </a>
            <a 
              href="https://podcasts.apple.com/fr/podcast/soleil-sur-toi/id1699976384?l=en-GB" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[hsl(var(--navbar-bg))] hover:bg-[hsl(var(--navbar-bg))]/80 text-white p-3 rounded-full transition-colors"
              aria-label="Apple Podcast"
            >
              <Mic className="h-5 w-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="font-poppins text-sm text-muted-foreground">
              © {currentYear} Tant que le Soleil Brille. Tous droits réservés. Fait avec ❤️ et ☀️
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
