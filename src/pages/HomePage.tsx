
import { Suspense } from "react";
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";
import { useHomePageInit } from "@/hooks/useHomePageInit";
import { HomePageError } from "@/components/landing/HomePageError";
import { HomePageLoading } from "@/components/landing/HomePageLoading";
import { HomePageContent } from "@/components/landing/HomePageContent";
import { MainLayout } from "@/components/layout/MainLayout";

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
  
  if (error) {
    return <HomePageError error={error} />;
  }

  if (!isLoaded) {
    return <HomePageLoading />;
  }

  return (
    <HomePageContent 
      showPrivacyNotice={showPrivacyNotice}
      setShowPrivacyNotice={setShowPrivacyNotice}
      showBackToTop={showBackToTop}
      isFirstVisit={isFirstVisit}
      scrollToTop={scrollToTop}
    />
  );
};

const HomePage = () => (
  <PageErrorBoundary>
    <MainLayout 
      showHeader={true} 
      showFooter={true} 
      variant="default"
      className="ms-motion-fadeIn"
    >
      <Index />
    </MainLayout>
  </PageErrorBoundary>
);

export default HomePage;
