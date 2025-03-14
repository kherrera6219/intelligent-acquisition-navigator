
import React from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Eye, FileText, Bell, Database } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    {
      id: "data-collection",
      icon: <Database className="h-5 w-5 mr-2" />,
      title: "Data Collection",
      content: `We collect several types of information for various purposes to provide and improve our services to you:

      1. Personal Data: While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you.
      
      2. Usage Data: We may also collect information on how the Service is accessed and used. This includes your computer's Internet Protocol address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.
      
      3. Cookies: We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.`
    },
    {
      id: "data-usage",
      icon: <Eye className="h-5 w-5 mr-2" />,
      title: "Use of Data",
      content: `We use the collected data for various purposes:

      1. To provide and maintain our Service
      2. To notify you about changes to our Service
      3. To allow you to participate in interactive features of our Service when you choose to do so
      4. To provide customer support
      5. To gather analysis or valuable information so that we can improve our Service
      6. To monitor the usage of our Service
      7. To detect, prevent and address technical issues
      8. To provide you with news, special offers and general information about other goods, services and events which we offer`
    },
    {
      id: "data-security",
      icon: <Lock className="h-5 w-5 mr-2" />,
      title: "Data Security",
      content: `The security of your data is important to us. We use appropriate technical and organizational measures to protect personal information and acquisition data from unauthorized access, modification, disclosure or destruction.

      However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
      
      We regularly review and update our security policies and technologies to improve the protection of your information.`
    },
    {
      id: "data-retention",
      icon: <FileText className="h-5 w-5 mr-2" />,
      title: "Data Retention",
      content: `We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy.

      We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
      
      Usage Data is generally retained for a shorter period, except when this data is used to strengthen the security or to improve the functionality of our Service, or we are legally obligated to retain this data for longer time periods.`
    },
    {
      id: "notifications",
      icon: <Bell className="h-5 w-5 mr-2" />,
      title: "Communication Preferences",
      content: `We may use your Personal Data to contact you with newsletters, marketing or promotional materials and other information that may be of interest to you.

      You may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send or by contacting us directly.
      
      We will make efforts to respond to your request within 30 days.`
    },
    {
      id: "legal-compliance",
      icon: <Shield className="h-5 w-5 mr-2" />,
      title: "Legal Compliance",
      content: `Our Privacy Policy is designed to comply with relevant data protection laws including:

      1. General Data Protection Regulation (GDPR)
      2. California Consumer Privacy Act (CCPA)
      3. Federal Acquisition Regulation (FAR) privacy requirements
      4. Health Insurance Portability and Accountability Act (HIPAA) where applicable
      
      We regularly update our practices to ensure ongoing compliance with evolving regulatory requirements, particularly those relevant to federal acquisition data.`
    },
  ];

  return (
    <ExternalPageLayout title="Privacy Policy" description="Learn about how we collect, use, and protect your information.">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-blue-400 border-blue-400">Your Privacy Matters</Badge>
          <h1 className="text-4xl font-bold mb-4 text-white">Privacy Policy</h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Last updated: June 1, 2024
          </p>
          <p className="text-gray-400 mt-6 max-w-3xl mx-auto">
            This Privacy Policy describes how Acquisition Knowledge Framework ("we," "us," or "our") 
            collects, uses, and discloses your information when you use our services. We take your privacy seriously 
            and are committed to protecting your personal and acquisition data.
          </p>
        </div>
        
        {/* Privacy Summary Card */}
        <Card className="p-8 mb-16 bg-gradient-to-br from-blue-900/30 to-gray-800 border-gray-700">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="bg-blue-900/50 p-4 rounded-full">
              <Shield className="h-10 w-10 text-blue-300" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Our Privacy Commitment</h2>
              <p className="text-gray-300 mb-4">
                At Acquisition Knowledge Framework, we prioritize the security and privacy of your data. 
                Our platform is designed with federal acquisition standards in mind, ensuring compliance with 
                relevant regulations while providing you with control over your information.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span> 
                  We only collect information necessary to provide our services
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span> 
                  Your data is secured with enterprise-grade encryption
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span> 
                  We never sell your personal information to third parties
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span> 
                  You maintain control over your communication preferences
                </li>
              </ul>
            </div>
          </div>
        </Card>
        
        {/* Policy Sections Accordion */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-white">Privacy Policy Details</h2>
          <Accordion type="single" collapsible className="w-full">
            {sections.map((section, index) => (
              <AccordionItem key={index} value={section.id} className="border-gray-700">
                <AccordionTrigger className="text-white hover:text-blue-400 py-4">
                  <div className="flex items-center">
                    {section.icon}
                    <span>{section.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 whitespace-pre-line">
                  {section.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Questions About Our Privacy Policy?</h2>
          <p className="text-gray-400 mb-6">
            If you have any questions or concerns about our Privacy Policy or data practices, 
            please contact our Data Protection Officer.
          </p>
          <div className="flex justify-center">
            <Card className="p-6 bg-gray-800 border-gray-700 max-w-md">
              <h3 className="text-xl font-semibold mb-2 text-white">Contact Information</h3>
              <p className="text-gray-400 mb-4">
                Acquisition Knowledge Framework<br />
                Attn: Data Protection Officer<br />
                1234 Government Ave.<br />
                Washington, DC 20500
              </p>
              <p className="text-gray-400">
                Email: <a href="mailto:privacy@akf.gov" className="text-blue-400 hover:underline">privacy@akf.gov</a><br />
                Phone: +1 (555) 123-4567
              </p>
            </Card>
          </div>
        </div>
      </div>
    </ExternalPageLayout>
  );
}
