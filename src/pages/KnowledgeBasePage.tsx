
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
        isLoading={isLoading}
        backLink={{ label: "Back to Dashboard", href: "/dashboard" }}
        breadcrumbs={[
          { label: "Home", href: "/dashboard" },
          { label: "Knowledge Base", href: "/knowledge-base" }
        ]}
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
              ) : filteredEntries.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No knowledge base entries found. Try adjusting your search.</p>
                  <Button variant="outline" onClick={() => setSearchQuery('')}>Clear Search</Button>
                </div>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {filteredEntries.map(entry => (
                    <AccordionItem key={entry.id} value={entry.id}>
                      <AccordionTrigger>{entry.title}</AccordionTrigger>
                      <AccordionContent>
                        {entry.content}
                        {entry.tags && entry.tags.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {entry.tags.map((tag, idx) => (
                              <span key={idx} className="text-xs bg-secondary/30 px-2 py-1 rounded-md">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
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
