
import React, { useState } from 'react';
import { Card } from "@/components/ui/universal/Card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Mail, MessageSquare, AlertTriangle } from 'lucide-react';

export function NotificationSettings() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    securityAlerts: true,
    systemUpdates: false,
    marketingEmails: false,
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated.",
    });
    
    setIsSaving(false);
  };

  const notificationOptions = [
    {
      id: 'securityAlerts',
      label: 'Security Alerts',
      description: 'Receive notifications about security events like login attempts and password changes.',
      icon: AlertTriangle,
    },
    {
      id: 'emailNotifications',
      label: 'Email Notifications',
      description: 'Receive important system notifications via email.',
      icon: Mail,
    },
    {
      id: 'systemUpdates',
      label: 'System Updates',
      description: 'Get notified about system updates and new features.',
      icon: Bell,
    },
    {
      id: 'marketingEmails',
      label: 'Marketing Emails',
      description: 'Receive product updates, newsletters, and promotional content.',
      icon: MessageSquare,
    }
  ];

  return (
    <Card className="p-4 sm:p-5 md:p-6 mb-6">
      <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
        Notification Preferences
      </h2>
      
      <div className="space-y-6">
        {notificationOptions.map((option) => (
          <div key={option.id} className="flex items-start space-x-4">
            <option.icon className="w-5 h-5 text-primary mt-0.5" />
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <Label htmlFor={option.id} className="font-medium">
                  {option.label}
                </Label>
                <Switch 
                  id={option.id} 
                  checked={settings[option.id as keyof typeof settings]}
                  onCheckedChange={() => handleToggle(option.id as keyof typeof settings)}
                />
              </div>
              <p className="text-sm text-gray-400">
                {option.description}
              </p>
            </div>
          </div>
        ))}
        
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
