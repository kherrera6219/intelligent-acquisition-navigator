
import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";

export const HeaderProfile: React.FC = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { user, userRole, signOut } = useAuth();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <div className="relative" ref={profileRef}>
      <button
        onClick={toggleProfileMenu}
        className="flex items-center gap-2 text-sm text-gray-200 bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/15 transition-colors"
        aria-expanded={profileMenuOpen}
        aria-haspopup="true"
        aria-label="User profile menu"
      >
        <Avatar className="h-7 w-7 border border-white/20">
          <AvatarFallback className="bg-primary/80 text-white font-medium text-sm">
            {userRole ? userRole.charAt(0).toUpperCase() : 'U'}
          </AvatarFallback>
          <AvatarImage src={user?.user_metadata?.avatar_url} alt="User avatar" />
        </Avatar>
        <span className="hidden sm:inline font-medium">
          {userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : 'User'}
        </span>
      </button>

      <AnimatePresence>
        {profileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 border border-gray-700 ring-1 ring-black ring-opacity-5 z-50"
          >
            <div className="py-2 px-3 border-b border-gray-700">
              <p className="text-sm font-medium text-white">Signed in as</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
            <div className="py-1" role="menu" aria-orientation="vertical">
              <Link
                to="/profile"
                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                role="menuitem"
              >
                Your Profile
              </Link>
              <Link
                to="/settings"
                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                role="menuitem"
              >
                Settings
              </Link>
              <div className="border-t border-gray-700 my-1"></div>
              <button
                onClick={signOut}
                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                role="menuitem"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
