
import React from 'react';
import { ActivityItem } from './ActivityItem';
import { Card } from '@/components/ui/card';

export interface Activity {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'error' | 'info';
}

interface ActivityListProps {
  activities: Activity[];
  title?: string;
  emptyMessage?: string;
  className?: string;
  maxItems?: number;
}

export const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  title = 'Recent Activities',
  emptyMessage = 'No recent activities',
  className = '',
  maxItems
}) => {
  const displayActivities = maxItems ? activities.slice(0, maxItems) : activities;

  return (
    <Card className={`p-4 ${className}`}>
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      
      {displayActivities.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {emptyMessage}
        </div>
      ) : (
        <div className="space-y-2">
          {displayActivities.map((activity, index) => (
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
      )}
    </Card>
  );
};
