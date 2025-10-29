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
  const heroImages = [heroClubRoom, heroIbbyCollage, heroBooks, heroPodcasts, heroWalking, heroBookItems, heroBanner];
  return <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Carousel with Overlay */}
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <Carousel opts={{
        loop: true
      }} plugins={[Autoplay({
        delay: 5000
      })]} className="h-full w-full">
          <CarouselContent className="h-full">
            {heroImages.map((image, index) => <CarouselItem key={index} className="h-screen">
                <div className="h-full w-full" style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }} />
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