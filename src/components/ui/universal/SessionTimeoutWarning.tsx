
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Shield, RefreshCw, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SessionTimeoutWarningProps {
  className?: string;
  variant?: 'banner' | 'card' | 'toast';
  showRemainingTime?: boolean;
}

export function SessionTimeoutWarning({ 
  className,
  variant = 'banner',
  showRemainingTime = true
}: SessionTimeoutWarningProps) {
  const { sessionTimeRemaining, showSessionWarning, refreshSession, signOut } = useAuth();
  const [timeLeft, setTimeLeft] = useState<string>('');
  const { toast } = useToast();

  // Calculate time left for display
  useEffect(() => {
    if (sessionTimeRemaining !== null && sessionTimeRemaining > 0) {
      const minutes = Math.floor(sessionTimeRemaining / 60000);
      const seconds = Math.floor((sessionTimeRemaining % 60000) / 1000);
      setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    }
  }, [sessionTimeRemaining]);

  // Handle session refresh
  const handleStayLoggedIn = () => {
    refreshSession();
    toast({
      title: "Session Extended",
      description: "Your session has been refreshed",
    });
  };

  // Handle signout
  const handleLogout = () => {
    signOut();
  };

  // Don't show anything if warning isn't active
  if (!showSessionWarning) return null;

  // Toast variant
  if (variant === 'toast') {
    toast({
      title: "Session Expiring Soon",
      description: `Your session will expire in ${timeLeft}`,
      action: (
        <Button size="sm" onClick={handleStayLoggedIn}>
          Extend
        </Button>
      ),
      duration: 60000,
    });
    return null;
  }

  // Card variant (more compact)
  if (variant === 'card') {
    return (
      <div className={cn(
        "bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 flex items-center justify-between",
        className
      )}>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" aria-hidden="true" />
          <span className="text-sm font-medium">
            Session expires in {showRemainingTime && timeLeft}
          </span>
        </div>
        <Button 
          size="sm" 
          variant="outline" 
          className="h-8 bg-transparent border-amber-500/30 hover:bg-amber-500/10"
          onClick={handleStayLoggedIn}
        >
          <RefreshCw className="h-3 w-3 mr-1" aria-hidden="true" />
          Extend
        </Button>
      </div>
    );
  }

  // Banner variant (default - more prominent)
  return (
    <div className={cn(
      "bg-amber-500/15 border-t border-b border-amber-500/30 p-3 text-amber-100 w-full",
      className
    )}>
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-amber-500/20">
            <Shield className="h-5 w-5 text-amber-300" aria-hidden="true" />
          </div>
          <div>
            <p className="font-medium">Your session is about to expire</p>
            {showRemainingTime && (
              <p className="text-sm text-amber-300/80">Time remaining: {timeLeft}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="border-amber-400/30 text-amber-100 hover:bg-amber-500/20"
            onClick={handleLogout}
          >
            Log Out
          </Button>
          <Button
            size="sm"
            className="bg-amber-500 hover:bg-amber-600 text-amber-950"
            onClick={handleStayLoggedIn}
          >
            Stay Logged In
          </Button>
        </div>
      </div>
    </div>
  );
}
