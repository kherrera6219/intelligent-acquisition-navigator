
import React from 'react';
import { Badge } from '@/components/ui/badge';

export const HeroSection: React.FC = () => {
  return (
    <div className="text-center mb-20">
      <Badge variant="outline" className="mb-4 px-4 py-1.5 text-blue-400 border-blue-400 text-sm">
        ACQUISITION MANAGEMENT
      </Badge>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight">
        Comprehensive Acquisition Solutions
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
        Discover how our platform streamlines federal acquisition processes with intelligent tools, 
        comprehensive knowledge management, and robust compliance features.
      </p>
    </div>
  );
};
