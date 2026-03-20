
import { LucideIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface NavigationItemProps {
  icon: LucideIcon;
  label: string;
  route: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

export const NavigationItem = ({
  icon: Icon,
  label,
  description,
  isActive,
  onClick
}: NavigationItemProps) => {
  return (
    <Tooltip delayDuration={400}>
      <TooltipTrigger asChild>
        <Button
          variant={isActive ? 'default' : 'ghost'}
          className={`w-full justify-start gap-3 transition-all duration-200 ${
            isActive
              ? 'bg-violet-500/15 text-violet-300 hover:bg-violet-500/25 border border-violet-500/20'
              : 'hover:bg-white/5 text-gray-400 hover:text-gray-100'
          }`}
          onClick={onClick}
          aria-current={isActive ? 'page' : undefined}
        >
          <Icon
            className={`h-4 w-4 shrink-0 ${isActive ? 'text-violet-400' : 'text-gray-500'}`}
            aria-hidden="true"
          />
          <span className={`text-sm ${isActive ? 'font-medium text-violet-200' : ''}`}>
            {label}
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={8} className="max-w-[200px] text-xs">
        {description}
      </TooltipContent>
    </Tooltip>
  );
};
