
import React, { useState } from 'react';
import { Card } from "@/components/ui/universal/Card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Eye, Type, MousePointer, Award } from 'lucide-react';

export function AccessibilitySettings() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    highContrast: false,
    reducedMotion: false,
    dyslexiaMode: false,
    largerText: false,
    focusIndicators: true,
    screenReaderOptimized: true,
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    
    // Simulate applying settings
    if (settings.dyslexiaMode) {
      document.body.classList.add('dyslexia-mode');
    } else {
      document.body.classList.remove('dyslexia-mode');
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Accessibility settings saved",
      description: "Your accessibility preferences have been updated.",
    });
    
    setIsSaving(false);
  };

  return (
    <Card className="p-4 sm:p-5 md:p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Award className="h-5 w-5 text-primary" aria-hidden="true" />
        <h2 className="text-lg sm:text-xl font-semibold" id="accessibility-settings-heading">
          Accessibility Settings
        </h2>
      </div>
      
      <div 
        className="space-y-6" 
        role="group" 
        aria-labelledby="accessibility-settings-heading"
      >
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="high-contrast" className="font-medium">High Contrast</Label>
              <p className="text-sm text-gray-400 enhanced-contrast-text">
                Increase contrast for better readability
              </p>
            </div>
            <Switch 
              id="high-contrast" 
              checked={settings.highContrast}
              onCheckedChange={() => handleToggle('highContrast')}
              aria-describedby="high-contrast-description"
            />
            <span id="high-contrast-description" className="sr-only">
              Enable high contrast mode for better visibility
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="reduced-motion" className="font-medium">Reduced Motion</Label>
              <p className="text-sm text-gray-400 enhanced-contrast-text" id="reduced-motion-description">
                Minimize animations throughout the interface
              </p>
            </div>
            <Switch 
              id="reduced-motion" 
              checked={settings.reducedMotion}
              onCheckedChange={() => handleToggle('reducedMotion')}
              aria-describedby="reduced-motion-description"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dyslexia-mode" className="font-medium">Dyslexia Friendly Mode</Label>
              <p className="text-sm text-gray-400 enhanced-contrast-text" id="dyslexia-mode-description">
                Adjust text spacing and font for easier reading
              </p>
            </div>
            <Switch 
              id="dyslexia-mode" 
              checked={settings.dyslexiaMode}
              onCheckedChange={() => handleToggle('dyslexiaMode')}
              aria-describedby="dyslexia-mode-description"
              className="dyslexia-toggle"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="larger-text" className="font-medium">Larger Text</Label>
              <p className="text-sm text-gray-400 enhanced-contrast-text" id="larger-text-description">
                Increase text size across the application
              </p>
            </div>
            <Switch 
              id="larger-text" 
              checked={settings.largerText}
              onCheckedChange={() => handleToggle('largerText')}
              aria-describedby="larger-text-description"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="focus-indicators" className="font-medium">Enhanced Focus Indicators</Label>
              <p className="text-sm text-gray-400 enhanced-contrast-text" id="focus-indicators-description">
                Make keyboard focus more visible throughout the interface
              </p>
            </div>
            <Switch 
              id="focus-indicators" 
              checked={settings.focusIndicators}
              onCheckedChange={() => handleToggle('focusIndicators')}
              aria-describedby="focus-indicators-description"
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Type className="h-4 w-4 text-primary" aria-hidden="true" />
            <Label className="text-base font-medium" id="keyboard-navigation-label">Keyboard Navigation</Label>
          </div>
          <p className="text-sm text-gray-400 enhanced-contrast-text ml-6 mb-2">
            Improve your keyboard navigation experience
          </p>
          <div className="ml-6 space-y-1">
            <div className="flex items-center gap-4 text-sm">
              <kbd className="px-2 py-1 bg-gray-800/50 rounded border border-gray-700/50">Tab</kbd>
              <span>Move between interactive elements</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <kbd className="px-2 py-1 bg-gray-800/50 rounded border border-gray-700/50">Enter/Space</kbd>
              <span>Activate buttons and controls</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <kbd className="px-2 py-1 bg-gray-800/50 rounded border border-gray-700/50">Esc</kbd>
              <span>Close dialogs or menus</span>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="mt-6 focus-visible-ring"
          aria-busy={isSaving}
        >
          {isSaving ? 'Saving Changes...' : 'Save Accessibility Preferences'}
        </Button>
      </div>
    </Card>
  );
}
