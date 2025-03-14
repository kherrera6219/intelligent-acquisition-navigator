
import React, { ReactNode } from 'react';
import { Card } from '@/components/ui/universal/Card';
import { Breadcrumbs, BreadcrumbItem } from '@/components/ui/universal/Breadcrumbs';
import { LoadingState } from '@/components/ui/universal/LoadingState';
import { NetworkStatusBanner } from '@/components/ui/universal/NetworkStatusBanner';

interface ProtectedPageLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  isLoading?: boolean;
  error?: Error | null;
  action?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export const ProtectedPageLayout: React.FC<ProtectedPageLayoutProps> = ({
  children,
  title,
  description,
  isLoading = false,
  error = null,
  action,
  breadcrumbs
}) => {
  return (
    <div className="px-6 py-4 max-w-7xl mx-auto">
      <NetworkStatusBanner />
      
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      
      <header className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-balance">{title}</h1>
            {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
          </div>
          
          {action && (
            <div className="flex-shrink-0">
              {action}
            </div>
          )}
        </div>
      </header>
      
      {isLoading ? (
        <LoadingState message="Loading content..." className="min-h-[300px]" />
      ) : error ? (
        <Card className="p-6 border-destructive/30 bg-destructive/10">
          <h2 className="text-lg font-medium mb-2">Error</h2>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </Card>
      ) : (
        children
      )}
    </div>
  );
};
