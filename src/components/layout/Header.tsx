
import { AnimatePresence } from "framer-motion";
import { HeaderLeft } from "./navigation/HeaderLeft";
import { DesktopNavigation } from "./navigation/DesktopNavigation";
import { MobileNavigation } from "./navigation/MobileNavigation";
import { navItems } from "@/components/layout/navigation/navItems";
import { useAuthState } from "@/hooks/useAuthState";
import { HeaderContainer } from "./header/HeaderContainer";
import { HeaderActions } from "./header/HeaderActions";
import { MobileMenuToggle } from "./header/MobileMenuToggle";
import { useHeaderNavigation } from "@/hooks/useHeaderNavigation";

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  const { 
    isMobileMenuOpen, 
    openDropdown, 
    isScrolled, 
    pathname,
    toggleDropdown, 
    toggleMobileMenu, 
    isActiveRoute,
    setIsMobileMenuOpen,
    setOpenDropdown
  } = useHeaderNavigation();
  
  const { isAuthenticated, userRole, isAuthorized } = useAuthState();

  return (
    <HeaderContainer isScrolled={isScrolled} className={className}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <HeaderLeft />
        </div>
        <div className="hidden md:ml-6 md:block">
          <DesktopNavigation 
            navItems={navItems}
            isAuthorized={isAuthorized}
            currentPath={pathname}
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
            isActiveRoute={isActiveRoute}
          />
        </div>
      </div>
      
      <HeaderActions 
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        userRole={userRole}
        isAuthenticated={isAuthenticated}
      />
      
      <MobileMenuToggle 
        isMobileMenuOpen={isMobileMenuOpen} 
        toggleMobileMenu={toggleMobileMenu} 
      />
      
      <AnimatePresence>
        <MobileNavigation
          isMobileMenuOpen={isMobileMenuOpen}
          navItems={navItems}
          isAuthorized={isAuthorized}
          currentPath={pathname}
          openDropdown={openDropdown}
          toggleDropdown={toggleDropdown}
          isActiveRoute={isActiveRoute}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          setOpenDropdown={setOpenDropdown}
        />
      </AnimatePresence>
    </HeaderContainer>
  );
};
