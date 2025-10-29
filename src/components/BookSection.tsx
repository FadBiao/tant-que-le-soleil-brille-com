import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Star, Quote } from "lucide-react";
import bookCover from "@/assets/book-cover-new.png";
const BookSection = () => {
  return <section id="livre" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Book Image */}
          <div className="relative animate-fade-in">
            <img src={bookCover} alt="Tant que le Soleil Brille - Le Livre" className="w-full max-w-lg mx-auto scale-110" />
          </div>

          {/* Book Content */}
          <div className="animate-fade-in">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Le Livre
              <br />
              <span className="text-[hsl(var(--navbar-bg))]">Tant que le Soleil Brille</span>
            </h2>

            <p className="font-poppins text-lg font-bold text-muted-foreground mb-6 leading-relaxed">Ce recueille n'est pas là pour t'endormir il est là pour te réveiller.</p>

            <p className="font-poppins text-base italic text-justify text-muted-foreground mb-6 leading-relaxed">Tant que le soleil brille n'est pas un simple recueil de poésie. C'est une conversation entre ton cœur et la lumière que tu avais oubliée. Des mots vrais, écrits pour te relever, et te rappeler que la foi en toi liée à l'action change tout. Des milliers de lecteurs à travers le monde y ont trouvé un souffle nouveau. Aujourd'hui, c'est ton tour.</p>

            {/* Testimonials */}
            

            <div className="flex justify-center">
              <Button size="lg" className="bg-[hsl(var(--navbar-bg))] hover:bg-[hsl(var(--navbar-bg))]/90 text-white" asChild>
                <a href="https://www.amazon.fr/Tant-soleil-brille-Ibtissam-Madani/dp/2322522988" target="_blank" rel="noopener noreferrer">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Commander sur Amazon
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default BookSection;