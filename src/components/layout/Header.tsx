
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "@/components/ui/universal/Container";
import { useAuth } from "@/hooks/useAuth";
import { HeaderLeft } from "./navigation/HeaderLeft";
import { HeaderRight } from "./navigation/HeaderRight";
import { DesktopNavigation } from "./navigation/DesktopNavigation";
import { MobileNavigation } from "./navigation/MobileNavigation";
import { navItems } from "./navigation/navItems";
import { NavItem } from "./navigation/types";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { signOut, userRole } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    setCurrentPath(location.pathname);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    setOpenDropdown(null);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdown(null);
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown(prev => prev === label ? null : label);
  };

  const isAuthorized = (minRole?: string) => {
    if (!minRole) return true;
    if (!userRole) return false;
    if (userRole === "admin") return true;
    if (minRole === "user") return true;
    return userRole === minRole;
  };

  const isActiveRoute = (href: string, items?: NavItem[]) => {
    if (href !== "#" && currentPath === href) return true;
    if (items) {
      return items.some(item => {
        if (item.href === currentPath) return true;
        if (item.items) return isActiveRoute(item.href, item.items);
        return false;
      });
    }
    return false;
  };

  // A helper for rendering dropdown items
  const renderDropdownItems = (items?: NavItem[]) => {
    if (!items) return null;
    
    return (
      <div className="absolute left-0 mt-2 py-2 w-56 bg-gray-800 rounded-md shadow-xl z-50">
        {items.map((item) => (
          isAuthorized(item.minRole) && (
            <a 
              key={item.href}
              href={item.href} 
              className={cn(
                "flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700",
                currentPath === item.href && "bg-gray-700 text-white"
              )}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = item.href;
                setOpenDropdown(null);
              }}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </a>
          )
        ))}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/40 backdrop-blur-sm">
      <Container>
        <div className="py-4 flex justify-between items-center">
          {/* Logo and Settings (Left) */}
          <HeaderLeft />
            
          {/* Desktop Navigation (Center) */}
          <DesktopNavigation
            navItems={navItems}
            currentPath={currentPath}
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
            isActiveRoute={isActiveRoute}
            isAuthorized={isAuthorized}
            renderDropdownItems={renderDropdownItems}
          />

          {/* User Profile and Sign Out (Right) */}
          <HeaderRight
            userRole={userRole}
            signOut={signOut}
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
          />
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation
          isMobileMenuOpen={isMobileMenuOpen}
          navItems={navItems}
          isAuthorized={isAuthorized}
          currentPath={currentPath}
          openDropdown={openDropdown}
          toggleDropdown={toggleDropdown}
          isActiveRoute={isActiveRoute}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          setOpenDropdown={setOpenDropdown}
        />
      </Container>
    </header>
  );
};
