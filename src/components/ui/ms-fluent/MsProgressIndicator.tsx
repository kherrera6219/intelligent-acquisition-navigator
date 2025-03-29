
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface MsProgressIndicatorProps {
  value?: number; // 0-100 or undefined for indeterminate
  label?: string;
  showValue?: boolean;
  type?: 'linear' | 'circular';
  size?: 'sm' | 'md' | 'lg';
  thickness?: 'thin' | 'medium' | 'thick';
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  className?: string;
}

export const MsProgressIndicator: React.FC<MsProgressIndicatorProps> = ({
  value,
  label,
  showValue = false,
  type = 'linear',
  size = 'md',
  thickness = 'medium',
  variant = 'default',
  className,
}) => {
  const isIndeterminate = value === undefined;
  const formattedValue = isIndeterminate ? null : Math.min(100, Math.max(0, value));

  // Color variants
  const getVariantClass = () => {
    switch (variant) {
      case 'success': return 'bg-success';
      case 'error': return 'bg-destructive';
      case 'warning': return 'bg-warning';
      case 'info': return 'bg-info';
      default: return 'bg-primary';
    }
  };

  // Size classes for circular
  const getCircularSizeClass = () => {
    switch (size) {
      case 'sm': return 'h-8 w-8';
      case 'lg': return 'h-16 w-16';
      default: return 'h-12 w-12';
    }
  };
  
  // Thickness for both types
  const getThicknessClass = () => {
    if (type === 'linear') {
      switch (thickness) {
        case 'thin': return 'h-1';
        case 'thick': return 'h-3';
        default: return 'h-2';
      }
    } else {
      // For circular (stroke width)
      switch (thickness) {
        case 'thin': return 'stroke-[2]';
        case 'thick': return 'stroke-[6]';
        default: return 'stroke-[4]';
      }
    }
  };

  // Linear Progress Bar
  if (type === 'linear') {
    return (
      <div className={cn('ms-progress-indicator w-full', className)}>
        {label && (
          <div className="flex justify-between items-center mb-1">
            <div className="text-sm font-medium">{label}</div>
            {showValue && formattedValue !== null && (
              <div className="text-sm text-muted-foreground">{formattedValue}%</div>
            )}
          </div>
        )}
        
        <div className={cn('w-full bg-muted rounded-full overflow-hidden', getThicknessClass())}>
          {isIndeterminate ? (
            <div className={cn(
              'animate-pulse-x h-full rounded-full', 
              getVariantClass()
            )} style={{ width: '30%' }} />
          ) : (
            <div 
              className={cn('h-full rounded-full transition-all', getVariantClass())}
              style={{ width: `${formattedValue}%` }}
            />
          )}
        </div>
      </div>
    );
  }

  // Circular Progress Indicator
  return (
    <div className={cn('ms-progress-indicator inline-flex flex-col items-center', className)}>
      <div className={cn('relative', getCircularSizeClass())}>
        {isIndeterminate ? (
          <Loader2 className={cn(
            'animate-spin w-full h-full text-muted-foreground', 
            getThicknessClass()
          )} />
        ) : (
          <>
            {/* Background circle */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-muted stroke-current"
                cx="50"
                cy="50"
                r="40"
                fill="none"
                strokeWidth={thickness === 'thin' ? 4 : thickness === 'thick' ? 10 : 6}
                strokeLinecap="round"
              />
              
              {/* Progress circle */}
              <circle
                className={cn('stroke-current transition-all', {
                  'text-primary': variant === 'default',
                  'text-success': variant === 'success',
                  'text-destructive': variant === 'error',
                  'text-warning': variant === 'warning',
                  'text-info': variant === 'info',
                })}
                cx="50"
                cy="50"
                r="40"
                fill="none"
                strokeWidth={thickness === 'thin' ? 4 : thickness === 'thick' ? 10 : 6}
                strokeLinecap="round"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * (formattedValue || 0)) / 100}
                transform="rotate(-90 50 50)"
              />
            </svg>
            
            {showValue && formattedValue !== null && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={cn('text-foreground font-medium', {
                  'text-xs': size === 'sm',
                  'text-sm': size === 'md',
                  'text-base': size === 'lg',
                })}>
                  {formattedValue}%
                </span>
              </div>
            )}
          </>
        )}
      </div>
      
      {label && (
        <span className={cn('mt-2 text-center', {
          'text-xs': size === 'sm',
          'text-sm': size === 'md',
          'text-base': size === 'lg',
        })}>
          {label}
        </span>
      )}
    </div>
  );
};
