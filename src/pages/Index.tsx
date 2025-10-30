import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PodcastsSection from "@/components/PodcastsSection";
import BookSection from "@/components/BookSection";
import ReviewsSection from "@/components/ReviewsSection";
import ClubSection from "@/components/ClubSection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Tant que le Soleil Brille",
    "description": "Podcasts sur le développement personnel, livre inspirant, club d'écriture et moments de partage",
    "url": "https://tantquelesoleilbrille.com",
    "author": {
      "@type": "Person",
      "name": "Ibtissam Madani"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://tantquelesoleilbrille.com/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <SEO 
        title="Tant que le Soleil Brille - Podcasts & Livres Inspirants"
        description="Découvrez l'univers lumineux de Tant que le Soleil Brille : podcasts sur le développement personnel, livre inspirant, club d'écriture et moments de partage."
        keywords="développement personnel, podcast, livre inspirant, club d'écriture, Ibtissam Madani, poésie, motivation, confiance en soi"
      />
      <StructuredData data={structuredData} />
      <div className="min-h-screen font-poppins">
        <Navbar />
        <Hero />
        <BookSection />
        <ReviewsSection />
        <ClubSection />
        <PodcastsSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
