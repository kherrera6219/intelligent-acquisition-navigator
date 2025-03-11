
import React, { ReactNode } from 'react';
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/universal/Card";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

interface MsDashboardCardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  href?: string;
  external?: boolean;
  icon?: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  footer?: ReactNode;
  onClick?: () => void;
  badge?: {
    text: string;
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  };
}

export function MsDashboardCard({
  children,
  title,
  subtitle,
  href,
  external = false,
  icon,
  className,
  headerClassName,
  contentClassName,
  footerClassName,
  footer,
  onClick,
  badge,
}: MsDashboardCardProps) {
  const content = (
    <>
      {(title || icon || badge) && (
        <div className={cn("p-5 border-b border-border/20", headerClassName)}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="flex-shrink-0 w-10 h-10 rounded-md bg-white/5 flex items-center justify-center">
                  {icon}
                </div>
              )}
              <div>
                {title && <h3 className="font-semibold text-base">{title}</h3>}
                {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
              </div>
            </div>
            
            {badge && (
              <div className={cn(
                "ms-badge",
                badge.variant === 'primary' && "ms-badge-primary",
                badge.variant === 'success' && "ms-badge-success",
                badge.variant === 'warning' && "ms-badge-warning",
                badge.variant === 'danger' && "ms-badge-danger",
                !badge.variant && "ms-badge-primary"
              )}>
                {badge.text}
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className={cn("p-5", contentClassName)}>
        {children}
      </div>
      
      {footer && (
        <div className={cn("p-5 pt-0", footerClassName)}>
          {footer}
        </div>
      )}
      
      {href && external && (
        <div className="absolute top-3 right-3">
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link to={href}>
        <Card
          variant="ms-fluent"
          hoverable
          className={cn("overflow-hidden h-full relative", className)}
        >
          {content}
        </Card>
      </Link>
    );
  }

  return (
    <Card
      variant="ms-fluent"
      hoverable={!!onClick}
      onClick={onClick}
      className={cn("overflow-hidden h-full", className)}
    >
      {content}
    </Card>
  );
}
