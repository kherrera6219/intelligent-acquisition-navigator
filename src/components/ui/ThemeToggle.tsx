
import { useContext } from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

export const ThemeToggle = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  
  const getIcon = () => {
    if (theme === 'system') {
      return systemTheme === 'dark' ? <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" /> 
        : <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />;
    }
    
    return theme === 'dark' 
      ? <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" /> 
      : <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />;
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md">
                {getIcon()}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            Change theme
          </TooltipContent>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center gap-2">
              <Moon className="h-4 w-4" />
              <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center gap-2">
              <Laptop className="h-4 w-4" />
              <span>System</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ThemeToggle;
