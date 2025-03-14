
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Plus, HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface PricingFeature {
  text: string;
  included: boolean;
  tooltip?: string;
}

export interface PricingPlanProps {
  name: string;
  price: string;
  billing: string;
  description: string;
  features: PricingFeature[];
  popular?: boolean;
  ctaText: string;
}

export const PricingPlanCard: React.FC<PricingPlanProps> = ({
  name,
  price,
  billing,
  description,
  features,
  popular = false,
  ctaText,
}) => {
  return (
    <Card 
      className={`relative p-8 border bg-gray-800 border-gray-700 flex flex-col h-full ${
        popular ? 'border-blue-500 shadow-lg shadow-blue-900/20' : ''
      }`}
    >
      {popular && (
        <div className="absolute top-0 right-8 -translate-y-1/2">
          <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
        <div className="flex items-baseline mb-2">
          <span className="text-4xl font-bold text-white">${price}</span>
          <span className="text-sm text-gray-400 ml-2">{billing}</span>
        </div>
        <p className="text-gray-400">{description}</p>
      </div>
      
      <div className="border-t border-gray-700 my-6 pt-6">
        <ul className="space-y-4 mb-8 flex-grow">
          {features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start">
              {feature.included ? (
                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              ) : (
                <Plus className="h-5 w-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
              )}
              <span className={feature.included ? "text-gray-300" : "text-gray-500"}>
                {feature.text}
                {feature.tooltip && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 inline-block ml-1 opacity-70 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{feature.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
      
      <Button 
        className={`w-full ${
          popular 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-gray-700 hover:bg-gray-600 text-white'
        }`}
      >
        {ctaText}
      </Button>
    </Card>
  );
};
