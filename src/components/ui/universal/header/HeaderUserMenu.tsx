
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Settings, User, LogOut, Bell, CreditCard, Lock, HelpCircle } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip/Tooltip';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

export interface HeaderUserMenuProps {
  user: any;
  mobileMenuOpen?: boolean;
}

export const HeaderUserMenu: React.FC<HeaderUserMenuProps> = ({ user, mobileMenuOpen = false }) => {
  const { signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : 'U';
  const displayName = user?.email ? user.email.split('@')[0] : 'User';
  const userRole = user?.role || 'User';

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // User menu items
  const menuItems = [
    { label: 'Profile', href: '/profile', icon: User },
    { label: 'Account Settings', href: '/settings', icon: Settings },
    { label: 'Notifications', href: '/notifications', icon: Bell },
    { label: 'Billing', href: '/billing', icon: CreditCard },
    { label: 'Security', href: '/security', icon: Lock },
    { label: 'Help & Support', href: '/help', icon: HelpCircle },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <Tooltip content="Your Profile">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={cn(
            "flex items-center gap-3 text-sm rounded-lg px-3 py-1.5",
            "transition-colors duration-200",
            "hover:bg-gray-800/70 active:bg-gray-800/90",
            "focus:outline-none focus:ring-2 focus:ring-primary/30 focus-visible:ring-2",
            isMenuOpen && "bg-gray-800/70"
          )}
          aria-label="View profile options"
          aria-expanded={isMenuOpen}
          aria-haspopup="true"
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
        </button>
      </Tooltip>
      
      {/* User Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-50">
          <div className="p-3 border-b border-gray-700">
            <div className="font-medium text-sm text-white">{displayName}</div>
            <div className="text-xs text-gray-400 truncate">{user?.email}</div>
          </div>
          
          <div className="py-1">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="border-t border-gray-700 py-1">
            <button
              onClick={async () => {
                setIsMenuOpen(false);
                await signOut?.();
              }}
              className="flex items-center w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 hover:text-red-300"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      )}
      
      {/* Mobile Menu Version */}
      {mobileMenuOpen && (
        <div className="mt-4 space-y-2 w-full">
          {menuItems.map((item) => (
            <Link 
              key={item.label}
              to={item.href} 
              className="text-gray-400 hover:text-white transition flex items-center gap-2 w-full py-2 px-3 rounded-md hover:bg-gray-800/50"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          ))}
          
          <button
            onClick={async () => await signOut?.()}
            className="text-red-400 hover:text-red-300 transition flex items-center gap-2 w-full py-2 px-3 rounded-md hover:bg-gray-800/50 mt-4"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};
