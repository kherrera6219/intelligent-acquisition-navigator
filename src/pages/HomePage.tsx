
import React, { Suspense, useState } from "react";
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";
import { useHomePageInit } from "@/hooks/useHomePageInit";
import { HomeError } from "@/components/home/HomeError";
import { HomeLoading } from "@/components/home/HomeLoading";
import { HomeContent } from "@/components/home/HomeContent";
import { MsFluentDashboardLayout } from "@/components/layout/MsFluentDashboardLayout";
import { PrivacyBanner } from "@/components/ui/universal/PrivacyBanner";

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
      <MsFluentDashboardLayout
        title="Intelligent Acquisition Navigator"
        description="Advanced procurement intelligence platform that streamlines acquisition processes across federal, state, and local levels."
        fullWidth={true}
      >
        <Suspense fallback={<HomeLoading />}>
          {error ? (
            <HomeError error={error} />
          ) : !isLoaded ? (
            <HomeLoading />
          ) : (
            <>
              <div className="ms-motion-fadeIn">
                <HomeContent 
                  showBackToTop={showBackToTop}
                  isFirstVisit={isFirstVisit}
                  scrollToTop={scrollToTop}
                  showPrivacyNotice={showPrivacyNotice}
                  setShowPrivacyNotice={setShowPrivacyNotice}
                />
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
      </MsFluentDashboardLayout>
    </PageErrorBoundary>
  );
};

export default HomePage;
