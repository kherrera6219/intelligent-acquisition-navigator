
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavItem } from "@/components/layout/navigation/types";
import { motion } from "framer-motion";

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
  const isActive = isActiveRoute(item.href, item.items);
  const isOpen = openDropdown === item.label;

  if (item.items) {
    return (
      <div className="relative">
        <button
          onClick={() => toggleDropdown(item.label)}
          className={cn(
            "text-gray-300 hover:text-white whitespace-nowrap transition-all duration-200",
            "px-3 py-1.5 rounded-md flex items-center gap-2 hover:bg-gray-800/70",
            (isOpen || isActive) && "text-white bg-gray-800/80"
          )}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
          {isOpen ? (
            <ChevronUp className="h-3 w-3 ml-1 opacity-70" />
          ) : (
            <ChevronDown className="h-3 w-3 ml-1 opacity-70" />
          )}
        </button>
        
        {/* Dropdown Menu with Animation */}
        {item.items && isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-1 z-50 min-w-[200px] overflow-hidden rounded-md border border-gray-700 bg-gray-900/95 shadow-lg backdrop-blur-sm"
          >
            {renderDropdownItems(item.items)}
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <Link 
      to={item.href} 
      className={cn(
        "text-gray-300 hover:text-white whitespace-nowrap transition-all duration-200",
        "px-3 py-1.5 rounded-md flex items-center gap-2 hover:bg-gray-800/70",
        currentPath === item.href && "text-white bg-gray-800/80"
      )}
    >
      <item.icon className="h-4 w-4" />
      <span>{item.label}</span>
    </Link>
  );
};
