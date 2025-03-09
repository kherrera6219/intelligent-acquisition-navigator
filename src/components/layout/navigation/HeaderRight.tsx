
import { Link } from "react-router-dom";
import { LogOut, User, ChevronDown, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderRightProps {
  userRole: string | null;
  signOut: () => Promise<void>;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export const HeaderRight = ({
  userRole,
  signOut,
  isMobileMenuOpen,
  toggleMobileMenu
}: HeaderRightProps) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle profile menu
  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <div className="flex items-center gap-4">
      {userRole && (
        <div className="flex items-center gap-3">
          <div className="relative" ref={menuRef}>
            <button
              onClick={toggleProfileMenu}
              className="flex items-center gap-2 text-sm text-gray-200 bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/15 transition-colors"
              aria-expanded={profileMenuOpen}
              aria-haspopup="true"
              aria-label="User profile menu"
            >
              <Avatar className="h-7 w-7 border border-white/20">
                <AvatarFallback className="bg-primary/80 text-white font-medium text-sm">
                  {userRole.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline font-medium">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </span>
              <ChevronDown className="h-4 w-4 opacity-70" />
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
                    <p className="text-xs text-gray-400 truncate">{userRole}</p>
                  </div>
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      role="menuitem"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Your Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      role="menuitem"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                    <div className="border-t border-gray-700 my-1"></div>
                    <button
                      onClick={signOut}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      role="menuitem"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};
