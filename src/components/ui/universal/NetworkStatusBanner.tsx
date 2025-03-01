
import React from 'react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

export const NetworkStatusBanner: React.FC = () => {
  const isOnline = useNetworkStatus();
  
  if (isOnline) {
    return null;
  }
  
  return (
    <div className="bg-amber-500/10 text-amber-200 px-4 py-2 text-center text-sm">
      You are currently offline. Some features may be limited.
    </div>
  );
};
