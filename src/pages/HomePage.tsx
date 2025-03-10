
import { Suspense } from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection"; 
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CTASection } from "@/components/landing/CTASection";
import { PrivacyNotice } from "@/components/landing/PrivacyNotice";
import CookieConsent from "@/components/CookieConsent";
import { LoadingState } from "@/components/ui/universal/LoadingState";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";
import { SectionErrorBoundary } from "@/components/ui/section/SectionErrorBoundary";
import { SectionLoader } from "@/components/ui/section/SectionLoader";
import { BackToTopButton } from "@/components/ui/navigation/BackToTopButton";
import { HelpButton } from "@/components/ui/navigation/HelpButton";
import { FirstVisitGuide } from "@/components/ui/guide/FirstVisitGuide";
import { useHomePageInit } from "@/hooks/useHomePageInit";
import { VerificationBanner } from "@/components/auth/VerificationBanner";

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

  const skipToMain = () => {
    const main = document.querySelector('main');
    if (main) {
      main.focus();
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1720]">
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
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#1A1720] p-4 sm:p-6 lg:p-8 animate-fade-in">
        <LoadingState 
          variant="skeleton" 
          skeletonCount={4}
          skeletonClassName="h-[200px] w-full rounded-xl bg-white/5"
          className="max-w-7xl mx-auto space-y-6"
        />
      </div>
    );
  }

  return (
    <ScrollArea className="min-h-screen neo-blur">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        onClick={skipToMain}
      >
        Skip to main content
      </a>

      <div 
        className="relative min-h-screen bg-background overflow-x-hidden bg-noise"
        role="main"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.15) 100%),
            radial-gradient(at 50% 0%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.2) 75%)
          `,
          backgroundAttachment: 'fixed'
        }}
      >
        {showPrivacyNotice && (
          <PrivacyNotice onClose={() => setShowPrivacyNotice(false)} />
        )}
        
        <VerificationBanner />
        
        <main id="main-content" tabIndex={-1} className="relative w-full">
          <div className="flex flex-col animate-fade-in">
            <SectionErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <HeroSection />
              </Suspense>
            </SectionErrorBoundary>

            <div className="space-y-24 py-24">
              <SectionErrorBoundary>
                <Suspense fallback={<SectionLoader />}>
                  <div className="glass-panel rounded-lg">
                    <FeaturesSection />
                  </div>
                </Suspense>
              </SectionErrorBoundary>

              <SectionErrorBoundary>
                <Suspense fallback={<SectionLoader />}>
                  <div className="glass-panel rounded-lg">
                    <TestimonialsSection />
                  </div>
                </Suspense>
              </SectionErrorBoundary>

              <SectionErrorBoundary>
                <Suspense fallback={<SectionLoader />}>
                  <div className="glass-panel rounded-lg">
                    <CTASection />
                  </div>
                </Suspense>
              </SectionErrorBoundary>
            </div>
          </div>
        </main>

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

const HomePage = () => (
  <PageErrorBoundary>
    <Index />
  </PageErrorBoundary>
);

export default HomePage;
