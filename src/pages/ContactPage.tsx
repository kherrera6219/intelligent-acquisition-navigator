
import React from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { Container } from '@/components/ui/universal/Container';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { Helmet } from 'react-helmet';
import { MsGradientText } from '@/components/ui/universal/MsGradientText';

export default function ContactPage() {
  return (
    <ExternalPageLayout
      showHeader={true}
      showFooter={true}
    >
      <Helmet>
        <title>Contact Us | ProcurityIQ</title>
        <meta name="description" content="Get in touch with our team to learn how ProcurityIQ can transform your government acquisition processes." />
      </Helmet>
      
      <Container className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact <MsGradientText>ProcurityIQ</MsGradientText></h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our team to learn how our intelligent acquisition platform can benefit your organization.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
          
          {/* Contact Information */}
          <div>
            <ContactInfo />
          </div>
        </div>
      </Container>
    </ExternalPageLayout>
  );
}
