
import React from 'react';
import { Container } from "@/components/ui/universal/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { SettingsNav } from "@/components/settings/SettingsNav";

export default function SettingsPage() {
  return (
    <Container>
      <PageHeader
        title="Settings"
        description="Customize your workflow and preferences"
        className="mb-4 sm:mb-6 md:mb-8"
      />

      <SettingsNav />
      <SecuritySettings />
      <ProfileSettings />
    </Container>
  );
}
