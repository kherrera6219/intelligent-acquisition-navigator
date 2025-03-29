
import React from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { Container } from '@/components/ui/universal/Container';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  ShieldCheck, 
  Lock, 
  FileCheck, 
  Server, 
  ShieldAlert, 
  Clock,
  HardDrive,
  Users,
  Key,
  Fingerprint
} from 'lucide-react';

export default function SecurityPage() {
  const securityFeatures = [
    {
      title: 'Data Encryption',
      icon: <Lock className="h-12 w-12 text-primary/80" />,
      description: 'All data is encrypted at rest and in transit using industry-standard encryption protocols.'
    },
    {
      title: 'Access Controls',
      icon: <Key className="h-12 w-12 text-primary/80" />,
      description: 'Granular role-based access controls ensure that users can only access authorized data.'
    },
    {
      title: 'Compliance',
      icon: <FileCheck className="h-12 w-12 text-primary/80" />,
      description: 'Our platform is compliant with FISMA, FedRAMP, NIST 800-53, and other federal security standards.'
    },
    {
      title: 'Infrastructure',
      icon: <Server className="h-12 w-12 text-primary/80" />,
      description: 'Hosted in secure, redundant data centers with regular security assessments.'
    },
    {
      title: 'Threat Prevention',
      icon: <ShieldAlert className="h-12 w-12 text-primary/80" />,
      description: '24/7 monitoring for potential security threats with automated incident response.'
    },
    {
      title: 'Audit Logging',
      icon: <Clock className="h-12 w-12 text-primary/80" />,
      description: 'Comprehensive audit logs track all system activities for security and compliance purposes.'
    }
  ];

  return (
    <ExternalPageLayout
      showHeader={true}
      showFooter={true}
    >
      <Helmet>
        <title>Security | ProcurityIQ</title>
        <meta name="description" content="Learn about our comprehensive security measures that protect your sensitive acquisition data." />
      </Helmet>
      
      <Container className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <ShieldCheck className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Enterprise-Grade Security</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We implement comprehensive security measures to protect your sensitive acquisition data and ensure compliance with federal standards.
          </p>
        </div>
        
        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
            <Card key={index} className="h-full">
              <CardHeader className="pb-2 flex flex-col items-center text-center">
                {feature.icon}
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Compliance Section */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <FileCheck className="h-6 w-6 mr-3 text-primary" />
                <CardTitle>Compliance Certifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {['FedRAMP', 'FISMA', 'NIST 800-53', 'CMMC Level 3', 'FIPS 140-2', 'SOC 2 Type II'].map((cert, index) => (
                  <div key={index} className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg h-24">
                    <div className="text-lg font-medium">{cert}</div>
                    <div className="text-xs text-muted-foreground mt-1">Compliant</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Security FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Security FAQ</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Where is my data stored?</AccordionTrigger>
              <AccordionContent>
                <div className="flex">
                  <HardDrive className="h-5 w-5 mr-3 flex-shrink-0 text-primary" />
                  <div>
                    <p className="mb-2">
                      All data is stored in secure, FedRAMP-authorized data centers located in the United States. 
                      We offer region-specific data residency options for federal and state agencies with specific requirements.
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Our infrastructure is designed with redundancy and high availability to ensure your data remains accessible and protected.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>How is user access managed?</AccordionTrigger>
              <AccordionContent>
                <div className="flex">
                  <Users className="h-5 w-5 mr-3 flex-shrink-0 text-primary" />
                  <div>
                    <p className="mb-2">
                      ProcurityIQ implements strict role-based access controls (RBAC) with granular permissions. 
                      Administrators can define custom roles with specific access privileges tailored to job functions.
                    </p>
                    <p className="text-muted-foreground text-sm">
                      We support integration with your existing identity management solutions, including single sign-on (SSO) through SAML 2.0 and 
                      multi-factor authentication (MFA) to provide additional security layers.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>How is data protected in your system?</AccordionTrigger>
              <AccordionContent>
                <div className="flex">
                  <Lock className="h-5 w-5 mr-3 flex-shrink-0 text-primary" />
                  <div>
                    <p className="mb-2">
                      We employ multiple layers of data protection:
                    </p>
                    <ul className="list-disc list-inside mb-2 space-y-1">
                      <li>AES-256 encryption for all data at rest</li>
                      <li>TLS 1.3 for all data in transit</li>
                      <li>Tokenization of sensitive information</li>
                      <li>Regular data backups with encryption</li>
                      <li>Secure key management with regular rotation</li>
                    </ul>
                    <p className="text-muted-foreground text-sm">
                      Our encryption methods comply with FIPS 140-2 requirements for federal systems handling sensitive but unclassified information.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>What security testing do you perform?</AccordionTrigger>
              <AccordionContent>
                <div className="flex">
                  <ShieldAlert className="h-5 w-5 mr-3 flex-shrink-0 text-primary" />
                  <div>
                    <p className="mb-2">
                      Our security testing program includes:
                    </p>
                    <ul className="list-disc list-inside mb-2 space-y-1">
                      <li>Regular penetration testing by independent third parties</li>
                      <li>Continuous vulnerability scanning and remediation</li>
                      <li>Static and dynamic application security testing</li>
                      <li>Regular security code reviews</li>
                      <li>Annual SOC 2 Type II audits</li>
                    </ul>
                    <p className="text-muted-foreground text-sm">
                      We maintain a comprehensive vulnerability management program with defined SLAs for remediation based on severity levels.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>How do you handle security incidents?</AccordionTrigger>
              <AccordionContent>
                <div className="flex">
                  <Clock className="h-5 w-5 mr-3 flex-shrink-0 text-primary" />
                  <div>
                    <p className="mb-2">
                      We have a comprehensive incident response plan aligned with NIST guidelines that includes:
                    </p>
                    <ul className="list-disc list-inside mb-2 space-y-1">
                      <li>24/7 security monitoring and alerting</li>
                      <li>Defined incident severity levels and response procedures</li>
                      <li>Regular incident response training and simulations</li>
                      <li>Documented communication protocols</li>
                      <li>Post-incident analysis and continuous improvement</li>
                    </ul>
                    <p className="text-muted-foreground text-sm">
                      In the event of a security incident affecting your data, we provide prompt notification in accordance with our contractual obligations and applicable regulations.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* Security Whitepaper CTA */}
        <div className="bg-muted/50 rounded-lg border border-border p-8 text-center">
          <Fingerprint className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold mb-4">Security Whitepaper</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Download our comprehensive security whitepaper for detailed information about our security architecture, controls, 
            and compliance certifications.
          </p>
          <div className="flex justify-center">
            <a 
              href="#"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Download Security Whitepaper
            </a>
          </div>
        </div>
      </Container>
    </ExternalPageLayout>
  );
}
