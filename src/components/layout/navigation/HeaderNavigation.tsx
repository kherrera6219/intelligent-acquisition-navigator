import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { navItems } from "./navItems";
import { useAuth } from "@/hooks/useAuth";
import { ChevronDown, Home, FileText, Map, HelpCircle, GlobeLock, Flag } from 'lucide-react';

export const HeaderNavigation: React.FC = () => {
  const { pathname } = useLocation();
  const { userRole } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Main menu items for our dropdown
  const mainMenuItems = [
    { label: 'Main Dashboard', href: '/dashboard', icon: Home },
    { label: 'Federal Acquisition', href: '/federal-acquisition', icon: GlobeLock },
    { label: 'Texas Acquisition', href: '/texas-acquisition', icon: Flag },
    { label: 'Sitemap', href: '/sitemap', icon: Map },
    { label: 'Help', href: '/help', icon: HelpCircle }
  ];
  
  // Filter navItems to exclude items that are now in the dropdown
  const filteredNavItems = navItems.filter(item => 
    !mainMenuItems.some(menuItem => menuItem.href === item.href)
  );
  
  return (
    <nav className="hidden md:ml-8 md:flex space-x-6">
      {/* Main dropdown menu */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-800 transition-colors flex items-center text-gray-300 hover:text-white`}
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
        >
          <span>Main</span>
          <ChevronDown className="ml-1 h-4 w-4" />
        </button>
        
        {isDropdownOpen && (
          <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-1" role="menu" aria-orientation="vertical">
              {mainMenuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`block px-4 py-2 text-sm transition-colors ${
                    pathname === item.href ? 'text-white bg-gray-800' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                  onClick={() => setIsDropdownOpen(false)}
                  role="menuitem"
                >
                  <div className="flex items-center">
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Rest of the navigation items */}
      {filteredNavItems.map((item) => (
        item.minRole === null || (userRole && item.minRole === 'authenticated') ? (
          <Link 
            key={item.label}
            to={item.href}
            className={`px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-800 transition-colors 
              ${pathname === item.href ? 'text-white bg-gray-800' : 'text-gray-300'}`}
          >
            <div className="flex items-center">
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </div>
          </Link>
        ) : null
      ))}
    </nav>
  );
};
