
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { signOut } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <header className="border-b border-gray-800 bg-gray-900/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <nav className="flex gap-4">
            <Link to="/" className="text-gray-400 hover:text-white">
              Dashboard
            </Link>
            <Link to="/acquisition/document-control" className="text-gray-400 hover:text-white">
              Document Control
            </Link>
            <Link to="/acquisition/market-research" className="text-gray-400 hover:text-white">
              Market Research
            </Link>
            <Link to="/acquisition/solicitation-review" className="text-gray-400 hover:text-white">
              Solicitation Review
            </Link>
            <Link to="/acquisition/texas-acquisition" className="text-gray-400 hover:text-white">
              Texas Acquisition
            </Link>
            <Link to="/acquisition/federal-acquisition" className="text-gray-400 hover:text-white">
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
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
