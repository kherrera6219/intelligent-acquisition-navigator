
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderSearchProps {
  isMobile: boolean;
  mobileMenuOpen: boolean;
}

export const HeaderSearch: React.FC<HeaderSearchProps> = ({ isMobile, mobileMenuOpen }) => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className={cn("flex-1 mx-4", isMobile && !mobileMenuOpen && "hidden")}>
      {searchOpen ? (
        <div className="max-w-xl mx-auto relative">
          <input 
            type="text" 
            placeholder="Search system..."
            className="w-full rounded-md bg-gray-800 border border-gray-600 py-1.5 px-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none fluent-input"
            autoFocus
            onBlur={() => setSearchOpen(false)}
            aria-label="Search input"
          />
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
            onClick={() => setSearchOpen(false)}
            aria-label="Clear search"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="max-w-xl mx-auto px-2 opacity-0 hover:opacity-100 transition-opacity">
          <button 
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm py-1.5 px-3 rounded-md bg-gray-800/50 border border-gray-700 w-full justify-center transition-all fluent-button-secondary"
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="opacity-70">Search system...</span>
            <kbd className="ml-auto hidden md:inline-flex h-5 text-[10px] font-mono font-medium px-1.5 items-center gap-1 rounded border bg-gray-700 border-gray-600 text-gray-400">
              ⌘K
            </kbd>
          </button>
        </div>
      )}
    </div>
  );
};
