import React, { createContext, useContext, useEffect, useState } from 'react';
import { checkSupabaseConnection } from '@/utils/supabaseHelper';

export interface NetworkMonitorContextType {
  isOnline: boolean;
  isReconnecting: boolean;
  lastOnlineTime: Date | null;
  lastSyncTime: Date | null;
  supabaseConnected: boolean;
}

const defaultContext: NetworkMonitorContextType = {
  isOnline: true,
  isReconnecting: false,
  lastOnlineTime: null,
  lastSyncTime: null,
  supabaseConnected: true
};

const NetworkMonitorContext = createContext<NetworkMonitorContextType>(defaultContext);

export const useNetworkMonitor = () => useContext(NetworkMonitorContext);

interface NetworkMonitorProviderProps {
  children: React.ReactNode;
  checkInterval?: number;
}

export const NetworkMonitorProvider: React.FC<NetworkMonitorProviderProps> = ({ 
  children, 
  checkInterval = 30000 
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isReconnecting, setIsReconnecting] = useState<boolean>(false);
  const [lastOnlineTime, setLastOnlineTime] = useState<Date | null>(isOnline ? new Date() : null);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [supabaseConnected, setSupabaseConnected] = useState<boolean>(true);

  // Handle online/offline status changes
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setLastOnlineTime(new Date());
      setIsReconnecting(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setIsReconnecting(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Periodically check connection to Supabase when online
  useEffect(() => {
    let checkConnectionInterval: NodeJS.Timeout;
    
    if (isOnline) {
      const checkSupabaseConnectivity = async () => {
        try {
          // Only try to connect to Supabase if we're online
          if (isOnline) {
            const isConnected = await checkSupabaseConnection();
            setSupabaseConnected(isConnected);
            
            if (isConnected) {
              setLastSyncTime(new Date());
            }
          }
        } catch (error) {
          console.error('Error checking Supabase connection:', error);
          setSupabaseConnected(false);
        }
      };
      
      // Check connection immediately on mount
      checkSupabaseConnectivity();
      
      // Set up interval for subsequent checks
      checkConnectionInterval = setInterval(checkSupabaseConnectivity, checkInterval);
    }
    
    return () => {
      if (checkConnectionInterval) clearInterval(checkConnectionInterval);
    };
  }, [isOnline, checkInterval]);

  // Handle reconnection attempts
  useEffect(() => {
    let reconnectionInterval: NodeJS.Timeout;
    
    if (!isOnline && !isReconnecting) {
      setIsReconnecting(true);
      
      reconnectionInterval = setInterval(() => {
        // Attempt to reconnect by making a simple fetch request
        fetch('https://www.google.com/generate_204', { mode: 'no-cors' })
          .then(() => {
            setIsOnline(true);
            setLastOnlineTime(new Date());
            setIsReconnecting(false);
            clearInterval(reconnectionInterval);
          })
          .catch(() => {
            // If offline, keep retrying
          });
      }, 5000); // Try every 5 seconds
    }
    
    return () => {
      if (reconnectionInterval) clearInterval(reconnectionInterval);
    };
  }, [isOnline, isReconnecting]);

  return (
    <NetworkMonitorContext.Provider 
      value={{ 
        isOnline, 
        isReconnecting, 
        lastOnlineTime, 
        lastSyncTime,
        supabaseConnected
      }}
    >
      {children}
    </NetworkMonitorContext.Provider>
  );
};
