
import React from 'react';
import { MsDashboardCard } from '@/components/layout/MsDashboardCard';
import { Link } from 'react-router-dom';
import { MoveRight } from 'lucide-react';
import { recentActivities } from '@/data/dashboardMockData';

export const RecentActivityCard: React.FC = () => {
  return (
    <MsDashboardCard
      title="Recent Activity"
      footer={
        <Link to="/activity" className="text-primary text-sm flex items-center hover:underline">
          View All Activity
          <MoveRight className="ml-1 h-4 w-4" />
        </Link>
      }
    >
      <div className="ms-timeline">
        {recentActivities.map((activity, index) => (
          <div key={index} className="ms-timeline-item">
            <div className="ms-timeline-icon">
              {activity.icon}
            </div>
            <div className="ms-timeline-content">
              <p className="ms-timeline-title">{activity.title}</p>
              <p className="ms-timeline-time">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </MsDashboardCard>
  );
};
