
import React, { useState } from 'react';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';
import { Container, Row, Col } from '@/components/ui/universal/Grid';
import { Button } from '@/components/ui/button';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useKnowledgeBase } from '@/hooks/useKnowledgeBase';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';

const KnowledgeBasePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { entries, isLoading } = useKnowledgeBase();
  const { isOnline } = useNetworkMonitor();

  const filteredEntries = entries.filter(entry => 
    entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <div className="flex items-center p-4">
                  <Search className="h-5 w-5 mr-2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search the knowledge base..."
                    className="flex-1 border-none outline-none bg-transparent text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button variant="outline" size="sm">Search</Button>
                </div>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              {isLoading ? (
                <div className="text-center py-4">Loading knowledge base entries...</div>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {filteredEntries.map(entry => (
                    <AccordionItem key={entry.id} value={entry.id}>
                      <AccordionTrigger>{entry.title}</AccordionTrigger>
                      <AccordionContent>
                        {entry.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </Col>
          </Row>
        </Container>
      </ProtectedPageLayout>
    </PageErrorBoundary>
  );
};

export default KnowledgeBasePage;
