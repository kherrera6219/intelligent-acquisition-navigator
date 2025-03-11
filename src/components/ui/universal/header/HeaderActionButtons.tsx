
import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, HelpCircle, Bell } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { SessionTimeoutTimer } from '@/components/settings/SessionTimeoutTimer';

export interface HeaderActionButtonsProps {
  refreshSession?: () => Promise<void>;
  mobileMenuOpen?: boolean;
  isMobile?: boolean;
}

export const HeaderActionButtons: React.FC<HeaderActionButtonsProps> = ({ 
  refreshSession, 
  mobileMenuOpen = false,
  isMobile = false
}) => {
  return (
    <>
      {refreshSession && (
        <Tooltip content="Refresh Session">
          <button 
            onClick={() => refreshSession()} 
            className="text-gray-400 hover:text-white transition p-2 rounded-full hover:bg-gray-800"
            aria-label="Refresh session"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </Tooltip>
      )}
      
      {refreshSession && <SessionTimeoutTimer className="hidden lg:flex items-center gap-1 px-3 py-1.5 bg-gray-800/80 backdrop-blur-md rounded-lg text-sm" />}
      
      <Tooltip content="Help">
        <Link 
          to="/help" 
          className="text-gray-400 hover:text-white transition p-2 rounded-full hover:bg-gray-800"
          aria-label="Help"
        >
          <HelpCircle className="h-5 w-5" />
        </Link>
      </Tooltip>
      
      {refreshSession && (
        <Tooltip content="Notifications">
          <Link 
            to="/notifications" 
            className="text-gray-400 hover:text-white transition p-2 rounded-full hover:bg-gray-800 relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span 
              className="absolute -top-0.5 -right-0.5 bg-red-500 text-xs flex items-center justify-center rounded-full h-4 w-4 font-medium"
              aria-label="3 unread notifications"
            >3</span>
          </Link>
        </Tooltip>
      )}
      
      <div className={cn("h-5 border-r border-gray-600", mobileMenuOpen && "hidden")} />
    </>
  );
};
