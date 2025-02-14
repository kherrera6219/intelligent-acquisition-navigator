
import { GradientText } from "@/components/ui/universal/GradientText";
import { GlassCard } from "@/components/ui/universal/GlassCard";
import { GradientButton } from "@/components/ui/universal/GradientButton";
import { Brain, Shield, Zap, BarChart } from "lucide-react";

const features = [
  {
    title: "AI-Powered Analysis",
    description: "Leverage advanced AI to streamline your acquisition workflow with intelligent automation.",
    icon: Brain,
  },
  {
    title: "Real-Time Compliance",
    description: "Stay compliant with automated monitoring and instant regulatory updates.",
    icon: Shield,
  },
  {
    title: "Lightning-Fast Processing",
    description: "Process and analyze complex data in seconds, not hours.",
    icon: Zap,
  },
  {
    title: "Advanced Analytics",
    description: "Make data-driven decisions with comprehensive analytics and reporting.",
    icon: BarChart,
  }
];

const Features = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <GradientText>Powerful Features for Modern Acquisition</GradientText>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our platform combines cutting-edge AI with deep acquisition expertise to deliver unmatched capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <GlassCard 
              key={index}
              clickable
            >
              <div className="h-12 w-12 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 
                             rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 
                             transition-transform duration-300">
                <feature.icon className="h-6 w-6 text-fuchsia-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </GlassCard>
          ))}
        </div>

        <div className="mt-16 text-center">
          <GradientButton size="lg">
            Get Started Now
          </GradientButton>
        </div>
      </div>
    </div>
  );
};

export default Features;
