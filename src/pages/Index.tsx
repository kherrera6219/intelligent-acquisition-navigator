
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { GradientText } from "@/components/ui/universal/GradientText";
import { GlassCard } from "@/components/ui/universal/GlassCard";
import { GradientButton } from "@/components/ui/universal/GradientButton";
import { useToast } from "@/hooks/use-toast";
import { Shield, BarChart2, FileText, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDemoRequest = () => {
    toast({
      title: "Demo Request Received",
      description: "Our team will contact you shortly to schedule a demo.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-28">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
              <GradientText>Next-Generation</GradientText>
              <br />
              <span className="text-white">
                Acquisition Management
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-10">
              Streamline your procurement process with AI-powered insights and compliance automation.
            </p>
            <div className="flex gap-4 justify-center">
              <GradientButton
                onClick={() => navigate("/signup")}
                size="lg"
                gradientVariant="primary"
              >
                Get Started
              </GradientButton>
              <GradientButton
                onClick={handleDemoRequest}
                gradientVariant="secondary"
                size="lg"
              >
                Request Demo
              </GradientButton>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Transform Your Acquisition Process
            </h2>
            <p className="text-xl text-gray-400">
              Powerful features designed for federal acquisition professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
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
            ].map((feature, index) => (
              <GlassCard key={index} clickable>
                <div className="h-12 w-12 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 
                               rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-fuchsia-400" />
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
      </div>

      {/* Testimonials Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Trusted by Federal Agencies
            </h2>
            <p className="text-xl text-gray-400">
              See how ProcurityIQ is transforming federal acquisition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <GlassCard key={i}>
                <p className="text-gray-400 mb-4">
                  "ProcurityIQ has revolutionized our acquisition process, saving us countless hours
                  while ensuring compliance at every step."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 
                                 rounded-full flex items-center justify-center">
                    <span className="text-fuchsia-400 font-semibold">AB</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">Alice Brown</p>
                    <p className="text-sm text-gray-400">Contracting Officer</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-black/40">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Acquisition Process?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join the leading federal agencies already using ProcurityIQ to streamline their procurement.
          </p>
          <div className="flex gap-4 justify-center">
            <GradientButton
              onClick={() => navigate("/signup")}
              size="lg"
              gradientVariant="primary"
            >
              Start Free Trial
            </GradientButton>
            <GradientButton
              onClick={handleDemoRequest}
              gradientVariant="secondary"
              size="lg"
            >
              Schedule Demo
            </GradientButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
