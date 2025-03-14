
import React from 'react';
import { KnowledgeGraphAnimation } from '@/components/landing/KnowledgeGraphAnimation';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Knowledge Graph Animation Background */}
      <div className="absolute inset-0 w-full h-full opacity-20">
        <KnowledgeGraphAnimation />
      </div>
      
      <div className="relative z-10 py-16 md:py-24 px-6 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
          Powerful Features for Modern Acquisition
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Our platform leverages advanced AI technologies to streamline the acquisition process,
          provide compliance guidance, and deliver actionable insights for your organization.
        </p>
        <div className="inline-flex space-x-4">
          <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-colors">
            Get Started
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-lg font-medium transition-colors">
            Schedule Demo
          </button>
        </div>
      </div>
    </div>
  );
};
