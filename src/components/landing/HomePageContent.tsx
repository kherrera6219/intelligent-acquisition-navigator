
import React from 'react';
import { Helmet } from 'react-helmet';
import { PrivacyNotice } from './PrivacyNotice';
import { BackToTopButton } from '@/components/ui/navigation/BackToTopButton';
import { HelpButton } from '@/components/ui/navigation/HelpButton';
import { HomeHero } from './HomeHero';
import { HomeFeatures } from './HomeFeatures';
import { HomeCta } from './HomeCta';
import { CTASection } from './CTASection';

interface HomePageContentProps {
  showPrivacyNotice: boolean;
  setShowPrivacyNotice: (show: boolean) => void;
  showBackToTop: boolean;
  isFirstVisit: boolean;
  scrollToTop: () => void;
}

export const HomePageContent: React.FC<HomePageContentProps> = ({
  showPrivacyNotice,
  setShowPrivacyNotice,
  showBackToTop,
  isFirstVisit,
  scrollToTop,
}) => {
  return (
    <>
      <Helmet>
        <title>ProcurityIQ | Intelligent Acquisition Platform</title>
        <meta name="description" content="Streamline procurement processes across federal, state, and local levels with AI-powered insights and compliance automation." />
      </Helmet>
      
      <div className="flex flex-col w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800">
        {/* Hero Section */}
        <HomeHero />

        {/* Features Section */}
        <HomeFeatures />

        {/* CTA Section */}
        <HomeCta />

        {/* Additional CTA Section with more details */}
        <CTASection />

        {/* Privacy Notice */}
        {showPrivacyNotice && (
          <PrivacyNotice
            onLearnMore={() => console.log('Learn more clicked')}
            onClose={() => setShowPrivacyNotice(false)}
          />
        )}

        {/* Navigation Controls */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
          {showBackToTop && <BackToTopButton onClick={scrollToTop} visible={showBackToTop} />}
          <HelpButton />
        </div>
      </div>
    </>
  );
};
