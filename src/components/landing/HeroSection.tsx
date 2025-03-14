
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
      duration: 5000,
    });
  };

  return (
    <section 
      className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden" 
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 bg-[#1A1F2C] z-0">
        <KnowledgeGraphAnimation />
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <h1 
            id="hero-title" 
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            <GradientText 
              className="animate-in fade-in slide-in-from-bottom-2 bg-gradient-to-r from-[#9b87f5] via-[#D946EF] to-[#F97316]"
            >
              Next-Generation
            </GradientText>
            <br />
            <span className="text-white text-lg md:text-xl lg:text-2xl animate-in fade-in-50 slide-in-from-bottom-3 delay-150">
              Acquisition Management
            </span>
            <br />
            <span className="text-5xl md:text-6xl lg:text-7xl text-[#9b87f5] animate-in fade-in-50 slide-in-from-bottom-4 delay-200 backdrop-blur-sm py-2 px-4 bg-white/5 rounded-lg shadow-lg inline-block">
              ProcurityIQ
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-400 animate-in fade-in-50 slide-in-from-bottom-4 delay-300">
            Streamline your procurement process with AI-powered insights and compliance automation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in-50 slide-in-from-bottom-5 delay-500">
            <GradientButton
              onClick={() => navigate("/signup")}
              size="lg"
              gradientVariant="primary"
              className="w-full sm:w-auto px-8 py-4 text-lg bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#8B5CF6] hover:to-[#6E59A5]"
              aria-label="Get started with ProcurityIQ"
            >
              Get Started
            </GradientButton>
            <GradientButton
              onClick={handleDemoRequest}
              gradientVariant="secondary"
              size="lg"
              className="w-full sm:w-auto px-8 py-4 text-lg border border-[#9b87f5]/20"
              aria-label="Request a demo of ProcurityIQ"
            >
              Request Demo
            </GradientButton>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#9b87f5]/20 rounded-full flex justify-center items-start p-1">
          <div className="w-1 h-2 bg-[#9b87f5]/50 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
