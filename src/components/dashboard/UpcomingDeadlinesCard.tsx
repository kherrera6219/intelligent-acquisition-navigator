
import React, { useState } from 'react';
import { MsDashboardCard } from '@/components/layout/MsDashboardCard';
import { CalendarClock, AlertTriangle, CalendarX, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Deadline } from '@/types/dashboard';

export const UpcomingDeadlinesCard: React.FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Mock data
  const deadlines: Deadline[] = [
    { id: 1, title: "Project Alpha Milestone", daysRemaining: 2 },
    { id: 2, title: "Contract Review Deadline", daysRemaining: 5 },
    { id: 3, title: "Department Budget Submission", daysRemaining: 10 }
  ];
  
  const handleRefresh = (): void => {
    setIsLoading(true);
    setError(null);
    
    setTimeout(() => {
      // Randomly succeed or fail to demonstrate error handling
      const success = Math.random() > 0.2;
      
      if (success) {
        setIsLoading(false);
      } else {
        setError("Unable to fetch deadline data. Please try again.");
        setIsLoading(false);
      }
    }, 1000);
  };
  
  const getUrgencyColor = (days: number): string => {
    if (days <= 3) return 'text-red-500';
    if (days <= 7) return 'text-amber-500';
    return 'text-blue-500';
  };
  
  const getUrgencyIcon = (days: number): JSX.Element => {
    if (days <= 3) return <AlertTriangle className="h-4 w-4 text-red-500" aria-hidden="true" />;
    if (days <= 7) return <AlertCircle className="h-4 w-4 text-amber-500" aria-hidden="true" />;
    return <CalendarClock className="h-4 w-4 text-blue-500" aria-hidden="true" />;
  };

  return (
    <MsDashboardCard 
      title="Upcoming Deadlines" 
      subtitle="Tasks due soon"
      footer={
        <div className="flex justify-end w-full">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
            aria-label="Refresh deadlines"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-3 w-3 mr-1 animate-spin" aria-hidden="true" />
                Loading...
              </>
            ) : (
              "Refresh"
            )}
          </Button>
        </div>
      }
    >
      {error && (
        <div className="bg-red-500/10 text-red-500 p-2 rounded-md mb-3 text-sm flex items-center" role="alert">
          <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
      
      <div className="space-y-3" role="list" aria-label="Upcoming deadlines">
        {isLoading ? (
          Array(3).fill(0).map((_, index) => (
            <div key={`skeleton-${index}`} className="flex items-start gap-3 p-2 rounded-md animate-pulse" role="listitem">
              <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-white/10 rounded w-3/4" />
                <div className="h-3 bg-white/5 rounded w-1/2" />
              </div>
            </div>
          ))
        ) : deadlines.length > 0 ? (
          deadlines.map(deadline => (
            <div 
              key={deadline.id} 
              className="flex items-start gap-3 p-2 rounded-md hover:bg-white/5 transition-colors"
              role="listitem"
            >
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                {getUrgencyIcon(deadline.daysRemaining)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{deadline.title}</p>
                <p className={`text-xs ${getUrgencyColor(deadline.daysRemaining)}`}>
                  Due in {deadline.daysRemaining} day{deadline.daysRemaining !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="py-6 text-center">
            <CalendarX className="h-10 w-10 mx-auto mb-2 text-muted-foreground opacity-50" aria-hidden="true" />
            <p className="text-muted-foreground text-sm">No upcoming deadlines.</p>
          </div>
        )}
      </div>
    </MsDashboardCard>
  );
};
