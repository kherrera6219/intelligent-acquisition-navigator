
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
import { Card } from "@/components/ui/card";

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Card className="p-8 bg-black/40 backdrop-blur-sm border-white/5">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-primary/60 animate-pulse">Loading ProcurityIQ...</p>
      </div>
    </Card>
  </div>
);

const Index = () => {
  const { toast } = useToast();

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative"
      role="main"
      aria-label="Main content"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid opacity-5" />

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <Navigation />
      
      <main id="main-content" className="relative">
        <Suspense fallback={<LoadingSpinner />}>
          {/* Hero Section */}
          <section className="relative">
            <Hero />
            
            {/* Knowledge Graph Nodes */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(11)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-violet-400/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `pulse ${2 + Math.random() * 2}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </section>

          {/* Core Sections */}
          <div className="space-y-24">
            <ReasoningSection />
            <TechnologyStackSection />
            <Features />
            <Benefits />
            <RequestDemo />
          </div>

          {/* Fixed Action Button */}
          <button 
            onClick={() => toast({
              title: "AI Assistant",
              description: "How can I help you today?",
            })}
            className="fixed bottom-8 right-8 p-4 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            aria-label="Open AI Assistant"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 3.104c-.734.204-1.417.514-2.02.916m-3.73 3.73a8.95 8.95 0 00-.916 2.02M3.104 14.25a8.95 8.95 0 00.916 2.02m3.73 3.73a8.95 8.95 0 002.02.916m4.5-11.216c.734-.204 1.417-.514 2.02-.916m3.73 3.73a8.95 8.95 0 01.916-2.02m0 6c-.204.734-.514 1.417-.916 2.02m-3.73 3.73a8.95 8.95 0 01-2.02.916M6.75 7.364V3h-3v4.364l2.5-1.636zm0 13.272V16h-3v4.636l2.5-1.636zm13.5-13.272V3h-3v4.364l2.5-1.636zm0 13.272V16h-3v4.636l2.5-1.636z"
              />
            </svg>
          </button>
        </Suspense>
      </main>

      {/* Toast notifications with a more enterprise feel */}
      <Toaster />
    </div>
  );
};

export default Index;
