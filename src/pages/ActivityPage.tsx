
import React from 'react';
import { useRecentActivities } from '@/hooks/useRecentActivities';
import { ActivityList } from '@/components/dashboard/activities/ActivityList';
import { ActivityFilterDropdown } from '@/components/dashboard/activities/ActivityFilterDropdown';
import { ActivityError } from '@/components/dashboard/activities/ActivityError';
import { BackButton } from '@/components/navigation/BackButton';
import { Card } from '@/components/ui/card';

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

  const handleFilterChange = (category: string | null): void => {
    setFilter(category);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <BackButton />
        <ActivityFilterDropdown 
          currentFilter={filter}
          categories={categories}
          onFilterChange={handleFilterChange}
        />
      </div>
      
      <Card className="p-6 glass-card">
        <h1 className="text-2xl font-bold mb-4">Activity History</h1>
        
        {error && <ActivityError message={error.message} />}
        
        <ActivityList 
          isLoading={isLoading} 
          activities={filteredActivities} 
          title="All Activities"
          emptyMessage="No activities found"
          className="mt-4"
        />
      </Card>
    </div>
  );
};

export default ActivityPage;
