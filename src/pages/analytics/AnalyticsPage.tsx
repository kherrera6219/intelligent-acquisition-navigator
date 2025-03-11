
import React from 'react';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import { Card } from '@/components/ui/card';
import { BarChart, LineChart, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnalyticsPage: React.FC = () => {
  return (
    <ProtectedPageLayout
      title="Analytics Dashboard"
      description="View and analyze acquisition performance metrics"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Analytics', href: '/analytics' }
      ]}
      tags={[
        { label: 'Updated', color: 'blue' },
        { label: 'Microsoft UI', color: 'green' }
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="ms-dashboard-stat">
          <div className="ms-dashboard-stat-title">Total Acquisitions</div>
          <div className="ms-dashboard-stat-value">1,295</div>
          <div className="ms-dashboard-stat-description">
            <span className="text-green-500">↑ 12%</span> from last month
          </div>
        </Card>
        
        <Card className="ms-dashboard-stat">
          <div className="ms-dashboard-stat-title">Active Proposals</div>
          <div className="ms-dashboard-stat-value">243</div>
          <div className="ms-dashboard-stat-description">
            <span className="text-green-500">↑ 5%</span> from last month
          </div>
        </Card>
        
        <Card className="ms-dashboard-stat">
          <div className="ms-dashboard-stat-title">Completed Reviews</div>
          <div className="ms-dashboard-stat-value">867</div>
          <div className="ms-dashboard-stat-description">
            <span className="text-green-500">↑ 8%</span> from last month
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="ms-title">Acquisition Trends</h3>
            <BarChart className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-800/20 rounded-md">
            <p className="text-muted-foreground">Chart visualization would appear here</p>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="ms-title">Monthly Performance</h3>
            <LineChart className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-800/20 rounded-md">
            <p className="text-muted-foreground">Chart visualization would appear here</p>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="ms-title">Review Status</h3>
            <PieChart className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="h-40 flex items-center justify-center bg-gray-800/20 rounded-md">
            <p className="text-muted-foreground">Chart visualization would appear here</p>
          </div>
        </Card>
        
        <Card className="p-6 md:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="ms-title">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center p-3 border border-white/10 rounded-md hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center mr-3">
                  <span className="text-blue-500">A{item}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Acquisition #{1000 + item} updated</p>
                  <p className="text-xs text-muted-foreground">Contract review completed</p>
                </div>
                <div className="text-xs text-muted-foreground">1h ago</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link to="/dashboard" className="text-sm text-blue-500 hover:text-blue-400">
              View All Activity
            </Link>
          </div>
        </Card>
      </div>
    </ProtectedPageLayout>
  );
};

export default AnalyticsPage;
