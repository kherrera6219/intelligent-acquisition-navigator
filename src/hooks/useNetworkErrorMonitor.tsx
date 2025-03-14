
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';

interface NetworkStats {
  success: number; 
  failed: number;
}

export function useNetworkErrorMonitor() {
  const [networkErrors, setNetworkErrors] = useState<Error[]>([]);
  const [isRetrying, setIsRetrying] = useState(false);
  const [networkStats, setNetworkStats] = useState<NetworkStats>({ success: 0, failed: 0 });
  const { isOnline } = useNetworkMonitor();
  const { toast } = useToast();

  // Function to add a network error
  const addNetworkError = (error: Error) => {
    setNetworkErrors(prev => [...prev, error]);
    setNetworkStats(prev => ({ ...prev, failed: prev.failed + 1 }));
    
    // Show toast for network error
    toast({
      title: 'Network Error',
      description: error.message || 'Unable to complete operation due to network issues',
      variant: 'destructive',
    });
  };

  // Function to retry all failed network operations
  const retryFailedOperations = async () => {
    if (networkErrors.length === 0 || !isOnline) return;
    
    setIsRetrying(true);
    
    // In a real application, you'd implement the retry logic for each specific operation
    // This is a simplified example
    setTimeout(() => {
      const successRate = isOnline ? 0.8 : 0; // 80% success rate when online
      const successful = Math.floor(networkErrors.length * successRate);
      const remainingErrors = networkErrors.slice(successful);
      
      setNetworkErrors(remainingErrors);
      setNetworkStats(prev => ({
        success: prev.success + successful,
        failed: remainingErrors.length
      }));
      
      setIsRetrying(false);
      
      toast({
        title: remainingErrors.length === 0 ? 'All operations recovered' : 'Partial recovery',
        description: `${successful} ${successful === 1 ? 'operation' : 'operations'} recovered, ${remainingErrors.length} still failed.`,
        variant: remainingErrors.length === 0 ? 'default' : 'destructive',
      });
    }, 2000);
  };

  // Clear errors when coming back online
  useEffect(() => {
    if (isOnline && networkErrors.length > 0 && !isRetrying) {
      // Auto-retry when coming back online
      retryFailedOperations();
    }
  }, [isOnline, networkErrors.length, isRetrying]);

  return {
    networkErrors,
    isRetrying,
    addNetworkError,
    retryFailedOperations,
    networkStats
  };
}
