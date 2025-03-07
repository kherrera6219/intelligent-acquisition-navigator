
import React, { useState } from 'react';
import { Container } from "@/components/ui/universal/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { TwoFactorSettings } from "@/components/settings/TwoFactorSettings";
import { SessionSettings } from "@/components/settings/SessionSettings";
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { DisplaySettings } from '@/components/settings/DisplaySettings';
import { NetworkStatusBanner } from "@/components/ui/universal/NetworkStatusBanner";
import { PageErrorBoundary } from "@/components/ui/universal/PageErrorBoundary";
import { SessionExpiryManager } from '@/components/settings/SessionExpiryManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UniversalHeader } from "@/components/ui/universal/UniversalHeader";
import { Bell, Settings, Shield, User, Clock } from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("security");

  const tabIcons = {
    security: <Shield className="h-4 w-4 mr-2" />,
    profile: <User className="h-4 w-4 mr-2" />,
    session: <Clock className="h-4 w-4 mr-2" />,
    notifications: <Bell className="h-4 w-4 mr-2" />
  };

  return (
    <PageErrorBoundary>
      <Container>
        <PageHeader
          title="Settings"
          description="Manage your account settings and preferences"
        />
        
        <SessionExpiryManager />
        
        <UniversalHeader />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
          <TabsList className="grid grid-cols-4 mb-6">
            {Object.entries(tabIcons).map(([key, icon]) => (
              <TabsTrigger key={key} value={key} className="flex items-center justify-center">
                {icon}
                <span className="capitalize">{key}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="security" className="space-y-6">
            <SecuritySettings />
            <TwoFactorSettings />
          </TabsContent>
          
          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>
          
          <TabsContent value="session">
            <SessionSettings />
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <NotificationSettings />
            <DisplaySettings />
          </TabsContent>
        </Tabs>
      </Container>
    </PageErrorBoundary>
  );
};

export default SettingsPage;
