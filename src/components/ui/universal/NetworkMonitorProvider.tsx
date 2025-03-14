
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface NetworkMonitorContextType {
  isOnline: boolean;
  isReconnecting: boolean;
  supabaseConnected: boolean;
  lastSyncTime?: number | null;
  checkSupabaseConnection: () => Promise<boolean>;
}

const NetworkMonitorContext = createContext<NetworkMonitorContextType>({
  isOnline: true,
  isReconnecting: false,
  supabaseConnected: true,
  lastSyncTime: null,
  checkSupabaseConnection: async () => true
});

export const useNetworkMonitor = () => useContext(NetworkMonitorContext);

interface NetworkMonitorProviderProps {
  children: ReactNode;
}

export const NetworkMonitorProvider: React.FC<NetworkMonitorProviderProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isReconnecting, setIsReconnecting] = useState<boolean>(false);
  const [supabaseConnected, setSupabaseConnected] = useState<boolean>(true);
  const [reconnectTimer, setReconnectTimer] = useState<NodeJS.Timeout | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<number | null>(null);

  // Check Supabase connection
  const checkSupabaseConnection = async (): Promise<boolean> => {
    try {
      const { data, error } = await supabase.from('health_check').select('status').maybeSingle();
      const connected = !error && !!data;
      setSupabaseConnected(connected);
      return connected;
    } catch (error) {
      console.error('Error checking Supabase connection:', error);
      setSupabaseConnected(false);
      return false;
    }
  };

  // Handle online/offline events
  useEffect(() => {
    const handleOnline = () => {
      setIsReconnecting(true);
      
      // Clear any existing timer
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }
      
      // Set a timer to check connection and then set isOnline to true
      const timer = setTimeout(async () => {
        await checkSupabaseConnection();
        setIsOnline(true);
        setIsReconnecting(false);
        setLastSyncTime(Date.now());
      }, 2000); // Wait 2 seconds to ensure connection is stable
      
      setReconnectTimer(timer);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setSupabaseConnected(false);
      
      // Clear any existing timer
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        setReconnectTimer(null);
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial connection check
    checkSupabaseConnection();

    // Set up periodic connection checks when online
    let intervalId: NodeJS.Timeout;
    if (isOnline) {
      intervalId = setInterval(() => {
        checkSupabaseConnection();
      }, 30000); // Check every 30 seconds
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (reconnectTimer) clearTimeout(reconnectTimer);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isOnline]);

  const value = {
    isOnline,
    isReconnecting,
    supabaseConnected,
    lastSyncTime,
    checkSupabaseConnection
  };

  return (
    <NetworkMonitorContext.Provider value={value}>
      {children}
    </NetworkMonitorContext.Provider>
  );
};
