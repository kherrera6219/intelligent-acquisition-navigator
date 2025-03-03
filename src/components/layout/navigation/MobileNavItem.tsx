
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavItem } from "@/components/layout/navigation/types";

interface MobileNavItemProps {
  item: NavItem;
  currentPath: string;
  openDropdown: string | null;
  toggleDropdown: (label: string) => void;
  isActiveRoute: (href: string, items?: NavItem[]) => boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  setOpenDropdown: (dropdown: string | null) => void;
}

export const MobileNavItem = ({
  item,
  currentPath,
  openDropdown,
  toggleDropdown,
  isActiveRoute,
  setIsMobileMenuOpen,
  setOpenDropdown
}: MobileNavItemProps) => {
  if (item.items) {
    return (
      <div>
        <button
          onClick={() => toggleDropdown(item.label)}
          className={cn(
            "text-gray-400 hover:text-white transition-colors duration-200 px-4 py-2 rounded-lg flex items-center justify-between w-full",
            (openDropdown === item.label || isActiveRoute(item.href, item.items)) && "text-white bg-white/5"
          )}
        >
          <div className="flex items-center gap-2">
            <item.icon className="h-4 w-4" />
            {item.label}
          </div>
          {openDropdown === item.label ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        
        {openDropdown === item.label && (
          <div className="pl-8 mt-1 space-y-1">
            {item.items.map((subItem) => (
              <Link 
                key={subItem.href}
                to={subItem.href} 
                className={cn(
                  "text-gray-400 hover:text-white transition-colors duration-200 px-4 py-2 rounded-lg flex items-center gap-2",
                  currentPath === subItem.href && "text-white bg-white/5"
                )}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setOpenDropdown(null);
                }}
              >
                <subItem.icon className="h-4 w-4" />
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link 
      to={item.href} 
      className={cn(
        "text-gray-400 hover:text-white transition-colors duration-200 px-4 py-2 rounded-lg flex items-center gap-2",
        currentPath === item.href && "text-white bg-white/5"
      )}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <item.icon className="h-4 w-4" />
      {item.label}
    </Link>
  );
};
