
import React, { useState } from 'react';
import { Card } from "@/components/ui/universal/Card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Palette, Sun, Moon, Monitor } from 'lucide-react';

export function DisplaySettings() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [theme, setTheme] = useState('system');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Display settings saved",
      description: "Your display preferences have been updated.",
    });
    
    setIsSaving(false);
  };

  return (
    <Card className="p-4 sm:p-5 md:p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Palette className="h-5 w-5 text-primary" />
        <h2 className="text-lg sm:text-xl font-semibold text-white">
          Display Settings
        </h2>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <Label>Theme</Label>
          <RadioGroup value={theme} onValueChange={setTheme}>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light" className="flex items-center">
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark" className="flex items-center">
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="system" />
                <Label htmlFor="system" className="flex items-center">
                  <Monitor className="mr-2 h-4 w-4" />
                  System
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="reduced-motion" className="font-medium">Reduced Motion</Label>
              <p className="text-sm text-gray-400">
                Minimize animations throughout the interface
              </p>
            </div>
            <Switch 
              id="reduced-motion" 
              checked={reducedMotion}
              onCheckedChange={setReducedMotion}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="high-contrast" className="font-medium">High Contrast</Label>
              <p className="text-sm text-gray-400">
                Increase contrast for better readability
              </p>
            </div>
            <Switch 
              id="high-contrast" 
              checked={highContrast}
              onCheckedChange={setHighContrast}
            />
          </div>
        </div>
        
        <Button 
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="mt-4"
        >
          {isSaving ? 'Saving Changes...' : 'Save Changes'}
        </Button>
      </div>
    </Card>
  );
}
