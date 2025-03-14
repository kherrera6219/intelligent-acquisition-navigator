
import { useContext } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeContext } from '@/contexts/ThemeContext';
import { Tooltip } from '@/components/ui/tooltip/Tooltip';

export const ToggleTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };
  
  return (
    <Tooltip content={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleTheme}
        className="rounded-full text-gray-300 hover:text-white hover:bg-gray-800/70 transition-colors duration-300"
        aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>
    </Tooltip>
  );
};
