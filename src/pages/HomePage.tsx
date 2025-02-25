
import { Suspense } from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection"; 
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CTASection } from "@/components/landing/CTASection";
import { PrivacyNotice } from "@/components/landing/PrivacyNotice";
import CookieConsent from "@/components/CookieConsent";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";
import { SectionErrorBoundary } from "@/components/ui/section/SectionErrorBoundary";
import { SectionLoader } from "@/components/ui/section/SectionLoader";
import { BackToTopButton } from "@/components/ui/navigation/BackToTopButton";
import { HelpButton } from "@/components/ui/navigation/HelpButton";
import { FirstVisitGuide } from "@/components/ui/guide/FirstVisitGuide";
import { useHomePageInit } from "@/hooks/useHomePageInit";
import { useToast } from "@/hooks/use-toast";
import { Container } from "@/components/ui/universal/Container";

const Index = () => {
  const {
    showPrivacyNotice,
    setShowPrivacyNotice,
    isLoaded,
    showBackToTop,
    isFirstVisit,
    scrollToTop,
    error
  } = useHomePageInit();

  const { toast } = useToast();

  // Skip link for accessibility
  const skipToMain = () => {
    const main = document.querySelector('main');
    if (main) {
      main.focus();
    }
  };

  // Show error state if initialization failed
  if (error) {
    toast({
      title: "Error loading page",
      description: error.message || "An unexpected error occurred",
      variant: "destructive",
    });

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <Container>
          <div className="glass-card p-8 text-center max-w-md mx-auto animate-fade-in">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Failed to load page</h1>
            <p className="text-gray-400 mb-6">{error.message}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </Container>
      </div>
    );
  }

  // Show loading state during initialization
  if (!isLoaded) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 animate-fade-in" 
        role="progressbar" 
        aria-valuetext="Loading homepage..."
      >
        <LoadingSpinner size="lg" />
      </div>
    );
  }

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
          <div className="space-y-24 animate-fade-in">
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
          </div>
        </main>

        {/* Fixed Position UI Elements */}
        <div className="fixed bottom-8 right-8 space-y-4 z-50">
          <HelpButton />
          <BackToTopButton visible={showBackToTop} onClick={scrollToTop} />
        </div>

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
