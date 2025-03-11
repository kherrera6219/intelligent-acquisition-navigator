
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
          className="flex items-center gap-3 text-sm"
          aria-label="View profile"
        >
          <div className="h-8 w-8 rounded-full bg-primary/20 text-primary ring-1 ring-gray-700 flex items-center justify-center text-sm font-medium">
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
          className="text-gray-400 hover:text-white transition flex items-center gap-2 w-full mt-2 py-1"
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Link>
      )}
    </>
  );
};
