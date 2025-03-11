
import React from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export interface HeaderUserMenuProps {
  user: any;
  mobileMenuOpen: boolean;
}

export const HeaderUserMenu: React.FC<HeaderUserMenuProps> = ({ user, mobileMenuOpen }) => {
  return (
    <>
      <Tooltip content="View Profile">
        <Link 
          to="/profile" 
          className="flex items-center gap-2 text-sm"
          aria-label="View profile"
        >
          <div className="h-6 w-6 rounded-full bg-primary/20 text-primary ring-1 ring-gray-700 flex items-center justify-center text-xs font-medium">
            {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-medium">{user?.email ? user.email.split('@')[0] : 'User'}</div>
            <div className="text-[10px] text-gray-400">Admin</div>
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
