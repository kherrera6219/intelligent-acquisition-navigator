
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
            "text-gray-400 hover:text-white whitespace-nowrap transition-colors duration-200 hover:bg-white/5 px-3 py-1 rounded-full flex items-center gap-2",
            (openDropdown === item.label || isActiveRoute(item.href, item.items)) && "text-white bg-white/5"
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
          {openDropdown === item.label ? (
            <ChevronUp className="h-3 w-3 ml-1" />
          ) : (
            <ChevronDown className="h-3 w-3 ml-1" />
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
        "text-gray-400 hover:text-white whitespace-nowrap transition-colors duration-200 hover:bg-white/5 px-3 py-1 rounded-full flex items-center gap-2",
        currentPath === item.href && "text-white bg-white/5"
      )}
    >
      <item.icon className="h-4 w-4" />
      {item.label}
    </Link>
  );
};
