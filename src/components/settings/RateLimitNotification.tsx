
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Card } from "@/components/ui/universal/Card";

interface RateLimitNotificationProps {
  isLimited: boolean;
  remainingTime?: number; // in seconds
}

export function RateLimitNotification({ isLimited, remainingTime }: RateLimitNotificationProps) {
  if (!isLimited) return null;
  
  const minutes = Math.floor((remainingTime || 0) / 60);
  const seconds = (remainingTime || 0) % 60;
  
  return (
    <Card className="p-4 border border-red-500/20 bg-red-500/5 mb-6">
      <div className="flex items-center gap-3">
        <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
        <div>
          <h3 className="font-medium text-white">Rate limit reached</h3>
          <p className="text-sm text-gray-400">
            You've reached the maximum number of requests. Please try again in 
            {remainingTime ? ` ${minutes}m ${seconds}s` : ' a few minutes'}.
          </p>
        </div>
      </div>
    </Card>
  );
}
