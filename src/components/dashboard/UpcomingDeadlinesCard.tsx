
import React from 'react';
import { MsDashboardCard } from '@/components/layout/MsDashboardCard';
import { Link } from 'react-router-dom';
import { Clock, MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const UpcomingDeadlinesCard: React.FC = () => {
  return (
    <MsDashboardCard
      title="Upcoming Deadlines"
    >
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center justify-between p-3 rounded bg-white/5">
            <div>
              <p className="font-medium text-sm">Proposal #{i} Review</p>
              <p className="text-xs text-muted-foreground">Due in {i} day{i !== 1 ? 's' : ''}</p>
            </div>
            <Button variant="ghost" size="sm">
              <Clock className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-border/20">
        <Link to="/calendar" className="text-sm text-primary hover:underline flex items-center">
          View Calendar
          <MoveRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </MsDashboardCard>
  );
};
