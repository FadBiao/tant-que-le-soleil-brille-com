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
import heroFlowers from "@/assets/hero-flowers.jpg";
import heroBooksStack from "@/assets/hero-books-stack.png";
const Hero = () => {
  const heroImages = [heroClubRoom, heroIbbyCollage, heroBooks, heroPodcasts, heroWalking, heroBookItems, heroBanner, heroFlowers, heroBooksStack];
  return <section id="accueil" className="relative min-h-[calc(100vh-var(--nav-h))] mt-[var(--nav-h)] flex items-center justify-center overflow-hidden">
      {/* Background Carousel with Overlay */}
      <div className="absolute inset-0">
        <Carousel opts={{
        loop: true
      }} plugins={[Autoplay({
        delay: 5000
      })]} className="h-full w-full">
          <CarouselContent className="h-full">
            {heroImages.map((image, index) => <CarouselItem key={index} className="h-full">
                <div className="h-full w-full relative bg-background">
                  <img 
                    src={image} 
                    alt={`Hero ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </CarouselItem>)}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/20 to-transparent"></div>
      </div>

      {/* Content */}
      

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>;
};
export default Hero;