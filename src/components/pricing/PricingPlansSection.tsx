
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
  highlighted?: boolean;
}

interface PricingPlansSectionProps {
  plans: PricingPlan[];
}

export const PricingPlansSection: React.FC<PricingPlansSectionProps> = ({ plans }) => {
  return (
    <div>
      <div className="flex justify-center mb-10">
        <div className="bg-gray-900 p-1 rounded-full inline-flex">
          <button className="px-6 py-2 rounded-full bg-blue-600 text-white text-sm font-medium">Monthly</button>
          <button className="px-6 py-2 rounded-full text-gray-300 hover:text-white text-sm font-medium">Annual (Save 20%)</button>
        </div>
      </div>
      
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
            highlighted={plan.highlighted}
          />
        ))}
      </div>
      
      <div className="text-center mt-10 text-gray-400 text-sm">
        All plans include free setup and onboarding assistance. <a href="#" className="text-blue-400 hover:underline">View full feature comparison</a>
      </div>
    </div>
  );
};
