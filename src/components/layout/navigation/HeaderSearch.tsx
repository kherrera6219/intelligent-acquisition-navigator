
import React from 'react';
import { Search } from "lucide-react";

export const HeaderSearch: React.FC = () => {
  return (
    <div className="relative hidden md:block">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input 
        type="text" 
        placeholder="Search..." 
        className="pl-9 pr-4 py-1.5 text-sm bg-gray-800/80 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all w-36 focus:w-52"
      />
    </div>
  );
};
