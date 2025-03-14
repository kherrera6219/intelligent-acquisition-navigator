
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/universal/Grid';
import { FlexBetween } from '@/components/ui/universal/Flexbox';

export const HomeCta: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-[#1A1F2C] to-[#1A1F2C]/90">
      <Container>
        <div className="glass-card max-w-4xl mx-auto rounded-xl transform hover:shadow-lg transition-all duration-300 border border-[#9b87f5]/20 bg-[#1A1F2C]/50 backdrop-blur-sm">
          <div className="p-8 md:p-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your procurement process?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join organizations across the country that are already saving time and reducing compliance risks with our intelligent acquisition platform.
            </p>
            <FlexBetween className="flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#8B5CF6] hover:to-[#6E59A5] text-white px-6 py-6 h-12 rounded-md text-base font-medium w-full sm:w-auto">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-[#9b87f5]/30 bg-transparent hover:bg-white/5 px-6 py-6 h-12 rounded-md text-base font-medium w-full sm:w-auto">
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
