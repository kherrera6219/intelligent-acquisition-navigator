
import React from 'react';
import { PricingPlanCard, PricingFeature } from './PricingPlanCard';

export interface PricingPlan {
  name: string;
  price: string;
  billing: string;
  description: string;
  features: PricingFeature[];
  popular?: boolean;
  ctaText: string;
}

interface PricingPlansSectionProps {
  plans: PricingPlan[];
}

export const PricingPlansSection: React.FC<PricingPlansSectionProps> = ({ plans }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {plans.map((plan, index) => (
        <PricingPlanCard
          key={index}
          name={plan.name}
          price={plan.price}
          billing={plan.billing}
          description={plan.description}
          features={plan.features}
          popular={plan.popular}
          ctaText={plan.ctaText}
        />
      ))}
    </div>
  );
};
