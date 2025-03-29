
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { MsSpinner } from './MsProgressIndicator';
import { Calendar, Info, LucideIcon } from 'lucide-react';

export interface MsStatProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    label?: string;
    direction: 'up' | 'down' | 'neutral';
  };
  loading?: boolean;
  variant?: 'default' | 'primary' | 'outline';
  align?: 'left' | 'center' | 'right';
}

export const MsStat = forwardRef<HTMLDivElement, MsStatProps>(
  ({ 
    className, 
    value, 
    label, 
    icon,
    trend,
    loading = false,
    variant = 'default',
    align = 'left',
    ...props 
  }, ref) => {
    const variantClasses = {
      default: "bg-card/50 border-border/40 shadow-sm",
      primary: "bg-primary/5 border-primary/20",
      outline: "bg-transparent border-border",
    };
    
    const alignClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };
    
    const trendColorClasses = trend ? {
      up: "text-success",
      down: "text-destructive",
      neutral: "text-muted-foreground",
    } : {};

    return (
      <div
        ref={ref}
        className={cn(
          "ms-stat rounded-lg border p-4",
          variantClasses[variant],
          alignClasses[align],
          className
        )}
        {...props}
      >
        <div className="flex items-center mb-2">
          {icon && (
            <div className="mr-2 text-muted-foreground">
              {icon}
            </div>
          )}
          <div className="text-sm font-medium text-muted-foreground">{label}</div>
        </div>
        
        <div className="relative">
          {loading ? (
            <MsSpinner size="md" className="mx-auto my-2" />
          ) : (
            <div className="text-2xl font-bold">{value}</div>
          )}
        </div>
        
        {trend && !loading && (
          <div className={cn("text-xs mt-1", trendColorClasses[trend.direction])}>
            <span>
              {trend.direction === 'up' && '↑ '}
              {trend.direction === 'down' && '↓ '}
              {trend.direction === 'neutral' && '→ '}
              {trend.value}%
            </span>
            {trend.label && <span className="ml-1 text-muted-foreground">{trend.label}</span>}
          </div>
        )}
      </div>
    );
  }
);

MsStat.displayName = "MsStat";

export interface MsDataPointProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  tooltip?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const MsDataPoint = forwardRef<HTMLDivElement, MsDataPointProps>(
  ({ 
    className, 
    label, 
    value, 
    icon,
    tooltip,
    size = 'md',
    ...props 
  }, ref) => {
    const sizeClasses = {
      sm: {
        container: "gap-1",
        label: "text-xs",
        value: "text-sm font-medium",
      },
      md: {
        container: "gap-1",
        label: "text-sm",
        value: "text-base font-medium",
      },
      lg: {
        container: "gap-2",
        label: "text-sm",
        value: "text-lg font-medium",
      },
    };

    return (
      <div
        ref={ref}
        className={cn(
          "ms-data-point",
          className
        )}
        {...props}
      >
        <div className="flex items-center text-muted-foreground">
          {icon && <span className="mr-1.5">{icon}</span>}
          <span className={cn(sizeClasses[size].label)}>{label}</span>
          {tooltip && (
            <span className="ml-1 cursor-help" title={tooltip}>
              <Info className="h-3 w-3" />
            </span>
          )}
        </div>
        <div className={cn(sizeClasses[size].value)}>
          {value}
        </div>
      </div>
    );
  }
);

MsDataPoint.displayName = "MsDataPoint";

export interface MsMetricGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  layout?: 'grid' | 'flex';
  columns?: 1 | 2 | 3 | 4;
  spacing?: 'sm' | 'md' | 'lg';
}

export const MsMetricGroup = forwardRef<HTMLDivElement, MsMetricGroupProps>(
  ({ 
    className, 
    children,
    title,
    layout = 'grid',
    columns = 3,
    spacing = 'md',
    ...props 
  }, ref) => {
    const layoutClasses = {
      grid: cn(
        "grid gap-4",
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      ),
      flex: cn(
        "flex flex-wrap",
        spacing === 'sm' && "gap-3",
        spacing === 'md' && "gap-4",
        spacing === 'lg' && "gap-6",
      ),
    };

    return (
      <div
        ref={ref}
        className={cn(
          "ms-metric-group",
          className
        )}
        {...props}
      >
        {title && (
          <h3 className="text-lg font-medium mb-3">{title}</h3>
        )}
        <div className={layoutClasses[layout]}>
          {children}
        </div>
      </div>
    );
  }
);

MsMetricGroup.displayName = "MsMetricGroup";

export interface MsTimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  timestamp: string | Date;
  icon?: React.ReactNode;
  status?: 'default' | 'success' | 'warning' | 'error';
  last?: boolean;
}

export const MsTimelineItem = forwardRef<HTMLDivElement, MsTimelineItemProps>(
  ({ 
    className, 
    title, 
    description, 
    timestamp,
    icon,
    status = 'default',
    last = false,
    ...props 
  }, ref) => {
    const statusClasses = {
      default: "bg-muted-foreground",
      success: "bg-success",
      warning: "bg-warning",
      error: "bg-destructive",
    };
    
    const formattedDate = timestamp instanceof Date 
      ? timestamp.toLocaleString() 
      : timestamp;

    return (
      <div
        ref={ref}
        className={cn(
          "ms-timeline-item relative pl-6",
          !last && "pb-6",
          className
        )}
        {...props}
      >
        {/* Timeline connector */}
        <div 
          className={cn(
            "absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-background",
            statusClasses[status]
          )}
        >
          {icon}
        </div>
        
        {!last && (
          <div className="absolute left-1.5 top-4 bottom-0 w-px -translate-x-1/2 bg-border" />
        )}
        
        <div>
          <div className="font-medium">{title}</div>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
          <div className="mt-1 flex items-center text-xs text-muted-foreground">
            <Calendar className="mr-1 h-3 w-3" /> {formattedDate}
          </div>
        </div>
      </div>
    );
  }
);

MsTimelineItem.displayName = "MsTimelineItem";

export interface MsTimelineProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MsTimeline = forwardRef<HTMLDivElement, MsTimelineProps>(
  ({ className, children, ...props }, ref) => {
    // Modify children to add the last prop to the last child
    const childrenArray = React.Children.toArray(children);
    const modifiedChildren = childrenArray.map((child, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          last: index === childrenArray.length - 1,
        });
      }
      return child;
    });

    return (
      <div
        ref={ref}
        className={cn("ms-timeline", className)}
        {...props}
      >
        {modifiedChildren}
      </div>
    );
  }
);

MsTimeline.displayName = "MsTimeline";
