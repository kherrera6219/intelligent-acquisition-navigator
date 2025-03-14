
import React from 'react';
import { formatActivityTime } from '@/services/activityService';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityItemProps {
  icon?: React.ReactNode | React.ComponentType<any>;
  title: string;
  description: string;
  timestamp: Date | string;
  status?: 'info' | 'warning' | 'success' | 'error';
  className?: string;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  icon: IconComponent,
  title,
  description,
  timestamp,
  status = 'info',
  className
}) => {
  // Convert timestamp to string if it's a Date object
  const timestampString = typeof timestamp === 'string' 
    ? timestamp 
    : timestamp.toISOString();
  
  // Format the timestamp
  const formattedTime = formatActivityTime(timestampString);
  
  // Map status to color class
  const getStatusColorClass = () => {
    switch (status) {
      case 'warning': return 'text-yellow-500 bg-yellow-500/10';
      case 'success': return 'text-green-500 bg-green-500/10';
      case 'error': return 'text-red-500 bg-red-500/10';
      case 'info':
      default: return 'text-blue-500 bg-blue-500/10';
    }
  };

  // Render the component
  return (
    <div 
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-card/50",
        className
      )}
      role="listitem"
    >
      {IconComponent && typeof IconComponent === 'function' ? (
        <div className={cn("p-2 rounded-full", getStatusColorClass())}>
          {React.createElement(IconComponent as React.ComponentType, { 
            className: "h-5 w-5"
          })}
        </div>
      ) : IconComponent ? (
        <div className={cn("p-2 rounded-full", getStatusColorClass())}>
          {IconComponent}
        </div>
      ) : null}
      
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{title}</h4>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        <div className="flex items-center mt-2">
          <span className="text-xs text-muted-foreground">{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};
