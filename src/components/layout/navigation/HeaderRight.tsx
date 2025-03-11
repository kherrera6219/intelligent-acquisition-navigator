
import { Link } from "react-router-dom";
import { ToggleTheme } from "@/components/ui/universal/ToggleTheme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";

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
  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    await signOut();
  };
  
  const userInitial = userRole ? userRole.charAt(0).toUpperCase() : "U";
  
  return (
    <div className="flex items-center space-x-3">
      <ToggleTheme />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-full">
            <Avatar className="h-8 w-8 border border-primary/50">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-primary/20 text-primary">
                {userInitial}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 mt-1 z-50 bg-secondary/90 backdrop-blur-sm border border-border">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/profile" className="cursor-pointer flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings" className="cursor-pointer flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
