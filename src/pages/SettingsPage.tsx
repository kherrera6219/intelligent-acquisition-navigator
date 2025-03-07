
import React from 'react';
import { Container } from "@/components/ui/universal/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { SettingsNav } from "@/components/settings/SettingsNav";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { TwoFactorSettings } from "@/components/settings/TwoFactorSettings";
import { SessionSettings } from "@/components/settings/SessionSettings";

const SettingsPage = () => {
  return (
    <Container>
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences"
      />
      
      <SettingsNav />
      
      <SecuritySettings />
      
      <TwoFactorSettings />
      
      <SessionSettings />
      
      <ProfileSettings />
    </Container>
  );
};

export default SettingsPage;
