
import React from 'react';
import { AppLayout } from './AppLayout';
import { NetworkErrorHandler } from '@/components/ui/universal/NetworkErrorHandler';
import { OfflineStatusIndicator } from '@/components/ui/universal/OfflineStatusIndicator';

interface ProtectedPageLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  title?: string;
  description?: string;
  withErrorBoundary?: boolean;
  isLoading?: boolean;
  error?: Error | null;
  breadcrumbs?: Array<{label: string; href: string}>;
  action?: React.ReactNode;
  fullWidth?: boolean;
  backLink?: {label: string; href: string};
  withCard?: boolean;
  tags?: Array<{label: string; color: string}>;
}

export const ProtectedPageLayout: React.FC<ProtectedPageLayoutProps> = ({
  children,
  showSidebar = true,
  title,
  description,
  withErrorBoundary = true,
  // We're not using the other props in this component, but they're defined
  // in the interface for type safety with page components
}) => {
  React.useEffect(() => {
    // Update document title if provided
    if (title) {
      document.title = `${title} | ProcurityIQ`;
    }
  }, [title]);

  return (
    <AppLayout showSidebar={showSidebar}>
      {withErrorBoundary ? (
        <NetworkErrorHandler autoRetry={true} alertPosition="top">
          <div className="flex items-center justify-between mb-4">
            {title && <h1 className="text-2xl font-bold">{title}</h1>}
            <OfflineStatusIndicator compact />
          </div>
          {description && <p className="text-muted-foreground mb-6">{description}</p>}
          {children}
        </NetworkErrorHandler>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            {title && <h1 className="text-2xl font-bold">{title}</h1>}
            <OfflineStatusIndicator compact />
          </div>
          {description && <p className="text-muted-foreground mb-6">{description}</p>}
          {children}
        </>
      )}
    </AppLayout>
  );
};
