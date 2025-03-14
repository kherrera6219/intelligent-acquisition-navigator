
import { useQuery } from '@tanstack/react-query';
import { Activity } from '@/types/dashboard';
import { fetchRecentActivities } from '@/services/activityService';
import { 
  FileText, 
  MessageSquare, 
  FilePlus, 
  FileEdit,
  UserPlus, 
  Check, 
  AlertTriangle,
  Clock, 
  LucideIcon 
} from 'lucide-react';

/**
 * Custom hook to fetch and manage recent activities
 */
export const useRecentActivities = (limit: number = 5) => {
  const { 
    data: activities,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['recentActivities', limit],
    queryFn: () => fetchRecentActivities(limit),
  });

  /**
   * Get appropriate icon component based on activity category
   */
  const getActivityIcon = (category: string): LucideIcon => {
    switch (category.toLowerCase()) {
      case 'document':
        return FileText;
      case 'message':
        return MessageSquare;
      case 'creation':
        return FilePlus;
      case 'edit':
        return FileEdit;
      case 'user':
        return UserPlus;
      case 'approval':
        return Check;
      case 'warning':
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  /**
   * Get status based on activity category
   */
  const getActivityStatus = (category: string): 'info' | 'warning' | 'success' | 'error' => {
    switch (category.toLowerCase()) {
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      case 'approval':
        return 'success';
      default:
        return 'info';
    }
  };

  /**
   * Format activities with appropriate icons and status
   */
  const formattedActivities: Activity[] = activities?.map(activity => {
    const icon = getActivityIcon(activity.category);
    const status = getActivityStatus(activity.category);
    
    return {
      ...activity,
      icon,
      status
    };
  }) || [];

  return {
    activities: formattedActivities,
    isLoading,
    error,
    refetch
  };
};
