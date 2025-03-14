
import React from 'react';
import { MsDashboardCard } from '@/components/layout/MsDashboardCard';
import { Link } from 'react-router-dom';
import { MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRecentActivities } from '@/hooks/useRecentActivities';
import { ActivityList } from './activities/ActivityList';
import { ActivityError } from './activities/ActivityError';
import { ActivityFilterDropdown } from './activities/ActivityFilterDropdown';

export const RecentActivityCard: React.FC = (): JSX.Element => {
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
    <MsDashboardCard
      title="Recent Activity"
      footer={
        <div className="flex items-center justify-between w-full">
          <Link 
            to="/activity" 
            className="text-primary text-sm flex items-center hover:underline"
            aria-label="View all activities"
          >
            View All Activity
            <MoveRight className="ml-1 h-4 w-4" aria-hidden="true" />
          </Link>
          <div className="flex items-center space-x-2">
            <ActivityFilterDropdown 
              currentFilter={filter}
              categories={categories}
              onFilterChange={handleFilterChange}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              aria-label="Refresh activities"
            >
              Refresh
            </Button>
          </div>
        </div>
      }
    >
      {error && <ActivityError message={error} />}
      
      <ActivityList 
        isLoading={isLoading} 
        activities={filteredActivities} 
      />
    </MsDashboardCard>
  );
};
