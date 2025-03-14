
import React from 'react';
import { Container } from '@/components/ui/universal/Grid';
import { Shield, ChartBar, Zap, Database } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  return (
    <Container>
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Next-Generation Acquisition Intelligence</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Our platform combines AI technology with deep procurement expertise to streamline your acquisition process.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="bg-gradient-to-br from-[#1A1F2C] to-[#1A1F2C]/60 p-6 md:p-8 rounded-xl border border-[#9b87f5]/20 shadow-xl">
          <div className="space-y-10">
            <Feature 
              icon={<Shield className="h-8 w-8 text-[#9b87f5]" />}
              title="Automated Compliance"
              description="Ensure all procurement activities comply with federal, state, and local regulations through AI-powered monitoring."
            />
            <Feature 
              icon={<ChartBar className="h-8 w-8 text-[#D946EF]" />}
              title="Data-Driven Insights"
              description="Make informed decisions with comprehensive analytics and visualizations of your procurement data."
            />
            <Feature 
              icon={<Zap className="h-8 w-8 text-[#F97316]" />}
              title="Process Acceleration"
              description="Reduce procurement cycle times by up to 60% through intelligent workflow automation."
            />
            <Feature 
              icon={<Database className="h-8 w-8 text-[#9b87f5]" />}
              title="Centralized Knowledge"
              description="Access all procurement documents, regulations, and resources in one secure, searchable platform."
            />
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#9b87f5]/20 to-[#D946EF]/20 rounded-lg blur-2xl opacity-30"></div>
          <div className="relative bg-[#1A1F2C]/70 border border-[#9b87f5]/30 rounded-lg overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
              alt="ProcurityIQ Dashboard"
              className="w-full h-auto rounded-lg opacity-90 hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="px-3 py-1 bg-[#9b87f5]/20 text-[#9b87f5] text-sm font-medium rounded-full backdrop-blur-sm">
                AI-Powered Dashboard
              </span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 p-2 bg-[#1A1F2C]/80 rounded-lg border border-[#9b87f5]/20">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};
