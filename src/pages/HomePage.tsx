
import React, { Suspense } from "react";
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";
import { useHomePageInit } from "@/hooks/useHomePageInit";
import { HomeError } from "@/components/home/HomeError";
import { HomeLoading } from "@/components/home/HomeLoading";
import { HomeContent } from "@/components/home/HomeContent";
import { MsFluentDashboardLayout } from "@/components/layout/MsFluentDashboardLayout";

const HomePage = () => {
  const {
    showPrivacyNotice,
    setShowPrivacyNotice,
    isLoaded,
    showBackToTop,
    isFirstVisit,
    scrollToTop,
    error
  } = useHomePageInit();
  
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
            <div className="ms-motion-fadeIn">
              <HomeContent 
                showPrivacyNotice={showPrivacyNotice}
                setShowPrivacyNotice={setShowPrivacyNotice}
                showBackToTop={showBackToTop}
                isFirstVisit={isFirstVisit}
                scrollToTop={scrollToTop}
              />
            </div>
          )}
        </Suspense>
      </MsFluentDashboardLayout>
    </PageErrorBoundary>
  );
};

export default HomePage;
