
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { checkSupabaseConnection } from '@/utils/supabaseHelper';

interface NetworkMonitorContextType {
  isOnline: boolean;
  isReconnecting: boolean; // Added this property
  supabaseConnected: boolean;
  lastSyncTime: Date | null;
  checkNetworkStatus: () => Promise<void>;
}

const initialState: NetworkMonitorContextType = {
  isOnline: true,
  isReconnecting: false, // Initialize isReconnecting
  supabaseConnected: true,
  lastSyncTime: null,
  checkNetworkStatus: async () => {}
};

const NetworkMonitorContext = createContext<NetworkMonitorContextType>(initialState);

export const useNetworkMonitor = () => useContext(NetworkMonitorContext);

interface NetworkMonitorProviderProps {
  children: React.ReactNode;
}

export const NetworkMonitorProvider: React.FC<NetworkMonitorProviderProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isReconnecting, setIsReconnecting] = useState<boolean>(false);
  const [supabaseConnected, setSupabaseConnected] = useState<boolean>(true);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Check Supabase connection
  const checkSupabase = useCallback(async () => {
    if (navigator.onLine) {
      try {
        const connected = await checkSupabaseConnection();
        setSupabaseConnected(connected);
        
        if (connected) {
          setLastSyncTime(new Date());
        }
      } catch (error) {
        console.error('Error checking Supabase connection:', error);
        setSupabaseConnected(false);
      }
    } else {
      setSupabaseConnected(false);
    }
  }, []);

  // Handler for when the network comes back online
  const handleOnline = useCallback(() => {
    setIsReconnecting(true); // Set reconnecting state
    setIsOnline(true);
    // Attempt to reconnect to Supabase
    checkSupabase().finally(() => {
      setIsReconnecting(false); // Clear reconnecting state once checked
    });
  }, [checkSupabase]);

  // Handler for when the network goes offline
  const handleOffline = useCallback(() => {
    setIsOnline(false);
    setSupabaseConnected(false);
  }, []);

  // Manual check of network status
  const checkNetworkStatus = useCallback(async () => {
    setIsOnline(navigator.onLine);
    await checkSupabase();
  }, [checkSupabase]);

  // Set up event listeners when the component mounts
  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check of network status
    checkNetworkStatus();

    // Set up periodic check of Supabase connection
    const interval = setInterval(() => {
      if (navigator.onLine) {
        checkSupabase();
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, [handleOnline, handleOffline, checkNetworkStatus, checkSupabase]);

  // Context value
  const value = {
    isOnline,
    isReconnecting,
    supabaseConnected,
    lastSyncTime,
    checkNetworkStatus
  };

  return (
    <NetworkMonitorContext.Provider value={value}>
      {children}
    </NetworkMonitorContext.Provider>
  );
};
