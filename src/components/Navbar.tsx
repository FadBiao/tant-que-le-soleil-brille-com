import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Podcasts", href: isHomePage ? "#podcasts" : "/#podcasts" },
    { name: "Le Livre", href: isHomePage ? "#livre" : "/#livre" },
    { name: "Club Soleil Sur Toi", href: isHomePage ? "#club" : "/#club" },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white z-50 border-b border-border/20 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="Tant que le Soleil Brille" className="h-10 w-10 animate-glow-pulse" />
            <span className="font-playfair text-2xl font-bold text-foreground">
              Tant que le Soleil Brille
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.href.startsWith("#") ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="font-poppins text-sm font-medium text-foreground/70 hover:text-foreground transition-colors uppercase cursor-pointer"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="font-poppins text-sm font-medium text-foreground/70 hover:text-foreground transition-colors uppercase"
                >
                  {link.name}
                </Link>
              )
            ))}
            <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Rejoindre la newsletter
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
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
                link.href.startsWith("#") ? (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="font-poppins text-sm font-medium text-foreground/70 hover:text-foreground transition-colors py-2 uppercase cursor-pointer"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-poppins text-sm font-medium text-foreground/70 hover:text-foreground transition-colors py-2 uppercase"
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full">
                Rejoindre la newsletter
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
