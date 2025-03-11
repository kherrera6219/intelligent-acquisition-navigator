
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ActivityErrorProps {
  message: string;
}

export const ActivityError: React.FC<ActivityErrorProps> = ({ message }) => {
  return (
    <div className="bg-red-500/10 text-red-500 p-2 rounded-md mb-3 text-sm flex items-center" role="alert">
      <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
};
