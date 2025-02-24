
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Settings, LogOut, Menu, X, Home, FileText, BarChart2, Building2, FileSearch, FileCheck, Database, BookOpen, Scale, MessageSquare, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/universal/Container";
import { useAuth } from "@/providers/AuthProvider";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  minRole?: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  // Core Features
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/proposals", label: "Proposals", minRole: "user", icon: FileText },
  
  // Acquisition Management
  { href: "/acquisition/document-control", label: "Document Control", minRole: "user", icon: FileText },
  { href: "/acquisition/market-research", label: "Market Research", minRole: "user", icon: FileSearch },
  { href: "/acquisition/solicitation-review", label: "Solicitation Review", minRole: "manager", icon: FileCheck },
  { href: "/acquisition/texas-acquisition", label: "Texas Acquisition", minRole: "user", icon: Building2 },
  { href: "/acquisition/federal-acquisition", label: "Federal Acquisition", minRole: "manager", icon: Database },
  
  // Analytics & Reports
  { href: "/analytics", label: "Analytics", minRole: "user", icon: BarChart2 },
  
  // Support & Resources
  { href: "/features", label: "Features", icon: BookOpen },
  { href: "/pricing", label: "Pricing", icon: Scale },
  { href: "/help", label: "Help", icon: HelpCircle }
];

export const Header = () => {
  const { signOut, userRole } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isAuthorized = (minRole?: string) => {
    if (!minRole) return true;
    if (!userRole) return false;
    if (userRole === "admin") return true;
    if (minRole === "user") return true;
    return userRole === minRole;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/40 backdrop-blur-sm">
      <Container>
        <div className="py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link to="/settings" className="text-gray-400 hover:text-white">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-6 overflow-x-auto pb-2 scrollbar-none">
              {navItems.map((item) => (
                isAuthorized(item.minRole) && (
                  <Link 
                    key={item.href}
                    to={item.href} 
                    className={cn(
                      "text-gray-400 hover:text-white whitespace-nowrap transition-colors duration-200 hover:bg-white/5 px-3 py-1 rounded-full flex items-center gap-2",
                      currentPath === item.href && "text-white bg-white/5"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-400 hover:text-white"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            {userRole && (
              <span className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </span>
            )}
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-white transition-colors duration-200 hover:bg-white/5"
              onClick={signOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                isAuthorized(item.minRole) && (
                  <Link 
                    key={item.href}
                    to={item.href} 
                    className={cn(
                      "text-gray-400 hover:text-white transition-colors duration-200 px-4 py-2 rounded-lg flex items-center gap-2",
                      currentPath === item.href && "text-white bg-white/5"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
};
