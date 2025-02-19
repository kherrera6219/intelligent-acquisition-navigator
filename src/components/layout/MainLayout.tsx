
import React from "react";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/universal/Container";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { signOut, userRole } = useAuth();

  // Navigation items based on MDKF knowledge domains
  const navItems = [
    { href: "/", label: "Dashboard" },
    { 
      href: "/acquisition/document-control", 
      label: "Document Control",
      minRole: "user" 
    },
    { 
      href: "/acquisition/market-research", 
      label: "Market Research",
      minRole: "user"
    },
    { 
      href: "/acquisition/solicitation-review", 
      label: "Solicitation Review",
      minRole: "manager"
    },
    { 
      href: "/acquisition/texas-acquisition", 
      label: "Texas Acquisition",
      minRole: "user"
    },
    { 
      href: "/acquisition/federal-acquisition", 
      label: "Federal Acquisition",
      minRole: "manager"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <header className="border-b border-gray-800 bg-black/40 backdrop-blur-sm">
        <Container>
          <div className="py-4 flex justify-between items-center">
            <nav className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
              {navItems.map((item) => (
                item.minRole ? (
                  userRole && ['admin', 'manager'].includes(userRole) ? (
                    <Link 
                      key={item.href}
                      to={item.href} 
                      className="text-gray-400 hover:text-white whitespace-nowrap"
                    >
                      {item.label}
                    </Link>
                  ) : null
                ) : (
                  <Link 
                    key={item.href}
                    to={item.href} 
                    className="text-gray-400 hover:text-white whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </nav>
            
            <div className="flex items-center gap-4">
              {userRole && (
                <span className="text-sm text-gray-400">
                  Role: {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                </span>
              )}
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white"
                onClick={signOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </Container>
      </header>
      
      <Container className="py-8">
        <Card className="w-full bg-black/40 backdrop-blur-sm border-white/5 p-6">
          {children}
        </Card>
      </Container>
    </div>
  );
};
