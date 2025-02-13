
import { Button } from "@/components/ui/button";
import { UserCircle, LogOut } from 'lucide-react';

interface NavigationFooterProps {
  onProfileClick: () => void;
  onLogout: () => void;
}

export const NavigationFooter = ({ onProfileClick, onLogout }: NavigationFooterProps) => {
  return (
    <div className="mt-auto space-y-2">
      <Button 
        variant="outline" 
        className="w-full gap-2"
        onClick={onProfileClick}
      >
        <UserCircle className="h-4 w-4" />
        User Profile
      </Button>
      <Button 
        variant="destructive" 
        className="w-full gap-2"
        onClick={onLogout}
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </div>
  );
};
