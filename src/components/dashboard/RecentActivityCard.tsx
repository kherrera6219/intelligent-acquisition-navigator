
import React, { useState } from 'react';
import { MsDashboardCard } from '@/components/layout/MsDashboardCard';
import { Link } from 'react-router-dom';
import { MoveRight, AlertCircle } from 'lucide-react';
import { recentActivities } from '@/data/dashboardMockData';
import type { RecentActivity } from '@/types/dashboard';

export const RecentActivityCard: React.FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // This could be replaced with a real data fetch in the future
  const handleRefresh = (): void => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      // Randomly succeed or fail to demonstrate error handling
      const success = Math.random() > 0.2;
      
      if (success) {
        setIsLoading(false);
      } else {
        setError("Unable to refresh activities. Please try again.");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <MsDashboardCard
      title="Recent Activity"
      footer={
        <Link 
          to="/activity" 
          className="text-primary text-sm flex items-center hover:underline"
          aria-label="View all activities"
        >
          View All Activity
          <MoveRight className="ml-1 h-4 w-4" aria-hidden="true" />
        </Link>
      }
    >
      {error && (
        <div className="bg-red-500/10 text-red-500 p-2 rounded-md mb-3 text-sm flex items-center">
          <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      <div className="ms-timeline" role="list" aria-label="Recent activities">
        {isLoading ? (
          Array(3).fill(0).map((_, index) => (
            <div key={`skeleton-${index}`} className="ms-timeline-item animate-pulse" role="listitem">
              <div className="ms-timeline-icon">
                <div className="h-4 w-4 bg-white/20 rounded-full" />
              </div>
              <div className="ms-timeline-content">
                <div className="h-4 w-2/3 bg-white/20 rounded mb-1" />
                <div className="h-3 w-1/3 bg-white/10 rounded" />
              </div>
            </div>
          ))
        ) : recentActivities.length > 0 ? (
          recentActivities.map((activity: RecentActivity, index: number) => {
            const Icon = activity.icon;
            return (
              <div key={index} className="ms-timeline-item" role="listitem">
                <div className="ms-timeline-icon">
                  <Icon className="h-4 w-4 text-blue-400" aria-hidden="true" />
                </div>
                <div className="ms-timeline-content">
                  <p className="ms-timeline-title">{activity.title}</p>
                  <p className="ms-timeline-time">{activity.time}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-6 text-center text-muted-foreground text-sm">
            No recent activity to display.
          </div>
        )}
      </div>
    </MsDashboardCard>
  );
};
