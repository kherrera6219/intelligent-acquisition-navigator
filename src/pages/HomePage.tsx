
import { useState, useEffect } from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CTASection } from "@/components/landing/CTASection";
import { PrivacyNotice } from "@/components/landing/PrivacyNotice";
import CookieConsent from "@/components/CookieConsent";
import { Button } from "@/components/ui/button";
import { ArrowUp, HelpCircle } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";
import { Tooltip } from "@/components/ui/tooltip";

const Index = () => {
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Progressive loading with optimized timing
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // First visit detection with local storage
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (hasVisited) {
      setIsFirstVisit(false);
    } else {
      localStorage.setItem('hasVisitedBefore', 'true');
    }

    // Optimized scroll handler with debounce
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setShowBackToTop(window.scrollY > 400);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isLoaded) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900" 
        role="progressbar" 
        aria-valuetext="Loading homepage..."
      >
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <ScrollArea className="min-h-screen">
      <div 
        className={`min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        role="main"
      >
        {showPrivacyNotice && (
          <PrivacyNotice onClose={() => setShowPrivacyNotice(false)} />
        )}
        
        <main className="relative">
          <HeroSection />
          <FeaturesSection />
          <TestimonialsSection />
          <CTASection />
        </main>

        {/* Help Button */}
        <div className="fixed bottom-24 right-4 z-50">
          <Tooltip content="Need help? Click to contact support">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-primary/10 backdrop-blur-sm hover:bg-primary/20 transition-colors duration-200"
              onClick={() => window.open('/contact', '_blank')}
              aria-label="Get help"
            >
              <HelpCircle className="h-5 w-5" aria-hidden="true" />
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
                className="rounded-full bg-primary/10 backdrop-blur-sm hover:bg-primary/20 transition-colors duration-200"
                onClick={scrollToTop}
                aria-label="Scroll back to top"
              >
                <ArrowUp className="h-5 w-5" aria-hidden="true" />
              </Button>
            </Tooltip>
          </div>
        )}

        {/* First Visit Guide */}
        {isFirstVisit && (
          <div 
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 p-4 bg-primary/10 backdrop-blur-sm rounded-lg border border-white/10 text-white text-sm animate-fade-in"
            role="status"
            aria-live="polite"
          >
            Press '?' for keyboard shortcuts
          </div>
        )}

        <CookieConsent />
      </div>
    </ScrollArea>
  );
};

// Wrap the component with error boundary
const HomePage = () => (
  <PageErrorBoundary>
    <Index />
  </PageErrorBoundary>
);

export default HomePage;
