
import React from 'react';
import { WifiOff, Wifi, WifiAlert } from 'lucide-react';
import { Alert } from '@/components/ui/alert';

export interface EnhancedNetworkBannerProps {
  isOnline: boolean;
}

export const EnhancedNetworkBanner: React.FC<EnhancedNetworkBannerProps> = ({ isOnline }) => {
  if (isOnline) {
    return null; // Don't show banner when online
  }

  return (
    <Alert variant="destructive" className="rounded-none fixed top-0 left-0 right-0 z-50 border-b">
      <div className="flex items-center gap-2">
        <WifiOff className="h-4 w-4" />
        <span className="text-sm font-medium">
          You are currently offline. Some features may be unavailable.
        </span>
      </div>
    </Alert>
  );
};

export default EnhancedNetworkBanner;
