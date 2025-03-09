
import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { navItems } from "./navItems";
import { useAuth } from "@/hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";

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
            {navItems.map((item) => (
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
