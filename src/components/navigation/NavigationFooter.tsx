
import { Button } from "@/components/ui/button";
import { LogOut, Settings } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface NavigationFooterProps {
  onProfileClick: () => void;
  onLogout: () => void;
  userName?: string;
  userRole?: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export const NavigationFooter = ({
  onProfileClick,
  onLogout,
  userName = 'Guest User',
  userRole = 'Acquisition Professional',
}: NavigationFooterProps) => {
  const initials = getInitials(userName);

  return (
    <div className="flex items-center gap-2">
      {/* Avatar + name — clicking opens profile */}
      <button
        onClick={onProfileClick}
        className="flex items-center gap-2 flex-1 min-w-0 rounded-md px-2 py-1.5 hover:bg-white/5 transition-colors text-left"
        aria-label={`Open profile for ${userName}`}
      >
        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shrink-0">
          <span className="text-white font-semibold text-[10px]">{initials}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-gray-200 truncate">{userName}</p>
          <p className="text-[10px] text-gray-500 truncate">{userRole}</p>
        </div>
      </button>

      {/* Settings shortcut */}
      <Tooltip delayDuration={400}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onProfileClick}
            className="h-7 w-7 text-gray-500 hover:text-gray-200 shrink-0"
            aria-label="Open profile settings"
          >
            <Settings className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">Settings</TooltipContent>
      </Tooltip>

      {/* Logout */}
      <Tooltip delayDuration={400}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onLogout}
            className="h-7 w-7 text-gray-500 hover:text-red-400 shrink-0"
            aria-label="Sign out"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">Sign out</TooltipContent>
      </Tooltip>
    </div>
  );
};
