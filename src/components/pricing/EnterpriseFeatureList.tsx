
import React from 'react';
import { Check } from 'lucide-react';

interface EnterpriseFeatureProps {
  features: string[];
}

export const EnterpriseFeatureList: React.FC<EnterpriseFeatureProps> = ({ 
  features 
}) => {
  return (
    <ul className="space-y-2 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <Check className="h-5 w-5 text-green-500 mr-2" />
          <span className="text-gray-300">{feature}</span>
        </li>
      ))}
    </ul>
  );
};
