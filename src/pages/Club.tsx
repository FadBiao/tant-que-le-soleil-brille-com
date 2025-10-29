import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Heart, Ticket, ArrowLeft, ShoppingBag, Pen, BookOpen, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import clubReading from "@/assets/club-reading.jpg";
import { ReservationModal } from "@/components/ReservationModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const Club = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return <div className="min-h-screen font-poppins">
      <Navbar />
      
      <section className="py-24 bg-gradient-dawn">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Button */}
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>

          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Le Club Soleil sur toi
            </h1>
            <h2 className="font-playfair text-2xl md:text-3xl font-semibold mb-4 text-primary">
              Écrire, ressentir, guérir
            </h2>
            <p className="font-poppins text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
              Parce que parfois, il faut juste une matinée, un carnet et quelques âmes lumineuses pour remettre du sens là où y en a plus.
            </p>
            <p className="font-poppins text-base text-muted-foreground max-w-3xl mx-auto">
              Le Club Soleil sur toi n'est pas un atelier d'écriture classique. C'est un moment suspendu, où tu viens déposer ce que tu ressens, écrire sans jugement, partager ce que tu traverses et repartir plus léger.e, inspiré.e, aligné.e.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start mb-16 text-sm">
            {/* Left Column - Image */}
            <div className="animate-fade-in">
              <img src={clubReading} alt="Le Club Soleil sur toi" className="rounded-2xl shadow-soft hover:shadow-glow transition-shadow duration-300 w-full" />
            </div>

            {/* Right Column - Ce qui t'attend */}
            <div className="animate-fade-in space-y-6">
              <h3 className="font-playfair text-2xl font-semibold text-foreground mb-6">
                Ce qui t'attend
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="font-poppins text-sm text-muted-foreground">
                    Des exercices d'écriture introspective, pour explorer tes émotions, tes rêves et tes blessures avec douceur.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="font-poppins text-sm text-muted-foreground">
                    Des discussions sincères, où chaque mot compte et chaque regard soutient.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="font-poppins text-sm text-muted-foreground">
                    Un lieu poétique et chaleureux, baigné de lumière, où les bougies, les fleurs et les carnets t'attendent.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <p className="font-poppins text-sm text-muted-foreground">
                    Et surtout… une énergie bienveillante et joyeuse, portée par Ibby, pour ne jamais lâcher — tant que le soleil brille...
                  </p>
                </div>
              </div>

              <div className="bg-card p-6 rounded-xl border border-border mt-6">
                <p className="font-poppins text-sm font-semibold text-foreground mb-4 text-center">
                  Et ce n'est pas tout... Chaque participant repartira avec :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <ShoppingBag className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="font-poppins text-sm text-muted-foreground">Un tote bag "Soleil sur toi"</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Pen className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="font-poppins text-sm text-muted-foreground">Un stylo "Soleil sur toi"</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="font-poppins text-sm text-muted-foreground">Un carnet orange au papier doux</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="font-poppins text-sm text-muted-foreground">Le lendemain, un email avec des exercices d'écriture pour prolonger l'expérience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prochaine Session */}
          <div className="bg-card p-8 rounded-2xl shadow-soft mb-12 animate-fade-in">
            <h3 className="font-playfair text-2xl font-semibold text-foreground mb-6 text-center">
              Prochaine Session
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-poppins font-semibold text-foreground">Dimanche 16 novembre 2025</p>
                    <p className="font-poppins text-sm text-muted-foreground">
                      Créneau : 10h00-11h30 / 12h-13h30
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-poppins text-sm text-foreground">Café Poésie</p>
                    <p className="font-poppins text-sm text-muted-foreground">10 Pass. Thiéré, 75011, Paris</p>
                    <p className="font-poppins text-sm text-primary font-semibold mt-2">
                      Places limitées à 13 personnes par session
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-dawn p-6 rounded-xl">
                <h4 className="font-playfair text-xl font-semibold text-foreground mb-3">Tarifs</h4>
                <p className="font-poppins text-3xl font-bold text-primary mb-2">65 €</p>
                <p className="font-poppins text-sm text-muted-foreground mb-3">la session (1h30)</p>
                <p className="font-poppins text-sm text-muted-foreground">
                  Carnet, boisson chaude et douceurs inclus.
                </p>
                <p className="font-poppins text-sm font-semibold text-foreground mt-3 italic">
                  Parce qu'ici, Ibby a pensé à tout pour que tu te sentes bien.
                </p>
              </div>
            </div>
          </div>

          {/* Pour qui */}
          <div className="bg-card p-8 rounded-2xl shadow-soft mb-12 animate-fade-in">
            <h3 className="font-playfair text-2xl font-semibold text-foreground mb-6 text-center">
              Pour qui ?
            </h3>
            <p className="font-poppins text-muted-foreground mb-4 text-center">
              Pour celles et ceux qui veulent :
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
                <p className="font-poppins text-sm text-foreground">se reconnecter à eux-mêmes</p>
              </div>
              <div className="text-center">
                <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
                <p className="font-poppins text-sm text-foreground">guérir par les mots</p>
              </div>
              <div className="text-center">
                <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
                <p className="font-poppins text-sm text-foreground">se sentir inspirés, entourés, compris</p>
              </div>
            </div>
            <p className="font-poppins text-base text-center italic text-primary font-semibold">
              Aucun niveau d'écriture requis — seulement l'envie d'être vrai.e. et de se vider.
            </p>
          </div>

          {/* Réserve ta place */}
          <div className="text-center mb-12 animate-fade-in">
            <h3 className="font-playfair text-2xl font-semibold text-foreground mb-4">
              Réserve ta place
            </h3>
            <p className="font-poppins text-muted-foreground mb-4">
              Les places sont limitées, afin de rester en petit comité.
            </p>
            <p className="font-playfair text-xl italic text-primary mb-6">
              "Parfois, un mot peut tout changer."
            </p>
            <Button size="lg" className="bg-gradient-sun shadow-glow" onClick={() => setIsModalOpen(true)}>
              <Ticket className="mr-2 h-5 w-5" />
              Je réserve ma place maintenant
            </Button>
          </div>

          {/* Petit rappel */}
          <div className="bg-card p-8 rounded-2xl shadow-soft animate-fade-in">
            <h3 className="font-playfair text-2xl font-semibold text-foreground mb-6 text-center">
              Petit rappel
            </h3>
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="flex items-start gap-3">
                <span className="text-primary">✔️</span>
                <p className="font-poppins text-sm text-muted-foreground">
                  Être prêt.e à aborder des sujets profonds
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary">✔️</span>
                <p className="font-poppins text-sm text-muted-foreground">
                  Venir le sourire aux lèvres
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary">✔️</span>
                <p className="font-poppins text-sm text-muted-foreground">
                  Couper les notifications et le son du téléphone
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary">☀️</span>
                <p className="font-poppins text-sm text-muted-foreground">
                  Prendre Ibby dans ses bras :)
                </p>
              </div>
            </div>
          </div>

          <ReservationModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        </div>
      </section>

      <Footer />
    </div>;
};
export default Club;