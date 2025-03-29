
import React from 'react';
import { cn } from '@/lib/utils';

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  isLeft?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ 
  year, 
  title, 
  description, 
  isLeft = true 
}) => {
  return (
    <div className={cn(
      "relative flex items-center justify-between mb-16 last:mb-0",
      !isLeft && "flex-row-reverse"
    )}>
      {/* Timeline dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10"></div>
      
      {/* Content */}
      <div className={cn(
        "w-5/12",
        isLeft ? "text-right pr-12" : "text-left pl-12"
      )}>
        <span className="inline-block mb-2 px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
          {year}
        </span>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      {/* Empty space for the other side */}
      <div className="w-5/12"></div>
    </div>
  );
};

export const CompanyTimeline: React.FC = () => {
  const timelineItems = [
    {
      year: "2018",
      title: "Company Founded",
      description: "ProcurityIQ was established with a mission to transform government acquisition through intelligent technology."
    },
    {
      year: "2019",
      title: "First Platform Release",
      description: "Launched our initial platform focused on federal acquisition compliance automation."
    },
    {
      year: "2020",
      title: "State & Local Expansion",
      description: "Expanded our platform capabilities to address state and local government procurement needs."
    },
    {
      year: "2021",
      title: "AI Integration",
      description: "Incorporated advanced machine learning algorithms to provide predictive insights and recommendations."
    },
    {
      year: "2022",
      title: "Major Platform Upgrade",
      description: "Released version 3.0 with enhanced analytics, document management, and collaboration features."
    },
    {
      year: "2023",
      title: "Industry Recognition",
      description: "Received multiple government technology innovation awards and expanded to serve over a hundred agencies."
    }
  ];
  
  return (
    <div>
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Tracing our path from inception to becoming a leading provider of intelligent acquisition solutions.
        </p>
      </div>
      
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border/30"></div>
        
        {/* Timeline items */}
        <div className="relative">
          {timelineItems.map((item, index) => (
            <TimelineItem
              key={index}
              year={item.year}
              title={item.title}
              description={item.description}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
