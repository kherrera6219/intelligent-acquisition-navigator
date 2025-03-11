
import React from 'react';
import { StatisticsOverview } from './StatisticsOverview';
import { QuickActions } from './QuickActions';
import { PerformanceMetrics } from './PerformanceMetrics';
import { RecentProjects } from './RecentProjects';

export const DashboardMainContent: React.FC = (): JSX.Element => {
  return (
    <div className="lg:col-span-2 space-y-6">
      <QuickActions />
      <PerformanceMetrics />
      <RecentProjects />
    </div>
  );
};
