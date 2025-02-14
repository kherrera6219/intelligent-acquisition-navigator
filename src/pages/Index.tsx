
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Shield, BarChart2, FileText, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [videoLoaded, setVideoLoaded] = useState(false);

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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
                Next-Generation
              </span>
              <br />
              <span className="text-white">
                Acquisition Management
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-10">
              Streamline your procurement process with AI-powered insights and compliance automation.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => navigate("/signup")}
                className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 
                         hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600"
                size="lg"
              >
                Get Started
              </Button>
              <Button
                onClick={handleDemoRequest}
                variant="outline"
                className="border-white/10"
                size="lg"
              >
                Request Demo
              </Button>
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
            <Card className="p-6 bg-black/40 backdrop-blur-sm border-white/10 hover:bg-white/5 transition-all">
              <div className="h-12 w-12 bg-violet-500/20 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Compliance Automation
              </h3>
              <p className="text-gray-400">
                Automatically check FAR/DFARS compliance and maintain audit trails
              </p>
            </Card>

            <Card className="p-6 bg-black/40 backdrop-blur-sm border-white/10 hover:bg-white/5 transition-all">
              <div className="h-12 w-12 bg-fuchsia-500/20 rounded-lg flex items-center justify-center mb-4">
                <BarChart2 className="h-6 w-6 text-fuchsia-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Market Intelligence
              </h3>
              <p className="text-gray-400">
                Real-time market analysis and vendor performance tracking
              </p>
            </Card>

            <Card className="p-6 bg-black/40 backdrop-blur-sm border-white/10 hover:bg-white/5 transition-all">
              <div className="h-12 w-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-pink-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Document Management
              </h3>
              <p className="text-gray-400">
                Centralized repository with version control and collaboration tools
              </p>
            </Card>

            <Card className="p-6 bg-black/40 backdrop-blur-sm border-white/10 hover:bg-white/5 transition-all">
              <div className="h-12 w-12 bg-violet-500/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Team Collaboration
              </h3>
              <p className="text-gray-400">
                Streamlined workflows with role-based access and approvals
              </p>
            </Card>
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
              <Card key={i} className="p-6 bg-black/40 backdrop-blur-sm border-white/10">
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
              </Card>
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
            <Button
              onClick={() => navigate("/signup")}
              className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 
                       hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600"
              size="lg"
            >
              Start Free Trial
            </Button>
            <Button
              onClick={handleDemoRequest}
              variant="outline"
              className="border-white/10"
              size="lg"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
