
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
import { Eye, Type, ZoomIn, ZoomOut, Monitor, BookOpen, MousePointer } from 'lucide-react';
import { useAccessibility } from '@/providers/AccessibilityProvider';
import { announceToScreenReader } from '@/utils/a11y';

interface AccessibilityMenuProps {
  className?: string;
}

export const AccessibilityMenu: React.FC<AccessibilityMenuProps> = ({ className }) => {
  const { 
    highContrast, 
    fontSize, 
    dyslexiaMode,
    reducedMotion,
    toggleHighContrast, 
    toggleDyslexiaMode,
    toggleReducedMotion,
    increaseFontSize, 
    decreaseFontSize 
  } = useAccessibility();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={className} 
          aria-label="Accessibility options"
        >
          <Eye className="h-4 w-4 mr-2" aria-hidden="true" />
          <span>Accessibility</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
        <DropdownMenuLabel>Accessibility Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={toggleHighContrast}>
          <Monitor className="h-4 w-4 mr-2" aria-hidden="true" />
          {highContrast ? 'Disable High Contrast' : 'Enable High Contrast'}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={toggleDyslexiaMode}>
          <BookOpen className="h-4 w-4 mr-2" aria-hidden="true" />
          {dyslexiaMode ? 'Disable Dyslexia Font' : 'Enable Dyslexia Font'}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={toggleReducedMotion}>
          <MousePointer className="h-4 w-4 mr-2" aria-hidden="true" />
          {reducedMotion ? 'Allow Animations' : 'Reduce Animations'}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Text Size: {fontSize}px</DropdownMenuLabel>
        
        <DropdownMenuItem onClick={increaseFontSize}>
          <ZoomIn className="h-4 w-4 mr-2" aria-hidden="true" />
          Increase Text Size
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={decreaseFontSize}>
          <ZoomOut className="h-4 w-4 mr-2" aria-hidden="true" />
          Decrease Text Size
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5 text-xs text-muted-foreground">
          Press <kbd className="px-1 bg-muted rounded">Tab</kbd> to navigate with keyboard
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccessibilityMenu;
