
import React from 'react';
import { AppLayout } from './AppLayout';
import { NetworkStatusBanner } from '@/components/ui/universal/NetworkStatusBanner';
import { OfflineStatusIndicator } from '@/components/ui/universal/OfflineStatusIndicator';
import { GlobalNetworkErrorBanner } from '@/components/ui/universal/GlobalNetworkErrorBanner';
import { SkipLinks } from '@/components/ui/universal/SkipLinks';

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
  onRetry?: () => void;
}

export const ProtectedPageLayout: React.FC<ProtectedPageLayoutProps> = ({
  children,
  showSidebar = true,
  title,
  description,
  withErrorBoundary = true,
  isLoading = false,
  error = null,
  onRetry,
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
      {/* Global network error banner that appears at the top of the page */}
      {error && (
        <GlobalNetworkErrorBanner 
          error={error} 
          onRetry={onRetry}
          isRetrying={isLoading}
        />
      )}
      
      {withErrorBoundary ? (
        <div className="network-error-handler">
          <div className="flex items-center justify-between mb-4">
            {title && <h1 className="text-2xl font-bold">{title}</h1>}
            <OfflineStatusIndicator compact />
          </div>
          {description && <p className="text-muted-foreground mb-6">{description}</p>}
          {children}
        </div>
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
