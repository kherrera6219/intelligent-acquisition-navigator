
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ConnectionQuality } from './types';
import { checkServerConnection } from './connectionUtils';

interface NetworkEventsProps {
  connectionQuality: ConnectionQuality;
  updateConnectionStatus: (isOnline: boolean, latency: number | null) => void;
  updateNetworkInfo: () => void;
  setIsReconnecting: (value: boolean) => void;
  showToasts: boolean;
  onConnectionChange?: (status: ConnectionQuality) => void;
  pingEndpoint: string;
}

/**
 * Hook for handling network status change events
 */
export function useNetworkEvents({
  connectionQuality,
  updateConnectionStatus,
  updateNetworkInfo,
  setIsReconnecting,
  showToasts,
  onConnectionChange,
  pingEndpoint
}: NetworkEventsProps) {
  const { toast } = useToast();

  const handleOnline = useCallback(async () => {
    // Double check server connection
    setIsReconnecting(true);
    const result = await checkServerConnection(pingEndpoint);
    setIsReconnecting(false);
    
    if (result.success) {
      updateConnectionStatus(true, result.latency);
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
        const newState = {
          ...connectionQuality,
          isOnline: true,
          latency: result.latency,
          lastChecked: new Date()
        };
        onConnectionChange(newState);
      }
    }
  }, [connectionQuality, updateConnectionStatus, updateNetworkInfo, setIsReconnecting, showToasts, toast, onConnectionChange, pingEndpoint]);

  const handleOffline = useCallback(() => {
    updateConnectionStatus(false, null);
    
    if (showToasts) {
      toast({
        title: "Offline",
        description: "Your internet connection has been lost. Some features may be unavailable.",
        variant: "destructive"
      });
    }
    
    if (onConnectionChange) {
      const newState = {
        ...connectionQuality,
        isOnline: false,
        latency: null,
        lastChecked: new Date()
      };
      onConnectionChange(newState);
    }
  }, [connectionQuality, updateConnectionStatus, showToasts, toast, onConnectionChange]);

  return {
    handleOnline,
    handleOffline
  };
}
