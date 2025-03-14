
import React from 'react';
import { AppLayout } from './AppLayout';
import { NetworkErrorHandler } from '@/components/ui/universal/NetworkErrorHandler';
import { OfflineStatusIndicator } from '@/components/ui/universal/OfflineStatusIndicator';

interface ProtectedPageLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  title?: string;
  withErrorBoundary?: boolean;
}

export const ProtectedPageLayout: React.FC<ProtectedPageLayoutProps> = ({
  children,
  showSidebar = true,
  title,
  withErrorBoundary = true
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
          {children}
        </NetworkErrorHandler>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            {title && <h1 className="text-2xl font-bold">{title}</h1>}
            <OfflineStatusIndicator compact />
          </div>
          {children}
        </>
      )}
    </AppLayout>
  );
};
