
import React, { useState, useEffect } from "react";
import { Container } from '@/components/ui/universal/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { GradientText } from "@/components/ui/universal/GradientText";
import { Card } from "@/components/ui/universal/Card";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactMethods } from "@/components/contact/ContactMethods";
import { LoadingSkeleton } from "@/components/contact/LoadingSkeleton";

const ContactPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <main className="flex-grow">
      <Container>
        <div className="space-y-8 py-6 bg-noise"
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.15) 100%),
              radial-gradient(at 50% 0%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.2) 75%)
            `,
            backgroundAttachment: 'fixed'
          }}
        >
          <PageHeader
            title={<GradientText>Get in Touch</GradientText>}
            description="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card variant="metal" className="p-8">
                <ContactForm />
              </Card>
            </div>

            <ContactMethods />
          </div>
        </div>
      </Container>
    </main>
  );
};

export default ContactPage;
