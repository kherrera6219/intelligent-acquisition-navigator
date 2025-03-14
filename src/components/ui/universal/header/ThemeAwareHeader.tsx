
import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { HeaderLogo } from './HeaderLogo';
import { HeaderSystemStatus } from './HeaderSystemStatus';
import { ToggleTheme } from '@/components/ui/universal/ToggleTheme';

interface ThemeAwareHeaderProps {
  className?: string;
}

export const ThemeAwareHeader: React.FC<ThemeAwareHeaderProps> = ({ className }) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <header 
      className={cn(
        "w-full py-3 px-6 border-b transition-colors duration-300",
        theme === 'dark'
          ? "bg-gray-900 border-gray-800 text-white"
          : "bg-white border-gray-200 text-gray-900",
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <HeaderLogo />
          <HeaderSystemStatus />
        </div>
        
        <div className="flex items-center space-x-4">
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
};
