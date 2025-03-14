
import React, { createContext, useContext, useEffect, useState } from 'react';
import { checkSupabaseConnection } from '@/utils/supabaseHelper';

export interface NetworkMonitorContextType {
  isOnline: boolean;
  isReconnecting: boolean;
  lastSyncTime: Date | null;
  checkConnection: () => Promise<void>;
  supabaseConnected: boolean;
}

const NetworkMonitorContext = createContext<NetworkMonitorContextType>({
  isOnline: true,
  isReconnecting: false,
  lastSyncTime: null,
  checkConnection: async () => {},
  supabaseConnected: true
});

export const useNetworkMonitor = () => useContext(NetworkMonitorContext);

interface NetworkMonitorProviderProps {
  children: React.ReactNode;
  checkInterval?: number;
}

export const NetworkMonitorProvider: React.FC<NetworkMonitorProviderProps> = ({ 
  children,
  checkInterval = 30000 // Check every 30 seconds by default
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isReconnecting, setIsReconnecting] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [supabaseConnected, setSupabaseConnected] = useState<boolean>(true);

  const checkConnection = async () => {
    // Only attempt to check connection if browser reports online
    if (navigator.onLine) {
      setIsReconnecting(true);
      
      try {
        // Check if we can reach Supabase
        const isConnected = await checkSupabaseConnection();
        setSupabaseConnected(isConnected);
        
        if (isConnected) {
          setIsOnline(true);
          setLastSyncTime(new Date());
        }
      } catch (error) {
        console.error('Error checking connection:', error);
        setSupabaseConnected(false);
      } finally {
        setIsReconnecting(false);
      }
    } else {
      setIsOnline(false);
      setSupabaseConnected(false);
    }
  };

  // Set up event listeners for online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      checkConnection();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setSupabaseConnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial connection check
    checkConnection();

    // Set up interval for periodic connection checks
    const intervalId = setInterval(checkConnection, checkInterval);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(intervalId);
    };
  }, [checkInterval]);

  return (
    <NetworkMonitorContext.Provider value={{ 
      isOnline, 
      isReconnecting, 
      lastSyncTime,
      checkConnection,
      supabaseConnected
    }}>
      {children}
    </NetworkMonitorContext.Provider>
  );
};
