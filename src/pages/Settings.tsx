
import React, { useState } from 'react';
import { useAuth } from "@/providers/AuthProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { Container } from "@/components/ui/universal/Container";
import { Card } from "@/components/ui/universal/Card";
import { PageHeader } from "@/components/layout/PageHeader";
import { Grid } from "@/components/ui/universal/Grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings as SettingsIcon, UserCog, Bell, Shield, Palette, Database, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function SettingsPage() {
  const { user, userRole, isAuthorized } = useAuth();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [bio, setBio] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Here you would typically upload to your storage service
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarUrl(e.target?.result as string);
        toast({
          title: "Avatar updated",
          description: "Your profile picture has been updated successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // Here you would typically make an API call to save the settings
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as "light" | "dark" | "system");
    toast({
      title: "Theme updated",
      description: `Theme has been changed to ${newTheme} mode.`,
    });
  };

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

      <Card className="p-4 sm:p-5 md:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
          Profile Information
        </h2>
        
        <div className="flex items-center justify-center mb-6">
          <div className="relative group">
            <Avatar className="w-24 h-24">
              <AvatarImage src={avatarUrl} alt="Profile picture" />
              <AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <label
              htmlFor="avatar-upload"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity"
            >
              <Upload className="w-6 h-6 text-white" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </label>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
              />
            </div>
          </div>

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
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location"
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

          <div className="space-y-2">
            <Label htmlFor="theme">Theme Preference</Label>
            <Select value={theme} onValueChange={handleThemeChange}>
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
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="pt-4">
            <Button 
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </Card>
    </Container>
  );
}
