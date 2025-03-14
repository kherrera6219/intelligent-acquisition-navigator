
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/universal/Grid';
import { FlexBetween } from '@/components/ui/universal/Flexbox';

export const HomeCta: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-20">
      <Container>
        <div className="ms-fluent-panel max-w-4xl mx-auto border border-[#9b87f5]/20 bg-[#1A1F2C]/70 backdrop-blur-sm">
          <div className="p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your procurement process?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join organizations across the country that are already saving time and reducing compliance risks with our intelligent acquisition platform.
            </p>
            <FlexBetween className="flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#8B5CF6] hover:to-[#6E59A5] text-white px-6 py-6 h-12 rounded-md text-base font-medium">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-[#9b87f5]/30 bg-transparent hover:bg-white/5 px-6 py-6 h-12 rounded-md text-base font-medium">
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
