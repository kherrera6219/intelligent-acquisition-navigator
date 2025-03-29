
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface PlanFeature {
  text: string;
  available: boolean;
}

interface PricingPlanProps {
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  isPopular?: boolean;
  ctaText: string;
  ctaAction: () => void;
}

const PricingPlan: React.FC<PricingPlanProps> = ({
  name,
  price,
  description,
  features,
  isPopular = false,
  ctaText,
  ctaAction,
}) => {
  return (
    <div 
      className={cn(
        "bg-[#1A1F2C]/80 border rounded-xl overflow-hidden",
        isPopular 
          ? "border-primary relative scale-105 shadow-lg z-10" 
          : "border-border/10"
      )}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 bg-primary px-3 py-1 text-xs font-semibold text-white rounded-bl-lg">
          Most Popular
        </div>
      )}
      
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold">{price}</span>
          {price !== 'Custom' && <span className="text-muted-foreground ml-2">/agency/month</span>}
        </div>
        <p className="text-muted-foreground mb-6">{description}</p>
        
        <Button 
          onClick={ctaAction}
          className={cn(
            "w-full mb-8",
            isPopular
              ? "bg-primary hover:bg-primary/90"
              : "bg-primary/10 hover:bg-primary/20 text-primary"
          )}
        >
          {ctaText}
        </Button>
        
        <div className="space-y-4">
          <p className="font-medium">What's included:</p>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className={cn(
                  "h-5 w-5 mr-2 mt-0.5 flex-shrink-0",
                  feature.available 
                    ? "text-primary" 
                    : "text-muted-foreground opacity-50"
                )} />
                <span className={cn(
                  !feature.available && "text-muted-foreground line-through opacity-70"
                )}>
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const PricingPlans: React.FC = () => {
  const navigate = useNavigate();
  
  const handleStartTrial = () => {
    navigate('/register?plan=trial');
  };
  
  const handleContact = () => {
    navigate('/contact?subject=pricing');
  };
  
  const plans = [
    {
      name: "Starter",
      price: "$499",
      description: "Perfect for small agencies just getting started with digital procurement.",
      isPopular: false,
      ctaText: "Start Free Trial",
      ctaAction: handleStartTrial,
      features: [
        { text: "Up to 10 users", available: true },
        { text: "Basic compliance automation", available: true },
        { text: "Document management", available: true },
        { text: "Standard reports", available: true },
        { text: "Email support", available: true },
        { text: "AI-powered insights", available: false },
        { text: "Custom workflows", available: false },
        { text: "Advanced analytics", available: false },
        { text: "API access", available: false },
        { text: "Dedicated support", available: false }
      ]
    },
    {
      name: "Professional",
      price: "$999",
      description: "Designed for mid-sized agencies with more complex acquisition needs.",
      isPopular: true,
      ctaText: "Start Free Trial",
      ctaAction: handleStartTrial,
      features: [
        { text: "Up to 50 users", available: true },
        { text: "Advanced compliance automation", available: true },
        { text: "Document management & version control", available: true },
        { text: "Custom reports & dashboards", available: true },
        { text: "Priority email & phone support", available: true },
        { text: "AI-powered insights", available: true },
        { text: "Custom workflows (limited)", available: true },
        { text: "Advanced analytics", available: true },
        { text: "API access", available: false },
        { text: "Dedicated support manager", available: false }
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for large government organizations with unique requirements.",
      isPopular: false,
      ctaText: "Contact Sales",
      ctaAction: handleContact,
      features: [
        { text: "Unlimited users", available: true },
        { text: "Complete compliance automation suite", available: true },
        { text: "Advanced document management", available: true },
        { text: "Custom reporting system", available: true },
        { text: "24/7 premium support", available: true },
        { text: "Full AI-powered platform", available: true },
        { text: "Custom workflow automation", available: true },
        { text: "Enterprise analytics & insights", available: true },
        { text: "Full API access & custom integrations", available: true },
        { text: "Dedicated account team", available: true }
      ]
    }
  ];
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8">
        {plans.map((plan, index) => (
          <PricingPlan
            key={index}
            name={plan.name}
            price={plan.price}
            description={plan.description}
            features={plan.features}
            isPopular={plan.isPopular}
            ctaText={plan.ctaText}
            ctaAction={plan.ctaAction}
          />
        ))}
      </div>
      
      <div className="text-center mt-12 text-sm text-muted-foreground">
        <p>All plans include a 14-day free trial. No credit card required.</p>
        <p className="mt-2">
          Looking for a custom solution? <Button variant="link" className="p-0 h-auto font-normal text-primary" onClick={handleContact}>Contact our sales team</Button>.
        </p>
      </div>
    </div>
  );
};
