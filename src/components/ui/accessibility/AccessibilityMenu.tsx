
import React from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Eye, Type, ZoomIn, ZoomOut, Monitor } from 'lucide-react';
import { useAccessibility } from '@/providers/AccessibilityProvider';

interface AccessibilityMenuProps {
  className?: string;
}

export const AccessibilityMenu: React.FC<AccessibilityMenuProps> = ({ className }) => {
  const { 
    highContrast, 
    fontSize, 
    toggleHighContrast, 
    increaseFontSize, 
    decreaseFontSize 
  } = useAccessibility();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={className} aria-label="Accessibility options">
          <Eye className="h-4 w-4 mr-2" />
          <span>Accessibility</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Accessibility Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={toggleHighContrast}>
          <Monitor className="h-4 w-4 mr-2" />
          {highContrast ? 'Disable High Contrast' : 'Enable High Contrast'}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Text Size: {fontSize}px</DropdownMenuLabel>
        
        <DropdownMenuItem onClick={increaseFontSize}>
          <ZoomIn className="h-4 w-4 mr-2" />
          Increase Text Size
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={decreaseFontSize}>
          <ZoomOut className="h-4 w-4 mr-2" />
          Decrease Text Size
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Type className="h-4 w-4 mr-2" />
          Dyslexia-Friendly Font
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccessibilityMenu;
