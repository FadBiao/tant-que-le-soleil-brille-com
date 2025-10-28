import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Accueil", href: "#accueil" },
    { name: "Podcasts", href: "#podcasts" },
    { name: "Le Livre", href: "#livre" },
    { name: "Club d'Ecriture", href: "#club" },
    { name: "Galerie", href: "#galerie" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-[hsl(var(--navbar-bg))] z-50 border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#accueil" className="flex items-center gap-2 group">
            <img src={logo} alt="Tant que le Soleil Brille" className="h-10 w-10 animate-glow-pulse" />
            <span className="font-playfair text-2xl font-bold text-white">
              Tant que le Soleil Brille
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-poppins text-sm font-medium text-white/90 hover:text-white transition-colors uppercase"
              >
                {link.name}
              </a>
            ))}
            <Button variant="default" className="bg-white text-[hsl(var(--navbar-bg))] hover:bg-white/90">
              Rejoindre la communauté
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-poppins text-sm font-medium text-white/90 hover:text-white transition-colors py-2 uppercase"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button variant="default" className="bg-white text-[hsl(var(--navbar-bg))] hover:bg-white/90 w-full">
                Rejoindre la communauté
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
