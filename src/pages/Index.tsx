import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Categories from "@/components/Categories";
import FeaturedListings from "@/components/FeaturedListings";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <Categories />
        <FeaturedListings />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
