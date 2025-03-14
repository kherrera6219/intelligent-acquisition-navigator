
import React from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { Container } from '@/components/ui/universal/Container';
import { PricingHeader } from '@/components/pricing/PricingHeader';
import { PricingPlansSection } from '@/components/pricing/PricingPlansSection';
import { EnterpriseSection } from '@/components/pricing/EnterpriseSection';
import { TestimonialsSection } from '@/components/pricing/TestimonialsSection';
import { FAQSection } from '@/components/pricing/FAQSection';
import { PricingCta } from '@/components/pricing/PricingCta';
import { pricingPlans, faqItems, testimonials } from '@/components/pricing/pricingData';

const PricingPage: React.FC = () => {
  return (
    <ExternalPageLayout title="Pricing" description="Flexible pricing plans for federal, state, and local acquisition teams.">
      <div className="py-16 w-full bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800">
        <Container>
          <PricingHeader 
            title="Simple, Transparent Pricing"
            description="Choose the perfect plan for your organization's acquisition needs. Scale as you grow with no hidden fees."
          />
        </Container>
      </div>
      
      <div className="py-12 bg-gray-800">
        <Container>
          <PricingPlansSection plans={pricingPlans} />
        </Container>
      </div>
      
      <div className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <Container>
          <EnterpriseSection />
        </Container>
      </div>
      
      <div className="py-20 bg-gray-900">
        <Container>
          <TestimonialsSection testimonials={testimonials} />
        </Container>
      </div>
      
      <div className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <Container>
          <FAQSection faqItems={faqItems} />
        </Container>
      </div>
      
      <div className="py-16 bg-gray-800">
        <Container>
          <PricingCta />
        </Container>
      </div>
    </ExternalPageLayout>
  );
};

export default PricingPage;
