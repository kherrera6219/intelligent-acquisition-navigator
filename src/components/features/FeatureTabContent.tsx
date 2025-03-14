
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

interface FeatureTabContentProps {
  title: string;
  description: string;
  features: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
  image?: string;
}

export const FeatureTabContent: React.FC<FeatureTabContentProps> = ({ 
  title, 
  description, 
  features, 
  image = '/images/feature-placeholder.jpg' 
}) => (
  <div className="pt-8">
    <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
      <div>
        <h2 className="text-3xl font-bold mb-4 text-white leading-tight">{title}</h2>
        <p className="text-xl text-gray-400 mb-6 leading-relaxed">{description}</p>
        <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
          Learn More
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
        <img 
          src={image} 
          alt={`${title} feature visualization`} 
          className="w-full h-auto object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://placehold.co/600x400/1e293b/38bdf8?text=Feature+Image';
          }}
        />
      </div>
    </div>
    
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
        />
      ))}
    </div>
  </div>
);
