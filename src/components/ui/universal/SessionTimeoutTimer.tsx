
import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { useSessionManagement } from '@/hooks/useSessionManagement';
import { Watch, AlertTriangle } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface SessionTimeoutTimerProps {
  className?: string;
  compact?: boolean;
}

export const SessionTimeoutTimer: React.FC<SessionTimeoutTimerProps> = ({ 
  className,
  compact = false
}) => {
  const { sessionTimeLeft, isSessionExpiringSoon, sessionDuration } = useSessionManagement();
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Calculate percentage remaining
    if (sessionTimeLeft && sessionDuration) {
      const percentage = (sessionTimeLeft / sessionDuration) * 100;
      setProgress(Math.max(0, Math.min(100, percentage)));
    } else {
      setProgress(100);
    }
  }, [sessionTimeLeft, sessionDuration]);

  // Don't render if we don't have valid session information
  if (!sessionTimeLeft || !sessionDuration) {
    return null;
  }

  // Format minutes and seconds
  const formatTimeLeft = () => {
    const minutes = Math.floor(sessionTimeLeft / 60000);
    const seconds = Math.floor((sessionTimeLeft % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Determine color based on time remaining
  const getProgressColor = () => {
    if (progress < 20) return "bg-red-500";
    if (progress < 50) return "bg-yellow-500";
    return "bg-green-500";
  };

  const tooltipContent = isSessionExpiringSoon 
    ? `Session expiring in ${formatTimeLeft()}`
    : `Session time remaining: ${formatTimeLeft()}`;

  if (compact) {
    return (
      <Tooltip content={tooltipContent}>
        <div className={cn("flex items-center space-x-1", className)} aria-label={tooltipContent}>
          <Watch className={cn(
            "h-4 w-4", 
            isSessionExpiringSoon ? "text-red-500 animate-pulse" : "text-muted-foreground"
          )} />
          <span className="text-xs font-medium">{formatTimeLeft()}</span>
        </div>
      </Tooltip>
    );
  }

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1">
          {isSessionExpiringSoon && (
            <AlertTriangle className="h-3 w-3 text-red-500" />
          )}
          <span className={cn(
            "font-medium",
            isSessionExpiringSoon ? "text-red-500" : "text-muted-foreground"
          )}>
            {isSessionExpiringSoon ? 'Session expiring soon' : 'Session time remaining'}
          </span>
        </div>
        <span className="text-muted-foreground">{formatTimeLeft()}</span>
      </div>
      <Progress 
        value={progress} 
        className="h-1.5" 
        indicatorClassName={getProgressColor()}
      />
    </div>
  );
};
