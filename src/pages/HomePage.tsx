
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

  // Skip link for accessibility
  const skipToMain = () => {
    const main = document.querySelector('main');
    if (main) {
      main.focus();
    }
  };

  // Show error state if initialization failed
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1720]">
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
        className="min-h-screen flex items-center justify-center bg-[#1A1720] animate-fade-in" 
        role="progressbar" 
        aria-valuetext="Loading homepage..."
      >
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <ScrollArea className="min-h-screen neo-blur">
      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        onClick={skipToMain}
      >
        Skip to main content
      </a>

      <div 
        className="min-h-screen bg-[#1A1720] relative overflow-hidden"
        role="main"
      >
        {/* Background grid overlay with 3D effect */}
        <div className="absolute inset-0 bg-grid opacity-5 transform-gpu rotate-3d-15"></div>
        
        {showPrivacyNotice && (
          <PrivacyNotice onClose={() => setShowPrivacyNotice(false)} />
        )}
        
        <main id="main-content" tabIndex={-1} className="relative">
          <div className="flex flex-col gap-12 md:gap-24 animate-fade-in">
            <SectionErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <div className="ui-wireframe">
                  <HeroSection />
                </div>
              </Suspense>
            </SectionErrorBoundary>

            <SectionErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <div className="glass-morphism">
                  <FeaturesSection />
                </div>
              </Suspense>
            </SectionErrorBoundary>

            <SectionErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <div className="glass-morphism">
                  <TestimonialsSection />
                </div>
              </Suspense>
            </SectionErrorBoundary>

            <SectionErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <div className="glass-morphism">
                  <CTASection />
                </div>
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
