
import { useNavigate } from "react-router-dom";
import { GradientButton } from "@/components/ui/universal/GradientButton";
import { useToast } from "@/hooks/use-toast";

export const CTASection = () => {
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
    <section className="py-24 bg-black/40 relative overflow-hidden" aria-labelledby="cta-title">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/5 to-pink-500/10 pointer-events-none"></div>
      
      {/* Content */}
      <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
        <div className="space-y-8 animate-in fade-in-50">
          <h2 
            id="cta-title" 
            className="text-3xl md:text-4xl font-bold text-white"
          >
            Ready to Transform Your Acquisition Process?
          </h2>
          
          <p className="text-xl text-gray-400">
            Join the leading federal agencies already using ProcurityIQ to streamline their procurement.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GradientButton
              onClick={() => navigate("/signup")}
              size="lg"
              gradientVariant="primary"
              className="w-full sm:w-auto px-8 py-4"
              aria-label="Start free trial of ProcurityIQ"
            >
              Start Free Trial
            </GradientButton>
            
            <GradientButton
              onClick={handleDemoRequest}
              gradientVariant="secondary"
              size="lg"
              className="w-full sm:w-auto px-8 py-4"
              aria-label="Schedule a demo of ProcurityIQ"
            >
              Schedule Demo
            </GradientButton>
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            No credit card required. 14-day free trial for all new users.
          </p>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
};
