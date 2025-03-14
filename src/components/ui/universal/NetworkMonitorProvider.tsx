
import React, { createContext, useState, useEffect, useContext } from 'react';

interface NetworkMonitorContextType {
  isOnline: boolean;
  reconnecting: boolean;
  supabaseConnected: boolean;
  lastSyncTime: Date | null;
  lastOnlineTime: Date | null;
}

const defaultContext: NetworkMonitorContextType = {
  isOnline: navigator.onLine,
  reconnecting: false,
  supabaseConnected: false,
  lastSyncTime: null,
  lastOnlineTime: null
};

export const NetworkMonitorContext = createContext<NetworkMonitorContextType>(defaultContext);

export const useNetworkMonitor = () => useContext(NetworkMonitorContext);

interface NetworkMonitorProviderProps {
  children: React.ReactNode;
}

export const NetworkMonitorProvider: React.FC<NetworkMonitorProviderProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [reconnecting, setReconnecting] = useState<boolean>(false);
  const [supabaseConnected, setSupabaseConnected] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [lastOnlineTime, setLastOnlineTime] = useState<Date | null>(isOnline ? new Date() : null);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setLastOnlineTime(new Date());
      
      // When we come back online, set reconnecting to true
      // until we confirm Supabase connection
      setReconnecting(true);
      
      // Try to reconnect to Supabase
      checkSupabaseConnection();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setSupabaseConnected(false);
    };

    const checkSupabaseConnection = async () => {
      try {
        // Simple check using the health_check endpoint
        const response = await fetch('https://bosxxgbinzcjgwjaotyb.supabase.co/rest/v1/health_check?select=status', {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvc3h4Z2Jpbnpjamd3amFvdHliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0NjQ4NTUsImV4cCI6MjA1NTA0MDg1NX0.PPQPO_Q140Ec0qm1-Z5jDggAQULyz29r4jm76nk97aA'
          }
        });
        
        setSupabaseConnected(response.ok);
        
        if (response.ok) {
          setReconnecting(false);
          setLastSyncTime(new Date());
        }
      } catch (error) {
        console.error('Failed to check Supabase connection:', error);
        setSupabaseConnected(false);
      }
    };

    // Initial connection check
    if (isOnline) {
      checkSupabaseConnection();
    }

    // Set up event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Set up periodic connection check when online
    let connectionCheckInterval: number | null = null;
    if (isOnline) {
      connectionCheckInterval = window.setInterval(() => {
        checkSupabaseConnection();
      }, 30000); // Check every 30 seconds
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (connectionCheckInterval) {
        clearInterval(connectionCheckInterval);
      }
    };
  }, [isOnline]);

  return (
    <NetworkMonitorContext.Provider
      value={{
        isOnline,
        reconnecting,
        supabaseConnected,
        lastSyncTime,
        lastOnlineTime
      }}
    >
      {children}
    </NetworkMonitorContext.Provider>
  );
};
