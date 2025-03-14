
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { DashboardCardProps } from '@/types/dashboard';

export const MsDashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  className,
  children,
  footer,
  badge
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          
          {badge && (
            <div className={cn(
              "px-2 py-1 text-xs rounded-full",
              badge.variant === 'success' && "bg-green-500/10 text-green-500 border border-green-500/20",
              badge.variant === 'warning' && "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
              badge.variant === 'error' && "bg-red-500/10 text-red-500 border border-red-500/20",
              badge.variant === 'info' && "bg-blue-500/10 text-blue-500 border border-blue-500/20",
              badge.variant === 'default' && "bg-gray-500/10 text-gray-500 border border-gray-500/20"
            )}>
              {badge.text}
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          {children}
        </div>
        
        {footer && (
          <div className="mt-6 pt-4 border-t border-white/10">
            {footer}
          </div>
        )}
      </div>
    </Card>
  );
};
