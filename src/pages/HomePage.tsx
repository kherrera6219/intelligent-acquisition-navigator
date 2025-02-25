
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

const Index = () => {
  const {
    showPrivacyNotice,
    setShowPrivacyNotice,
    isLoaded,
    showBackToTop,
    isFirstVisit,
    scrollToTop
  } = useHomePageInit();

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
