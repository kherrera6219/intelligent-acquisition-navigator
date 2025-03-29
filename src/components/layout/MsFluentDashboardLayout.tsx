
import React from 'react';
import { cn } from '@/lib/utils';

export interface MsFluentDashboardLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  title?: string;
  className?: string;
}

export const MsFluentDashboardLayout: React.FC<MsFluentDashboardLayoutProps> = ({
  children,
  sidebar,
  title,
  className
}) => {
  return (
    <div className={cn("ms-dashboard-layout flex", className)}>
      {sidebar && (
        <aside className="ms-dashboard-sidebar w-64 border-r border-border shrink-0 p-4 hidden lg:block">
          {sidebar}
        </aside>
      )}
      <div className="ms-dashboard-content flex-grow p-4">
        {title && <h2 className="text-2xl font-semibold mb-6">{title}</h2>}
        {children}
      </div>
    </div>
  );
};
