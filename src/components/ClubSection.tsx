import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Heart, Ticket } from "lucide-react";
import clubReading from "@/assets/club-reading.jpg";

const ClubSection = () => {
  return (
    <section id="club" className="py-24 bg-gradient-dawn">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Le Club d'Écriture
          </h2>
          <p className="font-poppins text-lg text-muted-foreground max-w-2xl mx-auto">
            Un espace chaleureux où libérer votre créativité, partager vos mots et grandir ensemble
            à travers l'écriture et les échanges inspirants.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div className="order-2 md:order-1 animate-fade-in">
            <h3 className="font-playfair text-2xl font-semibold mb-6 text-foreground">
              Notre Mission
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-poppins font-semibold mb-1 text-foreground">
                    Créer des Liens
                  </h4>
                  <p className="font-poppins text-sm text-muted-foreground">
                    Rencontrez des auteurs en herbe et des plumes confirmées qui partagent
                    votre passion pour l'écriture et la créativité.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-poppins font-semibold mb-1 text-foreground">
                    Partager & Grandir
                  </h4>
                  <p className="font-poppins text-sm text-muted-foreground">
                    Partagez vos textes, recevez des retours bienveillants et progressez
                    dans votre art dans une ambiance chaleureuse.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-poppins font-semibold mb-1 text-foreground">
                    Ateliers Réguliers
                  </h4>
                  <p className="font-poppins text-sm text-muted-foreground">
                    Des ateliers mensuels avec exercices créatifs pour explorer
                    votre plume et libérer votre imagination.
                  </p>
                </div>
              </div>
            </div>

            <Button size="lg" className="bg-gradient-sun shadow-glow">
              <Ticket className="mr-2 h-5 w-5" />
              Réserver ma Place
            </Button>
          </div>

          <div className="order-1 md:order-2 animate-fade-in">
            <img 
              src={clubReading}
              alt="Club d'Écriture - Tant que le Soleil Brille"
              className="rounded-2xl shadow-soft hover:shadow-glow transition-shadow duration-300"
            />
          </div>
        </div>

        {/* Nos Lecteurs en Lumière */}
        <div className="mt-16 animate-fade-in">
          <h3 className="font-playfair text-3xl font-semibold text-center mb-8 text-foreground">
            Nos Auteurs en Lumière
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Ce club a libéré ma plume. J'ai enfin osé écrire mon premier roman.",
                author: "Marie"
              },
              {
                quote: "Chaque atelier est une source d'inspiration. J'ai trouvé ma voix.",
                author: "Thomas"
              },
              {
                quote: "Grâce au club, mes mots prennent vie et illuminent les pages.",
                author: "Sophie"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-l-4 border-primary bg-card">
                <CardContent className="p-6">
                  <p className="font-poppins text-sm italic text-muted-foreground mb-3">
                    "{testimonial.quote}"
                  </p>
                  <p className="font-poppins font-semibold text-primary">
                    — {testimonial.author}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubSection;
