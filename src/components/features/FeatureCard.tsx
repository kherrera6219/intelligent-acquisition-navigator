
import React from 'react';
import { Card } from '@/components/ui/card';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
  <Card className="p-7 bg-gray-800/80 border-gray-700 hover:border-blue-500 transition-colors h-full flex flex-col">
    <div className="rounded-full bg-blue-900/20 p-3.5 w-fit mb-5">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold mb-3 text-white">{title}</h3>
    <p className="text-gray-300 flex-grow text-lg leading-relaxed">{description}</p>
  </Card>
);
