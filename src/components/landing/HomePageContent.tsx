
import React from 'react';
import { Helmet } from 'react-helmet';
import { PrivacyNotice } from './PrivacyNotice';
import { BackToTopButton } from '@/components/ui/navigation/BackToTopButton';
import { HelpButton } from '@/components/ui/navigation/HelpButton';
import { HeroSection } from './HeroSection';
import { HomeFeatures } from './HomeFeatures';
import { HomeCta } from './HomeCta';
import { CTASection } from './CTASection';
import { TestimonialsSection } from './TestimonialsSection';
import { FeaturesSection } from './FeaturesSection';
import { ComparisonTable } from '@/components/features/ComparisonTable';

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
        <section id="hero" className="w-full">
          <HeroSection />
        </section>

        {/* Features Highlight Section */}
        <section id="features-highlight" className="w-full py-16 md:py-24">
          <FeaturesSection />
        </section>

        {/* Main Features Grid */}
        <section id="features" className="w-full">
          <HomeFeatures />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-16 md:py-20">
          <TestimonialsSection />
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="w-full py-16 md:py-20 bg-[#1A1F2C]/80">
          <div className="container mx-auto px-4">
            <ComparisonTable />
          </div>
        </section>

        {/* First CTA Section */}
        <section id="cta" className="w-full">
          <HomeCta />
        </section>

        {/* Final CTA Section */}
        <section id="additional-cta" className="w-full">
          <CTASection />
        </section>

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
