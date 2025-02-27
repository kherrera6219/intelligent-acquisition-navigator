
import React, { useState, useEffect } from 'react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { WifiOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NetworkStatusBannerProps {
  className?: string;
}

const NetworkStatusBanner: React.FC<NetworkStatusBannerProps> = ({ className }) => {
  const isOnline = useNetworkStatus();
  const [isVisible, setIsVisible] = useState(!isOnline);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsVisible(!isOnline);
  }, [isOnline]);

  const handleRefresh = () => {
    setIsAnimating(true);
    window.location.reload();
  };

  if (isOnline && !isVisible) {
    return null;
  }

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 p-4 animate-in fade-in slide-in-from-bottom duration-300",
        className
      )}
    >
      <Alert variant="destructive" className="border-red-600 bg-red-600/90 backdrop-blur-sm text-white">
        <WifiOff className="h-5 w-5" />
        <AlertTitle className="text-white">You are currently offline</AlertTitle>
        <AlertDescription className="text-white/90 flex items-center justify-between">
          <span>Some features may be unavailable until your connection is restored.</span>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white/20 hover:bg-white/30 text-white border-white/40 mt-2 md:mt-0"
            onClick={handleRefresh}
          >
            <RefreshCw className={cn("h-4 w-4 mr-2", isAnimating && "animate-spin")} />
            Refresh
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default NetworkStatusBanner;
