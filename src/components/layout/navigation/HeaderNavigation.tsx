
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { navItems } from "./navItems";
import { useAuth } from "@/hooks/useAuth";
import { ChevronDown, Home, FileText, Map, HelpCircle, GlobeLock, Flag, Book, Shield, BarChart2 } from 'lucide-react';

export const HeaderNavigation: React.FC = () => {
  const { pathname } = useLocation();
  const { userRole } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Main menu items for our dropdown - consolidated list
  const mainMenuItems = [
    { label: 'Home', href: '/', icon: Home, description: "Public landing page" },
    { label: 'Dashboard', href: '/dashboard', icon: Home, description: "Main dashboard" },
    { label: 'Federal Acquisition', href: '/federal-acquisition', icon: GlobeLock, description: "Federal acquisition information" },
    { label: 'Texas Acquisition', href: '/texas-acquisition', icon: Flag, description: "Texas acquisition information" },
    { label: 'Market Research', href: '/market-research', icon: FileText, description: "Research market information" },
    { label: 'Knowledge Base', href: '/knowledge-base', icon: Book, description: "Browse knowledge resources" },
    { label: 'Compliance', href: '/compliance', icon: Shield, description: "View compliance information" },
    { label: 'Analytics', href: '/analytics', icon: BarChart2, description: "View analytics data" },
    { label: 'Sitemap', href: '/sitemap', icon: Map, description: "View all pages" },
    { label: 'Help', href: '/help', icon: HelpCircle, description: "Get help" }
  ];
  
  // Filter navItems to exclude items that are now in the dropdown
  const filteredNavItems = navItems.filter(item => 
    !mainMenuItems.some(menuItem => menuItem.href === item.href)
  );
  
  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <nav className="hidden md:ml-4 lg:ml-8 md:flex space-x-2 lg:space-x-4 xl:space-x-6">
      {/* Main dropdown menu */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`px-2 sm:px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-800 transition-colors flex items-center text-gray-300 hover:text-white ${isDropdownOpen ? 'bg-gray-800 text-white' : ''}`}
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
          title="Main Menu"
        >
          <span>Navigation</span>
          <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
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
                  title={item.description}
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
            className={`px-2 sm:px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-800 transition-colors 
              ${pathname === item.href ? 'text-white bg-gray-800' : 'text-gray-300'}`}
            title={item.label}
          >
            <div className="flex items-center">
              <item.icon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{item.label}</span>
            </div>
          </Link>
        ) : null
      ))}
    </nav>
  );
};
