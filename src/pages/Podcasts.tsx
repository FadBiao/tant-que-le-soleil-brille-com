import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PodcastCard from "@/components/PodcastCard";
import { Button } from "@/components/ui/button";
import { allPodcasts, themes } from "@/data/podcastsData";

const Podcasts = () => {
  const [selectedTheme, setSelectedTheme] = useState("Tous les topics");

  // Get unique podcasts (avoid duplicates)
  const uniquePodcasts = allPodcasts.filter((podcast, index, self) =>
    index === self.findIndex((p) => p.id === podcast.id)
  );

  const filteredPodcasts = selectedTheme === "Tous les topics" 
    ? uniquePodcasts 
    : uniquePodcasts.filter(p => p.themes.includes(selectedTheme));

  return (
    <div className="min-h-screen font-poppins">
      <Navbar />
      
      <section className="pt-32 pb-24 bg-gradient-dawn min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Tous les podcasts Soleil sur toi
            </h1>
            <p className="font-poppins text-lg text-muted-foreground max-w-2xl mx-auto">
              Chaque épisode t'offre des mots vrais, des réflexions profondes, portés par la joie et la bonne humeur d'Ibby, pour ne jamais lâcher, tant que le Soleil brille.
            </p>
          </div>

          {/* Theme Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {themes.map(theme => (
              <Button
                key={theme}
                variant={selectedTheme === theme ? "default" : "outline"}
                onClick={() => setSelectedTheme(theme)}
                className={selectedTheme === theme ? "bg-gradient-sun shadow-glow" : ""}
              >
                {theme}
              </Button>
            ))}
          </div>

          {/* Podcast Count */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground font-poppins">
              {filteredPodcasts.length} épisode{filteredPodcasts.length > 1 ? 's' : ''}
            </p>
          </div>

          {/* Podcast Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPodcasts.map(podcast => (
              <div key={podcast.id} className="animate-fade-in">
                <PodcastCard {...podcast} />
              </div>
            ))}
          </div>

          {filteredPodcasts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground font-poppins text-lg">
                Aucun podcast trouvé pour cette catégorie.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Podcasts;
