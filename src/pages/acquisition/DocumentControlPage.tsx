
import React from 'react';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';
import { Container, Row, Col } from '@/components/ui/universal/Grid';
import { Button } from '@/components/ui/button';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';
import UniversalInternalHeader from '@/components/layout/UniversalInternalHeader';
import { InternalFooter } from '@/components/layout/InternalFooter';

const DocumentControlPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header outside of main content */}
      <UniversalInternalHeader />
      
      {/* Main content with sidebar and page content */}
      <PageErrorBoundary>
        <div className="flex-1 flex">
          <ProtectedPageLayout 
            title="Document Control" 
            description="Manage and control important documents related to acquisition processes."
            breadcrumbs={[
              { label: 'Dashboard', href: '/dashboard' },
              { label: 'Document Control', href: '/document-control' }
            ]}
          >
            <Container>
              <Row>
                <Col>
                  <p>This is the Document Control page content.</p>
                  <Button>Example Button</Button>
                </Col>
              </Row>
            </Container>
          </ProtectedPageLayout>
        </div>
      </PageErrorBoundary>
      
      {/* Footer outside of main content */}
      <InternalFooter />
    </div>
  );
};

export default DocumentControlPage;
