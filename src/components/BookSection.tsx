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
            <div className="absolute -inset-4 bg-gradient-sun opacity-20 blur-3xl rounded-full"></div>
            <img src={bookCover} alt="Tant que le Soleil Brille - Le Livre" className="relative rounded-2xl shadow-soft hover:shadow-glow transition-shadow duration-300 w-full max-w-lg mx-auto scale-110" />
          </div>

          {/* Book Content */}
          <div className="animate-fade-in">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Le Livre
              <br />
              <span className="text-primary">Tant que le Soleil Brille</span>
            </h2>

            <p className="font-poppins text-lg text-muted-foreground mb-6 leading-relaxed">Ce receuille n'est pas là pour t'endormir il est là pour te réveiller.</p>

            <Card className="mb-6 border-l-4 border-primary bg-accent/30">
              <CardContent className="p-4">
                <Quote className="h-6 w-6 text-primary mb-2" />
                <p className="font-poppins text-sm italic text-foreground">"Tant que le soleil brille n’est pas un simple recueil de poésie.


C’est une conversation entre ton cœur et la lumière que tu avais oubliée. Des mots vrais, écrits pour te relever, et te rappeler que la foi en toi liée à l'action change tout. Des milliers de lecteurs à travers le monde y ont trouvé un souffle nouveau. Aujourd’hui, c’est ton tour."</p>
              </CardContent>
            </Card>

            {/* Testimonials */}
            

            <div className="flex justify-center">
              <Button size="lg" className="bg-gradient-sun shadow-glow" asChild>
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