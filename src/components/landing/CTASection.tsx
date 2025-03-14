
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MsGradientText } from "@/components/ui/universal/MsGradientText";
import { Container } from "@/components/ui/universal/Container";
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
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-background to-primary/5" />
      <div className="absolute inset-0 bg-grid opacity-5" />
      
      {/* Content */}
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center px-4 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Transform Your <MsGradientText>Acquisition Process?</MsGradientText>
          </h2>
          
          <p className="text-xl text-muted-foreground">
            Join the leading government agencies already using Procurity to streamline their procurement workflows.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              variant="default"
              className="px-8 py-6 h-12 text-base"
              onClick={() => navigate("/signup")}
            >
              Start Free Trial
            </Button>
            
            <Button
              size="lg"
              variant="outline" 
              className="px-8 py-6 h-12 text-base"
              onClick={handleDemoRequest}
            >
              Schedule Demo
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            No credit card required. 14-day free trial for all federal, state, and local government agencies.
          </p>
        </div>
      </Container>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};
