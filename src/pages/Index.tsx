import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import OnTrack from "@/components/portfolio/OnTrack";
import OffTrack from "@/components/portfolio/OffTrack";
import ModelZoo from "@/components/portfolio/ModelZoo";
import Footer from "@/components/portfolio/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <OnTrack />
      <OffTrack />
      <ModelZoo />
      <Footer />
    </div>
  );
};

export default Index;
