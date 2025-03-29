
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';

export const CtaSection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative overflow-hidden rounded-xl bg-[#1A1F2C]/80 border border-primary/10">
      {/* Background elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#D946EF]/10 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10 p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Transform Your <MsGradientText>Acquisition Process</MsGradientText>?
        </h2>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Join hundreds of government agencies that have streamlined their procurement 
          workflows, ensured compliance, and saved countless hours with our platform.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={() => navigate('/register')}
            size="lg"
            className="bg-primary hover:bg-primary/90"
          >
            Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <Button 
            onClick={() => navigate('/contact')}
            size="lg"
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/10"
          >
            Schedule Demo
          </Button>
        </div>
        
        <p className="mt-4 text-sm text-muted-foreground">
          No credit card required. 14-day free trial with full access to all features.
        </p>
      </div>
    </div>
  );
};
