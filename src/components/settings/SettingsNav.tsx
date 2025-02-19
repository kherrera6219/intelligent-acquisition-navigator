
import React from 'react';
import { Grid } from "@/components/ui/universal/Grid";
import { Card } from "@/components/ui/universal/Card";
import { Settings as SettingsIcon, UserCog, Bell, Shield, Palette, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/providers/AuthProvider";

export function SettingsNav() {
  const { isAuthorized } = useAuth();
  const { toast } = useToast();

  const settingSections = [
    {
      title: "Profile Settings",
      icon: UserCog,
      content: "Manage your profile information and preferences.",
      minRole: "user",
      onClick: () => {
        toast({
          title: "Profile Settings",
          description: "This section is coming soon.",
        });
      }
    },
    {
      title: "Notification Preferences",
      icon: Bell,
      content: "Configure how and when you receive notifications.",
      minRole: "user",
      onClick: () => {
        toast({
          title: "Notification Settings",
          description: "This section is coming soon.",
        });
      }
    },
    {
      title: "Security Settings",
      icon: Shield,
      content: "Update your security preferences and authentication settings.",
      minRole: "user",
      onClick: () => {
        toast({
          title: "Security Settings",
          description: "This section is coming soon.",
        });
      }
    },
    {
      title: "Display Options",
      icon: Palette,
      content: "Customize the appearance and layout of your dashboard.",
      minRole: "user",
      onClick: () => {
        toast({
          title: "Display Settings",
          description: "This section is coming soon.",
        });
      }
    }
  ];

  const adminSections = [
    {
      title: "System Configuration",
      icon: SettingsIcon,
      content: "Manage system-wide settings and configurations.",
      minRole: "admin",
      onClick: () => {
        toast({
          title: "System Configuration",
          description: "This section is coming soon.",
        });
      }
    },
    {
      title: "Database Management",
      icon: Database,
      content: "Configure database settings and manage data.",
      minRole: "admin",
      onClick: () => {
        toast({
          title: "Database Management",
          description: "This section is coming soon.",
        });
      }
    }
  ];

  const allSections = [
    ...settingSections,
    ...(isAuthorized('admin') ? adminSections : [])
  ];

  return (
    <Grid columns={2} gap="lg" className="mb-4 sm:mb-6 md:mb-8">
      {allSections.map((section, index) => (
        <Card 
          key={index} 
          className="p-4 sm:p-5 md:p-6 hover:bg-white/5 transition-colors cursor-pointer"
          onClick={section.onClick}
        >
          <div className="flex items-start space-x-4">
            <section.icon className="w-6 h-6 text-primary shrink-0" />
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
                {section.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-400">
                {section.content}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </Grid>
  );
}
