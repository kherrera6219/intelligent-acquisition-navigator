import React from 'react';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';
import { Container, Row, Col } from '@/components/ui/universal/Grid';
import { Button } from '@/components/ui/button';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const KnowledgeBasePage = () => {
  return (
    <PageErrorBoundary>
      <ProtectedPageLayout 
        title="Knowledge Base"
        description="Explore our comprehensive knowledge base to find answers to common questions and learn how to use our platform effectively."
      >
        <Container>
          <Row>
            <Col>
              <Card className="mb-6">
                <div className="flex items-center">
                  <Search className="h-5 w-5 mr-2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search the knowledge base..."
                    className="flex-1 border-none outline-none bg-transparent text-sm"
                  />
                  <Button variant="outline" size="sm">Search</Button>
                </div>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I create a new proposal?</AccordionTrigger>
                  <AccordionContent>
                    To create a new proposal, navigate to the Proposals page and click on the "Create Proposal" button. Fill out the required fields and submit the form.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                  <AccordionContent>
                    To reset your password, go to the <Link to="/auth/forgot-password" className="underline">Forgot Password</Link> page and follow the instructions.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What are the system requirements?</AccordionTrigger>
                  <AccordionContent>
                    The system requires a modern web browser with JavaScript enabled. We recommend using the latest version of Chrome, Firefox, Safari, or Edge.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>How do I contact support?</AccordionTrigger>
                  <AccordionContent>
                    You can contact our support team by visiting the <Link to="/contact" className="underline">Contact Us</Link> page and submitting the form.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </ProtectedPageLayout>
    </PageErrorBoundary>
  );
};

export default KnowledgeBasePage;
