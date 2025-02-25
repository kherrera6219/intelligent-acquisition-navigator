
import { useState, useEffect, Suspense, lazy } from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection"; 
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CTASection } from "@/components/landing/CTASection";
import { PrivacyNotice } from "@/components/landing/PrivacyNotice";
import CookieConsent from "@/components/CookieConsent";
import { Button } from "@/components/ui/button";
import { ArrowUp, HelpCircle, RefreshCcw } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";
import { Tooltip } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

// Section error boundary component
const SectionErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);
  const { toast } = useToast();

  if (hasError) {
    return (
      <div className="p-6 text-center bg-red-500/10 rounded-lg" role="alert">
        <p className="text-red-500 mb-4">Failed to load this section</p>
        <Button 
          variant="outline"
          onClick={() => setHasError(false)}
          className="gap-2"
        >
          <RefreshCcw className="h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  return children;
};

// Section loading component
const SectionLoader = () => (
  <div className="w-full min-h-[200px] flex items-center justify-center bg-gradient-to-br from-gray-900/50 via-black/50 to-gray-900/50 backdrop-blur-sm animate-pulse">
    <LoadingSpinner size="md" />
  </div>
);

const Index = () => {
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    console.log("Homepage mounting...");
    
    try {
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

      // Set loaded state after initializations
      setIsLoaded(true);
      console.log("Setting isLoaded to true");

      return () => {
        clearTimeout(scrollTimeout);
        window.removeEventListener('scroll', handleScroll);
      };
    } catch (error) {
      console.error("Error in homepage initialization:", error);
      toast({
        title: "Error initializing page",
        description: "Please refresh the page to try again",
        variant: "destructive",
      });
      setIsLoaded(true); // Ensure page loads even if there's an error
    }
  }, [toast]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Skip link for accessibility
  const skipToMain = () => {
    const main = document.querySelector('main');
    if (main) {
      main.focus();
    }
  };

  console.log("Current loading state:", isLoaded);

  if (!isLoaded) {
    console.log("Rendering loading spinner...");
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

  console.log("Rendering full homepage content...");
  return (
    <ScrollArea className="min-h-screen">
      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        onClick={skipToMain}
      >
        Skip to main content
      </a>

      <div 
        className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900"
        role="main"
      >
        {showPrivacyNotice && (
          <PrivacyNotice onClose={() => setShowPrivacyNotice(false)} />
        )}
        
        <main id="main-content" tabIndex={-1} className="relative">
          <SectionErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <HeroSection />
            </Suspense>
          </SectionErrorBoundary>

          <SectionErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <FeaturesSection />
            </Suspense>
          </SectionErrorBoundary>

          <SectionErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <TestimonialsSection />
            </Suspense>
          </SectionErrorBoundary>

          <SectionErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <CTASection />
            </Suspense>
          </SectionErrorBoundary>
        </main>

        {/* Help Button */}
        <div className="fixed bottom-24 right-4 z-50 animate-fade-in">
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
          <div className="fixed bottom-8 right-4 z-50 animate-fade-in">
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
