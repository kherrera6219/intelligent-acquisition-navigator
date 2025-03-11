
import React from 'react';
import { Card } from "@/components/ui/universal/Card";
import { cn } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';

export interface MsDashboardCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  href?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  badge?: {
    text: string;
    variant: string;
  };
  footer?: React.ReactNode;
}

export const MsDashboardCard: React.FC<MsDashboardCardProps> = ({
  title,
  subtitle,
  icon,
  href,
  children,
  className,
  onClick,
  badge,
  footer
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      navigate(href);
    }
  };

  return (
    <Card 
      className={cn(
        "p-4 transition-all border border-border/40 bg-card/50 backdrop-blur-sm",
        "hover:bg-card/80 hover:shadow-lg cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex-shrink-0 p-2 bg-primary/10 rounded-md text-primary">
            {icon}
          </div>
        )}
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{title}</h3>
            {badge && (
              <span className={cn(
                "px-2 py-0.5 text-xs rounded-full",
                badge.variant === "success" ? "bg-green-500/20 text-green-500" : 
                badge.variant === "warning" ? "bg-amber-500/20 text-amber-500" :
                badge.variant === "error" ? "bg-red-500/20 text-red-500" :
                badge.variant === "primary" ? "bg-primary/20 text-primary" :
                "bg-blue-500/20 text-blue-500"
              )}>
                {badge.text}
              </span>
            )}
          </div>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
      {footer && (
        <div className="mt-4 pt-4 border-t border-border/20">
          {footer}
        </div>
      )}
    </Card>
  );
};
