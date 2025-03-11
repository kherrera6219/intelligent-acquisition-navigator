
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavItem } from "@/components/layout/navigation/types";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

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
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNavigation = (href: string, requiresAuth: boolean, e: React.MouseEvent) => {
    e.preventDefault();
    if (requiresAuth && !isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "You need to sign in to access this page.",
        variant: "default",
      });
      navigate('/auth');
      return;
    }
    navigate(href);
  };

  const renderCustomDropdownItems = (items?: NavItem[]) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="py-1">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavigation(item.href, item.minRole !== null, e)}
            className={cn(
              "block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white",
              currentPath === item.href && "bg-gray-800 text-white"
            )}
          >
            <div className="flex items-center gap-2">
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </div>
          </a>
        ))}
      </div>
    );
  };

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
            {renderCustomDropdownItems(item.items)}
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <a 
      href={item.href}
      onClick={(e) => handleNavigation(item.href, item.minRole !== null, e)}
      className={cn(
        "text-gray-300 hover:text-white whitespace-nowrap transition-all duration-200",
        "px-3 py-1.5 rounded-md flex items-center gap-2 hover:bg-gray-800/70",
        currentPath === item.href && "text-white bg-gray-800/80"
      )}
    >
      <item.icon className="h-4 w-4" />
      <span>{item.label}</span>
    </a>
  );
};
