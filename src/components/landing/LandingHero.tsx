
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';
import { Container } from '@/components/ui/universal/Container';

export const LandingHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background/80" />
      
      {/* Animated knowledge graph nodes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.3 + Math.random() * 0.7
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center px-4 space-y-8">
          {/* Announcement badge */}
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-2 
                        bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm text-primary/90 font-medium">
              Revolutionizing Federal Acquisition
            </span>
          </div>
          
          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Transform <MsGradientText gradient="primary">Acquisition Management</MsGradientText> with AI
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Harness the power of our 4D Knowledge Framework to streamline processes, 
            ensure compliance, and make data-driven decisions across all government levels.
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg"
              variant="default"
              className="group px-6 py-6 h-12 text-base"
              onClick={() => navigate('/signup')}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-6 py-6 h-12 text-base"
              onClick={() => navigate('/contact')}
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </Container>
      
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
