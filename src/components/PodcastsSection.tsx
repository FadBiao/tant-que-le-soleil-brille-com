import { useState } from "react";
import { Link } from "react-router-dom";
import PodcastCard from "./PodcastCard";
import { Button } from "@/components/ui/button";
import { allPodcasts, themes } from "@/data/podcastsData";
const PodcastsSection = () => {
  const [selectedTheme, setSelectedTheme] = useState("Tous les topics");
  
  // Get unique podcasts (avoid duplicates)
  const uniquePodcasts = allPodcasts.filter((podcast, index, self) =>
    index === self.findIndex((p) => p.id === podcast.id)
  );
  
  const filteredPodcasts = selectedTheme === "Tous les topics" 
    ? uniquePodcasts 
    : uniquePodcasts.filter(p => p.themes.includes(selectedTheme));
  
  // Only show first 6 podcasts on home page
  const displayedPodcasts = filteredPodcasts.slice(0, 6);

  return <section id="podcasts" className="py-24 bg-gradient-dawn">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in my-0 mx-[5px]">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Le podcast Soleil sur toi
          </h2>
          <p className="font-poppins text-lg text-muted-foreground max-w-2xl mx-auto text-center font-medium">Chaque épisode t'offre des mots vrais, des réflexions profondes, portés par la joie et la bonne humeur d'Ibby, pour ne jamais lâcher, tant que le Soleil brille.</p>
        </div>

        {/* Theme Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {themes.map(theme => <Button key={theme} variant={selectedTheme === theme ? "default" : "outline"} onClick={() => setSelectedTheme(theme)} className={selectedTheme === theme ? "bg-gradient-sun shadow-glow" : ""}>
              {theme}
            </Button>)}
        </div>

        {/* Podcast Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPodcasts.map(podcast => <div key={podcast.id} className="animate-fade-in">
              <PodcastCard {...podcast} />
            </div>)}
        </div>

        {/* View All Button */}
        {filteredPodcasts.length > 6 && (
          <div className="flex justify-center mt-12">
            <Link to="/podcasts">
              <Button size="lg" className="bg-gradient-sun shadow-glow">
                Voir tous les podcasts
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>;
};
export default PodcastsSection;