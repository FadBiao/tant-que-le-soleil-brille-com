import { Sun, Instagram, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-foreground py-12 border-t border-border/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Sun className="h-8 w-8 text-primary" />
              <span className="font-playfair text-xl font-bold">
                Tant que le Soleil Brille
              </span>
            </div>
            <p className="font-poppins text-sm text-muted-foreground max-w-md">
              Un univers de lumière, de positivité et de développement personnel.
              Rejoignez notre communauté et laissez briller votre lumière intérieure.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-playfair font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 font-poppins text-sm">
              {["Accueil", "Podcasts", "Le Livre", "Club de Lecture", "Galerie"].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-playfair font-semibold mb-4">Suivez-nous</h3>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="bg-foreground/10 hover:bg-primary p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-foreground/10 hover:bg-primary p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-foreground/10 hover:bg-primary p-2 rounded-full transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/20 text-center">
          <p className="font-poppins text-sm text-muted-foreground">
            © {currentYear} Tant que le Soleil Brille. Tous droits réservés. 
            Fait avec ❤️ et ☀️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
