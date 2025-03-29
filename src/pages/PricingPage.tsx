
import React from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { Container } from '@/components/ui/universal/Container';
import { PricingPlans } from '@/components/pricing/PricingPlans';
import { PricingFaq } from '@/components/pricing/PricingFaq';
import { PricingCta } from '@/components/pricing/PricingCta';
import { PricingComparison } from '@/components/pricing/PricingComparison';
import { Helmet } from 'react-helmet';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';

export default function PricingPage() {
  return (
    <ExternalPageLayout
      showHeader={true}
      showFooter={true}
    >
      <Helmet>
        <title>Pricing | ProcurityIQ</title>
        <meta name="description" content="Explore our flexible pricing plans designed for government agencies of all sizes." />
      </Helmet>
      
      <Container className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Transparent <MsGradientText>Pricing</MsGradientText></h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Flexible plans designed to accommodate the needs of government agencies of all sizes.
          </p>
        </div>
        
        {/* Pricing Plans */}
        <div className="mb-24">
          <PricingPlans />
        </div>
        
        {/* Pricing Comparison */}
        <div className="mb-24">
          <PricingComparison />
        </div>
        
        {/* FAQ Section */}
        <div className="mb-24">
          <PricingFaq />
        </div>
        
        {/* CTA Section */}
        <div className="mb-12">
          <PricingCta />
        </div>
      </Container>
    </ExternalPageLayout>
  );
}
