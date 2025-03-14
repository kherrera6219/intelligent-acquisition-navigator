
import { useState, useEffect, useCallback } from 'react';
import { 
  fetchRecentActivities, 
  getActivityCategories, 
  filterActivitiesByCategory 
} from '@/services/activityService';
import type { Activity } from '@/types/dashboard';

interface UseRecentActivitiesReturn {
  activities: Activity[];
  filteredActivities: Activity[];
  isLoading: boolean;
  error: Error | null;
  filter: string | null;
  categories: string[];
  setFilter: (category: string | null) => void;
  handleRefresh: () => Promise<void>;
}

export const useRecentActivities = (): UseRecentActivitiesReturn => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch activities and categories in parallel
      const [activitiesData, categoriesData] = await Promise.all([
        fetchRecentActivities(),
        getActivityCategories()
      ]);
      
      setActivities(activitiesData);
      setCategories(categoriesData);
      
      // Apply any existing filter
      if (filter) {
        setFilteredActivities(filterActivitiesByCategory(activitiesData, filter));
      } else {
        setFilteredActivities(activitiesData);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch activities'));
      console.error('Error in useRecentActivities:', err);
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle filter changes
  useEffect(() => {
    if (activities.length > 0) {
      setFilteredActivities(filterActivitiesByCategory(activities, filter));
    }
  }, [filter, activities]);

  const handleFilterChange = useCallback((category: string | null) => {
    setFilter(category);
  }, []);

  const handleRefresh = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return {
    activities,
    filteredActivities,
    isLoading,
    error,
    filter,
    categories,
    setFilter: handleFilterChange,
    handleRefresh
  };
};
