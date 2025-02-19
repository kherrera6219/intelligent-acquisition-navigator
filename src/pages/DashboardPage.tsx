
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { MetricsChart } from '@/components/MetricsChart';
import { useToast } from '@/hooks/use-toast';

const DashboardPage = () => {
  const [filterValue, setFilterValue] = useState('');
  const { toast } = useToast();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      // Temporary mock data
      return {
        totalProposals: 150,
        activeProjects: 45,
        pendingReviews: 12,
        metrics: [],
        activities: []
      };
    }
  });

  const handleRefresh = async () => {
    await refetch();
    toast({
      title: "Success",
      description: "Data refreshed"
    });
  };

  if (isLoading) {
    return <Progress />;
  }

  if (error) {
    return <div className="text-red-500">Error loading dashboard data</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="flex justify-between mb-6">
        <Input
          type="text"
          placeholder="Filter..."
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="max-w-sm"
        />
        <div className="space-x-2">
          <Button onClick={() => {}}>Date Range</Button>
          <Button onClick={handleRefresh}>Refresh</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <h3 className="font-semibold">Total Proposals</h3>
          <p className="text-2xl">{data?.totalProposals}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold">Active Projects</h3>
          <p className="text-2xl">{data?.activeProjects}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold">Pending Reviews</h3>
          <p className="text-2xl">{data?.pendingReviews}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Metrics Overview</h3>
          <div data-testid="metrics-chart">
            <MetricsChart data={data?.metrics || []} />
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div data-testid="activity-chart">
            <MetricsChart data={data?.activities || []} />
          </div>
        </Card>
      </div>

      <div className="mt-6" data-testid="notifications-panel">
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Notifications</h3>
          <div className="space-y-2">
            {/* Notifications will be populated here */}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
