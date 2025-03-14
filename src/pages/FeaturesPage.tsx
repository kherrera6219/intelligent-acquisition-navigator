
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
      <Container className="py-16">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Feature Tabs */}
        <FeatureTabs />
        
        {/* Feature Comparison */}
        <ComparisonTable />
        
        {/* CTA Section */}
        <CtaSection />
      </Container>
    </ExternalPageLayout>
  );
}
