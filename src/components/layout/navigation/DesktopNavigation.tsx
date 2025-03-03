
import { ReactNode } from "react";
import { DesktopNavItem } from "./DesktopNavItem";
import { NavItem } from "./types";

interface DesktopNavigationProps {
  navItems: NavItem[];
  currentPath: string;
  openDropdown: string | null;
  toggleDropdown: (label: string) => void;
  isActiveRoute: (href: string, items?: NavItem[]) => boolean;
  isAuthorized: (minRole?: string) => boolean;
  renderDropdownItems: (items?: NavItem[]) => ReactNode;
}

export const DesktopNavigation = ({
  navItems,
  currentPath,
  openDropdown,
  toggleDropdown,
  isActiveRoute,
  isAuthorized,
  renderDropdownItems
}: DesktopNavigationProps) => {
  return (
    <nav className="hidden md:flex gap-6 overflow-x-auto pb-2 scrollbar-none">
      {navItems.map((item) => (
        isAuthorized(item.minRole) && (
          <DesktopNavItem
            key={item.label}
            item={item}
            currentPath={currentPath}
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
            isActiveRoute={isActiveRoute}
            renderDropdownItems={renderDropdownItems}
          />
        )
      ))}
    </nav>
  );
};
