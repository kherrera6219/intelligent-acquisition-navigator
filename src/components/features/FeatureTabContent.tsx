
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
  <div className="pt-10">
    <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-5 text-white leading-tight">{title}</h2>
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">{description}</p>
        <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-lg py-6 px-8">
          Learn More
          <ArrowRight className="ml-3 h-5 w-5" />
        </Button>
      </div>
      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-xl">
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
