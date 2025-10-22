import clubReading from "@/assets/club-reading.jpg";
import bookCover from "@/assets/book-cover.jpg";
import podcastMic from "@/assets/podcast-mic.jpg";

const Gallery = () => {
  const images = [
    { src: clubReading, alt: "Club de lecture" },
    { src: bookCover, alt: "Lecture inspirante" },
    { src: podcastMic, alt: "Enregistrement podcast" },
    { src: clubReading, alt: "Moments de partage" },
    { src: bookCover, alt: "Pause lecture" },
    { src: podcastMic, alt: "Studio podcast" },
  ];

  return (
    <section id="galerie" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Galerie de Souvenirs
          </h2>
          <p className="font-poppins text-lg text-muted-foreground max-w-2xl mx-auto">
            Revivez les moments lumineux de nos rencontres, événements et célébrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div 
              key={index}
              className="relative overflow-hidden rounded-lg group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-sun opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="absolute inset-0 ring-4 ring-primary/0 group-hover:ring-primary/50 transition-all duration-300 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
