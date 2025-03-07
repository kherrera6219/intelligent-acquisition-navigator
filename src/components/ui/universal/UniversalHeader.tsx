
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SessionTimeoutTimer } from '@/components/settings/SessionTimeoutTimer';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  Settings, 
  RefreshCw,
  ChevronDown,
  Database
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface UniversalHeaderProps {
  className?: string;
}

export const UniversalHeader: React.FC<UniversalHeaderProps> = ({ className }) => {
  const { refreshSession, user } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  
  return (
    <div className={cn(
      "w-full rounded-lg py-2 px-4 bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700",
      "flex items-center justify-between text-white shadow-md",
      className
    )}>
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition">
          <Database className="h-4 w-4" />
          <span className="font-medium">ProcurityIQ</span>
        </Link>
        
        <div className="h-4 border-r border-gray-600" />
        
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400">System Status:</span>
          <span className="flex items-center">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-1"></span>
            <span className="text-xs font-medium text-green-300">Online</span>
          </span>
        </div>
      </div>
      
      <div className="flex-1 mx-4">
        {searchOpen ? (
          <div className="max-w-xl mx-auto relative">
            <input 
              type="text" 
              placeholder="Search system..."
              className="w-full rounded-md bg-gray-800 border border-gray-600 py-1.5 px-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
              autoFocus
              onBlur={() => setSearchOpen(false)}
            />
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
              onClick={() => setSearchOpen(false)}
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="max-w-xl mx-auto px-2 opacity-0 hover:opacity-100 transition-opacity">
            <button 
              className="flex items-center gap-2 text-gray-400 hover:text-white text-sm py-1.5 px-3 rounded-md bg-gray-800/50 border border-gray-700 w-full justify-center transition-all"
              onClick={() => setSearchOpen(true)}
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
      
      <TooltipProvider>
        <div className="flex items-center gap-3">
          <Tooltip content="Refresh Session">
            <TooltipTrigger asChild>
              <button onClick={() => refreshSession()} className="text-gray-400 hover:text-white transition p-1.5 rounded-full hover:bg-gray-800">
                <RefreshCw className="h-4 w-4" />
              </button>
            </TooltipTrigger>
          </Tooltip>
          
          <SessionTimeoutTimer className="flex items-center gap-1 px-2 py-1 bg-gray-800 rounded text-xs" />
          
          <Tooltip content="Help">
            <TooltipTrigger asChild>
              <Link to="/help" className="text-gray-400 hover:text-white transition p-1.5 rounded-full hover:bg-gray-800">
                <HelpCircle className="h-4 w-4" />
              </Link>
            </TooltipTrigger>
          </Tooltip>
          
          <Tooltip content="Notifications">
            <TooltipTrigger asChild>
              <Link to="/notifications" className="text-gray-400 hover:text-white transition p-1.5 rounded-full hover:bg-gray-800 relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-[10px] flex items-center justify-center rounded-full h-3.5 w-3.5 font-medium">3</span>
              </Link>
            </TooltipTrigger>
          </Tooltip>
          
          <div className="h-4 border-r border-gray-600" />
          
          <Tooltip content="View Profile">
            <TooltipTrigger asChild>
              <Link to="/profile" className="flex items-center gap-2 text-sm">
                <div className="h-6 w-6 rounded-full bg-primary/20 text-primary ring-1 ring-gray-700 flex items-center justify-center text-xs font-medium">
                  {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-xs font-medium">{user?.email ? user.email.split('@')[0] : 'User'}</div>
                  <div className="text-[10px] text-gray-400">Admin</div>
                </div>
              </Link>
            </TooltipTrigger>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};
