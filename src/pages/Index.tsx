import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PodcastsSection from "@/components/PodcastsSection";
import BookSection from "@/components/BookSection";
import ReviewsSection from "@/components/ReviewsSection";
import ClubSection from "@/components/ClubSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen font-poppins">
      <Navbar />
      <Hero />
      <BookSection />
      <ReviewsSection />
      <ClubSection />
      <PodcastsSection />
      <Footer />
    </div>
  );
};

export default Index;
