
import React from 'react';
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  isLoading?: boolean;
  message?: string;
  className?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading = true,
  message = "Loading...",
  className
}) => {
  if (!isLoading) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50",
        "animate-in fade-in duration-200",
        className
      )}
    >
      <div className="bg-black/80 p-6 rounded-lg shadow-xl flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-white text-sm">{message}</p>
      </div>
    </div>
  );
};
