
import { Link } from "react-router-dom";
import { Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/universal/Container";
import { useAuth } from "@/providers/AuthProvider";

interface NavItem {
  href: string;
  label: string;
  minRole?: string;
}

const navItems: NavItem[] = [
  { href: "/", label: "Dashboard" },
  { href: "/acquisition/document-control", label: "Document Control", minRole: "user" },
  { href: "/acquisition/market-research", label: "Market Research", minRole: "user" },
  { href: "/acquisition/solicitation-review", label: "Solicitation Review", minRole: "manager" },
  { href: "/acquisition/texas-acquisition", label: "Texas Acquisition", minRole: "user" },
  { href: "/acquisition/federal-acquisition", label: "Federal Acquisition", minRole: "manager" }
];

export const Header = () => {
  const { signOut, userRole } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/40 backdrop-blur-sm">
      <Container>
        <div className="py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link to="/settings" className="text-gray-400 hover:text-white">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
            
            <nav className="flex gap-6 overflow-x-auto pb-2 scrollbar-none">
              {navItems.map((item) => (
                item.minRole ? (
                  userRole && ['admin', 'manager'].includes(userRole) ? (
                    <Link 
                      key={item.href}
                      to={item.href} 
                      className="text-gray-400 hover:text-white whitespace-nowrap transition-colors duration-200 hover:bg-white/5 px-3 py-1 rounded-full"
                    >
                      {item.label}
                    </Link>
                  ) : null
                ) : (
                  <Link 
                    key={item.href}
                    to={item.href} 
                    className="text-gray-400 hover:text-white whitespace-nowrap transition-colors duration-200 hover:bg-white/5 px-3 py-1 rounded-full"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </nav>
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
              Sign Out
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};
