
import React from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { Container } from '@/components/ui/universal/Container';
import { PricingHeader } from '@/components/pricing/PricingHeader';
import { PricingPlansSection } from '@/components/pricing/PricingPlansSection';
import { EnterpriseSection } from '@/components/pricing/EnterpriseSection';
import { FAQSection } from '@/components/pricing/FAQSection';
import { pricingPlans, faqItems } from '@/components/pricing/pricingData';

const PricingPage: React.FC = () => {
  return (
    <ExternalPageLayout title="Pricing" description="Flexible pricing plans for federal, state, and local acquisition teams.">
      <Container className="py-16">
        <PricingHeader 
          title="Simple, Transparent Pricing"
          description="Choose the perfect plan for your organization's acquisition needs. Scale as you grow with no hidden fees."
        />
        
        <PricingPlansSection plans={pricingPlans} />
        
        <EnterpriseSection />
        
        <FAQSection faqItems={faqItems} />
      </Container>
    </ExternalPageLayout>
  );
};

export default PricingPage;
