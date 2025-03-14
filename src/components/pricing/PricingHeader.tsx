
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface PricingHeaderProps {
  title: string;
  description: string;
}

export const PricingHeader: React.FC<PricingHeaderProps> = ({ 
  title, 
  description 
}) => {
  return (
    <div className="text-center mb-16">
      <Badge variant="outline" className="mb-4 px-3 py-1 text-blue-400 border-blue-400">Pricing</Badge>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">{title}</h1>
      <p className="text-xl text-gray-400 max-w-3xl mx-auto">
        {description}
      </p>
    </div>
  );
};
