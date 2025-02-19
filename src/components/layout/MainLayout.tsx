
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
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <header className="border-b border-gray-800 bg-black/40 backdrop-blur-sm">
        <Container>
          <div className="py-4 flex justify-between items-center">
            <nav className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
              <Link to="/" className="text-gray-400 hover:text-white whitespace-nowrap">
                Dashboard
              </Link>
              <Link to="/acquisition/document-control" className="text-gray-400 hover:text-white whitespace-nowrap">
                Document Control
              </Link>
              <Link to="/acquisition/market-research" className="text-gray-400 hover:text-white whitespace-nowrap">
                Market Research
              </Link>
              <Link to="/acquisition/solicitation-review" className="text-gray-400 hover:text-white whitespace-nowrap">
                Solicitation Review
              </Link>
              <Link to="/acquisition/texas-acquisition" className="text-gray-400 hover:text-white whitespace-nowrap">
                Texas Acquisition
              </Link>
              <Link to="/acquisition/federal-acquisition" className="text-gray-400 hover:text-white whitespace-nowrap">
                Federal Acquisition
              </Link>
            </nav>
            
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-white"
              onClick={signOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
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
