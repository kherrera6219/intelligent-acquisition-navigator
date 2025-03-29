
import React from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { MsFluentDashboardLayout } from '@/components/layout/MsFluentDashboardLayout';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { RecentProjects } from '@/components/dashboard/RecentProjects';
import { PerformanceMetrics } from '@/components/dashboard/PerformanceMetrics';

const Dashboard: React.FC = () => {
  return (
    <ProtectedPageLayout
      title="Microsoft Fluent Dashboard"
      description="Modern dashboard implementation using Microsoft Fluent UI design principles"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Dashboard', href: '/dashboard' }
      ]}
    >
      <MsFluentDashboardLayout 
        sidebar={<DashboardSidebar />}
        title="Dashboard Overview"
      >
        <div className="space-y-6">
          <h1 className="ms-heading-2">Welcome to Procurity</h1>
          <p className="ms-text-lg ms-text-muted">
            Your centralized procurement intelligence platform
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <RecentProjects />
            <PerformanceMetrics />
          </div>
        </div>
      </MsFluentDashboardLayout>
    </ProtectedPageLayout>
  );
};

export default Dashboard;
