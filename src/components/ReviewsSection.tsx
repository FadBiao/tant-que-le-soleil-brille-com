import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  title: string;
  content: string;
  verified: boolean;
}

// Données temporaires - à remplacer plus tard
const reviews: Review[] = [
  {
    id: 1,
    name: "Sophie L.",
    date: "15/01/2025",
    rating: 5,
    title: "Un livre qui transforme",
    content: "Ce livre m'a profondément touchée. Les mots d'Ibby résonnent avec une authenticité rare. Chaque poème est une invitation à se reconnecter à soi-même.",
    verified: true,
  },
  {
    id: 2,
    name: "Marc D.",
    date: "10/01/2025",
    rating: 5,
    title: "Magnifique",
    content: "Une lecture inspirante qui m'accompagne au quotidien. Les poèmes sont puissants et touchants. Je le recommande à tous ceux qui cherchent de la lumière.",
    verified: true,
  },
  {
    id: 3,
    name: "Julie M.",
    date: "05/01/2025",
    rating: 5,
    title: "Essentiel",
    content: "Un recueil qui fait du bien à l'âme. Ibby a le don de mettre des mots sur ce que l'on ressent. C'est un cadeau précieux.",
    verified: true,
  },
  {
    id: 4,
    name: "Thomas B.",
    date: "28/12/2024",
    rating: 5,
    title: "Inspirant",
    content: "Des mots qui réveillent et qui donnent envie d'avancer. Chaque page est une bouffée d'air frais. Merci Ibby pour ce partage.",
    verified: true,
  },
  {
    id: 5,
    name: "Emma R.",
    date: "20/12/2024",
    rating: 5,
    title: "Pur bonheur",
    content: "Ce livre est devenu mon compagnon du matin. Je le lis et relis sans jamais m'en lasser. Une vraie source d'inspiration.",
    verified: true,
  },
];

const ReviewsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-6 w-6 fill-[hsl(var(--navbar-bg))] text-[hsl(var(--navbar-bg))]"
              />
            ))}
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-[hsl(0,0%,0%)]">
            Avis des lecteurs
          </h2>
          <p className="font-poppins text-lg text-[hsl(0,0%,0%)] max-w-3xl mx-auto">
            Découvrez ce que disent les lecteurs de "Tant que le soleil brille"
          </p>
        </div>

        {/* Carousel */}
        <div className="relative px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {reviews.map((review) => (
                <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <Card className="border-border hover:shadow-soft transition-shadow duration-300 h-full">
                      <CardContent className="p-6 flex flex-col h-full">
                        {/* Header avec nom et date */}
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-poppins font-semibold text-foreground">
                              {review.name}
                            </p>
                            {review.verified && (
                              <p className="font-poppins text-xs text-muted-foreground">
                                Acheteur vérifié
                              </p>
                            )}
                          </div>
                          <p className="font-poppins text-xs text-muted-foreground">
                            {review.date}
                          </p>
                        </div>

                        {/* Étoiles */}
                        <div className="flex gap-1 mb-4">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-[hsl(var(--navbar-bg))] text-[hsl(var(--navbar-bg))]"
                            />
                          ))}
                        </div>

                        {/* Titre */}
                        <h3 className="font-poppins font-bold text-foreground mb-3">
                          {review.title}
                        </h3>

                        {/* Contenu */}
                        <p className="font-poppins text-sm text-[hsl(0,0%,0%)] leading-relaxed flex-grow">
                          {review.content}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
