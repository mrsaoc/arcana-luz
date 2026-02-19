import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ActivityGallery from "@/components/ActivityGallery";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing.tsx";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ActivityGallery />
        <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
