
import React, { ReactNode } from 'react';
import { Breadcrumbs, BreadcrumbItem } from '@/components/ui/universal/Breadcrumbs';
import { AppLayout } from '@/components/layout/AppLayout';
import { LoadingState } from '@/components/ui/universal/LoadingState';
import { cn } from '@/lib/utils';

export interface ProtectedPageLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  isLoading?: boolean;
  error?: Error | null;
  action?: ReactNode;
  fullWidth?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  backLink?: {
    label: string;
    href: string;
  };
}

export const ProtectedPageLayout: React.FC<ProtectedPageLayoutProps> = ({
  children,
  title,
  description,
  isLoading = false,
  error,
  action,
  fullWidth = false,
  breadcrumbs,
  backLink
}) => {
  return (
    <AppLayout>
      <div className={cn("py-4", !fullWidth && "container mx-auto")}>
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} className="mb-6" />
        )}
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
            {description && (
              <p className="text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          
          {action && (
            <div className="flex-shrink-0">{action}</div>
          )}
        </div>
        
        {/* Error display */}
        {error && (
          <div className="p-4 mb-6 border border-red-500/30 bg-red-500/10 rounded-md text-red-500">
            <h3 className="font-semibold mb-1">Error</h3>
            <p>{error.message}</p>
          </div>
        )}
        
        {/* Page Content */}
        {isLoading ? (
          <LoadingState className="my-12" variant="skeleton" />
        ) : (
          children
        )}
      </div>
    </AppLayout>
  );
};
