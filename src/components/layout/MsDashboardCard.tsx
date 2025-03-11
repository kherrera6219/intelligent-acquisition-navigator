
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
}

export const MsDashboardCard: React.FC<MsDashboardCardProps> = ({
  title,
  subtitle,
  icon,
  href,
  children,
  className,
  onClick
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
          <h3 className="text-lg font-semibold">{title}</h3>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </Card>
  );
};
