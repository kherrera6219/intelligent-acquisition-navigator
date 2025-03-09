
import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { navItems } from "./navItems";
import { useAuth } from "@/hooks/useAuth";

export const HeaderNavigation: React.FC = () => {
  const { pathname } = useLocation();
  const { userRole } = useAuth();
  
  return (
    <nav className="hidden md:ml-8 md:flex space-x-6">
      {navItems.map((item) => (
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
