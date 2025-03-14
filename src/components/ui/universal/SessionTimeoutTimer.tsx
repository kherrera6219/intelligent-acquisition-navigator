
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface SessionTimeoutTimerProps {
  className?: string;
  sessionTimeLeft?: number;
  sessionDuration?: number;
  isSessionExpiringSoon?: boolean;
}

export const SessionTimeoutTimer: React.FC<SessionTimeoutTimerProps> = ({ 
  className,
  sessionTimeLeft = 100,
  sessionDuration = 3600,
  isSessionExpiringSoon = false
}) => {
  // Compute the percentage of time remaining
  const percentRemaining = Math.max(0, Math.min(100, (sessionTimeLeft / sessionDuration) * 100));
  
  // Get the appropriate color based on time remaining
  const getProgressColor = () => {
    if (percentRemaining > 70) return 'bg-green-500';
    if (percentRemaining > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <div className={cn("w-full", className)} role="progressbar" aria-valuenow={percentRemaining}>
      <Progress 
        value={percentRemaining} 
        className={cn("h-1", getProgressColor())}
        aria-label="Session timeout progress"
      />
      {isSessionExpiringSoon && (
        <div className="mt-1 text-xs text-red-500" aria-live="polite">
          Your session is about to expire
        </div>
      )}
    </div>
  );
};
