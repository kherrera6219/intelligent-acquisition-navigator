
import React from 'react';
import { MsFluentCard } from '@/components/ui/MsFluentCard';
import { Lightbulb, Target, Award } from 'lucide-react';

export const MissionVision: React.FC = () => {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Mission & Vision</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Guided by a commitment to excellence and innovation in government acquisition.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <MsFluentCard className="p-6 bg-[#1A1F2C]/80 border border-primary/10 h-full">
          <div className="flex flex-col items-center text-center h-full">
            <div className="p-3 rounded-full bg-primary/10 mb-4">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
            <p className="text-muted-foreground flex-grow">
              To empower government organizations with intelligent acquisition solutions 
              that ensure compliance, reduce complexity, and deliver better outcomes for taxpayers.
            </p>
          </div>
        </MsFluentCard>
        
        <MsFluentCard className="p-6 bg-[#1A1F2C]/80 border border-primary/10 h-full">
          <div className="flex flex-col items-center text-center h-full">
            <div className="p-3 rounded-full bg-primary/10 mb-4">
              <Lightbulb className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
            <p className="text-muted-foreground flex-grow">
              To become the standard for intelligent acquisition management across all government levels, 
              creating a more efficient, transparent, and effective public procurement ecosystem.
            </p>
          </div>
        </MsFluentCard>
        
        <MsFluentCard className="p-6 bg-[#1A1F2C]/80 border border-primary/10 h-full">
          <div className="flex flex-col items-center text-center h-full">
            <div className="p-3 rounded-full bg-primary/10 mb-4">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Values</h3>
            <p className="text-muted-foreground flex-grow">
              Integrity, innovation, excellence, and accountability guide everything we do. 
              We believe in creating solutions that uphold the highest standards of public service.
            </p>
          </div>
        </MsFluentCard>
      </div>
    </div>
  );
};
