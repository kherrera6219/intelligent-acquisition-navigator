
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Container } from "@/components/ui/universal/Container";
import { useAuth } from "@/hooks/useAuth";
import { HeaderLeft } from "./navigation/HeaderLeft";
import { HeaderRight } from "./navigation/HeaderRight";
import { DesktopNavigation } from "./navigation/DesktopNavigation";
import { MobileNavigation } from "./navigation/MobileNavigation";
import { navItems } from "./navigation/navItems";
import { NavItem } from "./navigation/types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, User } from "lucide-react";
import { SessionTimeoutTimer } from '@/components/settings/SessionTimeoutTimer';

export const Header = () => {
  const { signOut, userRole, user } = useAuth();
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

  const renderDropdownItems = (items?: NavItem[]) => {
    if (!items) return null;
    
    return (
      <div className="absolute left-0 mt-2 py-2 w-56 bg-gray-800 rounded-md shadow-xl z-50">
        {items.map((item) => (
          isAuthorized(item.minRole) && (
            <Link 
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700",
                currentPath === item.href && "bg-gray-700 text-white"
              )}
              onClick={() => setOpenDropdown(null)}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </Link>
          )
        ))}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/40 backdrop-blur-sm">
      <Container>
        <div className="py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <HeaderLeft />
            
            <DesktopNavigation
              navItems={navItems}
              currentPath={currentPath}
              openDropdown={openDropdown}
              toggleDropdown={toggleDropdown}
              isActiveRoute={isActiveRoute}
              isAuthorized={isAuthorized}
              renderDropdownItems={renderDropdownItems}
            />
          </div>

          <div className="flex items-center gap-4">
            <SessionTimeoutTimer className="mr-2 hidden md:flex" />
            
            <Link to="/settings" className="text-gray-400 hover:text-white transition-colors duration-200">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
            
            <Link to="/profile" className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border border-gray-700 hover:border-primary transition-all">
                <AvatarImage src={user?.user_metadata?.avatar_url} alt="User avatar" />
                <AvatarFallback className="bg-gray-800 text-gray-200">
                  {user?.email ? user.email.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-300 hidden sm:inline">
                {user?.email ? user.email.split('@')[0] : 'Profile'}
              </span>
            </Link>

            <HeaderRight
              userRole={userRole}
              signOut={signOut}
              isMobileMenuOpen={isMobileMenuOpen}
              toggleMobileMenu={toggleMobileMenu}
            />
          </div>
        </div>

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
