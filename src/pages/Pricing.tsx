
import { Check } from "lucide-react";
import { GradientText } from "@/components/ui/universal/GradientText";
import { GlassCard } from "@/components/ui/universal/GlassCard";
import { GradientButton } from "@/components/ui/universal/GradientButton";

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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <GradientText>Simple, Transparent Pricing</GradientText>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the perfect plan for your team's needs. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <GlassCard 
              key={index}
              highlight={plan.popular}
              className="p-8"
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
              <GradientButton 
                className="w-full"
                gradientVariant={plan.popular ? "primary" : "secondary"}
              >
                Get Started
              </GradientButton>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
