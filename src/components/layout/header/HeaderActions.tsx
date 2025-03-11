
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { HeaderRight } from "../navigation/HeaderRight";

interface HeaderActionsProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  userRole: string | null;
  isAuthenticated: boolean;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({
  isMobileMenuOpen,
  toggleMobileMenu,
  userRole,
  isAuthenticated
}) => {
  const { signOut } = useAuth();
  const [hasNotifications, setHasNotifications] = useState(true);

  return (
    <>
      <div className="hidden md:flex items-center space-x-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-9 pr-4 py-1.5 text-sm bg-gray-800/80 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all w-36 focus:w-52"
          />
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative p-1.5 text-gray-300 hover:text-white rounded-full hover:bg-gray-800/70 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {hasNotifications && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"
            />
          )}
        </Button>
        
        {isAuthenticated ? (
          <HeaderRight 
            userRole={userRole}
            signOut={signOut}
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
          />
        ) : (
          <Link to="/auth">
            <Button 
              variant="default" 
              size="sm" 
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Sign In
            </Button>
          </Link>
        )}
      </div>
      
      <div className="flex items-center md:hidden space-x-3">
        {!isAuthenticated && (
          <Link to="/auth">
            <Button 
              variant="default" 
              size="sm" 
              className="bg-primary hover:bg-primary/90 text-white mr-2"
            >
              Sign In
            </Button>
          </Link>
        )}
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative p-1.5 text-gray-300 hover:text-white rounded-full hover:bg-gray-800/70 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {hasNotifications && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"
            />
          )}
        </Button>
      </div>
    </>
  );
};
