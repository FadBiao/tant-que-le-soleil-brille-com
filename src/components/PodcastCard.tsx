import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Share2 } from "lucide-react";

interface PodcastCardProps {
  title: string;
  image: string;
  spotifyUrl: string;
  themes: string[];
}

const PodcastCard = ({ title, image, spotifyUrl, themes }: PodcastCardProps) => {
  const handleListen = () => {
    window.open(spotifyUrl, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: spotifyUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(spotifyUrl);
    }
  };

  return (
    <Card className="overflow-hidden group hover:shadow-glow transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-80"></div>
        <div className="absolute top-3 right-3 bg-[hsl(var(--navbar-bg))] text-white text-xs font-poppins px-3 py-1 rounded-full">
          {themes[0]}
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="font-playfair text-xl font-semibold mb-4 text-card-foreground min-h-[3.5rem]">
          {title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {themes.map((theme, index) => (
            <span 
              key={index}
              className="text-xs font-poppins px-2 py-1 rounded-full bg-[hsl(var(--navbar-bg))]/10 text-[hsl(var(--navbar-bg))]"
            >
              {theme}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1 bg-[hsl(var(--navbar-bg))] hover:bg-[hsl(var(--navbar-bg))]/90 text-white"
            onClick={handleListen}
          >
            <Play className="mr-2 h-4 w-4" />
            Écouter
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PodcastCard;
