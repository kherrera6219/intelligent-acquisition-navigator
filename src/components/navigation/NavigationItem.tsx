
import { LucideIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";

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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={isActive ? 'default' : 'ghost'}
            className={`w-full justify-start gap-3 transition-all duration-200 ${
              isActive 
                ? 'bg-primary/10 text-primary hover:bg-primary/20' 
                : 'hover:bg-primary/5'
            }`}
            onClick={onClick}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} aria-hidden="true" />
            <span className={isActive ? 'font-medium' : ''}>{label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
