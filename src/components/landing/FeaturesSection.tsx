
import React from 'react';
import { Container } from '@/components/ui/universal/Container';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';
import { Card } from '@/components/ui/card';
import { Clock, Shield, Zap, BarChart3, Globe, Check } from 'lucide-react';

const features = [
  {
    title: "AI-Powered Compliance",
    description: "Our system continuously monitors changing regulations across federal, state, and local levels to ensure 100% compliance.",
    icon: <Shield className="h-10 w-10 text-primary" />
  },
  {
    title: "4D Knowledge Framework",
    description: "Access a comprehensive database of acquisition regulations, organized in an intuitive 4-dimensional knowledge system.",
    icon: <Globe className="h-10 w-10 text-primary" />
  },
  {
    title: "Real-Time Analysis",
    description: "Get instant insights and recommendations for your procurement documents, with AI that understands context and intent.",
    icon: <Zap className="h-10 w-10 text-primary" />
  },
  {
    title: "Time-Saving Automation",
    description: "Reduce document review time by up to 85% with automated compliance checking and intelligent document generation.",
    icon: <Clock className="h-10 w-10 text-primary" />
  },
  {
    title: "Decision Support",
    description: "Make informed procurement decisions with AI-generated insights based on historical data and best practices.",
    icon: <BarChart3 className="h-10 w-10 text-primary" />
  },
  {
    title: "Cross-Level Integration",
    description: "Seamless integration of federal, state, and local procurement requirements in a single unified platform.",
    icon: <Check className="h-10 w-10 text-primary" />
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90" />
      
      <Container className="relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Powerful <MsGradientText>Features</MsGradientText> for Acquisition Excellence
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our platform combines advanced AI technology with deep procurement expertise to deliver a comprehensive solution.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 p-6 h-full hover:border-primary/50 transition-colors duration-300">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
