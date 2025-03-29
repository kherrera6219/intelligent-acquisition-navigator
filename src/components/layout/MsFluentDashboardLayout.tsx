
import React from 'react';
import { cn } from '@/lib/utils';

export interface MsFluentDashboardLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const MsFluentDashboardLayout: React.FC<MsFluentDashboardLayoutProps> = ({
  children,
  sidebar,
  title,
  description,
  className,
  header,
  footer
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      {header && (
        <header className="border-b border-border">
          {header}
        </header>
      )}
      
      <div className={cn("ms-dashboard-layout flex flex-1", className)}>
        {sidebar && (
          <aside className="ms-dashboard-sidebar w-64 border-r border-border shrink-0 p-4 hidden lg:block">
            {sidebar}
          </aside>
        )}
        <div className="ms-dashboard-content flex-grow p-4">
          {title && <h2 className="text-2xl font-semibold mb-2">{title}</h2>}
          {description && <p className="text-muted-foreground mb-6">{description}</p>}
          {children}
        </div>
      </div>
      
      {footer && (
        <footer className="border-t border-border">
          {footer}
        </footer>
      )}
    </div>
  );
};
