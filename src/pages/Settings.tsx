
import React from 'react';
import { Container } from "@/components/ui/universal/Container";
import { Card } from "@/components/ui/universal/Card";
import { PageHeader } from "@/components/layout/PageHeader";
import { Grid } from "@/components/ui/universal/Grid";

export default function Settings() {
  const settingSections = [
    {
      title: "Profile Settings",
      content: "Manage your profile information and preferences."
    },
    {
      title: "Notification Preferences",
      content: "Configure how and when you receive notifications."
    },
    {
      title: "Security Settings",
      content: "Update your security preferences and authentication settings."
    },
    {
      title: "Display Options",
      content: "Customize the appearance and layout of your dashboard."
    }
  ];

  return (
    <Container>
      <PageHeader
        title="Settings"
        description="Customize your workflow and preferences"
        className="mb-4 sm:mb-6 md:mb-8"
      />

      <Grid columns={2} gap="lg" className="mb-4 sm:mb-6 md:mb-8">
        {settingSections.map((section, index) => (
          <Card 
            key={index} 
            className="p-4 sm:p-5 md:p-6 hover:bg-white/5 transition-colors"
            hoverable
          >
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
              {section.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-400">
              {section.content}
            </p>
          </Card>
        ))}
      </Grid>

      <Card className="p-4 sm:p-5 md:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
          Account Information
        </h2>
        <div className="space-y-2 sm:space-y-3">
          <p className="text-sm sm:text-base text-gray-400">
            Your account settings and preferences can be managed here. More options coming soon.
          </p>
        </div>
      </Card>
    </Container>
  );
}
