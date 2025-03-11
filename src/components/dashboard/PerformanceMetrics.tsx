
import React from 'react';
import { MsDashboardSection } from '@/components/layout/MsDashboardSection';
import { BarChart3, MoveRight } from 'lucide-react';

export const PerformanceMetrics: React.FC = () => {
  return (
    <MsDashboardSection 
      title="Performance Metrics" 
      variant="card"
      action={{ label: "View Report", href: "/analytics" }}
    >
      <div className="h-64 flex items-center justify-center bg-white/5 rounded-md border border-border/20">
        <div className="text-center">
          <BarChart3 className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">Chart visualization would appear here</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-white/5 p-4 rounded-md">
          <p className="text-sm text-muted-foreground">Revenue</p>
          <p className="text-2xl font-bold">$42.5k</p>
          <div className="flex items-center mt-1 text-xs text-green-400">
            <span className="mr-1">+12%</span>
            <MoveRight className="h-3 w-3" />
          </div>
        </div>
        <div className="bg-white/5 p-4 rounded-md">
          <p className="text-sm text-muted-foreground">Contracts</p>
          <p className="text-2xl font-bold">18</p>
          <div className="flex items-center mt-1 text-xs text-green-400">
            <span className="mr-1">+3</span>
            <MoveRight className="h-3 w-3" />
          </div>
        </div>
        <div className="bg-white/5 p-4 rounded-md">
          <p className="text-sm text-muted-foreground">Efficiency</p>
          <p className="text-2xl font-bold">94%</p>
          <div className="flex items-center mt-1 text-xs text-green-400">
            <span className="mr-1">+2%</span>
            <MoveRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </MsDashboardSection>
  );
};
