
import React from 'react';
import { MsFluentDashboardLayout } from '@/components/layout/MsFluentDashboardLayout';
import { StatisticsOverview } from '@/components/dashboard/StatisticsOverview';
import { DashboardMainContent } from '@/components/dashboard/DashboardMainContent';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';

const MsFluentDashboardExample: React.FC = () => {
  return (
    <MsFluentDashboardLayout title="Microsoft Fluent Dashboard">
      <div className="mx-auto max-w-screen-2xl">
        {/* Stats Overview */}
        <StatisticsOverview />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Content (2 columns) */}
          <DashboardMainContent />

          {/* Right Sidebar (1 column) */}
          <DashboardSidebar />
        </div>
      </div>
    </MsFluentDashboardLayout>
  );
};

export default MsFluentDashboardExample;
