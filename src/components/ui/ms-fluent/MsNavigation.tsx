
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface MsNavigationProps {
  children: React.ReactNode;
  vertical?: boolean;
  className?: string;
}

export const MsNavigation: React.FC<MsNavigationProps> = ({
  children,
  vertical = false,
  className,
}) => {
  return (
    <nav
      className={cn(
        'ms-navigation', 
        vertical ? 'flex flex-col space-y-1' : 'flex items-center space-x-1',
        className
      )}
    >
      {children}
    </nav>
  );
};

interface MsNavigationItemProps {
  children: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  destructive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
}

export const MsNavigationItem: React.FC<MsNavigationItemProps> = ({
  children,
  href,
  icon,
  active = false,
  disabled = false,
  destructive = false,
  onClick,
  className,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick(e);
    }
  };
  
  const commonProps = {
    className: cn(
      'ms-navigation-item flex items-center px-3 py-2 text-sm rounded-md transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
      active ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-accent',
      disabled && 'opacity-50 pointer-events-none',
      destructive && 'text-destructive hover:bg-destructive/10',
      className
    ),
    onClick: handleClick,
    "aria-disabled": disabled
  };

  if (href) {
    return (
      <a href={href} {...commonProps}>
        {icon && <span className="mr-2 h-4 w-4">{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button type="button" {...commonProps}>
      {icon && <span className="mr-2 h-4 w-4">{icon}</span>}
      {children}
    </button>
  );
};

interface MsNavigationGroupProps {
  children: React.ReactNode;
  label: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const MsNavigationGroup: React.FC<MsNavigationGroupProps> = ({
  children,
  label,
  icon,
  defaultOpen = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn('ms-navigation-group', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors',
          'hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
          isOpen && 'bg-accent/50'
        )}
      >
        <div className="flex items-center">
          {icon && <span className="mr-2 h-4 w-4">{icon}</span>}
          <span>{label}</span>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform',
            isOpen && 'transform rotate-180'
          )}
        />
      </button>
      
      {isOpen && (
        <div className="pl-8 mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

export const MsNavigationSeparator: React.FC<{ className?: string }> = ({
  className,
}) => (
  <div className={cn('ms-navigation-separator h-px bg-border my-2', className)} />
);

// Add menu components for backward compatibility with older code
export const MsNavigationMenu = MsNavigation;
export const MsNavigationMenuItem = MsNavigationItem;
