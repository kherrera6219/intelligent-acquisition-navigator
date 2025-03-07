
import React from 'react';

export const HeaderSystemStatus: React.FC = () => {
  return (
    <div className="flex items-center gap-1">
      <span className="text-xs text-gray-400">System Status:</span>
      <span className="flex items-center">
        <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-1"></span>
        <span className="text-xs font-medium text-green-300">Online</span>
      </span>
    </div>
  );
};
