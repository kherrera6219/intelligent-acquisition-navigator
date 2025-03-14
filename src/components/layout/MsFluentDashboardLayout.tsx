
import React, { ReactNode } from 'react';

interface MsFluentDashboardLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  header?: ReactNode;
  footer?: ReactNode;
  sidebar?: ReactNode;
}

export const MsFluentDashboardLayout: React.FC<MsFluentDashboardLayoutProps> = ({
  children,
  title,
  description,
  header,
  footer,
  sidebar
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header (optional) */}
      {header}
      
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar (optional) */}
        {sidebar && (
          <aside className="w-64 border-r border-border/30 hidden lg:block">
            {sidebar}
          </aside>
        )}
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            {/* Page Title and Description */}
            <div className="sr-only">
              <h1>{title}</h1>
              {description && <p>{description}</p>}
            </div>
            
            {/* Page Content */}
            {children}
          </div>
        </main>
      </div>
      
      {/* Footer (optional) */}
      {footer}
    </div>
  );
};
