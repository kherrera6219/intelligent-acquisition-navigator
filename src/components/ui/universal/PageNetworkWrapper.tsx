
import React from 'react';
import { useNetworkMonitor } from './NetworkMonitorProvider';
import { AlertTriangle, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageNetworkWrapperProps {
  children: React.ReactNode;
  showOfflineMessage?: boolean;
  fallbackComponent?: React.ReactNode;
}

export const PageNetworkWrapper: React.FC<PageNetworkWrapperProps> = ({ 
  children, 
  showOfflineMessage = true,
  fallbackComponent
}) => {
  const { isOnline } = useNetworkMonitor();
  
  if (!isOnline && showOfflineMessage) {
    if (fallbackComponent) {
      return <>{fallbackComponent}</>;
    }
    
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
        <div className="ms-fluent-panel p-8 rounded-xl max-w-md w-full">
          <WifiOff className="h-16 w-16 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-2xl font-semibold mb-2">You're offline</h2>
          <p className="text-muted-foreground mb-6">
            This page requires an internet connection to load properly. Please check your connection and try again.
          </p>
          <Button 
            onClick={() => window.location.reload()}
            className="ms-fluent-button w-full"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
};
