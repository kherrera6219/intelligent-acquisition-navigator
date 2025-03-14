
import React from 'react';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';

const TermsOfServicePage: React.FC = () => {
  return (
    <PageErrorBoundary>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mt-6 mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using our services, you agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use our services.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">2. Description of Service</h2>
          <p>
            Our platform provides federal and state acquisition tools and resources designed to assist 
            procurement professionals in navigating acquisition processes efficiently.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">3. User Conduct</h2>
          <p>
            Users agree to use the service for lawful purposes only and in a manner that does not 
            infringe upon the rights of others or restrict their use of the service.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">4. Privacy Policy</h2>
          <p>
            Our Privacy Policy explains how we collect, use, and protect your information. By using our 
            services, you agree to our data practices as outlined in our Privacy Policy.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">5. Modifications to Service</h2>
          <p>
            We reserve the right to modify or discontinue any part of our service with or without notice. 
            We shall not be liable to you or any third party for any modification or discontinuation of the service.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">6. Changes to Terms</h2>
          <p>
            We may update these Terms of Service from time to time. We will notify users of significant changes 
            by posting a notice on our website or sending an email.
          </p>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Last updated: June 2023</p>
        </div>
      </div>
    </PageErrorBoundary>
  );
};

export default TermsOfServicePage;
