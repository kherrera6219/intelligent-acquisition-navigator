
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { NetworkStatusBanner } from './NetworkStatusBanner';

interface NetworkMonitorContextType {
  isOnline: boolean;
  isReconnecting: boolean;
  lastOnlineTime: Date | null;
  checkConnection: () => Promise<boolean>;
}

const NetworkMonitorContext = createContext<NetworkMonitorContextType>({
  isOnline: true,
  isReconnecting: false,
  lastOnlineTime: null,
  checkConnection: async () => true,
});

export const useNetworkMonitor = () => useContext(NetworkMonitorContext);

interface NetworkMonitorProviderProps {
  children: React.ReactNode;
  initialOnlineState?: boolean;
  reconnectInterval?: number;
  showBanner?: boolean;
}

export const NetworkMonitorProvider: React.FC<NetworkMonitorProviderProps> = ({
  children,
  initialOnlineState = navigator.onLine,
  reconnectInterval = 5000,
  showBanner = true,
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(initialOnlineState);
  const [isReconnecting, setIsReconnecting] = useState<boolean>(false);
  const [lastOnlineTime, setLastOnlineTime] = useState<Date | null>(initialOnlineState ? new Date() : null);
  const [reconnectTimer, setReconnectTimer] = useState<number | null>(null);

  const checkConnection = useCallback(async (): Promise<boolean> => {
    try {
      // Try to fetch a small endpoint to check connectivity
      const response = await fetch('/api/ping', { 
        method: 'HEAD',
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' }
      });
      const isConnected = response.ok;
      
      if (isConnected && !isOnline) {
        setIsOnline(true);
        setIsReconnecting(false);
        setLastOnlineTime(new Date());
        
        if (reconnectTimer) {
          window.clearInterval(reconnectTimer);
          setReconnectTimer(null);
        }
      }
      
      return isConnected;
    } catch (error) {
      if (isOnline) {
        setIsOnline(false);
        startReconnecting();
      }
      return false;
    }
  }, [isOnline, reconnectTimer]);

  const startReconnecting = useCallback(() => {
    if (!isReconnecting && !reconnectTimer) {
      setIsReconnecting(true);
      const timer = window.setInterval(() => {
        checkConnection();
      }, reconnectInterval);
      setReconnectTimer(timer);
    }
  }, [isReconnecting, reconnectTimer, checkConnection, reconnectInterval]);

  const handleOnline = useCallback(() => {
    setIsOnline(true);
    setIsReconnecting(false);
    setLastOnlineTime(new Date());
    
    if (reconnectTimer) {
      window.clearInterval(reconnectTimer);
      setReconnectTimer(null);
    }
  }, [reconnectTimer]);

  const handleOffline = useCallback(() => {
    setIsOnline(false);
    startReconnecting();
  }, [startReconnecting]);

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Initial check
    checkConnection();
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      
      if (reconnectTimer) {
        window.clearInterval(reconnectTimer);
      }
    };
  }, [handleOnline, handleOffline, checkConnection, reconnectTimer]);

  return (
    <NetworkMonitorContext.Provider
      value={{
        isOnline,
        isReconnecting,
        lastOnlineTime,
        checkConnection,
      }}
    >
      {showBanner && <NetworkStatusBanner isOffline={!isOnline} isReconnecting={isReconnecting} />}
      {children}
    </NetworkMonitorContext.Provider>
  );
};
