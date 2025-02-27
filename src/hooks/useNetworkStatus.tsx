
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Back online",
        description: "Your network connection has been restored.",
        variant: "default"
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "You are offline",
        description: "Please check your network connection.",
        variant: "destructive"
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  return isOnline;
}
