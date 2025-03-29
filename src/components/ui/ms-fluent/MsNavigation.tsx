
import React, { useState, useRef, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

const navigationItemVariants = cva(
  "ms-navigation-item flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "text-foreground hover:bg-accent/10",
        active: "bg-accent/20 text-foreground",
        destructive: "text-destructive hover:bg-destructive/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface MsNavigationItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  active?: boolean;
  destructive?: boolean;
  as?: React.ElementType;
  href?: string;
}

export const MsNavigationItem: React.FC<MsNavigationItemProps> = ({
  children,
  className,
  icon,
  active,
  destructive,
  as: Component = 'div',
  href,
  onClick,
  ...props
}) => {
  const handleClick = (event: React.MouseEvent) => {
    if (onClick) {
      onClick(event as React.MouseEvent<HTMLDivElement>);
    }
  };

  const variant = active ? "active" : destructive ? "destructive" : "default";
  const componentProps = href ? { href } : {};

  return (
    <Component
      className={cn(navigationItemVariants({ variant }), className)}
      onClick={handleClick}
      {...componentProps}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="flex-grow">{children}</span>
    </Component>
  );
};

export interface MsNavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
}

export const MsNavigation: React.FC<MsNavigationProps> = ({
  children,
  className,
  vertical = false,
  ...props
}) => {
  return (
    <nav
      className={cn(
        "ms-navigation",
        vertical ? "flex flex-col gap-1" : "flex items-center gap-1",
        className
      )}
      {...props}
    >
      {children}
    </nav>
  );
};

export interface MsNavigationGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
}

export const MsNavigationGroup: React.FC<MsNavigationGroupProps> = ({
  children,
  className,
  label,
  icon,
  defaultOpen = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(
    defaultOpen ? undefined : 0
  );

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className={cn("ms-navigation-group", className)} {...props}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          navigationItemVariants({ variant: "default" }),
          "cursor-pointer"
        )}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span className="flex-grow">{label}</span>
        <ChevronDown
          className={cn(
            "transition-transform duration-200",
            isOpen ? "rotate-180" : "rotate-0"
          )}
          size={16}
        />
      </div>
      <div
        ref={contentRef}
        style={{ height: contentHeight }}
        className="overflow-hidden transition-all duration-200 ease-in-out"
      >
        <div className="pl-4 border-l border-border/50 ml-3 mt-1">{children}</div>
      </div>
    </div>
  );
};

export interface MsNavigationSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MsNavigationSeparator: React.FC<MsNavigationSeparatorProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn("h-px bg-border/50 my-1", className)}
      {...props}
    />
  );
};
