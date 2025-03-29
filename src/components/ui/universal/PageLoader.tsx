
import React from 'react';
import { MsLoading } from "@/components/ui/ms-loading";

interface PageLoaderProps {
  message?: string;
  variant?: 'standard' | 'minimal' | 'fluent' | 'fullscreen';
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const PageLoader: React.FC<PageLoaderProps> = ({ 
  message = "Loading...",
  variant = 'standard',
  size = 'md'
}) => {
  if (variant === 'minimal') {
    return (
      <div className="flex items-center justify-center p-4 min-h-[200px]">
        <MsLoading size={size} message={message} variant="spinner" />
      </div>
    );
  }
  
  if (variant === 'fluent') {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm z-50">
        <div className="ms-fluent-card p-8 ms-motion-fadeIn flex flex-col items-center loading-scale-in">
          <MsLoading variant="progress" size={size} className="mb-4" />
          <p className="text-lg font-semibold text-foreground mt-4 ms-loading-dots">{message}</p>
        </div>
      </div>
    );
  }

  if (variant === 'fullscreen') {
    return (
      <MsLoading
        variant="spinner"
        size={size}
        message={message}
        fullscreen={true}
      />
    );
  }
  
  // Standard variant
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="text-center loading-scale-in">
        <MsLoading size={size} variant="spinner" />
        <p className="mt-4 text-muted-foreground font-medium">{message}</p>
      </div>
    </div>
  );
};
