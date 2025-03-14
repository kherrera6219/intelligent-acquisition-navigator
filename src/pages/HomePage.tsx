
import React, { Suspense, useState } from "react";
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";
import { useHomePageInit } from "@/hooks/useHomePageInit";
import { HomeError } from "@/components/home/HomeError";
import { HomeLoading } from "@/components/home/HomeLoading";
import { MainLayout } from "@/components/layout/MainLayout";
import { PrivacyBanner } from "@/components/ui/universal/PrivacyBanner";
import { LandingHero } from "@/components/landing/LandingHero";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CTASection } from "@/components/landing/CTASection";

const HomePage = () => {
  const {
    isLoaded,
    showBackToTop,
    isFirstVisit,
    scrollToTop,
    error
  } = useHomePageInit();
  
  const [showPrivacyNotice, setShowPrivacyNotice] = useState<boolean>(isFirstVisit);
  
  return (
    <PageErrorBoundary>
      <MainLayout 
        variant="fluent" 
        showHeader={true} 
        showFooter={true}
        showPrivacyBanner={false}
        forceExternalHeader={true}
        forceExternalFooter={true}
        className="bg-background"
      >
        <Suspense fallback={<HomeLoading />}>
          {error ? (
            <HomeError error={error} />
          ) : !isLoaded ? (
            <HomeLoading />
          ) : (
            <>
              <div className="animate-in fade-in-50 duration-500">
                <LandingHero />
                <FeaturesSection />
                <TestimonialsSection />
                <CTASection />
              </div>
              
              {showPrivacyNotice && (
                <PrivacyBanner
                  onLearnMore={() => window.open('/privacy', '_blank')}
                  onClose={() => setShowPrivacyNotice(false)}
                  type="standard"
                  position="bottom"
                />
              )}
            </>
          )}
        </Suspense>
      </MainLayout>
    </PageErrorBoundary>
  );
};

export default HomePage;
