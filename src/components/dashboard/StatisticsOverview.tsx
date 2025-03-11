
import React from 'react';
import { MsDashboardSection } from '@/components/layout/MsDashboardSection';
import { MsDashboardGrid } from '@/components/layout/MsDashboardGrid';
import { MsStatsCard } from '@/components/layout/MsStatsCard';
import { Briefcase, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

export const StatisticsOverview: React.FC = () => {
  return (
    <MsDashboardSection title="Overview" variant="borderless">
      <MsDashboardGrid columns={4} gap="md">
        <MsStatsCard 
          title="Active Projects" 
          value="12" 
          trend={{ value: 8, label: "vs last month" }}
          icon={<Briefcase className="h-5 w-5 text-blue-400" />}
        />
        <MsStatsCard 
          title="Pending Proposals" 
          value="4" 
          trend={{ value: -2, label: "vs last month" }}
          icon={<FileText className="h-5 w-5 text-indigo-400" />}
        />
        <MsStatsCard 
          title="Documents Created" 
          value="23" 
          trend={{ value: 15, label: "vs last month" }}
          icon={<CheckCircle className="h-5 w-5 text-green-400" />}
        />
        <MsStatsCard 
          title="Issues Flagged" 
          value="7" 
          trend={{ value: 3, label: "vs last month" }}
          icon={<AlertTriangle className="h-5 w-5 text-amber-400" />}
        />
      </MsDashboardGrid>
    </MsDashboardSection>
  );
};
