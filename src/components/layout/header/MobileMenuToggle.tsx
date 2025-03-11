
import React from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuToggleProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({
  isMobileMenuOpen,
  toggleMobileMenu
}) => {
  return (
    <Button 
      variant="ghost"
      size="icon"
      className="p-1.5 text-gray-300 hover:text-white rounded-full hover:bg-gray-800/70 transition-colors md:hidden"
      onClick={toggleMobileMenu}
      aria-expanded={isMobileMenuOpen}
      aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
    >
      {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </Button>
  );
};
