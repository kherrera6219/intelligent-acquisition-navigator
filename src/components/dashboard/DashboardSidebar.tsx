
import React from 'react';
import { UserProfileCard } from './UserProfileCard';
import { RecentActivityCard } from './RecentActivityCard';
import { UpcomingDeadlinesCard } from './UpcomingDeadlinesCard';

export const DashboardSidebar: React.FC = (): JSX.Element => {
  return (
    <div className="space-y-6">
      <UserProfileCard />
      <RecentActivityCard />
      <UpcomingDeadlinesCard />
    </div>
  );
};
