
import { useNavigate } from "react-router-dom";
import { GradientText } from "@/components/ui/universal/GradientText";
import { GradientButton } from "@/components/ui/universal/GradientButton";
import { useToast } from "@/hooks/use-toast";
import { KnowledgeGraphAnimation } from "./KnowledgeGraphAnimation";

export const HeroSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDemoRequest = () => {
    toast({
      title: "Demo Request Received",
      description: "Our team will contact you shortly to schedule a demo.",
    });
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-32" aria-labelledby="hero-title">
      <div className="absolute inset-0 bg-[#221F26]">
        <KnowledgeGraphAnimation />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
  );
};
