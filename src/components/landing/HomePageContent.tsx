
import { Suspense } from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection"; 
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CTASection } from "@/components/landing/CTASection";
import { SectionErrorBoundary } from "@/components/ui/section/SectionErrorBoundary";
import { SectionLoader } from "@/components/ui/section/SectionLoader";
import { PrivacyDialog } from "./PrivacyDialog";
import { BackToTopButton } from "@/components/ui/navigation/BackToTopButton";
import { HelpButton } from "@/components/ui/navigation/HelpButton";
import { FirstVisitGuide } from "@/components/ui/guide/FirstVisitGuide";
import CookieConsent from "@/components/CookieConsent";
import { PrivacyBanner } from "./PrivacyBanner";
import { useState } from "react";
import { Container } from "@/components/ui/universal/Container";

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

  return (
    <div className="relative w-full h-full flex flex-col">
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
      
      <div className="flex flex-col animate-fade-in">
        <SectionErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <HeroSection />
          </Suspense>
        </SectionErrorBoundary>

        <div className="space-y-24 py-12 md:py-24">
          <Container>
            <SectionErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <div className="fluent-panel rounded-lg p-6 md:p-8">
                  <FeaturesSection />
                </div>
              </Suspense>
            </SectionErrorBoundary>
          </Container>

          <Container>
            <SectionErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <div className="fluent-panel rounded-lg p-6 md:p-8">
                  <TestimonialsSection />
                </div>
              </Suspense>
            </SectionErrorBoundary>
          </Container>

          <Container>
            <SectionErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <div className="fluent-panel rounded-lg p-6 md:p-8">
                  <CTASection />
                </div>
              </Suspense>
            </SectionErrorBoundary>
          </Container>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 space-y-4 z-50">
        <HelpButton />
        <BackToTopButton visible={showBackToTop} onClick={scrollToTop} />
      </div>

      <FirstVisitGuide visible={isFirstVisit} />
      <CookieConsent />
    </div>
  );
};
