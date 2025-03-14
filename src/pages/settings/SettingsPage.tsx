
import React, { useState } from 'react';
import { SettingsNav } from '@/components/settings/SettingsNav';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';
import { User, Shield, Bell, Link } from 'lucide-react';

type SettingsTab = 'profile' | 'security' | 'notifications' | 'connected';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  
  const settingsTabs = [
    { value: 'profile', label: 'Profile', icon: <User className="h-4 w-4" /> },
    { value: 'security', label: 'Security', icon: <Shield className="h-4 w-4" /> },
    { value: 'notifications', label: 'Notifications', icon: <Bell className="h-4 w-4" /> },
    { value: 'connected', label: 'Connected Accounts', icon: <Link className="h-4 w-4" /> }
  ];
  
  const handleTabChange = (value: string) => {
    setActiveTab(value as SettingsTab);
  };
  
  return (
    <PageErrorBoundary>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <SettingsNav 
              tabs={settingsTabs} 
              activeTab={activeTab} 
              onChange={handleTabChange}
            />
          </div>
          <div className="md:col-span-3">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Settings Overview</h2>
              <p className="text-muted-foreground mb-4">
                Select a category from the sidebar to manage your account settings.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="border border-border rounded-md p-4">
                  <h3 className="font-medium mb-2">Profile</h3>
                  <p className="text-sm text-muted-foreground">Update your personal information and preferences.</p>
                </div>
                <div className="border border-border rounded-md p-4">
                  <h3 className="font-medium mb-2">Security</h3>
                  <p className="text-sm text-muted-foreground">Manage your password and security settings.</p>
                </div>
                <div className="border border-border rounded-md p-4">
                  <h3 className="font-medium mb-2">Notifications</h3>
                  <p className="text-sm text-muted-foreground">Control notification preferences and frequency.</p>
                </div>
                <div className="border border-border rounded-md p-4">
                  <h3 className="font-medium mb-2">Connected Accounts</h3>
                  <p className="text-sm text-muted-foreground">Manage integration with other services.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageErrorBoundary>
  );
};

export default SettingsPage;
