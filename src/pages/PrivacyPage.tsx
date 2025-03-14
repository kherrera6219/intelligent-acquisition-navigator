
import React from 'react';
import { Helmet } from 'react-helmet';
import { Container } from '@/components/ui/universal/Container';
import { SkipLinks } from '@/components/ui/universal/SkipLinks';

interface PrivacyPageProps {
  pageType?: 'privacy' | 'terms';
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ pageType = 'privacy' }) => {
  const isPrivacy = pageType === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Service';
  
  return (
    <>
      <Helmet>
        <title>{title} | ProcurityIQ</title>
        <meta name="description" content={`${title} for ProcurityIQ platform users.`} />
      </Helmet>
      
      <SkipLinks />
      
      <Container className="py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">{title}</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {isPrivacy ? (
              <>
                <h2>Introduction</h2>
                <p>This Privacy Policy describes how ProcurityIQ ("we", "our", or "us") collects, uses, and discloses your personal information when you use our platform, application, or any related services (collectively, the "Services").</p>
                
                <h2>Information We Collect</h2>
                <p>We collect information that you provide directly to us, such as when you create an account, update your profile, use interactive features, participate in surveys, request customer support, or otherwise communicate with us.</p>
                
                <h2>How We Use Your Information</h2>
                <p>We use the information we collect to provide, maintain, and improve our Services, to develop new features, and to protect ProcurityIQ and our users.</p>
                
                <h2>Information Sharing</h2>
                <p>We do not share your personal information except in the limited circumstances described in this Privacy Policy.</p>
                
                <h2>Security</h2>
                <p>We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p>
                
                <h2>Changes to this Privacy Policy</h2>
                <p>We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy.</p>
                
                <h2>Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at privacy@procurityiq.com.</p>
              </>
            ) : (
              <>
                <h2>Acceptance of Terms</h2>
                <p>By accessing or using ProcurityIQ's platform, application, or any related services (collectively, the "Services"), you agree to be bound by these Terms of Service.</p>
                
                <h2>Use of Services</h2>
                <p>You may use our Services only as permitted by law and in accordance with these Terms. You may not use our Services if you are under 13 years of age.</p>
                
                <h2>User Accounts</h2>
                <p>To access some features of the Services, you may be required to register for an account. You must provide accurate and complete information and keep your account information updated.</p>
                
                <h2>Content and Conduct</h2>
                <p>You are responsible for your use of the Services and for any content you provide, including compliance with applicable laws, rules, and regulations.</p>
                
                <h2>Termination</h2>
                <p>We may terminate or suspend your access to all or part of the Services, without notice, for any conduct that we, in our sole discretion, believe is in violation of these Terms.</p>
                
                <h2>Disclaimers</h2>
                <p>The Services are provided "as is" and "as available" without warranties of any kind, either express or implied.</p>
                
                <h2>Limitation of Liability</h2>
                <p>To the maximum extent permitted by law, ProcurityIQ shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
                
                <h2>Changes to Terms</h2>
                <p>We may revise these Terms from time to time. If we make changes, we will notify you by revising the date at the top of the Terms.</p>
                
                <h2>Contact Us</h2>
                <p>If you have any questions about these Terms, please contact us at terms@procurityiq.com.</p>
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default PrivacyPage;
