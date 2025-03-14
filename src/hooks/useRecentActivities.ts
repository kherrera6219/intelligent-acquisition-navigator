
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchActivities } from '@/services/activityService';
import { Activity } from '@/types/dashboard';

export const useRecentActivities = () => {
  const [filter, setFilter] = useState<string | null>(null);
  
  const { 
    data: activities = [], 
    isLoading, 
    error,
    refetch
  } = useQuery({
    queryKey: ['activities'],
    queryFn: fetchActivities
  });

  // Extract unique categories from activities
  const categories = Array.from(new Set(activities.map(activity => activity.category)));
  
  // Filter activities based on selected category
  const filteredActivities = filter 
    ? activities.filter(activity => activity.category === filter)
    : activities;
    
  // Handler for refreshing activities data
  const handleRefresh = () => {
    refetch();
  };

  return {
    activities,
    filteredActivities,
    isLoading,
    error,
    filter,
    setFilter,
    categories,
    handleRefresh,
    refetch
  };
};
