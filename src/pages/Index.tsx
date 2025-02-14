
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { GradientText } from "@/components/ui/universal/GradientText";
import { GlassCard } from "@/components/ui/universal/GlassCard";
import { GradientButton } from "@/components/ui/universal/GradientButton";
import { useToast } from "@/hooks/use-toast";
import { Shield, BarChart2, FileText, Users } from "lucide-react";
import CookieConsent from "@/components/CookieConsent";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(true);

  const handleDemoRequest = () => {
    toast({
      title: "Demo Request Received",
      description: "Our team will contact you shortly to schedule a demo.",
    });
  };

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

  const testimonials = [
    {
      quote: "ProcurityIQ has revolutionized our acquisition process, saving us countless hours while ensuring compliance at every step.",
      author: "Alice Brown",
      role: "Contracting Officer"
    },
    {
      quote: "The AI-powered insights have dramatically improved our market research efficiency and accuracy.",
      author: "James Wilson",
      role: "Program Manager"
    },
    {
      quote: "Outstanding compliance tracking and documentation management capabilities.",
      author: "Sarah Chen",
      role: "Procurement Analyst"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {showPrivacyNotice && (
        <div className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between flex-wrap">
              <div className="flex-1 flex items-center">
                <p className="text-sm text-gray-300">
                  <span className="font-medium text-white">Privacy Update:</span>
                  {" "}We've updated our privacy policy to better protect your data.
                  {" "}
                  <button
                    onClick={() => navigate("/privacy")}
                    className="text-white underline hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    Learn more
                  </button>
                </p>
              </div>
              <button
                onClick={() => setShowPrivacyNotice(false)}
                className="flex-shrink-0 ml-4 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 p-1 rounded"
                aria-label="Close privacy notice"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32" aria-labelledby="hero-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 id="hero-title" className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
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
                aria-label="Get started with ProcurityIQ"
              >
                Get Started
              </GradientButton>
              <GradientButton
                onClick={handleDemoRequest}
                gradientVariant="secondary"
                size="lg"
                aria-label="Request a demo of ProcurityIQ"
              >
                Request Demo
              </GradientButton>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* Testimonials Section */}
      <section className="py-24" aria-labelledby="testimonials-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="testimonials-title" className="text-3xl font-bold text-white mb-4">
              Trusted by Federal Agencies
            </h2>
            <p className="text-xl text-gray-400">
              See how ProcurityIQ is transforming federal acquisition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <GlassCard key={i}>
                <p className="text-gray-400 mb-4">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 
                                 rounded-full flex items-center justify-center">
                    <span className="text-fuchsia-400 font-semibold">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black/40" aria-labelledby="cta-title">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 id="cta-title" className="text-3xl font-bold text-white mb-4">
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
              aria-label="Start free trial of ProcurityIQ"
            >
              Start Free Trial
            </GradientButton>
            <GradientButton
              onClick={handleDemoRequest}
              gradientVariant="secondary"
              size="lg"
              aria-label="Schedule a demo of ProcurityIQ"
            >
              Schedule Demo
            </GradientButton>
          </div>
        </div>
      </section>

      <CookieConsent />
    </div>
  );
};

export default Index;
