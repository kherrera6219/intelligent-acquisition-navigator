
import { useState, useEffect } from "react";
import { PrivacyNotice } from "@/components/landing/PrivacyNotice";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CTASection } from "@/components/landing/CTASection";
import CookieConsent from "@/components/CookieConsent";
import { Button } from "@/components/ui/button";
import { ArrowUp, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export const Index = () => {
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (hasVisited) {
      setIsFirstVisit(false);
    } else {
      localStorage.setItem('hasVisitedBefore', 'true');
    }

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <ScrollArea className="min-h-screen">
      <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {showPrivacyNotice && (
          <PrivacyNotice onClose={() => setShowPrivacyNotice(false)} />
        )}
        
        <main className="relative">
          {/* Grid Background */}
          <div 
            className="absolute inset-0 bg-[#0000001a]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='nodes' cx='50%25' cy='50%25' r='50%25' fx='50%25' fy='50%25'%3E%3Cstop offset='0%25' style='stop-color:%23FFFFFF;stop-opacity:0.1'/%3E%3Cstop offset='100%25' style='stop-color:%23FFFFFF;stop-opacity:0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cg%3E%3Canimate attributeName='opacity' values='0.5;1;0.5' dur='3s' repeatCount='indefinite'/%3E%3Cpath d='M0 0'%3E%3Canimate attributeName='d' dur='10s' repeatCount='indefinite' values='M0 0 L100 100;M50 50 L150 150;M0 0 L100 100'/%3E%3C/path%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: 'cover',
              animation: 'pulse 4s ease-in-out infinite'
            }}
          />
          
          {/* Content */}
          <div className="relative z-10">
            <HeroSection />
            <FeaturesSection />
            <TestimonialsSection />
            <CTASection />
          </div>

          {/* Animated Knowledge Graph Nodes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        </main>

        {/* Help Button */}
        <div className="fixed bottom-24 right-4 z-50">
          <Tooltip content="Need help? Click to contact support">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-primary/10 backdrop-blur-sm hover:bg-primary/20"
              onClick={() => window.open('/contact', '_blank')}
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
          </Tooltip>
        </div>

        {/* Back to Top Button */}
        {showBackToTop && (
          <div className="fixed bottom-8 right-4 z-50">
            <Tooltip content="Scroll back to top">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-primary/10 backdrop-blur-sm hover:bg-primary/20"
                onClick={scrollToTop}
              >
                <ArrowUp className="h-5 w-5" />
              </Button>
            </Tooltip>
          </div>
        )}

        {/* First Visit Guide */}
        {isFirstVisit && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 p-4 bg-primary/10 backdrop-blur-sm rounded-lg border border-white/10 text-white text-sm animate-fade-in">
            Press '?' for keyboard shortcuts
          </div>
        )}

        <CookieConsent />
      </div>
    </ScrollArea>
  );
};

export default Index;
