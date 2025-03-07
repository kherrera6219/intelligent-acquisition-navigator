
import React, { useState } from 'react';
import { Container } from "@/components/ui/universal/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { SettingsNav } from "@/components/settings/SettingsNav";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { TwoFactorSettings } from "@/components/settings/TwoFactorSettings";
import { SessionSettings } from "@/components/settings/SessionSettings";
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
        
        <SettingsNav />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="session">Session</TabsTrigger>
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
        </Tabs>
      </Container>
    </PageErrorBoundary>
  );
};

export default SettingsPage;
