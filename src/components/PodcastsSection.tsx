import { useState } from "react";
import PodcastCard from "./PodcastCard";
import { Button } from "@/components/ui/button";
import podcastMic from "@/assets/podcast-mic.jpg";

const themes = [
  "Tous les topics",
  "Relations",
  "Confiance en soi",
  "Santé",
  "Bonheur",
  "Motivation",
  "Plus populaires",
];

const podcasts = [
  {
    id: 1,
    title: "L'art de s'aimer soi-même",
    description: "Découvrez comment cultiver une relation bienveillante avec vous-même et rayonner de l'intérieur.",
    image: podcastMic,
    quote: "S'aimer soi-même est le début d'une histoire d'amour éternelle",
    theme: "Confiance en soi",
  },
  {
    id: 2,
    title: "Relations authentiques",
    description: "Comment créer des liens profonds et sincères avec les autres tout en restant fidèle à soi-même.",
    image: podcastMic,
    quote: "Les vraies relations se construisent dans la lumière de l'authenticité",
    theme: "Relations",
  },
  {
    id: 3,
    title: "La gratitude au quotidien",
    description: "Transformez votre vie en adoptant une attitude de reconnaissance envers chaque moment.",
    image: podcastMic,
    quote: "La gratitude est la mémoire du cœur",
    theme: "Bonheur",
  },
  {
    id: 4,
    title: "Se réinventer après l'épreuve",
    description: "Comment transformer les défis en opportunités de croissance et de renouveau.",
    image: podcastMic,
    quote: "C'est dans l'obscurité que l'on apprend à voir la lumière",
    theme: "Motivation",
  },
  {
    id: 5,
    title: "Corps et esprit en harmonie",
    description: "L'importance de prendre soin de soi physiquement pour rayonner mentalement.",
    image: podcastMic,
    quote: "Un corps sain est le temple d'un esprit lumineux",
    theme: "Santé",
  },
  {
    id: 6,
    title: "Oser ses rêves",
    description: "Comment avoir le courage de poursuivre ses aspirations les plus profondes.",
    image: podcastMic,
    quote: "Les rêves sont les rayons de soleil de notre âme",
    theme: "Motivation",
  },
];

const PodcastsSection = () => {
  const [selectedTheme, setSelectedTheme] = useState("Tous les topics");

  const filteredPodcasts = selectedTheme === "Tous les topics" 
    ? podcasts 
    : podcasts.filter(p => p.theme === selectedTheme);

  return (
    <section id="podcasts" className="py-24 bg-gradient-dawn">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Nos Podcasts Inspirants
          </h2>
          <p className="font-poppins text-lg text-muted-foreground max-w-2xl mx-auto">
            Chaque épisode est une invitation à explorer votre lumière intérieure
            et à cultiver une vie plus épanouie.
          </p>
        </div>

        {/* Theme Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {themes.map((theme) => (
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

        {/* Podcast Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPodcasts.map((podcast) => (
            <div key={podcast.id} className="animate-fade-in">
              <PodcastCard {...podcast} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PodcastsSection;
