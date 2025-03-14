
import { useState, useEffect } from 'react';

interface NetworkStatus {
  isOnline: boolean;
  lastOnlineAt: Date | null;
  lastSyncTime: number | null;
}

export const useNetworkStatus = (): NetworkStatus => {
  const [status, setStatus] = useState<NetworkStatus>({
    isOnline: navigator.onLine,
    lastOnlineAt: navigator.onLine ? new Date() : null,
    lastSyncTime: null
  });

  useEffect(() => {
    const handleOnline = () => {
      setStatus(prev => ({
        ...prev,
        isOnline: true,
        lastOnlineAt: new Date()
      }));
    };

    const handleOffline = () => {
      setStatus(prev => ({
        ...prev,
        isOnline: false
      }));
    };

    const handleSync = () => {
      if (navigator.onLine) {
        setStatus(prev => ({
          ...prev,
          lastSyncTime: Date.now()
        }));
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('sync', handleSync);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('sync', handleSync);
    };
  }, []);

  return status;
};
