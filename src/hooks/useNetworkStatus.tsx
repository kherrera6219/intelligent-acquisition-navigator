
import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";

interface NetworkStatusState {
  isOnline: boolean;
  lastChecked: Date | null;
  connectionType: string | null;
  effectiveType: string | null;
  downlink: number | null;
  rtt: number | null;
}

export function useNetworkStatus() {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatusState>({
    isOnline: window.navigator.onLine,
    lastChecked: new Date(),
    connectionType: null,
    effectiveType: null,
    downlink: null,
    rtt: null
  });
  const { toast } = useToast();

  // Function to test connection to server
  const checkServerConnection = useCallback(async () => {
    try {
      // Try to fetch a small resource from the server with cache busting
      const response = await fetch(`/api/ping?_=${Date.now()}`, { 
        method: 'HEAD',
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' }
      });
      return response.ok;
    } catch (error) {
      console.warn('Failed to connect to server:', error);
      return false;
    }
  }, []);

  // Update network information when available
  const updateNetworkInfo = useCallback(() => {
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;
    
    if (connection) {
      setNetworkStatus(prev => ({
        ...prev,
        connectionType: connection.type,
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        lastChecked: new Date()
      }));
    }
  }, []);

  const handleOnline = useCallback(() => {
    // Double check with server to confirm online status
    checkServerConnection().then(isServerReachable => {
      if (isServerReachable) {
        setNetworkStatus(prev => ({
          ...prev,
          isOnline: true,
          lastChecked: new Date()
        }));
        updateNetworkInfo();
        toast({
          title: "Back online",
          description: "Your network connection has been restored.",
          variant: "default"
        });
      }
    });
  }, [checkServerConnection, toast, updateNetworkInfo]);

  const handleOffline = useCallback(() => {
    setNetworkStatus(prev => ({
      ...prev,
      isOnline: false,
      lastChecked: new Date()
    }));
    toast({
      title: "You are offline",
      description: "Please check your network connection.",
      variant: "destructive"
    });
  }, [toast]);

  // Setup event listeners for online/offline events
  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Setup connection change event listener if available
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;
    
    if (connection) {
      connection.addEventListener('change', updateNetworkInfo);
      // Initialize network info
      updateNetworkInfo();
    }

    // Initial check with server
    if (window.navigator.onLine) {
      checkServerConnection().then(isServerReachable => {
        if (!isServerReachable && networkStatus.isOnline) {
          handleOffline();
        }
      });
    }

    // Set up periodic check when online
    const intervalId = setInterval(() => {
      if (window.navigator.onLine) {
        checkServerConnection().then(isServerReachable => {
          if (!isServerReachable && networkStatus.isOnline) {
            handleOffline();
          } else if (isServerReachable && !networkStatus.isOnline) {
            handleOnline();
          }
        });
      }
    }, 30000); // Check every 30 seconds

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (connection) {
        connection.removeEventListener('change', updateNetworkInfo);
      }
      clearInterval(intervalId);
    };
  }, [handleOnline, handleOffline, updateNetworkInfo, checkServerConnection, networkStatus.isOnline]);

  return networkStatus.isOnline;
}
