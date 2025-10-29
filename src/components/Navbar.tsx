import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-sun.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Le Livre", href: isHomePage ? "#livre" : "/#livre" },
    { name: "Club Soleil Sur Toi", href: isHomePage ? "#club" : "/#club" },
    { name: "Podcasts", href: isHomePage ? "#podcasts" : "/#podcasts" },
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
    <nav className="fixed top-0 w-full bg-[hsl(var(--navbar-bg))] z-50 border-b border-white/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="Tant que le Soleil Brille" className="h-8 w-8 object-contain brightness-0 invert" />
            <span className="font-playfair text-xl font-bold text-white">
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
                  className="font-poppins text-sm font-medium text-white/90 hover:text-white transition-colors uppercase cursor-pointer"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="font-poppins text-sm font-medium text-white/90 hover:text-white transition-colors uppercase"
                >
                  {link.name}
                </Link>
              )
            ))}
            <a
              href={isHomePage ? "#newsletter" : "/#newsletter"}
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  scrollToSection("#newsletter");
                }
              }}
              className="bg-white text-[hsl(var(--navbar-bg))] hover:bg-white/90 px-6 py-2 rounded-md font-poppins text-sm font-medium transition-colors cursor-pointer"
            >
              Rejoindre la newsletter
            </a>
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
                link.href.startsWith("#") ? (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="font-poppins text-sm font-medium text-white/90 hover:text-white transition-colors py-2 uppercase cursor-pointer"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-poppins text-sm font-medium text-white/90 hover:text-white transition-colors py-2 uppercase"
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <a
                href={isHomePage ? "#newsletter" : "/#newsletter"}
                onClick={(e) => {
                  if (isHomePage) {
                    e.preventDefault();
                    scrollToSection("#newsletter");
                  }
                  setIsOpen(false);
                }}
                className="bg-white text-[hsl(var(--navbar-bg))] hover:bg-white/90 w-full py-2 rounded-md font-poppins text-sm font-medium transition-colors cursor-pointer text-center"
              >
                Rejoindre la newsletter
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
