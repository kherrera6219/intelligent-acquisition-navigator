
import React from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
import { Container } from '@/components/ui/universal/Container';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, LifeBuoy, FileText, Mail, MessageSquare, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function HelpPage() {
  const frequentlyAskedQuestions = [
    {
      question: "How do I reset my password?",
      answer: "To reset your password, click on the 'Forgot Password' link on the login page. You'll receive an email with instructions to reset your password. Follow the link in the email to create a new password."
    },
    {
      question: "Can I use the platform on mobile devices?",
      answer: "Yes, our platform is fully responsive and works on all modern mobile devices. You can access all features through your mobile browser without needing to download an app."
    },
    {
      question: "How do I export reports?",
      answer: "To export a report, navigate to the report page and click on the 'Export' button in the top-right corner. You can choose to export in PDF, Excel, or CSV formats depending on your needs."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take security seriously. All data is encrypted both in transit and at rest. We use industry-standard security protocols and regularly undergo security audits to ensure compliance with federal security standards."
    },
    {
      question: "How do I add team members?",
      answer: "Administrators can add team members by going to Settings > Team Management and clicking 'Add Member'. Enter their email address and select their role to send an invitation."
    }
  ];

  return (
    <ExternalPageLayout title="Help Center" description="Find answers to your questions and get support for using our platform.">
      <div className="bg-gradient-to-b from-blue-900/20 to-transparent py-20">
        <Container>
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-blue-400 border-blue-400">Support</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">How can we help?</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Find answers, guides, and support for all your acquisition needs.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input 
                placeholder="Search for help articles..."
                className="pl-10 bg-gray-800/50 border-gray-700 focus:border-blue-500 text-white"
              />
            </div>
          </div>
        </Container>
      </div>
      
      <Container className="py-16">
        <Tabs defaultValue="faq" className="mb-16">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="faq" className="data-[state=active]:bg-blue-900/20">
              <FileText className="h-4 w-4 mr-2" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="guides" className="data-[state=active]:bg-blue-900/20">
              <LifeBuoy className="h-4 w-4 mr-2" />
              Guides
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-blue-900/20">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Us
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq">
            <Card className="p-6 bg-gray-800 border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {frequentlyAskedQuestions.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-white hover:text-blue-400">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </TabsContent>
          
          <TabsContent value="guides">
            <Card className="p-6 bg-gray-800 border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-white">User Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-700/50 rounded-lg p-6 hover:bg-gray-700/80 transition-colors">
                  <h3 className="text-xl font-semibold mb-2 text-white">Getting Started Guide</h3>
                  <p className="text-gray-300 mb-4">Learn the basics of navigating and using the platform.</p>
                  <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0">
                    Read Guide →
                  </Button>
                </div>
                
                <div className="bg-gray-700/50 rounded-lg p-6 hover:bg-gray-700/80 transition-colors">
                  <h3 className="text-xl font-semibold mb-2 text-white">Compliance Checks</h3>
                  <p className="text-gray-300 mb-4">Understand how to run and interpret compliance checks.</p>
                  <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0">
                    Read Guide →
                  </Button>
                </div>
                
                <div className="bg-gray-700/50 rounded-lg p-6 hover:bg-gray-700/80 transition-colors">
                  <h3 className="text-xl font-semibold mb-2 text-white">Analytics & Reporting</h3>
                  <p className="text-gray-300 mb-4">Learn how to generate and customize reports.</p>
                  <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0">
                    Read Guide →
                  </Button>
                </div>
                
                <div className="bg-gray-700/50 rounded-lg p-6 hover:bg-gray-700/80 transition-colors">
                  <h3 className="text-xl font-semibold mb-2 text-white">User Management</h3>
                  <p className="text-gray-300 mb-4">Guide to adding users and managing permissions.</p>
                  <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0">
                    Read Guide →
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="contact">
            <Card className="p-6 bg-gray-800 border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-white">Contact Support</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-700/50 rounded-lg p-6 text-center">
                  <Mail className="h-10 w-10 mx-auto mb-4 text-blue-400" />
                  <h3 className="text-lg font-semibold mb-2 text-white">Email Support</h3>
                  <p className="text-gray-300 mb-4">Get answers within 24 hours</p>
                  <a href="mailto:support@akf.gov" className="text-blue-400 hover:text-blue-300">support@akf.gov</a>
                </div>
                
                <div className="bg-gray-700/50 rounded-lg p-6 text-center">
                  <Phone className="h-10 w-10 mx-auto mb-4 text-blue-400" />
                  <h3 className="text-lg font-semibold mb-2 text-white">Phone Support</h3>
                  <p className="text-gray-300 mb-4">Available 9am-5pm EST</p>
                  <a href="tel:+1555555555" className="text-blue-400 hover:text-blue-300">(555) 555-5555</a>
                </div>
                
                <div className="bg-gray-700/50 rounded-lg p-6 text-center">
                  <MessageSquare className="h-10 w-10 mx-auto mb-4 text-blue-400" />
                  <h3 className="text-lg font-semibold mb-2 text-white">Live Chat</h3>
                  <p className="text-gray-300 mb-4">Chat with our support team</p>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Start Chat
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="text-center">
          <Card className="p-8 bg-gradient-to-br from-blue-900/30 to-gray-800 border-gray-700 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Still need help?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Our team of acquisition experts is ready to assist you with any questions or challenges you might be facing.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Request Personalized Support
            </Button>
          </Card>
        </div>
      </Container>
    </ExternalPageLayout>
  );
}
