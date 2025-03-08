
import { MobileNavItem } from "./MobileNavItem";
import { NavItem } from "./types";
import { motion } from "framer-motion";

interface MobileNavigationProps {
  isMobileMenuOpen: boolean;
  navItems: NavItem[];
  isAuthorized: (minRole?: string) => boolean;
  currentPath: string;
  openDropdown: string | null;
  toggleDropdown: (label: string) => void;
  isActiveRoute: (href: string, items?: NavItem[]) => boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  setOpenDropdown: (dropdown: string | null) => void;
}

export const MobileNavigation = ({
  isMobileMenuOpen,
  navItems,
  isAuthorized,
  currentPath,
  openDropdown,
  toggleDropdown,
  isActiveRoute,
  setIsMobileMenuOpen,
  setOpenDropdown
}: MobileNavigationProps) => {
  if (!isMobileMenuOpen) return null;
  
  return (
    <motion.nav 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="md:hidden py-3 px-2 border-t border-gray-800 max-h-[calc(100vh-6rem)] overflow-y-auto bg-gray-900/95 backdrop-blur-sm"
      aria-label="Mobile navigation"
    >
      <div className="flex flex-col space-y-1">
        {navItems.map((item) => (
          isAuthorized(item.minRole) && (
            <MobileNavItem
              key={item.label}
              item={item}
              currentPath={currentPath}
              openDropdown={openDropdown}
              toggleDropdown={toggleDropdown}
              isActiveRoute={isActiveRoute}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
              setOpenDropdown={setOpenDropdown}
            />
          )
        ))}
      </div>
    </motion.nav>
  );
};
