
import { MobileNavItem } from "./MobileNavItem";
import { NavItem } from "./types";

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
    <nav className="md:hidden py-4 border-t border-gray-800">
      <div className="flex flex-col gap-2">
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
    </nav>
  );
};
