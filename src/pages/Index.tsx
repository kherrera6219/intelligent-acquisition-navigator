
import { Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Benefits from "@/components/Benefits";
import RequestDemo from "@/components/RequestDemo";
import { ReasoningSection } from "@/components/sections/ReasoningSection";
import { TechnologyStackSection } from "@/components/sections/TechnologyStackSection";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900"
      role="main"
      aria-label="Main content"
    >
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <Navigation />
      
      <main id="main-content">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>}>
          <Hero />
          <ReasoningSection />
          <TechnologyStackSection />
          <Features />
          <Benefits />
          <RequestDemo />
        </Suspense>
      </main>

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
};

export default Index;
