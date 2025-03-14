
import React from 'react';
import { Card } from '@/components/ui/card';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
  <Card className="p-6 bg-gray-800/80 border-gray-700 hover:border-blue-500 transition-colors h-full flex flex-col">
    <div className="rounded-full bg-blue-900/20 p-3 w-fit mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
    <p className="text-base text-gray-300 flex-grow leading-relaxed">{description}</p>
  </Card>
);
