
import { Shield, BarChart2, FileText, Users } from "lucide-react";
import { GlassCard } from "@/components/ui/universal/GlassCard";

const features = [
  {
    icon: Shield,
    title: "Compliance Automation",
    description: "Automatically check FAR/DFARS compliance and maintain audit trails"
  },
  {
    icon: BarChart2,
    title: "Market Intelligence",
    description: "Real-time market analysis and vendor performance tracking"
  },
  {
    icon: FileText,
    title: "Document Management",
    description: "Centralized repository with version control and collaboration tools"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Streamlined workflows with role-based access and approvals"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-black/40" aria-labelledby="features-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="features-title" className="text-3xl font-bold text-white mb-4">
            Transform Your Acquisition Process
          </h2>
          <p className="text-xl text-gray-400">
            Powerful features designed for federal acquisition professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <GlassCard key={index} clickable>
              <div className="h-12 w-12 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 
                           rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-fuchsia-400" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
