
import React from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { Container } from '@/components/ui/universal/Container';
import { HeroSection } from '@/components/features/HeroSection';
import { FeatureTabs } from '@/components/features/FeatureTabs';
import { ComparisonTable } from '@/components/features/ComparisonTable';
import { CtaSection } from '@/components/features/CtaSection';
import { FeaturesGrid } from '@/components/features/FeaturesGrid';
import { Testimonials } from '@/components/features/Testimonials';
import { Helmet } from 'react-helmet';

export default function FeaturesPage() {
  return (
    <ExternalPageLayout 
      showHeader={true}
      showFooter={true}
    >
      <Helmet>
        <title>Features | ProcurityIQ</title>
        <meta name="description" content="Explore the comprehensive features of our AI-powered acquisition management platform." />
      </Helmet>
      
      <Container className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Feature Tabs */}
        <div className="mt-16">
          <FeatureTabs />
        </div>
        
        {/* Features Grid */}
        <div className="mt-24">
          <FeaturesGrid />
        </div>
        
        {/* Feature Comparison */}
        <div className="mt-24">
          <ComparisonTable />
        </div>
        
        {/* Testimonials */}
        <div className="mt-24">
          <Testimonials />
        </div>
        
        {/* CTA Section */}
        <div className="mt-24 mb-12">
          <CtaSection />
        </div>
      </Container>
    </ExternalPageLayout>
  );
}
