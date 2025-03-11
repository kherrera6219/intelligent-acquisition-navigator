
import { Suspense } from "react";
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";
import { useHomePageInit } from "@/hooks/useHomePageInit";
import { HomePageError } from "@/components/landing/HomePageError";
import { HomePageLoading } from "@/components/landing/HomePageLoading";
import { HomePageContent } from "@/components/landing/HomePageContent";
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
  
  if (error) {
    return <HomePageError error={error} />;
  }

  if (!isLoaded) {
    return <HomePageLoading />;
  }

  return (
    <PageErrorBoundary>
      <MsFluentDashboardLayout
        title="ProcurityIQ Dashboard"
        description="Advanced procurement intelligence platform that streamlines acquisition processes across federal, state, and local levels."
        fullWidth={true}
      >
        <div className="ms-motion-fadeIn">
          <HomePageContent 
            showPrivacyNotice={showPrivacyNotice}
            setShowPrivacyNotice={setShowPrivacyNotice}
            showBackToTop={showBackToTop}
            isFirstVisit={isFirstVisit}
            scrollToTop={scrollToTop}
          />
        </div>
      </MsFluentDashboardLayout>
    </PageErrorBoundary>
  );
};

export default HomePage;
