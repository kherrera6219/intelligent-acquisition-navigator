
import { Suspense } from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection"; 
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CTASection } from "@/components/landing/CTASection";
import { SectionErrorBoundary } from "@/components/ui/section/SectionErrorBoundary";
import { SectionLoader } from "@/components/ui/section/SectionLoader";
import { PrivacyBanner } from "./PrivacyBanner";
import { PrivacyDialog } from "./PrivacyDialog";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTopButton } from "@/components/ui/navigation/BackToTopButton";
import { HelpButton } from "@/components/ui/navigation/HelpButton";
import { FirstVisitGuide } from "@/components/ui/guide/FirstVisitGuide";
import CookieConsent from "@/components/CookieConsent";
import { VerificationBanner } from "@/components/auth/VerificationBanner";
import { useEffect, useState } from "react";

interface HomePageContentProps {
  showPrivacyNotice: boolean;
  setShowPrivacyNotice: (show: boolean) => void;
  showBackToTop: boolean;
  isFirstVisit: boolean;
  scrollToTop: () => void;
}

export const HomePageContent = ({
  showPrivacyNotice,
  setShowPrivacyNotice,
  showBackToTop,
  isFirstVisit,
  scrollToTop
}: HomePageContentProps) => {
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);

  const skipToMain = () => {
    const main = document.querySelector('main');
    if (main) {
      main.focus();
    }
  };

  return (
    <div 
      className="relative min-h-screen bg-background overflow-x-hidden bg-noise flex flex-col"
      style={{
        backgroundImage: `
          linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.15) 100%),
          radial-gradient(at 50% 0%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.2) 75%)
        `,
        backgroundAttachment: 'fixed'
      }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        onClick={skipToMain}
      >
        Skip to main content
      </a>

      {/* Include Header explicitly for the home page */}
      <Header />
      
      {/* Privacy Notice Dialog */}
      <PrivacyDialog 
        open={showPrivacyDialog}
        onOpenChange={setShowPrivacyDialog}
        onAccept={() => {
          setShowPrivacyDialog(false);
          setShowPrivacyNotice(false);
        }}
      />
      
      {showPrivacyNotice && (
        <PrivacyBanner 
          onLearnMore={() => setShowPrivacyDialog(true)}
          onClose={() => setShowPrivacyNotice(false)}
        />
      )}
      
      <VerificationBanner />
      
      <main id="main-content" tabIndex={-1} className="relative w-full flex-grow">
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

      {/* Add the Footer component */}
      <Footer />

      <div className="fixed bottom-8 right-8 space-y-4 z-50">
        <HelpButton />
        <BackToTopButton visible={showBackToTop} onClick={scrollToTop} />
      </div>

      <FirstVisitGuide visible={isFirstVisit} />
      <CookieConsent />
    </div>
  );
};
