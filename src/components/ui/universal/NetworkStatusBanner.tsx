
import React from 'react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

const NetworkStatusBanner: React.FC = () => {
  const isOnline = useNetworkStatus();

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white py-2 px-4 text-center z-50">
      <p className="text-sm font-medium">
        You are currently offline. Some features may be unavailable until your connection is restored.
      </p>
    </div>
  );
};

export default NetworkStatusBanner;
