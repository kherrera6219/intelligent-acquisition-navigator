
import React from 'react';
import { ClipboardList } from 'lucide-react';
import { ActivityItem } from './ActivityItem';
import type { RecentActivity } from '@/types/dashboard';

interface ActivityListProps {
  isLoading: boolean;
  activities: RecentActivity[];
}

export const ActivityList: React.FC<ActivityListProps> = ({ isLoading, activities }) => {
  if (isLoading) {
    return (
      <>
        {Array(3).fill(0).map((_, index) => (
          <div key={`skeleton-${index}`} className="ms-timeline-item ms-timeline-skeleton" role="listitem">
            <div className="ms-timeline-icon">
              <div className="h-4 w-4 bg-white/20 rounded-full" />
            </div>
            <div className="ms-timeline-content">
              <div className="ms-timeline-title" />
              <div className="ms-timeline-time" />
            </div>
          </div>
        ))}
      </>
    );
  }
  
  if (activities.length === 0) {
    return (
      <div className="ms-timeline-empty">
        <ClipboardList className="h-10 w-10 ms-timeline-empty-icon" aria-hidden="true" />
        <p>No recent activity to display.</p>
      </div>
    );
  }
  
  return (
    <>
      {activities.map((activity, index) => (
        <ActivityItem 
          key={index} 
          activity={activity} 
          index={index} 
        />
      ))}
    </>
  );
};
