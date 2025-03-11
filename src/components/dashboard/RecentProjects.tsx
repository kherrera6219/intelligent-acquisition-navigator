
import React from 'react';
import { MsDashboardSection } from '@/components/layout/MsDashboardSection';
import { Button } from '@/components/ui/button';

export const RecentProjects: React.FC = () => {
  return (
    <MsDashboardSection
      title="Recent Projects"
      variant="card"
      action={{ label: "View All", href: "/projects" }}
    >
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className="p-4 rounded-md border border-border/20 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">Project Alpha {i}</h4>
                <p className="text-xs text-muted-foreground mt-1">Last updated 2 days ago</p>
              </div>
              <div className="ms-badge ms-badge-primary">Active</div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Budget</p>
                <p className="font-medium">${40 + i * 5}k</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Tasks</p>
                <p className="font-medium">{8 + i}/12</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Deadline</p>
                <p className="font-medium">Jun {10 + i * 5}</p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex">
              <Button variant="outline" size="sm" className="ml-auto">View Details</Button>
            </div>
          </div>
        ))}
      </div>
    </MsDashboardSection>
  );
};
