
import React, { useState } from 'react';
import { MsDashboardCard } from '@/components/layout/MsDashboardCard';
import { Link } from 'react-router-dom';
import { Clock, MoveRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Deadline {
  id: number;
  title: string;
  daysRemaining: number;
}

export const UpcomingDeadlinesCard: React.FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Mock data for deadlines
  const deadlines: Deadline[] = [
    { id: 1, title: "Proposal #1 Review", daysRemaining: 1 },
    { id: 2, title: "Proposal #2 Review", daysRemaining: 2 },
    { id: 3, title: "Proposal #3 Review", daysRemaining: 3 }
  ];

  // This would be replaced with a real data fetch
  const handleRefresh = (): void => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      const success = Math.random() > 0.2;
      
      if (success) {
        setIsLoading(false);
      } else {
        setError("Unable to refresh deadlines. Please try again.");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <MsDashboardCard
      title="Upcoming Deadlines"
      footer={
        <Link 
          to="/calendar" 
          className="text-primary text-sm hover:underline flex items-center"
          aria-label="View full calendar"
        >
          View Calendar
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
      
      <div className="space-y-3" role="list" aria-label="Upcoming deadlines">
        {isLoading ? (
          Array(3).fill(0).map((_, index) => (
            <div key={`skeleton-${index}`} className="animate-pulse flex items-center justify-between p-3 rounded bg-white/5">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-white/20 rounded w-3/4" />
                <div className="h-3 bg-white/10 rounded w-1/2" />
              </div>
              <div className="h-8 w-8 bg-white/10 rounded" />
            </div>
          ))
        ) : deadlines.length > 0 ? (
          deadlines.map((deadline) => (
            <div 
              key={deadline.id} 
              className="flex items-center justify-between p-3 rounded bg-white/5"
              role="listitem"
            >
              <div>
                <p className="font-medium text-sm">{deadline.title}</p>
                <p className="text-xs text-muted-foreground">
                  Due in {deadline.daysRemaining} day{deadline.daysRemaining !== 1 ? 's' : ''}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                aria-label={`View details for ${deadline.title}`}
              >
                <Clock className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          ))
        ) : (
          <div className="py-6 text-center text-muted-foreground text-sm">
            No upcoming deadlines.
          </div>
        )}
      </div>
    </MsDashboardCard>
  );
};
