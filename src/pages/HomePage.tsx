
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
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

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
  
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);

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
        className="relative min-h-screen bg-background overflow-x-hidden bg-noise flex flex-col"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.15) 100%),
            radial-gradient(at 50% 0%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.2) 75%)
          `,
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Include Header explicitly for the home page */}
        <Header />
        
        {/* Privacy Notice Dialog */}
        <Dialog open={showPrivacyDialog} onOpenChange={setShowPrivacyDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Privacy Policy Update</DialogTitle>
              <DialogDescription>
                We've updated our privacy policy to better protect your data and improve your experience.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground mb-2">
                Our privacy policy outlines how we collect, use, and protect your personal information. 
                Your privacy is important to us, and we're committed to being transparent about our practices.
              </p>
              <Link to="/privacy" className="text-primary hover:underline text-sm">
                Read the full privacy policy
              </Link>
            </div>
            <DialogFooter className="flex sm:justify-between">
              <Button 
                variant="outline" 
                onClick={() => setShowPrivacyDialog(false)}
              >
                Not Now
              </Button>
              <Button 
                onClick={() => {
                  setShowPrivacyDialog(false);
                  setShowPrivacyNotice(false);
                }}
              >
                Accept
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {showPrivacyNotice && (
          <div className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center justify-between flex-wrap">
                <div className="flex-1 flex items-center">
                  <p className="text-sm text-gray-300">
                    <span className="font-medium text-white">Privacy Update:</span>
                    {" "}We've updated our privacy policy to better protect your data.
                    {" "}
                    <button
                      onClick={() => setShowPrivacyDialog(true)}
                      className="text-white underline hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                      Learn more
                    </button>
                  </p>
                </div>
                <button
                  onClick={() => setShowPrivacyNotice(false)}
                  className="flex-shrink-0 ml-4 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 p-1 rounded"
                  aria-label="Close privacy notice"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
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
    </ScrollArea>
  );
};

const HomePage = () => (
  <PageErrorBoundary>
    <Index />
  </PageErrorBoundary>
);

export default HomePage;
