
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const PricingCta: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Acquisition Process?</h2>
      <p className="text-xl text-gray-300 mb-10">
        Join hundreds of federal, state, and local agencies that have streamlined their procurement with our platform.
      </p>
      
      <div className="grid md:grid-cols-2 gap-10 mb-12">
        <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white text-xl mb-4">Start with a Free Trial</h3>
          <ul className="space-y-3 text-left mb-6">
            {[
              'Full access to all features for 14 days',
              'No credit card required',
              'Unlimited team members during trial',
              'Dedicated onboarding support'
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Start Free Trial
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white text-xl mb-4">Schedule a Demo</h3>
          <ul className="space-y-3 text-left mb-6">
            {[
              'Personalized walkthrough of the platform',
              'Q&A with acquisition specialists',
              'Custom implementation consulting',
              'ROI assessment for your agency'
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
          <Button variant="outline" className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-950/50">
            Request Demo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-center space-x-3">
        <p className="text-sm text-gray-400">Have questions?</p>
        <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0">
          Contact our sales team
        </Button>
      </div>
    </div>
  );
};
