import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { navItems } from "./navItems";
import { useAuth } from "@/hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Home, FileText, Map, HelpCircle, GlobeLock, Flag } from 'lucide-react';

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isMobileMenuOpen,
  menuRef
}) => {
  const { pathname } = useLocation();
  const { userRole } = useAuth();
  const [isMainDropdownOpen, setIsMainDropdownOpen] = useState(false);
  
  const mainMenuItems = [
    { label: 'Main Dashboard', href: '/dashboard', icon: Home },
    { label: 'Federal Acquisition', href: '/federal-acquisition', icon: GlobeLock },
    { label: 'Texas Acquisition', href: '/texas-acquisition', icon: Flag },
    { label: 'Sitemap', href: '/sitemap', icon: Map },
    { label: 'Help', href: '/help', icon: HelpCircle }
  ];
  
  const filteredNavItems = navItems.filter(item => 
    !mainMenuItems.some(menuItem => menuItem.href === item.href)
  );
  
  if (!isMobileMenuOpen) return null;
  
  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div 
          ref={menuRef}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-gray-900 border-t border-gray-800"
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            <div>
              <button
                onClick={() => setIsMainDropdownOpen(!isMainDropdownOpen)}
                className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-md text-base font-medium ${
                  isMainDropdownOpen ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                aria-expanded={isMainDropdownOpen}
              >
                <span>Main</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isMainDropdownOpen ? 'transform rotate-180' : ''}`} />
              </button>
              
              {isMainDropdownOpen && (
                <div className="pl-4 mt-1 space-y-1">
                  {mainMenuItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        pathname === item.href
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.label}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {filteredNavItems.map((item) => (
              item.minRole === null || (userRole && item.minRole === 'authenticated') ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === item.href
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </div>
                </Link>
              ) : null
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
