
import { useState, useMemo, useEffect } from 'react';
import { fetchRecentActivities } from '@/services/activityService';
import { recentActivities as mockActivities } from '@/data/dashboardMockData';
import type { RecentActivity } from '@/types/dashboard';
import { useAuth } from '@/hooks/useAuth';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';

export const useRecentActivities = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const { isAuthenticated } = useAuth();
  const { isOnline } = useNetworkMonitor();
  
  // Fetch activities from Supabase when component mounts
  useEffect(() => {
    loadActivities();
  }, [isOnline, isAuthenticated]);

  // Load activities function
  const loadActivities = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // If offline or not authenticated, use mock data
      if (!isOnline || !isAuthenticated) {
        setActivities(mockActivities);
        return;
      }
      
      const data = await fetchRecentActivities();
      setActivities(data.length > 0 ? data : mockActivities);
    } catch (error) {
      console.error('Error loading activities:', error);
      setError("Unable to load activities. Please try again.");
      setActivities(mockActivities); // Fallback to mock data
    } finally {
      setIsLoading(false);
    }
  };

  // Apply category filtering if active
  const filteredActivities = useMemo(() => {
    if (!filter) return activities;
    return activities.filter(activity => activity.category === filter);
  }, [activities, filter]);
  
  // Extract unique categories for filter dropdown
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    activities.forEach(activity => {
      if (activity.category) {
        uniqueCategories.add(activity.category);
      }
    });
    return Array.from(uniqueCategories);
  }, [activities]);

  // Refresh activities from Supabase
  const handleRefresh = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!isOnline || !isAuthenticated) {
        // If offline or not authenticated, simulate delay and use mock data
        setTimeout(() => {
          setActivities(mockActivities);
          setIsLoading(false);
        }, 1000);
        return;
      }
      
      const data = await fetchRecentActivities();
      setActivities(data.length > 0 ? data : mockActivities);
    } catch (error) {
      console.error('Error refreshing activities:', error);
      setError("Unable to refresh activities. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    filter,
    setFilter,
    filteredActivities,
    categories,
    handleRefresh
  };
};
