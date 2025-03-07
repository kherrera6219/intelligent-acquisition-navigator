
import React, { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { useAuth } from '@/hooks/useAuth';

interface SessionExpiryProgressProps {
  className?: string;
}

export const SessionExpiryProgress: React.FC<SessionExpiryProgressProps> = ({ 
  className 
}) => {
  const { sessionTimeRemaining } = useAuth();
  const [percentage, setPercentage] = useState(100);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Setting SESSION_DURATION to 30 minutes (in milliseconds)
  const SESSION_DURATION = 30 * 60 * 1000;

  useEffect(() => {
    if (sessionTimeRemaining === null) {
      setPercentage(100);
      return;
    }

    // Calculate percentage remaining
    const calculatedPercentage = (sessionTimeRemaining / SESSION_DURATION) * 100;
    setPercentage(Math.max(0, Math.min(100, calculatedPercentage)));
    setLastUpdate(Date.now());

    // Update more frequently as the session gets closer to expiring
    const updateInterval = sessionTimeRemaining < 5 * 60 * 1000 
      ? 1000  // Update every second when less than 5 minutes remain
      : 30000; // Otherwise update every 30 seconds

    const timer = setInterval(() => {
      const elapsedSinceLastUpdate = Date.now() - lastUpdate;
      const estimatedTimeRemaining = Math.max(0, sessionTimeRemaining - elapsedSinceLastUpdate);
      const newPercentage = (estimatedTimeRemaining / SESSION_DURATION) * 100;
      
      setPercentage(Math.max(0, Math.min(100, newPercentage)));
    }, updateInterval);

    return () => clearInterval(timer);
  }, [sessionTimeRemaining, lastUpdate]);

  const getColorClass = () => {
    if (percentage > 50) return "bg-green-500";
    if (percentage > 20) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-400">Session Time Remaining</span>
        <span className="text-xs text-gray-400">
          {percentage > 0 
            ? `${Math.floor((percentage / 100) * 30)} minutes` 
            : "Expired"}
        </span>
      </div>
      <Progress 
        value={percentage} 
        className="h-2 bg-gray-700"
        indicatorClassName={getColorClass()}
      />
    </div>
  );
};
