
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ConnectionQuality {
  isOnline: boolean;
  latency: number | null;
  connectionType: string | null;
  effectiveConnectionType: string | null;
  downlink: number | null;
  lastChecked: Date;
}

interface ConnectionCheckResult {
  success: boolean;
  latency: number | null;
}

interface ConnectionMonitorOptions {
  pingEndpoint?: string;
  pingInterval?: number;
  showToasts?: boolean;
  onConnectionChange?: (status: ConnectionQuality) => void;
}

export function useNetworkConnectionMonitor(options: ConnectionMonitorOptions = {}) {
  const {
    pingEndpoint = '/api/ping',
    pingInterval = 30000,
    showToasts = true,
    onConnectionChange
  } = options;
  
  const [connectionQuality, setConnectionQuality] = useState<ConnectionQuality>({
    isOnline: navigator.onLine,
    latency: null,
    connectionType: null,
    effectiveConnectionType: null,
    downlink: null,
    lastChecked: new Date()
  });
  
  const [isReconnecting, setIsReconnecting] = useState(false);
  const { toast } = useToast();

  // Function to check connection with server
  const checkServerConnection = useCallback(async (): Promise<ConnectionCheckResult> => {
    if (!navigator.onLine) return { success: false, latency: null };
    
    setIsReconnecting(true);
    const startTime = performance.now();
    
    try {
      // Try to fetch a small resource from the server with cache busting
      const response = await fetch(`${pingEndpoint}?_=${Date.now()}`, { 
        method: 'HEAD',
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' }
      });
      
      const endTime = performance.now();
      const latency = endTime - startTime;
      
      if (response.ok) {
        return { success: true, latency };
      }
      
      return { success: false, latency };
    } catch (error) {
      console.warn('Failed to connect to server:', error);
      return { success: false, latency: null };
    } finally {
      setIsReconnecting(false);
    }
  }, [pingEndpoint]);

  // Update network information when available
  const updateNetworkInfo = useCallback(() => {
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;
    
    if (connection) {
      const connectionType = connection.type;
      const effectiveConnectionType = connection.effectiveType;
      const downlink = connection.downlink;

      setConnectionQuality(prev => ({
        ...prev,
        connectionType,
        effectiveConnectionType,
        downlink,
        lastChecked: new Date()
      }));
    }
  }, []);

  const handleOnline = useCallback(async () => {
    // Double check server connection
    const result = await checkServerConnection();
    
    if (result.success) {
      const newState = {
        isOnline: true,
        latency: result.latency,
        connectionType: connectionQuality.connectionType,
        effectiveConnectionType: connectionQuality.effectiveConnectionType,
        downlink: connectionQuality.downlink,
        lastChecked: new Date()
      };
      
      setConnectionQuality(newState);
      updateNetworkInfo();
      
      if (showToasts) {
        toast({
          title: "Connection Restored",
          description: result.latency 
            ? `Your internet connection has been restored (${Math.round(result.latency)}ms).` 
            : "Your internet connection has been restored.",
          variant: "default"
        });
      }
      
      if (onConnectionChange) {
        onConnectionChange(newState);
      }
    }
  }, [checkServerConnection, connectionQuality, updateNetworkInfo, showToasts, toast, onConnectionChange]);

  const handleOffline = useCallback(() => {
    const newState = {
      isOnline: false,
      latency: null,
      connectionType: connectionQuality.connectionType,
      effectiveConnectionType: connectionQuality.effectiveConnectionType,
      downlink: connectionQuality.downlink,
      lastChecked: new Date()
    };
    
    setConnectionQuality(newState);
    
    if (showToasts) {
      toast({
        title: "Offline",
        description: "Your internet connection has been lost. Some features may be unavailable.",
        variant: "destructive"
      });
    }
    
    if (onConnectionChange) {
      onConnectionChange(newState);
    }
  }, [connectionQuality, showToasts, toast, onConnectionChange]);

  // Forcibly refresh connection status
  const refreshConnectionStatus = useCallback(async () => {
    setIsReconnecting(true);
    const result = await checkServerConnection();
    
    const newState = {
      isOnline: result.success,
      latency: result.latency,
      connectionType: connectionQuality.connectionType,
      effectiveConnectionType: connectionQuality.effectiveConnectionType,
      downlink: connectionQuality.downlink,
      lastChecked: new Date()
    };
    
    setConnectionQuality(newState);
    updateNetworkInfo();
    setIsReconnecting(false);
    
    if (onConnectionChange) {
      onConnectionChange(newState);
    }
    
    return result.success;
  }, [checkServerConnection, connectionQuality, updateNetworkInfo, onConnectionChange]);

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
    if (navigator.onLine) {
      checkServerConnection().then((result) => {
        if (!result.success && connectionQuality.isOnline) {
          handleOffline();
        }
      });
    }

    // Set up periodic check
    const intervalId = setInterval(() => {
      if (navigator.onLine) {
        checkServerConnection().then((result) => {
          const newState = {
            isOnline: result.success,
            latency: result.latency,
            connectionType: connectionQuality.connectionType,
            effectiveConnectionType: connectionQuality.effectiveConnectionType,
            downlink: connectionQuality.downlink,
            lastChecked: new Date()
          };
          
          if (result.success !== connectionQuality.isOnline) {
            setConnectionQuality(newState);
            
            if (result.success) {
              handleOnline();
            } else {
              handleOffline();
            }
          } else if (result.success) {
            // Just update latency if we're still online
            setConnectionQuality(prev => ({
              ...prev,
              latency: result.latency,
              lastChecked: new Date()
            }));
          }
          
          if (onConnectionChange) {
            onConnectionChange(newState);
          }
        });
      }
    }, pingInterval);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (connection) {
        connection.removeEventListener('change', updateNetworkInfo);
      }
      clearInterval(intervalId);
    };
  }, [
    handleOnline, 
    handleOffline, 
    updateNetworkInfo, 
    checkServerConnection, 
    connectionQuality.isOnline,
    pingInterval,
    onConnectionChange
  ]);

  return {
    ...connectionQuality,
    isReconnecting,
    refreshConnectionStatus
  };
}
