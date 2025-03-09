
import { Link } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderRightProps {
  userRole: string | null;
  signOut: () => Promise<void>;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export const HeaderRight = ({
  userRole,
  signOut,
  isMobileMenuOpen,
  toggleMobileMenu
}: HeaderRightProps) => {
  return (
    <div className="flex items-center gap-4">
      {userRole && (
        <div className="flex items-center gap-3">
          <Link 
            to="/settings" 
            className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white transition-colors duration-200 hover:bg-white/5"
            onClick={signOut}
          >
            <LogOut className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Sign Out</span>
          </Button>
        </div>
      )}
    </div>
  );
};
