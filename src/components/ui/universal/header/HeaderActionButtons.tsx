
import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, HelpCircle, Bell } from 'lucide-react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { SessionTimeoutTimer } from '@/components/settings/SessionTimeoutTimer';

interface HeaderActionButtonsProps {
  refreshSession: () => Promise<void>;
  mobileMenuOpen: boolean;
  isMobile: boolean;
}

export const HeaderActionButtons: React.FC<HeaderActionButtonsProps> = ({ 
  refreshSession, 
  mobileMenuOpen,
  isMobile
}) => {
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <button 
            onClick={() => refreshSession()} 
            className="text-gray-400 hover:text-white transition p-1.5 rounded-full hover:bg-gray-800"
            aria-label="Refresh session"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Refresh Session</p>
        </TooltipContent>
      </Tooltip>
      
      <SessionTimeoutTimer className="flex items-center gap-1 px-2 py-1 bg-gray-800 rounded text-xs" />
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Link 
            to="/help" 
            className="text-gray-400 hover:text-white transition p-1.5 rounded-full hover:bg-gray-800"
            aria-label="Help"
          >
            <HelpCircle className="h-4 w-4" />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Help</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Link 
            to="/notifications" 
            className="text-gray-400 hover:text-white transition p-1.5 rounded-full hover:bg-gray-800 relative"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span 
              className="absolute -top-0.5 -right-0.5 bg-red-500 text-[10px] flex items-center justify-center rounded-full h-3.5 w-3.5 font-medium"
              aria-label="3 unread notifications"
            >3</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Notifications</p>
        </TooltipContent>
      </Tooltip>
      
      <div className={cn("h-4 border-r border-gray-600", mobileMenuOpen && "hidden")} />
    </>
  );
};
