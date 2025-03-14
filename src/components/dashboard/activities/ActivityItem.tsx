
import React from 'react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  timestamp: Date;
  status?: 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  title,
  description,
  timestamp,
  status = 'info',
  className
}) => {
  return (
    <div className={cn("flex items-start gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors", className)}>
      <div className={cn(
        "flex-shrink-0 p-2 rounded-full",
        status === 'success' && "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
        status === 'warning' && "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
        status === 'error' && "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
        status === 'info' && "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
      )}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">{title}</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{description}</p>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <time className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
              {formatDistanceToNow(timestamp, { addSuffix: true })}
            </time>
          </TooltipTrigger>
          <TooltipContent>
            {timestamp.toLocaleString()}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
