
import React from "react";
import { Card } from "@/components/ui/universal/Card";
import { Container } from "@/components/ui/universal/Container";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { signOut, userRole } = useAuth();

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

  const footerLinks = [
    { href: "/help", label: "Help" },
    { href: "/analytics", label: "Analytics" },
    { href: "/settings", label: "Settings" },
    { href: "/sitemap", label: "Sitemap" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900">
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
      
      <main className="flex-1">
        <Container className="py-8">
          <Card className="w-full bg-black/40 backdrop-blur-sm border-white/10 p-6 shadow-xl">
            {children}
          </Card>
        </Container>
      </main>

      <footer className="border-t border-gray-800 bg-black/40 backdrop-blur-sm py-8">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white/90">Quick Links</h3>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white/90">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/help" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/help" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/help" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white/90">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/privacy" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/terms" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white/90">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="mailto:support@example.com" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    support@example.com
                  </a>
                </li>
                <li>
                  <span className="text-gray-400">
                    Mon-Fri, 9:00 AM - 5:00 PM EST
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Your Organization. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};
