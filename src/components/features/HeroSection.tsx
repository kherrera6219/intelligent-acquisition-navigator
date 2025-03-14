
import React from 'react';
import { Badge } from '@/components/ui/badge';

export const HeroSection: React.FC = () => {
  return (
    <div className="text-center mb-16">
      <Badge variant="outline" className="mb-4 px-3 py-1 text-blue-400 border-blue-400">Platform Capabilities</Badge>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight tracking-tight">Comprehensive Acquisition Solutions</h1>
      <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
        Discover how our platform streamlines federal acquisition processes with intelligent tools, 
        comprehensive knowledge management, and robust compliance features.
      </p>
    </div>
  );
};
