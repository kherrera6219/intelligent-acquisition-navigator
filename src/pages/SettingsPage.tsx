
import React, { useState } from 'react';
import { Container } from '@/components/ui/universal/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Shield, Bell, User, Eye } from 'lucide-react';
import { DisplaySettings } from '@/components/settings/DisplaySettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { ProfileSettings } from '@/components/settings/ProfileSettings';
import { SecuritySettings } from '@/components/settings/SecuritySettings';
import { SessionSettings } from '@/components/settings/SessionSettings';
import { SettingsNav } from '@/components/settings/SettingsNav';
import { SessionExpiryManager } from '@/components/settings/SessionExpiryManager';

type SettingsTab = 'profile' | 'security' | 'notifications' | 'display' | 'session';

interface SettingsNavProps {
  tabs: Array<{
    value: string;
    label: string;
    icon: React.ReactNode;
  }>;
  activeTab: string;
  onChange: (value: string) => void;
}

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  
  const handleTabChange = (value: string) => {
    setActiveTab(value as SettingsTab);
  };
  
  const settingsTabs = [
    { value: 'profile', label: 'Profile', icon: <User className="h-4 w-4" /> },
    { value: 'security', label: 'Security', icon: <Shield className="h-4 w-4" /> },
    { value: 'notifications', label: 'Notifications', icon: <Bell className="h-4 w-4" /> },
    { value: 'display', label: 'Display', icon: <Eye className="h-4 w-4" /> },
    { value: 'session', label: 'Session', icon: <Settings className="h-4 w-4" /> }
  ];
  
  return (
    <main className="flex-grow">
      <Container>
        <div className="space-y-6 py-6">
          <PageHeader
            title="Settings"
            description="Manage your account settings and preferences"
          />
          
          <SessionExpiryManager />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-3">
              <SettingsNav
                tabs={settingsTabs}
                activeTab={activeTab}
                onChange={handleTabChange}
              />
            </div>
            
            <div className="md:col-span-9">
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="mb-4 flex md:hidden">
                  {settingsTabs.map((tab) => (
                    <TabsTrigger 
                      key={tab.value} 
                      value={tab.value}
                      className="flex items-center gap-1.5"
                    >
                      {tab.icon}
                      <span className="hidden sm:inline">{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <TabsContent value="profile">
                  <ProfileSettings />
                </TabsContent>
                
                <TabsContent value="security">
                  <SecuritySettings />
                </TabsContent>
                
                <TabsContent value="notifications">
                  <NotificationSettings />
                </TabsContent>
                
                <TabsContent value="display">
                  <DisplaySettings />
                </TabsContent>
                
                <TabsContent value="session">
                  <SessionSettings />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default SettingsPage;
