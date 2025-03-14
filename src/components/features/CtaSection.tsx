
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const CtaSection: React.FC = () => {
  return (
    <div className="text-center">
      <Card className="p-8 bg-gradient-to-br from-blue-900/30 to-gray-800 border-gray-700 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white leading-tight">Ready to Transform Your Acquisition Process?</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
          Join federal agencies nationwide that use our platform to streamline procurement, 
          ensure compliance, and make data-driven acquisition decisions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-base py-6">
            Request a Demo
          </Button>
          <Button size="lg" variant="outline" className="border-gray-600 hover:bg-gray-700 text-base py-6">
            View Pricing Plans
          </Button>
        </div>
      </Card>
    </div>
  );
};
