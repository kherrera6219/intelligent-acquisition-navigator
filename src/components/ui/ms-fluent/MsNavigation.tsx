
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, Circle } from 'lucide-react';

export interface MsNavigationItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  href?: string;
  badge?: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  depth?: number;
}

export const MsNavigationItem = forwardRef<HTMLDivElement, MsNavigationItemProps>(
  ({ 
    className, 
    children, 
    icon, 
    label, 
    active, 
    href, 
    badge, 
    collapsible, 
    defaultOpen = false, 
    depth = 0,
    ...props 
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);
    const hasChildren = Boolean(children);
    const isLink = Boolean(href);
    const Component = isLink ? 'a' : 'div';
    
    const handleClick = (e: React.MouseEvent) => {
      if (collapsible && hasChildren) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      
      if (props.onClick) {
        props.onClick(e);
      }
    };

    return (
      <div ref={ref}>
        <Component
          href={href}
          className={cn(
            "ms-nav-item flex items-center py-2 px-3 rounded-md text-sm group transition-colors",
            active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
            depth > 0 && "ml-6",
            collapsible && hasChildren && "cursor-pointer",
            className
          )}
          onClick={handleClick}
          {...props}
        >
          {icon && <span className="mr-2">{icon}</span>}
          {depth > 0 && !icon && <Circle className="h-1.5 w-1.5 mr-2 fill-current" />}
          <span className="flex-1 truncate">{label}</span>
          {badge && <span className="ml-auto mr-1">{badge}</span>}
          {collapsible && hasChildren && (
            <span className="ml-1">
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </span>
          )}
        </Component>
        
        {hasChildren && collapsible && isOpen && (
          <div className="mt-1">{children}</div>
        )}
        
        {hasChildren && !collapsible && (
          <div className="mt-1">{children}</div>
        )}
      </div>
    );
  }
);

MsNavigationItem.displayName = "MsNavigationItem";

export interface MsNavigationGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

export const MsNavigationGroup = forwardRef<HTMLDivElement, MsNavigationGroupProps>(
  ({ className, children, title, collapsible = false, defaultOpen = true, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);
    
    const handleClick = () => {
      if (collapsible) {
        setIsOpen(!isOpen);
      }
    };

    return (
      <div ref={ref} className={cn("mb-4", className)} {...props}>
        {title && (
          <div 
            className={cn(
              "flex items-center py-2 px-3 text-xs uppercase font-medium text-muted-foreground tracking-wider",
              collapsible && "cursor-pointer hover:text-foreground"
            )}
            onClick={collapsible ? handleClick : undefined}
          >
            <span className="flex-1">{title}</span>
            {collapsible && (
              <span className="ml-1">
                {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </span>
            )}
          </div>
        )}
        
        {(!collapsible || isOpen) && (
          <div className="space-y-1">{children}</div>
        )}
      </div>
    );
  }
);

MsNavigationGroup.displayName = "MsNavigationGroup";

export interface MsNavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsible?: boolean;
  orientation?: 'vertical' | 'horizontal';
}

export const MsNavigation = forwardRef<HTMLDivElement, MsNavigationProps>(
  ({ className, children, collapsible = false, orientation = 'vertical', ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          "ms-navigation",
          orientation === 'horizontal' ? "flex items-center space-x-2" : "space-y-1",
          className
        )}
        {...props}
      >
        {children}
      </nav>
    );
  }
);

MsNavigation.displayName = "MsNavigation";

export interface MsNavigationMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'vertical' | 'horizontal';
}

export const MsNavigationMenu = forwardRef<HTMLDivElement, MsNavigationMenuProps>(
  ({ className, children, orientation = 'horizontal', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "ms-navigation-menu",
          orientation === 'horizontal' ? "flex items-center space-x-4" : "space-y-1",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

MsNavigationMenu.displayName = "MsNavigationMenu";

export interface MsNavigationMenuItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  active?: boolean;
  icon?: React.ReactNode;
}

export const MsNavigationMenuItem = forwardRef<HTMLAnchorElement, MsNavigationMenuItemProps>(
  ({ className, children, href, active, icon, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          "ms-navigation-menu-item relative inline-flex items-center py-2 px-1 text-sm font-medium transition-colors",
          active 
            ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary" 
            : "text-muted-foreground hover:text-foreground",
          className
        )}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </a>
    );
  }
);

MsNavigationMenuItem.displayName = "MsNavigationMenuItem";
