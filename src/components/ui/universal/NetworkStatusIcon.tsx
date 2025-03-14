
import React from 'react';
import { cn } from '@/lib/utils';
import { Wifi, WifiOff, AlertTriangle } from 'lucide-react';

interface NetworkStatusIconProps {
  isOnline?: boolean;
  status?: 'online' | 'offline' | 'limited' | 'reconnecting';
  className?: string;
  size?: number;
}

export const NetworkStatusIcon: React.FC<NetworkStatusIconProps> = ({
  isOnline = true,
  status = 'online',
  className,
  size = 16
}) => {
  const statusToUse = status || (isOnline ? 'online' : 'offline');

  switch (statusToUse) {
    case 'online':
      return <Wifi className={cn("text-green-500", className)} size={size} />;
    case 'offline':
      return <WifiOff className={cn("text-red-500", className)} size={size} />;
    case 'limited':
    case 'reconnecting':
      return <AlertTriangle className={cn("text-amber-500", className)} size={size} />;
    default:
      return <Wifi className={cn("text-gray-500", className)} size={size} />;
  }
};
