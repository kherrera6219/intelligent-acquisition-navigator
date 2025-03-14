
import React, { useEffect, useState } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NetworkStatusIconProps {
  isOnline?: boolean;
  status?: 'online' | 'offline' | 'reconnecting';
  className?: string;
  showLabel?: boolean;
  iconSize?: number;
}

export const NetworkStatusIcon: React.FC<NetworkStatusIconProps> = ({
  isOnline,
  status,
  className,
  showLabel = false,
  iconSize = 16
}) => {
  const [animateIcon, setAnimateIcon] = useState(false);
  
  // Determine online status from either prop
  const online = isOnline !== undefined ? isOnline : status === 'online';
  
  // Animation effect when status changes
  useEffect(() => {
    setAnimateIcon(true);
    const timeout = setTimeout(() => setAnimateIcon(false), 1000);
    return () => clearTimeout(timeout);
  }, [online, status]);

  return (
    <div className={cn(
      "flex items-center gap-2 transition-opacity", 
      animateIcon ? "animate-pulse" : "",
      className
    )}>
      {online ? (
        <Wifi 
          className="text-green-500" 
          size={iconSize} 
        />
      ) : (
        <WifiOff 
          className="text-red-500" 
          size={iconSize} 
        />
      )}
      
      {showLabel && (
        <span className={cn(
          "text-xs font-medium",
          online ? "text-green-500" : "text-red-500"
        )}>
          {online ? "Online" : "Offline"}
        </span>
      )}
    </div>
  );
};
