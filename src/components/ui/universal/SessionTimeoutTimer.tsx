
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Clock, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface SessionTimeoutTimerProps {
  className?: string;
  showIcon?: boolean;
  indicateStatus?: boolean;
  tooltipContent?: string;
  onClick?: () => void;
}

export function SessionTimeoutTimer({
  className,
  showIcon = true,
  indicateStatus = true,
  tooltipContent = "Click to refresh your session",
  onClick
}: SessionTimeoutTimerProps) {
  const { sessionTimeRemaining, refreshSession } = useAuth();
  const [timeDisplay, setTimeDisplay] = useState<string>('--:--');
  const [status, setStatus] = useState<'ok' | 'warning' | 'critical'>('ok');

  useEffect(() => {
    if (sessionTimeRemaining === null) {
      setTimeDisplay('--:--');
      return;
    }
    
    // Convert milliseconds to minutes and seconds
    const minutes = Math.floor(sessionTimeRemaining / 60000);
    const seconds = Math.floor((sessionTimeRemaining % 60000) / 1000);
    
    setTimeDisplay(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    
    // Set status based on remaining time
    if (minutes < 2) {
      setStatus('critical');
    } else if (minutes < 5) {
      setStatus('warning');
    } else {
      setStatus('ok');
    }
  }, [sessionTimeRemaining]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (typeof refreshSession === 'function') {
      refreshSession();
    }
  };

  const getStatusColor = () => {
    if (!indicateStatus) return 'text-gray-400';
    
    switch (status) {
      case 'critical': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      default: return 'text-green-500';
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium transition-colors",
              "hover:opacity-80 cursor-pointer rounded py-1 px-1.5",
              getStatusColor(),
              className
            )}
            onClick={handleClick}
            aria-label="Session time remaining"
          >
            {showIcon && (
              status === 'critical' 
                ? <Shield className="h-3.5 w-3.5" /> 
                : <Clock className="h-3.5 w-3.5" />
            )}
            <span>{timeDisplay}</span>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
