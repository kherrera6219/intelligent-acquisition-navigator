
import { useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
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

  const handleOnline = useCallback(() => {
    // Double check with server to confirm online status
    setIsReconnecting(true);
    checkServerConnection(pingEndpoint).then((result) => {
      if (result.success) {
        updateConnectionStatus(true, result.latency);
        updateNetworkInfo();
        
        if (showToasts) {
          toast({
            title: "Back online",
            description: "Your network connection has been restored.",
            variant: "default"
          });
        }
        
        if (onConnectionChange) {
          onConnectionChange({
            ...connectionQuality,
            isOnline: true,
            latency: result.latency,
            lastChecked: new Date()
          });
        }
      }
      setIsReconnecting(false);
    });
  }, [
    connectionQuality, 
    updateConnectionStatus, 
    updateNetworkInfo, 
    setIsReconnecting, 
    showToasts, 
    onConnectionChange, 
    pingEndpoint, 
    toast
  ]);

  const handleOffline = useCallback(() => {
    updateConnectionStatus(false, null);
    
    if (showToasts) {
      toast({
        title: "You are offline",
        description: "Please check your network connection.",
        variant: "destructive"
      });
    }
    
    if (onConnectionChange) {
      onConnectionChange({
        ...connectionQuality,
        isOnline: false,
        latency: null,
        lastChecked: new Date()
      });
    }
  }, [connectionQuality, updateConnectionStatus, showToasts, onConnectionChange, toast]);

  return { handleOnline, handleOffline };
}
