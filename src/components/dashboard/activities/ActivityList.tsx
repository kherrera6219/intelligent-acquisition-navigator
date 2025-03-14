
import React from 'react';
import { ActivityItem } from './ActivityItem';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LucideIcon } from 'lucide-react';

// Update to match the dashboard Activity type
export interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'error' | 'info';
  icon?: React.ReactNode | LucideIcon;
  category?: string;
  user?: {
    name: string;
    avatar: string;
  };
}

interface ActivityListProps {
  activities: Activity[];
  isLoading?: boolean;
  title?: string;
  emptyMessage?: string;
  className?: string;
  maxItems?: number;
}

export const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  isLoading = false,
  title = 'Recent Activities',
  emptyMessage = 'No recent activities',
  className = '',
  maxItems
}) => {
  const displayActivities = maxItems ? activities.slice(0, maxItems) : activities;

  if (isLoading) {
    return (
      <Card className={`p-4 ${className}`}>
        <h3 className="text-lg font-medium mb-4">{title}</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-3 p-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (!isLoading && displayActivities.length === 0) {
    return (
      <Card className={`p-4 ${className}`}>
        <h3 className="text-lg font-medium mb-4">{title}</h3>
        <div className="text-center py-8 text-muted-foreground">
          {emptyMessage}
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-2" role="list" aria-label={title}>
      {displayActivities.map((activity) => (
        <ActivityItem
          key={activity.id}
          icon={activity.icon}
          title={activity.title}
          description={activity.description}
          timestamp={activity.timestamp}
          status={activity.status}
        />
      ))}
    </div>
  );
};
