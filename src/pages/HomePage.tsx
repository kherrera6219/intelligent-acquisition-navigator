
import { useState, useEffect, Suspense } from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection"; 
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CTASection } from "@/components/landing/CTASection";
import { PrivacyNotice } from "@/components/landing/PrivacyNotice";
import CookieConsent from "@/components/CookieConsent";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";
import { useToast } from "@/hooks/use-toast";
import { SectionErrorBoundary } from "@/components/ui/section/SectionErrorBoundary";
import { SectionLoader } from "@/components/ui/section/SectionLoader";
import { BackToTopButton } from "@/components/ui/navigation/BackToTopButton";
import { HelpButton } from "@/components/ui/navigation/HelpButton";
import { FirstVisitGuide } from "@/components/ui/guide/FirstVisitGuide";

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
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 fill-mode-forwards" 
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
        className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 fill-mode-forwards"
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

        <HelpButton />
        <BackToTopButton visible={showBackToTop} onClick={scrollToTop} />
        <FirstVisitGuide visible={isFirstVisit} />
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
