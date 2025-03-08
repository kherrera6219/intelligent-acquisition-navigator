
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavItem } from "@/components/layout/navigation/types";

interface DesktopNavItemProps {
  item: NavItem;
  currentPath: string;
  openDropdown: string | null;
  toggleDropdown: (label: string) => void;
  isActiveRoute: (href: string, items?: NavItem[]) => boolean;
  renderDropdownItems: (items?: NavItem[]) => React.ReactNode;
}

export const DesktopNavItem = ({
  item,
  currentPath,
  openDropdown,
  toggleDropdown,
  isActiveRoute,
  renderDropdownItems
}: DesktopNavItemProps) => {
  if (item.items) {
    return (
      <div className="relative">
        <button
          onClick={() => toggleDropdown(item.label)}
          className={cn(
            "text-gray-300 hover:text-white whitespace-nowrap transition-all duration-200",
            "px-3 py-1.5 rounded-full flex items-center gap-2 hover:bg-gray-800/70",
            (openDropdown === item.label || isActiveRoute(item.href, item.items)) && 
            "text-white bg-gray-800/80"
          )}
          aria-expanded={openDropdown === item.label}
          aria-haspopup="true"
        >
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
          {openDropdown === item.label ? (
            <ChevronUp className="h-3 w-3 ml-1 opacity-70" />
          ) : (
            <ChevronDown className="h-3 w-3 ml-1 opacity-70" />
          )}
        </button>
        
        {/* Dropdown Menu */}
        {item.items && openDropdown === item.label && renderDropdownItems(item.items)}
      </div>
    );
  }

  return (
    <Link 
      to={item.href} 
      className={cn(
        "text-gray-300 hover:text-white whitespace-nowrap transition-all duration-200",
        "px-3 py-1.5 rounded-full flex items-center gap-2 hover:bg-gray-800/70",
        currentPath === item.href && "text-white bg-gray-800/80"
      )}
    >
      <item.icon className="h-4 w-4" />
      <span>{item.label}</span>
    </Link>
  );
};
