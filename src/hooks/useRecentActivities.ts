import { useState, useEffect, useCallback } from 'react';
import { 
  FileText, 
  Users, 
  Settings, 
  AlertCircle, 
  Bell, 
  LucideIcon, 
  Info, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { fetchRecentActivities, getActivityCategories, filterActivitiesByCategory } from '@/services/activityService';
import { Activity } from '@/types/dashboard';
import { useToast } from '@/hooks/use-toast';

interface ActivityIcon {
  component: LucideIcon;
  className: string;
}

export const useRecentActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const { toast } = useToast();
  
  const getActivityIcon = (activity: Activity): ActivityIcon => {
    if (activity.icon) {
      return {
        component: activity.icon,
        className: 'text-primary'
      };
    }

    switch (activity.category) {
      case 'Document':
        return {
          component: FileText,
          className: 'text-blue-500'
        };
      case 'Meeting':
        return {
          component: Users,
          className: 'text-green-500'
        };
      case 'System':
        return {
          component: Settings,
          className: 'text-purple-500'
        };
      case 'Alert':
        return {
          component: AlertCircle,
          className: 'text-red-500'
        };
      case 'Notification':
        return {
          component: Bell,
          className: 'text-amber-500'
        };
      default:
        return {
          component: Info,
          className: 'text-gray-500'
        };
    }
  };

  const getStatusIcon = (status?: 'info' | 'warning' | 'success' | 'error'): LucideIcon => {
    switch (status) {
      case 'success':
        return CheckCircle2;
      case 'warning':
        return AlertTriangle;
      case 'error':
        return AlertCircle;
      case 'info':
      default:
        return Info;
    }
  };

  const transformActivitiesForUI = (apiActivities: Activity[]) => {
    return apiActivities.map(activity => {
      const { component: IconComponent, className } = getActivityIcon(activity);
      const StatusIcon = activity.status ? getStatusIcon(activity.status) : null;
      
      return {
        ...activity,
        timestamp: new Date(activity.timestamp),
        icon: <IconComponent className={`h-5 w-5 ${className}`} />,
        status: activity.status || 'info',
        statusIcon: StatusIcon ? <StatusIcon className="h-4 w-4" /> : null
      };
    });
  };

  const fetchActivities = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchRecentActivities();
      const transformedData = transformActivitiesForUI(data);
      setActivities(transformedData);
      
      const categoryData = await getActivityCategories();
      setCategories(categoryData);
    } catch (err) {
      console.error('Error fetching recent activities:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch activities'));
      toast({
        title: 'Error',
        description: 'Failed to load recent activities',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const filteredActivities = filter 
    ? filterActivitiesByCategory(activities, filter)
    : activities;

  const handleRefresh = () => {
    fetchActivities();
    toast({
      title: 'Refreshed',
      description: 'Activity data has been refreshed',
    });
  };

  return {
    activities,
    filteredActivities,
    isLoading,
    error,
    filter,
    setFilter,
    categories,
    handleRefresh
  };
};
