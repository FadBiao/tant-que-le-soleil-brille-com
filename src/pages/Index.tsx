import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PodcastsSection from "@/components/PodcastsSection";
import BookSection from "@/components/BookSection";
import ClubSection from "@/components/ClubSection";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen font-poppins">
      <Navbar />
      <Hero />
      <BookSection />
      <ClubSection />
      <PodcastsSection />
      <Gallery />
      <Footer />
    </div>
  );
};

export default Index;
