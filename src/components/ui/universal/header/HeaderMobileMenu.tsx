
import React from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderMobileMenuProps {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export const HeaderMobileMenu: React.FC<HeaderMobileMenuProps> = ({ 
  mobileMenuOpen, 
  toggleMobileMenu 
}) => {
  return (
    <button 
      className="md:hidden text-gray-400 hover:text-white transition p-1.5 rounded-full hover:bg-gray-800"
      onClick={toggleMobileMenu}
      aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      aria-expanded={mobileMenuOpen}
    >
      {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
    </button>
  );
};
