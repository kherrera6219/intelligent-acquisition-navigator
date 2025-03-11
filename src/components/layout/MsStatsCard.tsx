
import React, { ReactNode } from 'react';
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/universal/Card";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface MsStatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    label?: string;
    direction?: 'up' | 'down' | 'neutral';
  };
  className?: string;
  onClick?: () => void;
}

export function MsStatsCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
  onClick,
}: MsStatsCardProps) {
  const renderTrendIcon = () => {
    if (!trend) return null;
    
    const direction = trend.direction || (trend.value > 0 ? 'up' : trend.value < 0 ? 'down' : 'neutral');
    
    if (direction === 'up') {
      return <ArrowUpRight className="h-4 w-4 text-green-500" />;
    } else if (direction === 'down') {
      return <ArrowDownRight className="h-4 w-4 text-red-500" />;
    } else {
      return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const trendTextColor = 
    trend?.direction === 'up' || (!trend?.direction && trend?.value > 0) 
      ? 'text-green-500' 
      : trend?.direction === 'down' || (!trend?.direction && trend?.value < 0) 
      ? 'text-red-500' 
      : 'text-gray-500';

  return (
    <Card
      variant="ms-fluent"
      className={cn("p-5", className)}
      hoverable={!!onClick}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
          
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {renderTrendIcon()}
              <span className={cn("text-xs font-medium", trendTextColor)}>
                {Math.abs(trend.value)}%
                {trend.label && ` ${trend.label}`}
              </span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="flex-shrink-0 w-10 h-10 rounded-md bg-white/5 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
