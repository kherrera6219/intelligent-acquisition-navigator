
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Benefits from "@/components/Benefits";
import RequestDemo from "@/components/RequestDemo";
import { ReasoningSection } from "@/components/sections/ReasoningSection";
import { TechnologyStackSection } from "@/components/sections/TechnologyStackSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navigation />
      <Hero />
      <ReasoningSection />
      <TechnologyStackSection />
      <Features />
      <Benefits />
      <RequestDemo />
    </div>
  );
};

export default Index;
