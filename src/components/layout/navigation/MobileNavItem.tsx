
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
      <div className="mb-1">
        <button
          onClick={() => toggleDropdown(item.label)}
          className={cn(
            "text-gray-300 hover:text-white transition-all duration-200",
            "px-4 py-2.5 rounded-lg flex items-center justify-between w-full",
            (openDropdown === item.label || isActiveRoute(item.href, item.items)) && 
            "text-white bg-gray-800/70"
          )}
          aria-expanded={openDropdown === item.label}
          aria-haspopup="true"
        >
          <div className="flex items-center gap-3">
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </div>
          {openDropdown === item.label ? (
            <ChevronUp className="h-4 w-4 opacity-70" />
          ) : (
            <ChevronDown className="h-4 w-4 opacity-70" />
          )}
        </button>
        
        {openDropdown === item.label && (
          <div className="pl-6 mt-1 space-y-0.5 border-l border-gray-700 ml-4">
            {item.items.map((subItem) => (
              <Link 
                key={subItem.href}
                to={subItem.href} 
                className={cn(
                  "text-gray-400 hover:text-white transition-all duration-200",
                  "px-4 py-2 rounded-lg flex items-center gap-3 block",
                  currentPath === subItem.href && "text-white bg-gray-800/50"
                )}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setOpenDropdown(null);
                }}
              >
                <subItem.icon className="h-4 w-4" />
                <span>{subItem.label}</span>
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
        "text-gray-300 hover:text-white transition-all duration-200",
        "px-4 py-2.5 rounded-lg flex items-center gap-3 mb-1",
        currentPath === item.href && "text-white bg-gray-800/70"
      )}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <item.icon className="h-5 w-5" />
      <span className="font-medium">{item.label}</span>
    </Link>
  );
};
