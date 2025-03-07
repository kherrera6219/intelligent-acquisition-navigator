
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';

// Import the new component parts
import { HeaderLogo } from './header/HeaderLogo';
import { HeaderSystemStatus } from './header/HeaderSystemStatus';
import { HeaderMobileMenu } from './header/HeaderMobileMenu';
import { HeaderSearch } from './header/HeaderSearch';
import { HeaderContent } from './header/HeaderContent';

interface UniversalHeaderProps {
  className?: string;
}

export const UniversalHeader: React.FC<UniversalHeaderProps> = ({ className }) => {
  const { refreshSession, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Close mobile menu when screen size changes
  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile]);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <div className={cn(
      "w-full rounded-lg py-2 px-4 bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700",
      "flex items-center justify-between text-white shadow-md fluent-acrylic",
      className
    )}>
      <div className="flex items-center space-x-4">
        <HeaderLogo />
        
        <div className="h-4 border-r border-gray-600" />
        
        <HeaderSystemStatus />
      </div>
      
      {/* Mobile Menu Button */}
      <HeaderMobileMenu 
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      
      {/* Search Bar */}
      <HeaderSearch 
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
      />
      
      {/* Header Right Content (Actions and User Menu) */}
      <HeaderContent 
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        refreshSession={refreshSession}
        user={user}
      />
    </div>
  );
};
