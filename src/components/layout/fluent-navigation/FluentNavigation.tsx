
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';

export interface FluentNavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
  description?: string;
  badge?: React.ReactNode;
}

interface FluentNavigationProps {
  items: FluentNavigationItem[];
  vertical?: boolean;
  condensed?: boolean;
  className?: string;
}

export const FluentNavigation: React.FC<FluentNavigationProps> = ({
  items,
  vertical = false,
  condensed = false,
  className
}) => {
  const location = useLocation();
  
  return (
    <nav 
      className={cn(
        "ms-fluent-navigation",
        vertical ? "flex flex-col space-y-1" : "flex items-center space-x-4",
        className
      )}
      aria-label="Main Navigation"
    >
      {items.map((item) => {
        const isActive = location.pathname === item.href;
        
        return (
          <Tooltip
            key={item.href}
            content={condensed ? item.label : (item.description || item.label)}
            side={vertical ? 'right' : 'bottom'}
          >
            <Link
              to={item.href}
              className={cn(
                "flex items-center transition-colors rounded-md focus-visible-ring",
                vertical 
                  ? "px-3 py-2" 
                  : "px-4 py-2",
                condensed && "justify-center",
                isActive 
                  ? "bg-primary/10 text-primary hover:bg-primary/20" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon className={cn(
                "flex-shrink-0",
                condensed ? "h-5 w-5" : "h-5 w-5 mr-3"
              )} />
              
              {!condensed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
              
              {item.badge && !condensed && (
                <span className="ml-auto">{item.badge}</span>
              )}
            </Link>
          </Tooltip>
        );
      })}
    </nav>
  );
};
