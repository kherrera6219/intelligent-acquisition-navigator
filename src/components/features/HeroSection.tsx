
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
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2">
          <span className="bg-gradient-to-r from-[#9b87f5] via-[#D946EF] to-[#F97316] bg-clip-text text-transparent">
            Powerful Features
          </span>{" "}
          <span className="text-lg md:text-xl lg:text-2xl">
            for Modern Acquisition
          </span>
        </h1>
        <p className="text-5xl md:text-6xl lg:text-7xl text-[#9b87f5] mb-6 font-bold drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)] filter backdrop-blur-[4px] bg-clip-text">
          ProcurityIQ
        </p>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
          Our platform leverages advanced AI technologies to streamline the acquisition process,
          provide compliance guidance, and deliver actionable insights for your organization.
        </p>
        <div className="inline-flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#8B5CF6] hover:to-[#6E59A5] text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-colors">
            Get Started
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white border border-[#9b87f5]/20 px-6 py-3 rounded-lg font-medium transition-colors">
            Schedule Demo
          </button>
        </div>
      </div>
    </div>
  );
};
