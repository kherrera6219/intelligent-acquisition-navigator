
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
    });
  };

  return (
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
  );
};
