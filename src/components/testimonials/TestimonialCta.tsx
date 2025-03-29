
import React from 'react';
import { Container } from '@/components/ui/universal/Container';

export const TestimonialCta: React.FC = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-background/80 to-background">
      <Container size="md">
        <div className="text-center p-8 border border-border/40 rounded-lg bg-card/60 backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-4">Join Our Satisfied Customers</h2>
          <p className="text-muted-foreground mb-8">
            Experience how ProcurityIQ can transform your acquisition processes
            and help you achieve compliance with ease.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/contact"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              Request a Demo
            </a>
            <a 
              href="/pricing"
              className="bg-secondary text-secondary-foreground px-6 py-2 rounded-md font-medium hover:bg-secondary/90 transition-colors"
            >
              View Pricing
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};
