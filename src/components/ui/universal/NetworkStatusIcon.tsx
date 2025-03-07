
import React, { useEffect, useState } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NetworkStatusIconProps {
  isOnline: boolean;
  className?: string;
  showLabel?: boolean;
  iconSize?: number;
}

export const NetworkStatusIcon: React.FC<NetworkStatusIconProps> = ({
  isOnline,
  className,
  showLabel = false,
  iconSize = 16
}) => {
  const [animateIcon, setAnimateIcon] = useState(false);
  
  // Animation effect when status changes
  useEffect(() => {
    setAnimateIcon(true);
    const timeout = setTimeout(() => setAnimateIcon(false), 1000);
    return () => clearTimeout(timeout);
  }, [isOnline]);

  return (
    <div className={cn(
      "flex items-center gap-2 transition-opacity", 
      animateIcon ? "animate-pulse" : "",
      className
    )}>
      {isOnline ? (
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
          isOnline ? "text-green-500" : "text-red-500"
        )}>
          {isOnline ? "Online" : "Offline"}
        </span>
      )}
    </div>
  );
};
