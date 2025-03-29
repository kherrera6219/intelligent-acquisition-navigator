
import React from 'react';
import { cn } from '@/lib/utils';

interface MsProgressIndicatorProps {
  value?: number;
  label?: string;
  type?: 'linear' | 'circular';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showValue?: boolean;
  valueFormat?: (value: number) => string;
}

export const MsProgressIndicator: React.FC<MsProgressIndicatorProps> = ({
  value,
  label,
  type = 'linear',
  size = 'md',
  className,
  showValue = false,
  valueFormat = (v) => `${v}%`,
}) => {
  const isIndeterminate = value === undefined;
  const normalizedValue = value !== undefined ? Math.max(0, Math.min(100, value)) : 0;
  
  const sizesLinear = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };
  
  const sizesCircular = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };
  
  if (type === 'circular') {
    const strokeWidth = size === 'sm' ? 2 : size === 'lg' ? 4 : 3;
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = isIndeterminate 
      ? 0 
      : circumference - (normalizedValue / 100) * circumference;
      
    return (
      <div className={cn('relative inline-flex', sizesCircular[size], className)}>
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            className="text-muted/30"
            stroke="currentColor"
            fill="none"
            strokeWidth={strokeWidth}
            cx="50"
            cy="50"
            r={radius}
          />
          
          {/* Progress circle */}
          <circle
            className={cn(
              "text-primary",
              isIndeterminate && "animate-spin origin-center"
            )}
            stroke="currentColor"
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            cx="50"
            cy="50"
            r={radius}
            transform="rotate(-90 50 50)"
          />
        </svg>
        
        {showValue && !isIndeterminate && (
          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
            {valueFormat(normalizedValue)}
          </span>
        )}
      </div>
    );
  }
  
  return (
    <div className={cn('space-y-1', className)}>
      {(label || (showValue && !isIndeterminate)) && (
        <div className="flex justify-between text-sm">
          {label && <span>{label}</span>}
          {showValue && !isIndeterminate && (
            <span className="text-muted-foreground">{valueFormat(normalizedValue)}</span>
          )}
        </div>
      )}
      
      <div className={cn('bg-muted/30 rounded-full overflow-hidden', sizesLinear[size])}>
        {isIndeterminate ? (
          <div className="h-full bg-primary rounded-full animate-progress-indeterminate w-1/3" />
        ) : (
          <div 
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${normalizedValue}%` }}
          />
        )}
      </div>
    </div>
  );
};
