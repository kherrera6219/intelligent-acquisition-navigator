
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

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("security");

  return (
    <PageErrorBoundary>
      <Container>
        <PageHeader
          title="Settings"
          description="Manage your account settings and preferences"
        />
        
        <SessionExpiryManager />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="session">Session</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
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
