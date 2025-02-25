
import React from 'react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { Wifi, WifiOff } from 'lucide-react';
import { cn } from "@/lib/utils";

interface NetworkStatusBannerProps {
  className?: string;
}

export const NetworkStatusBanner: React.FC<NetworkStatusBannerProps> = ({
  className
}) => {
  const isOnline = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-destructive text-destructive-foreground p-2 flex items-center justify-center gap-2 z-50",
        "animate-in slide-in-from-bottom duration-300",
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      <WifiOff className="h-4 w-4" />
      <span className="text-sm font-medium">
        You are currently offline. Some features may be unavailable.
      </span>
    </div>
  );
};
