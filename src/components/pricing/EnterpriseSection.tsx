
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EnterpriseFeatureList } from './EnterpriseFeatureList';
import { EnterpriseCompliance } from './EnterpriseCompliance';

export const EnterpriseSection: React.FC = () => {
  const enterpriseFeatures = [
    "Custom integrations with existing systems",
    "Dedicated account management",
    "Tailored training and onboarding",
    "Custom SLAs and support options"
  ];

  const complianceItems = [
    {
      title: "FedRAMP Compliance",
      description: "Our platform is FedRAMP authorized, ensuring the highest level of security and compliance for federal agencies."
    },
    {
      title: "Special Agency Pricing",
      description: "We offer special pricing for government agencies through various contract vehicles including GSA Schedule 70."
    }
  ];

  const tooltipText = "These plans include unlimited users, priority support, and customized training";

  return (
    <div className="mt-20">
      <Card className="p-8 bg-gray-800 border-gray-700 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Enterprise Custom Solutions</h2>
            <p className="text-gray-400 mb-6">
              Need a tailored solution for your agency's specific acquisition challenges? Our team will work with you to create a custom plan that meets your exact requirements.
            </p>
            
            <EnterpriseFeatureList features={enterpriseFeatures} />
            
            <Button className="bg-blue-600 hover:bg-blue-700">
              Contact Our Sales Team
            </Button>
          </div>
          
          <EnterpriseCompliance 
            items={complianceItems} 
            tooltipText={tooltipText}
          />
        </div>
      </Card>
    </div>
  );
};
