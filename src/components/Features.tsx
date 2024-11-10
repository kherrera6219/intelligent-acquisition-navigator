import { Card } from "@/components/ui/card";
import { Brain, Shield, Zap, BarChart } from "lucide-react";

const features = [
  {
    title: "AI-Powered Insights",
    description: "Leverage advanced AI to extract actionable insights from your acquisition data.",
    icon: Brain,
  },
  {
    title: "Real-Time Compliance",
    description: "Stay compliant with automated monitoring and instant regulatory updates.",
    icon: Shield,
  },
  {
    title: "Lightning-Fast Processing",
    description: "Process and analyze complex acquisition data in seconds, not hours.",
    icon: Zap,
  },
  {
    title: "Advanced Analytics",
    description: "Make data-driven decisions with comprehensive analytics and reporting.",
    icon: BarChart,
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Powerful Features for Modern Acquisition
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines cutting-edge AI with deep acquisition expertise to deliver unmatched capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;