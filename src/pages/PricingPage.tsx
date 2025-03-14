import React from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { Container } from '@/components/ui/universal/Container';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Plus, AlertCircle, HelpCircle, InfoIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PricingPlan {
  name: string;
  price: string;
  billing: string;
  description: string;
  features: Array<{
    text: string;
    included: boolean;
    tooltip?: string;
  }>;
  popular?: boolean;
  ctaText: string;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "49",
    billing: "per user / month",
    description: "Perfect for small teams getting started with acquisition management",
    features: [
      { text: "Up to 5 team members", included: true },
      { text: "Basic knowledge base access", included: true },
      { text: "Limited compliance checks", included: true },
      { text: "Standard email support", included: true },
      { text: "Core features access", included: true },
      { text: "Basic reporting", included: true },
      { text: "Advanced AI analysis", included: false, tooltip: "Available in Professional and Enterprise plans" },
      { text: "Custom workflows", included: false },
      { text: "API access", included: false },
    ],
    ctaText: "Start 14-Day Free Trial"
  },
  {
    name: "Professional",
    price: "99",
    billing: "per user / month",
    description: "Ideal for growing organizations with complex acquisition needs",
    features: [
      { text: "Up to 20 team members", included: true },
      { text: "Full knowledge base access", included: true },
      { text: "Advanced compliance checks", included: true },
      { text: "Priority support", included: true },
      { text: "All core features", included: true },
      { text: "Advanced reporting", included: true },
      { text: "Advanced AI analysis", included: true },
      { text: "Custom workflows", included: true },
      { text: "API access", included: false, tooltip: "Available in Enterprise plan only" },
    ],
    popular: true,
    ctaText: "Start 14-Day Free Trial"
  },
  {
    name: "Enterprise",
    price: "249",
    billing: "per user / month",
    description: "For large organizations with complex, mission-critical requirements",
    features: [
      { text: "Unlimited team members", included: true },
      { text: "Full knowledge base access", included: true },
      { text: "Comprehensive compliance suite", included: true },
      { text: "24/7 premium support", included: true },
      { text: "All features included", included: true },
      { text: "Custom reporting", included: true },
      { text: "Advanced AI & ML capabilities", included: true },
      { text: "Advanced security controls", included: true },
      { text: "Full API access", included: true },
    ],
    ctaText: "Contact Sales"
  }
];

const PricingPage: React.FC = () => {
  return (
    <ExternalPageLayout title="Pricing" description="Flexible pricing plans for federal, state, and local acquisition teams.">
      <Container className="py-16">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-blue-400 border-blue-400">Pricing</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the perfect plan for your organization's acquisition needs. Scale as you grow with no hidden fees.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative p-8 border bg-gray-800 border-gray-700 flex flex-col h-full ${
                plan.popular ? 'border-blue-500 shadow-lg shadow-blue-900/20' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-sm text-gray-400 ml-2">{plan.billing}</span>
                </div>
                <p className="text-gray-400">{plan.description}</p>
              </div>
              
              <div className="border-t border-gray-700 my-6 pt-6">
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
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
                                <HelpCircle className="h-4 w-4 inline-block ml-1 opacity-70" />
                              </TooltipTrigger>
                              <TooltipContent className="bg-gray-700 text-white border-gray-600">
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
                  plan.popular 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                {plan.ctaText}
              </Button>
            </Card>
          ))}
        </div>
        
        <div className="mt-20">
          <Card className="p-8 bg-gray-800 border-gray-700 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Enterprise Custom Solutions</h2>
                <p className="text-gray-400 mb-6">
                  Need a tailored solution for your agency's specific acquisition challenges? Our team will work with you to create a custom plan that meets your exact requirements.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-300">Custom integrations with existing systems</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-300">Dedicated account management</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-300">Tailored training and onboarding</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-300">Custom SLAs and support options</span>
                  </li>
                </ul>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Contact Our Sales Team
                </Button>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <div className="flex items-start mb-4">
                  <AlertCircle className="h-6 w-6 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">FedRAMP Compliance</h3>
                    <p className="text-gray-400">
                      Our platform is FedRAMP authorized, ensuring the highest level of security and compliance for federal agencies.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <AlertCircle className="h-6 w-6 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Special Agency Pricing</h3>
                    <p className="text-gray-400">
                      We offer special pricing for government agencies through various contract vehicles including GSA Schedule 70.
                    </p>
                  </div>
                </div>
                <Tooltip 
                  content="These plans include unlimited users, priority support, and customized training"
                >
                  <div className="flex items-center">
                    <InfoIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Enterprise plans include additional benefits</span>
                  </div>
                </Tooltip>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 bg-gray-800 border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">Can I change plans later?</h3>
              <p className="text-gray-400">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.
              </p>
            </Card>
            <Card className="p-6 bg-gray-800 border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">Is there a free trial?</h3>
              <p className="text-gray-400">
                Yes, we offer a 14-day free trial for all plans. No credit card required to get started.
              </p>
            </Card>
            <Card className="p-6 bg-gray-800 border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-400">
                We accept all major credit cards, purchase orders, and can work with government payment systems.
              </p>
            </Card>
            <Card className="p-6 bg-gray-800 border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">Do you offer discounts?</h3>
              <p className="text-gray-400">
                We offer discounts for annual billing and special pricing for educational institutions and non-profits.
              </p>
            </Card>
          </div>
        </div>
      </Container>
    </ExternalPageLayout>
  );
};

export default PricingPage;
