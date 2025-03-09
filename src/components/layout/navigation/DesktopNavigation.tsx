
import { ReactNode } from "react";
import { DesktopNavItem } from "./DesktopNavItem";
import { NavItem } from "./types";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface DesktopNavigationProps {
  navItems: NavItem[];
  currentPath: string;
  openDropdown: string | null;
  toggleDropdown: (label: string) => void;
  isActiveRoute: (href: string, items?: NavItem[]) => boolean;
  isAuthorized: (minRole?: string) => boolean;
}

export const DesktopNavigation = ({
  navItems,
  currentPath,
  openDropdown,
  toggleDropdown,
  isActiveRoute,
  isAuthorized
}: DesktopNavigationProps) => {
  
  const renderDropdownItems = (items?: NavItem[]) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="py-1">
        {items.map((item) => (
          isAuthorized(item.minRole) && (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white",
                currentPath === item.href && "bg-gray-800 text-white"
              )}
            >
              <div className="flex items-center gap-2">
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </div>
            </Link>
          )
        ))}
      </div>
    );
  };
  
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
