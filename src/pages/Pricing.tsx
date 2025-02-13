
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "49",
    description: "Perfect for small teams getting started",
    features: [
      "Up to 5 team members",
      "Basic AI analysis",
      "Standard support",
      "Core features access",
      "Basic reporting",
    ],
  },
  {
    name: "Professional",
    price: "99",
    description: "Ideal for growing organizations",
    features: [
      "Up to 20 team members",
      "Advanced AI analysis",
      "Priority support",
      "All core features",
      "Advanced reporting",
      "Custom workflows",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "249",
    description: "For large organizations with complex needs",
    features: [
      "Unlimited team members",
      "Full AI capabilities",
      "24/7 premium support",
      "All features included",
      "Custom reporting",
      "Advanced security",
      "API access",
    ],
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent 
                         bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 tracking-tight mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the perfect plan for your team's needs. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`p-8 bg-black/40 backdrop-blur-sm border-white/5 hover:bg-black/60 
                         transition-all duration-300 ${plan.popular ? 'ring-2 ring-fuchsia-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2">
                  <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white 
                                px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-white mb-2">
                  ${plan.price}
                  <span className="text-lg text-gray-400">/month</span>
                </div>
                <p className="text-gray-400">{plan.description}</p>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-fuchsia-400 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${
                  plan.popular
                    ? 'bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                Get Started
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
