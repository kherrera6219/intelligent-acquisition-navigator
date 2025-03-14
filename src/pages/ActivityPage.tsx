
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/card';
import { useRecentActivities } from '@/hooks/useRecentActivities';
import { ActivityList } from '@/components/dashboard/activities/ActivityList';
import { ActivityFilterDropdown } from '@/components/dashboard/activities/ActivityFilterDropdown';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ActivityPage: React.FC = () => {
  const {
    isLoading,
    error,
    filter,
    setFilter,
    filteredActivities,
    categories,
    handleRefresh
  } = useRecentActivities();

  // Convert activities to the format expected by ActivityList
  const formatActivitiesForList = () => {
    return filteredActivities.map(activity => ({
      id: activity.id,
      title: activity.title,
      description: activity.description,
      timestamp: new Date(activity.timestamp),
      status: activity.status || 'info',
      icon: activity.icon,
      category: activity.category
    }));
  };

  return (
    <MainLayout>
      <PageHeader
        title="Activity Log"
        description="Track all recent activities across your workspace"
        className="mb-6"
      />

      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Activities</h2>
            <div className="flex space-x-2">
              <ActivityFilterDropdown
                currentFilter={filter}
                categories={categories}
                onFilterChange={setFilter}
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Activities</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="meetings">Meetings</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <ActivityList 
                activities={formatActivitiesForList()}
                isLoading={isLoading}
                emptyMessage="No recent activities found"
              />
            </TabsContent>
            
            {/* Additional tab contents would go here */}
          </Tabs>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ActivityPage;
