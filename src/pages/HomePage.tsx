
import { Suspense } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";
import { useHomePageInit } from "@/hooks/useHomePageInit";
import { HomePageError } from "@/components/landing/HomePageError";
import { HomePageLoading } from "@/components/landing/HomePageLoading";
import { HomePageContent } from "@/components/landing/HomePageContent";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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
    <div className="min-h-screen flex flex-col">
      <Header />
      <ScrollArea className="flex-1 h-full w-full overflow-hidden">
        <HomePageContent 
          showPrivacyNotice={showPrivacyNotice}
          setShowPrivacyNotice={setShowPrivacyNotice}
          showBackToTop={showBackToTop}
          isFirstVisit={isFirstVisit}
          scrollToTop={scrollToTop}
        />
      </ScrollArea>
      <Footer />
    </div>
  );
};

const HomePage = () => (
  <PageErrorBoundary>
    <Index />
  </PageErrorBoundary>
);

export default HomePage;
