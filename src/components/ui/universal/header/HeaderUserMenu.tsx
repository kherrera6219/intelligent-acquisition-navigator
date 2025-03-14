
import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, User } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export interface HeaderUserMenuProps {
  user: any;
  mobileMenuOpen?: boolean;
}

export const HeaderUserMenu: React.FC<HeaderUserMenuProps> = ({ user, mobileMenuOpen = false }) => {
  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : 'U';
  const displayName = user?.email ? user.email.split('@')[0] : 'User';
  const userRole = user?.role || 'User';

  return (
    <>
      <Tooltip content="View Profile">
        <Link 
          to="/profile" 
          className={cn(
            "flex items-center gap-3 text-sm rounded-lg px-3 py-1.5",
            "transition-colors duration-200",
            "hover:bg-gray-800/70 active:bg-gray-800/90",
            "focus:outline-none focus:ring-2 focus:ring-primary/30 focus-visible:ring-2"
          )}
          aria-label="View profile"
        >
          <div className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium",
            "bg-primary/20 text-primary ring-1 ring-gray-700",
            "shadow-inner shadow-black/10"
          )}>
            {userInitial}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-sm font-medium">{displayName}</div>
            <div className="text-xs text-gray-400">{userRole}</div>
          </div>
        </Link>
      </Tooltip>
      
      {mobileMenuOpen && (
        <Link 
          to="/settings" 
          className={cn(
            "text-gray-400 hover:text-white transition flex items-center gap-2 w-full mt-2 py-1",
            "rounded-md px-2 hover:bg-gray-800/50"
          )}
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Link>
      )}
    </>
  );
};
