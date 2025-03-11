
import React, { useState, useMemo, useEffect } from 'react';
import { MsDashboardCard } from '@/components/layout/MsDashboardCard';
import { Link } from 'react-router-dom';
import { MoveRight, AlertCircle, ClipboardList, Clock, Filter } from 'lucide-react';
import { recentActivities as mockActivities } from '@/data/dashboardMockData';
import type { RecentActivity } from '@/types/dashboard';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { fetchRecentActivities } from '@/services/activityService';
import { useAuth } from '@/hooks/useAuth';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';

export const RecentActivityCard: React.FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const { isAuthenticated } = useAuth();
  const { isOnline } = useNetworkMonitor();
  
  // Fetch activities from Supabase when component mounts
  useEffect(() => {
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
    
    loadActivities();
  }, [isOnline, isAuthenticated]);

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

  // Format relative time with tooltip showing exact time
  const formatActivityTime = (timestamp: string): { relative: string, exact: string } => {
    const date = new Date(timestamp);
    return {
      relative: formatDistanceToNow(date, { addSuffix: true }),
      exact: date.toLocaleString()
    };
  };

  // Refresh activities from Supabase
  const handleRefresh = async (): void => {
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline" 
                  size="sm"
                  className="h-8 px-2 flex items-center"
                  aria-label="Filter activities"
                >
                  <Filter className="h-4 w-4 mr-1" />
                  {filter ? filter : 'All'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleFilterChange(null)}>
                  All
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem key={category} onClick={() => handleFilterChange(category)}>
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
      {error && (
        <div className="bg-red-500/10 text-red-500 p-2 rounded-md mb-3 text-sm flex items-center" role="alert">
          <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
      
      <div className="ms-timeline" role="list" aria-label="Recent activities">
        {isLoading ? (
          Array(3).fill(0).map((_, index) => (
            <div key={`skeleton-${index}`} className="ms-timeline-item ms-timeline-skeleton" role="listitem">
              <div className="ms-timeline-icon">
                <div className="h-4 w-4 bg-white/20 rounded-full" />
              </div>
              <div className="ms-timeline-content">
                <div className="ms-timeline-title" />
                <div className="ms-timeline-time" />
              </div>
            </div>
          ))
        ) : filteredActivities.length > 0 ? (
          filteredActivities.map((activity: RecentActivity, index: number) => {
            const Icon = activity.icon;
            const time = formatActivityTime(activity.timestamp);
            
            return (
              <TooltipProvider key={index}>
                <div className="ms-timeline-item group" role="listitem">
                  <TooltipTrigger asChild>
                    <div className="ms-timeline-content-wrapper">
                      <div className="ms-timeline-icon">
                        <Icon className="h-4 w-4 text-blue-400" aria-hidden="true" />
                      </div>
                      <div className="ms-timeline-content">
                        <p className="ms-timeline-title">{activity.title}</p>
                        <p className="ms-timeline-time flex items-center text-xs">
                          <Clock className="inline-block h-3 w-3 mr-1 text-gray-400" aria-hidden="true" />
                          {time.relative}
                          {activity.category && (
                            <span className="ml-2 px-1.5 py-0.5 bg-primary/10 text-primary/80 rounded text-[10px]">
                              {activity.category}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <div className="text-xs">
                      <p className="font-semibold">{activity.title}</p>
                      <p>{time.exact}</p>
                      {activity.description && <p className="mt-1 text-gray-300">{activity.description}</p>}
                    </div>
                  </TooltipContent>
                </div>
              </TooltipProvider>
            );
          })
        ) : (
          <div className="ms-timeline-empty">
            <ClipboardList className="h-10 w-10 ms-timeline-empty-icon" aria-hidden="true" />
            <p>No recent activity to display.</p>
          </div>
        )}
      </div>
    </MsDashboardCard>
  );
};
