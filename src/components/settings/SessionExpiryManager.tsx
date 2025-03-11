
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Card } from "@/components/ui/universal/Card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function SessionExpiryManager() {
  const { sessionTimeRemaining, refreshSession, showSessionWarning } = useAuth();
  const [timeDisplay, setTimeDisplay] = useState<string>('');
  const [progressValue, setProgressValue] = useState<number>(100);

  useEffect(() => {
    if (!sessionTimeRemaining) return;
    
    // Convert milliseconds to minutes and seconds
    const minutes = Math.floor(sessionTimeRemaining / 60000);
    const seconds = Math.floor((sessionTimeRemaining % 60000) / 1000);
    
    setTimeDisplay(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
    
    // Calculate percentage for progress bar - assuming 30 min session
    const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes
    const percentage = (sessionTimeRemaining / SESSION_DURATION) * 100;
    setProgressValue(Math.max(0, Math.min(100, percentage)));
  }, [sessionTimeRemaining]);

  if (!showSessionWarning) return null;

  // Color based on remaining time
  let progressColor = "bg-green-500";
  if (progressValue < 30) progressColor = "bg-red-500";
  else if (progressValue < 70) progressColor = "bg-yellow-500";

  return (
    <Card className="p-4 border border-yellow-500/20 bg-yellow-500/5 mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          <div>
            <h3 className="font-medium text-white">Your session is about to expire</h3>
            <p className="text-sm text-gray-400">
              Your session will expire in {timeDisplay}. Would you like to extend it?
            </p>
          </div>
        </div>
        <Button 
          onClick={refreshSession}
          className="flex items-center gap-2"
          size="sm"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Extend Session</span>
        </Button>
      </div>
      <Progress value={progressValue} className="h-1" indicatorClassName={progressColor} />
    </Card>
  );
};
