
import React from 'react';
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuButtonProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ 
  isMobileMenuOpen, 
  toggleMobileMenu 
}) => {
  return (
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
  );
};
