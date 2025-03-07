
import React from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export const LoadingOverlay: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[200px] flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
};
