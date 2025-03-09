
import React from 'react';
import { useLocation } from "react-router-dom";
import { Menu, X, Search, Bell, Home, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems } from "./navigation/navItems";

export const UniversalInternalHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const { user, userRole, signOut } = useAuth();
  const [hasNotifications, setHasNotifications] = useState(true);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close the menu on location change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setProfileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-gray-900/90 backdrop-blur-md shadow-md" 
          : "bg-gray-900"
      }`}
    >
      <div className="container mx-auto">
        <div className="relative flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center">
              <div className="bg-primary/20 p-1.5 rounded-lg mr-2">
                <LayoutDashboard className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-semibold text-white">ProcurityIQ</span>
            </Link>
            
            {/* Desktop Navigation */}
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
          </div>

          {/* Search, Notifications and Profile */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-1.5 text-sm bg-gray-800/80 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all w-36 focus:w-52"
              />
            </div>
            
            {/* Notifications */}
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
            
            {/* Profile Menu */}
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
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button 
                variant="ghost"
                size="icon"
                className="p-1.5 text-gray-300 hover:text-white rounded-full hover:bg-gray-800/70 transition-colors"
                onClick={toggleMobileMenu}
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
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
    </header>
  );
};
