
import React from 'react';
import { Badge } from '@/components/ui/badge';

export const HeroSection: React.FC = () => {
  return (
    <div className="text-center mb-20">
      <Badge variant="outline" className="mb-4 px-4 py-1.5 text-blue-400 border-blue-400 text-sm">
        PLATFORM CAPABILITIES
      </Badge>
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight tracking-tight font-heading">
        Comprehensive Acquisition Solutions
      </h1>
      <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
        Discover how our platform streamlines federal acquisition processes with intelligent tools, 
        comprehensive knowledge management, and robust compliance features.
      </p>
    </div>
  );
};
