
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavItem } from "./types";
import { motion } from "framer-motion";

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
  const isOpen = openDropdown === item.label;
  const isActive = isActiveRoute(item.href, item.items);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  if (item.items) {
    return (
      <div className="w-full">
        <button
          onClick={() => toggleDropdown(item.label)}
          className={cn(
            "w-full text-left text-gray-300 hover:text-white px-4 py-2.5 my-0.5 rounded-md",
            "flex items-center justify-between transition-colors", 
            (isOpen || isActive) && "bg-gray-800 text-white"
          )}
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-3">
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </div>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 mr-1" />
          ) : (
            <ChevronDown className="h-4 w-4 mr-1" />
          )}
        </button>
        
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="pl-4 ml-4 border-l border-gray-700"
          >
            {item.items.map((subItem) => (
              <Link
                key={subItem.label}
                to={subItem.href}
                className={cn(
                  "flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800/60",
                  "px-4 py-2.5 my-0.5 rounded-md block w-full transition-colors",
                  currentPath === subItem.href && "bg-gray-800 text-white"
                )}
                onClick={handleLinkClick}
              >
                <subItem.icon className="h-4 w-4" />
                <span>{subItem.label}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.href}
      className={cn(
        "flex items-center gap-3 text-gray-300 hover:text-white px-4 py-2.5 my-0.5 rounded-md",
        "transition-colors",
        currentPath === item.href && "bg-gray-800 text-white"
      )}
      onClick={handleLinkClick}
    >
      <item.icon className="h-5 w-5" />
      <span className="font-medium">{item.label}</span>
    </Link>
  );
};
