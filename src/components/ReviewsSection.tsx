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

const reviews: Review[] = [
  {
    id: 1,
    name: "Alex",
    date: "",
    rating: 5,
    title: "",
    content: "Incroyable ton bouquin, je ne cesse d'y annoter des petites remarques perso. Je compte ensuite l'offrir à ma copine. Bon travail, je te souhaite de continuer à briller ✨",
    verified: false,
  },
  {
    id: 2,
    name: "Akim",
    date: "",
    rating: 5,
    title: "",
    content: "Ibby, Je tenais à te dire merci ! Je suis un homme de 30 ans et j'ai décidé d'acheter ton livre que j'ai lu et ce que tu fais c'est vraiment incroyable et ça m'a permis de sortir d'une période très sombre de ma vie. Alors merci pour tout, soleil sur toi 😊",
    verified: false,
  },
  {
    id: 3,
    name: "Eloise",
    date: "",
    rating: 5,
    title: "",
    content: "Bonjour ton livre est une bénédiction dans ma vie il m'aide à sortir de ma dépression merci 🥰",
    verified: false,
  },
  {
    id: 4,
    name: "Un jeun homme",
    date: "",
    rating: 5,
    title: "",
    content: "Ibby, J'ai acheté votre livre et dès que je suis tombé dans la tombée de la nuit sur« ART SCELLE », j'ai fondu en larmes, comme je n'avais jamais fondu en larmes auparavant !! Je voulais vous remercier personnellement pour ces mots de votre livre à peine commencé, que je suis déjà un peu « réparé » 🥹",
    verified: false,
  },
  {
    id: 5,
    name: "Constance",
    date: "",
    rating: 5,
    title: "",
    content: "Merci Ibby pour ce chef d'oeuvre ❤️ Il résonne tellement en moi.",
    verified: false,
  },
  {
    id: 6,
    name: "Elyze",
    date: "",
    rating: 5,
    title: "",
    content: "Vous savez, vos textes m'ont énormément fait réfléchir, et pour ça, une très grand merci à vous 🙏",
    verified: false,
  },
  {
    id: 7,
    name: "Sebastien",
    date: "",
    rating: 5,
    title: "",
    content: "Je voulais te remercier, car tes mots m'accompagnent dans mon quotidien. Ils trouvent toujours le moyen de résonner et d'apporter de la clarté à mon esprit. Tes écrits me rappellent que, même quand tout semble sombre, il reste toujours une façon pour le soleil de briller. Merci d'écrire, de partager, et d'être cette source d'inspiration.",
    verified: false,
  },
  {
    id: 8,
    name: "GreeeenKitchen",
    date: "",
    rating: 5,
    title: "",
    content: "Merci pour ça! Nous devons être beaucoup à se reconnaître dans tes œuvres. C'est à la fois rassurant et si triste. Tu me donnes de la force. Je t'en remercie. Je pense que tu as aussi vécu ou vis cette descente douce aux enfers. Je t'envoie plein de gratitude et de force.",
    verified: false,
  },
  {
    id: 9,
    name: "Valentin",
    date: "",
    rating: 5,
    title: "",
    content: "Salut Ibby, je viens de tomber sur ton compte avec tes mots, tes poésies, tes phrases pleines de sens et pour la première fois, je pleure devant tes pages, je vais acheter ton livre et le garder à jamais pour moi. Merci d'avoir créé ce livre, c'est d'une beauté et d'un besoin sans nom ❤️",
    verified: false,
  },
  {
    id: 10,
    name: "Salia",
    date: "",
    rating: 5,
    title: "",
    content: "Bonsoir ! Je vous envoie un message d'une part pour vous dire que j'aime énormément votre travail. De plus j'aimerais savoir par la même occasion comment avez vous fait pour faire votre livre ? (En effet je souhaiterais également me lancer mais je ne sais comment faire .)",
    verified: false,
  },
];

const ReviewsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
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
                    <Card className="border-border hover:shadow-soft transition-shadow duration-300 aspect-square">
                      <CardContent className="p-6 flex flex-col h-full">
                        {/* Header avec nom */}
                        <div className="mb-4">
                          <p className="font-poppins font-semibold text-foreground">
                            {review.name}
                          </p>
                        </div>

                        {/* Contenu */}
                        <p className="font-poppins text-sm text-[hsl(0,0%,0%)] leading-relaxed flex-grow overflow-y-auto">
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
