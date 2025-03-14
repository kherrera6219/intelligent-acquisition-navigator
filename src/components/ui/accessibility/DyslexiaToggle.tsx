
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAccessibility } from '@/providers/AccessibilityProvider';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DyslexiaToggleProps {
  className?: string;
}

export const DyslexiaToggle: React.FC<DyslexiaToggleProps> = ({ className }) => {
  const { dyslexiaMode, toggleDyslexiaMode } = useAccessibility();

  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-primary" aria-hidden="true" />
        <div>
          <Label htmlFor="dyslexia-mode" className="font-medium">
            Dyslexia Friendly Mode
          </Label>
          <p className="text-xs text-muted-foreground">
            Improves readability with adjusted spacing and fonts
          </p>
        </div>
      </div>
      <Switch
        id="dyslexia-mode"
        checked={dyslexiaMode}
        onCheckedChange={toggleDyslexiaMode}
        aria-label="Toggle dyslexia friendly mode"
      />
    </div>
  );
};
