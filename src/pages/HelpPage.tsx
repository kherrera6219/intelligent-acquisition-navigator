
import React from 'react';
import { Container } from "@/components/ui/universal/Container";
import { Card } from "@/components/ui/universal/Card";
import { PageHeader } from "@/components/layout/PageHeader";
import { Grid } from "@/components/ui/universal/Grid";

export default function Help() {
  const helpSections = [
    {
      title: "Getting Started",
      content: "Learn the basics of using our acquisition workflow management system."
    },
    {
      title: "Documentation",
      content: "Access detailed documentation about features and processes."
    },
    {
      title: "FAQs",
      content: "Find answers to commonly asked questions about the system."
    },
    {
      title: "Support",
      content: "Get help from our support team when you need it."
    }
  ];

  return (
    <Container>
      <div className="py-6 animate-fade-in bg-noise">
        <PageHeader
          title="Help Center"
          description="Find answers and support for your questions"
          className="mb-4 sm:mb-6 md:mb-8"
        />

        <Grid columns={2} gap="lg" className="mb-4 sm:mb-6 md:mb-8">
          {helpSections.map((section, index) => (
            <Card 
              key={index} 
              variant="metal"
              className="p-4 sm:p-5 md:p-6"
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

        <Card variant="metal" className="p-4 sm:p-5 md:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
            Contact Support
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mb-4">
            Need additional help? Our support team is available during business hours.
          </p>
          <div className="space-y-2 sm:space-y-3">
            <p className="text-sm sm:text-base text-gray-400">
              Email: support@example.com
            </p>
            <p className="text-sm sm:text-base text-gray-400">
              Hours: Monday - Friday, 9:00 AM - 5:00 PM EST
            </p>
          </div>
        </Card>
      </div>
    </Container>
  );
}
