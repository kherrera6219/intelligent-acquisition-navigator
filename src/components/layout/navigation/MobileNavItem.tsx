
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavItem } from "./types";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

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
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const handleNavigation = (href: string, requiresAuth: boolean) => {
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
    handleLinkClick();
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
              <button
                key={subItem.label}
                onClick={() => handleNavigation(subItem.href, subItem.minRole !== null)}
                className={cn(
                  "flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800/60",
                  "px-4 py-2.5 my-0.5 rounded-md block w-full text-left transition-colors",
                  currentPath === subItem.href && "bg-gray-800 text-white"
                )}
              >
                <subItem.icon className="h-4 w-4" />
                <span>{subItem.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => handleNavigation(item.href, item.minRole !== null)}
      className={cn(
        "flex items-center gap-3 text-gray-300 hover:text-white px-4 py-2.5 my-0.5 rounded-md w-full text-left",
        "transition-colors",
        currentPath === item.href && "bg-gray-800 text-white"
      )}
    >
      <item.icon className="h-5 w-5" />
      <span className="font-medium">{item.label}</span>
    </button>
  );
};
