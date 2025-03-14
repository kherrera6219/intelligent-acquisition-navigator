
import React from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { Container } from '@/components/ui/universal/Container';
import { HeroSection } from '@/components/features/HeroSection';
import { FeatureTabs } from '@/components/features/FeatureTabs';
import { ComparisonTable } from '@/components/features/ComparisonTable';
import { CtaSection } from '@/components/features/CtaSection';

export default function FeaturesPage() {
  return (
    <ExternalPageLayout 
      title="Features"
      description="Explore the comprehensive features of our acquisition knowledge platform."
    >
      <Container className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Feature Tabs */}
        <div className="mt-16">
          <FeatureTabs />
        </div>
        
        {/* Feature Comparison */}
        <div className="mt-24">
          <ComparisonTable />
        </div>
        
        {/* CTA Section */}
        <div className="mt-24 mb-12">
          <CtaSection />
        </div>
      </Container>
    </ExternalPageLayout>
  );
}
