
import React from 'react';
import { useAuth } from "@/providers/AuthProvider";
import { Container } from "@/components/ui/universal/Container";
import { Card } from "@/components/ui/universal/Card";
import { PageHeader } from "@/components/layout/PageHeader";
import { Grid } from "@/components/ui/universal/Grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings as SettingsIcon, UserCog, Bell, Shield, Palette, Database } from "lucide-react";

export default function SettingsPage() {
  const { user, userRole, isAuthorized } = useAuth();

  const settingSections = [
    {
      title: "Profile Settings",
      icon: UserCog,
      content: "Manage your profile information and preferences.",
      minRole: "user"
    },
    {
      title: "Notification Preferences",
      icon: Bell,
      content: "Configure how and when you receive notifications.",
      minRole: "user"
    },
    {
      title: "Security Settings",
      icon: Shield,
      content: "Update your security preferences and authentication settings.",
      minRole: "user"
    },
    {
      title: "Display Options",
      icon: Palette,
      content: "Customize the appearance and layout of your dashboard.",
      minRole: "user"
    }
  ];

  // Additional sections for higher roles
  const adminSections = [
    {
      title: "System Configuration",
      icon: SettingsIcon,
      content: "Manage system-wide settings and configurations.",
      minRole: "admin"
    },
    {
      title: "Database Management",
      icon: Database,
      content: "Configure database settings and manage data.",
      minRole: "admin"
    }
  ];

  // Combine sections based on user role
  const allSections = [
    ...settingSections,
    ...(isAuthorized('admin') ? adminSections : [])
  ];

  return (
    <Container>
      <PageHeader
        title="Settings"
        description="Customize your workflow and preferences"
        className="mb-4 sm:mb-6 md:mb-8"
      />

      <Grid columns={2} gap="lg" className="mb-4 sm:mb-6 md:mb-8">
        {allSections.map((section, index) => (
          <Card 
            key={index} 
            className="p-4 sm:p-5 md:p-6 hover:bg-white/5 transition-colors cursor-pointer"
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

      <Card className="p-4 sm:p-5 md:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
          Account Information
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                value={user?.email || ''} 
                disabled 
                className="bg-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input 
                id="role" 
                value={userRole || 'User'} 
                disabled 
                className="bg-gray-800"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="theme">Theme Preference</Label>
            <Select defaultValue="dark">
              <SelectTrigger id="theme">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dark">Dark Theme</SelectItem>
                <SelectItem value="light">Light Theme</SelectItem>
                <SelectItem value="system">System Default</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              placeholder="Tell us about yourself..."
              className="h-32"
            />
          </div>

          <div className="pt-4">
            <Button>
              Save Changes
            </Button>
          </div>
        </div>
      </Card>
    </Container>
  );
}
