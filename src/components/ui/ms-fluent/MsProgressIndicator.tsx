
import React from 'react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface MsProgressIndicatorProps {
  type?: 'linear' | 'circular';
  value?: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const MsProgressIndicator: React.FC<MsProgressIndicatorProps> = ({
  type = 'linear',
  value,
  label,
  size = 'md',
  className,
}) => {
  if (type === 'linear') {
    return (
      <div className={cn("ms-progress-indicator-linear", className)}>
        {label && (
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-sm font-medium">{label}</span>
            {typeof value === 'number' && (
              <span className="text-sm text-muted-foreground">{value}%</span>
            )}
          </div>
        )}
        <Progress value={value} className="h-2" />
      </div>
    );
  }
  
  // For circular progress
  const getSize = () => {
    switch (size) {
      case 'sm': return 'h-8 w-8';
      case 'lg': return 'h-16 w-16';
      default: return 'h-12 w-12';
    }
  };
  
  const strokeWidth = size === 'sm' ? 3 : size === 'lg' ? 5 : 4;
  const radius = size === 'sm' ? 14 : size === 'lg' ? 30 : 22;
  const circumference = 2 * Math.PI * radius;
  
  return (
    <div className={cn("ms-progress-indicator-circular relative", getSize(), className)}>
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
      >
        {/* Background circle */}
        <circle
          className="text-muted/30"
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          stroke="currentColor"
        />
        
        {/* Progress circle */}
        {typeof value === 'number' && (
          <circle
            className="text-primary transition-all duration-200 ease-in-out"
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (value / 100) * circumference}
            transform="rotate(-90 50 50)"
          />
        )}
        
        {/* Indeterminate animation */}
        {typeof value !== 'number' && (
          <circle
            className="text-primary"
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            strokeLinecap="round"
            strokeDasharray={circumference * 0.75}
            strokeDashoffset={0}
            transform="rotate(-90 50 50)"
            style={{
              animation: 'spin 1.5s linear infinite',
            }}
          />
        )}
      </svg>
      
      {typeof value === 'number' && size !== 'sm' && (
        <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
          {value}%
        </div>
      )}
    </div>
  );
};
