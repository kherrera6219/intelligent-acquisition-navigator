
import React from 'react';
import { format } from 'date-fns';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Clock, 
  AlertCircle,
  FileText 
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface ActivityItemProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'error' | 'info';
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  title,
  description,
  timestamp,
  status
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'info':
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors">
      <div className="flex-shrink-0 mt-0.5">
        {icon || <FileText className="h-5 w-5 text-muted-foreground" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-none mb-1">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <TooltipProvider>
          <Tooltip content={`Status: ${status.charAt(0).toUpperCase() + status.slice(1)}`}>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                {getStatusIcon()}
              </div>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip content={format(timestamp, 'MMM d, yyyy h:mm:ss a')}>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{format(timestamp, 'h:mm a')}</span>
              </div>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
