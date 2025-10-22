import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Share2 } from "lucide-react";

interface PodcastCardProps {
  title: string;
  description: string;
  image: string;
  quote: string;
  theme: string;
}

const PodcastCard = ({ title, description, image, quote, theme }: PodcastCardProps) => {
  return (
    <Card className="overflow-hidden group hover:shadow-glow transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-80"></div>
        <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-poppins px-3 py-1 rounded-full">
          {theme}
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="font-playfair text-xl font-semibold mb-2 text-card-foreground">
          {title}
        </h3>
        
        <p className="font-poppins text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
        
        <blockquote className="border-l-2 border-primary pl-4 mb-4 italic text-sm text-muted-foreground font-poppins">
          "{quote}"
        </blockquote>

        <div className="flex gap-2">
          <Button variant="default" size="sm" className="flex-1 bg-gradient-sun">
            <Play className="mr-2 h-4 w-4" />
            Écouter
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PodcastCard;
