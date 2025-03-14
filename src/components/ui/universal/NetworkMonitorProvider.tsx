
import React, { createContext, useContext, useState, useEffect } from 'react';

interface NetworkContextState {
  isOnline: boolean;
  isReconnecting: boolean;
  supabaseConnected: boolean;
  lastOnlineAt: Date | null;
  reconnectAttempts: number;
}

interface NetworkContextValue extends NetworkContextState {
  checkConnection: () => Promise<boolean>;
}

const NetworkContext = createContext<NetworkContextValue | undefined>(undefined);

export const useNetworkMonitor = (): NetworkContextValue => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetworkMonitor must be used within a NetworkMonitorProvider');
  }
  return context;
};

interface NetworkMonitorProviderProps {
  children: React.ReactNode;
}

export const NetworkMonitorProvider: React.FC<NetworkMonitorProviderProps> = ({ children }) => {
  const [state, setState] = useState<NetworkContextState>({
    isOnline: navigator.onLine,
    isReconnecting: false,
    supabaseConnected: true, // Assume connected initially
    lastOnlineAt: new Date(),
    reconnectAttempts: 0,
  });

  const checkConnection = async (): Promise<boolean> => {
    try {
      // Simple check using a tiny request to verify actual connectivity
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('/api/ping', {
        method: 'HEAD',
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      setState(prev => ({
        ...prev,
        isOnline: true,
        isReconnecting: true, // Set to reconnecting while we verify the actual connection
      }));
      
      // Verify connection is actually working
      checkConnection().then(connected => {
        setState(prev => ({
          ...prev,
          isReconnecting: false,
          supabaseConnected: connected,
          lastOnlineAt: new Date(),
          reconnectAttempts: 0,
        }));
      });
    };

    const handleOffline = () => {
      setState(prev => ({
        ...prev,
        isOnline: false,
        supabaseConnected: false,
        reconnectAttempts: prev.reconnectAttempts + 1,
      }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial connection check
    checkConnection().then(connected => {
      setState(prev => ({
        ...prev,
        supabaseConnected: connected,
      }));
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const value = {
    ...state,
    checkConnection,
  };

  return (
    <NetworkContext.Provider value={value}>
      {children}
    </NetworkContext.Provider>
  );
};
