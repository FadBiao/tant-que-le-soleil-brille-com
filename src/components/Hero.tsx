import { Button } from "@/components/ui/button";
import { Headphones, BookOpen, Sparkles } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import heroClubRoom from "@/assets/hero-club-room.png";
import heroIbbyCollage from "@/assets/hero-ibby-collage.png";
import heroBooks from "@/assets/hero-books.jpeg";
import heroPodcasts from "@/assets/hero-podcasts.png";
import heroWalking from "@/assets/hero-walking.jpeg";
import heroBookItems from "@/assets/hero-book-items.jpg";
import heroBanner from "@/assets/hero-banner.jpeg";

const Hero = () => {
  const heroImages = [
    heroClubRoom,
    heroIbbyCollage,
    heroBooks,
    heroPodcasts,
    heroWalking,
    heroBookItems,
    heroBanner
  ];

  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[72px]">
      {/* Background Carousel with Overlay */}
      <div className="absolute inset-0">
        <Carousel
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="h-full w-full"
        >
          <CarouselContent className="h-full">
            {heroImages.map((image, index) => (
              <CarouselItem key={index} className="h-full">
                <div 
                  className="h-full w-full bg-cover bg-center duration-1000 object-cover"
                  style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <div className="animate-fade-in">
          <Sparkles className="h-12 w-12 text-primary mx-auto mb-6 animate-float" />
          
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 text-foreground">
            Tant que le Soleil Brille,
            <br />
            <span className="text-primary">Tout est Possible</span>
          </h1>
          
          <p className="font-poppins text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Découvrez un univers lumineux de podcasts inspirants, un livre qui réchauffe le cœur,
            et une communauté bienveillante qui célèbre la positivité et le développement personnel.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-sun shadow-glow font-poppins text-base"
            >
              <Headphones className="mr-2 h-5 w-5" />
              Écouter les Podcasts
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-poppins text-base"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Découvrir le Livre
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
