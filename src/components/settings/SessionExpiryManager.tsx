
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Card } from "@/components/ui/universal/Card";
import { Button } from "@/components/ui/button";

export function SessionExpiryManager() {
  const { sessionTimeRemaining, refreshSession, showSessionWarning } = useAuth();
  const [timeDisplay, setTimeDisplay] = useState<string>('');

  useEffect(() => {
    if (!sessionTimeRemaining) return;
    
    // Convert milliseconds to minutes and seconds
    const minutes = Math.floor(sessionTimeRemaining / 60000);
    const seconds = Math.floor((sessionTimeRemaining % 60000) / 1000);
    
    setTimeDisplay(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
  }, [sessionTimeRemaining]);

  if (!showSessionWarning) return null;

  return (
    <Card className="p-4 border border-yellow-500/20 bg-yellow-500/5 mb-6">
      <div className="flex items-center justify-between">
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
    </Card>
  );
}
