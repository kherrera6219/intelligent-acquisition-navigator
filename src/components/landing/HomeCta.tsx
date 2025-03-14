
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/universal/Grid';
import { FlexBetween } from '@/components/ui/universal/Flexbox';

export const HomeCta: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-gray-800 to-gray-900">
      <Container>
        <div className="glass-card max-w-4xl mx-auto rounded-xl transform hover:shadow-lg transition-all duration-300">
          <div className="p-8 md:p-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your procurement process?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join organizations across the country that are already saving time and reducing compliance risks with our intelligent acquisition platform.
            </p>
            <FlexBetween className="flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-6 h-12 rounded-md text-base font-medium w-full sm:w-auto">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-gray-600 bg-transparent hover:bg-white/5 px-6 py-6 h-12 rounded-md text-base font-medium w-full sm:w-auto">
                  Schedule Demo
                </Button>
              </Link>
            </FlexBetween>
          </div>
        </div>
      </Container>
    </section>
  );
};
