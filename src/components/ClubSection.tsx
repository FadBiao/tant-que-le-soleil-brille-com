import { Button } from "@/components/ui/button";
import { Calendar, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import clubReading from "@/assets/club-room-new.png";

const ClubSection = () => {
  return (
    <section id="club" className="pt-32 pb-24 bg-gradient-dawn">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-[hsl(0,0%,0%)]">
            Le Club Soleil sur toi
          </h2>
          <h3 className="font-playfair text-2xl md:text-3xl font-semibold mb-4 text-[hsl(var(--navbar-bg))]">
            Écrire, ressentir, guérir
          </h3>
          <p className="font-poppins text-lg text-[hsl(0,0%,0%)] max-w-3xl mx-auto">
            Un moment suspendu pour déposer ce que tu ressens, écrire sans jugement, et repartir plus léger.e, inspiré.e, aligné.e.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* Left Column - Image */}
          <div className="animate-fade-in">
            <img 
              src={clubReading}
              alt="Atelier d'écriture Club Soleil sur toi - Espace chaleureux et inspirant pour l'écriture thérapeutique à Paris"
              className="rounded-2xl shadow-soft hover:shadow-glow transition-shadow duration-300 w-full max-w-md mx-auto"
            />
          </div>

          {/* Right Column - Info rapide */}
          <div className="animate-fade-in space-y-6">
            <div className="bg-card p-6 rounded-xl border border-border">
              <h3 className="font-playfair text-xl font-semibold text-foreground mb-4">
                Prochaine Session
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-[hsl(var(--navbar-bg))] flex-shrink-0" />
                  <div>
                    <p className="font-poppins text-sm font-semibold text-foreground">Dimanche 16 novembre 2025</p>
                    <p className="font-poppins text-xs text-[hsl(0,0%,0%)]">10h00-11h30 / 11h45-13h15</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-[hsl(var(--navbar-bg))] flex-shrink-0" />
                  <div>
                    <p className="font-poppins text-sm text-foreground">Café Poésie, Paris 11e</p>
                    <p className="font-poppins text-xs text-[hsl(var(--navbar-bg))] font-semibold">Places limitées à 13 personnes</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="font-poppins text-2xl font-bold text-[hsl(var(--navbar-bg))]">35 €</p>
                <p className="font-poppins text-xs text-[hsl(0,0%,0%)]">Carnet, boisson chaude et douceurs inclus</p>
              </div>
            </div>

            <Link to="/club">
              <Button size="lg" className="w-full bg-[hsl(var(--navbar-bg))] hover:bg-[hsl(var(--navbar-bg))]/90 text-white group mt-2">
                En savoir plus
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubSection;
