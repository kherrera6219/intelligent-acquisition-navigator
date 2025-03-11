import React from 'react';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';
import { Container, Row, Col } from '@/components/ui/universal/Grid';
import { Button } from '@/components/ui/button';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';

const DocumentControlPage = () => {
  return (
    <PageErrorBoundary>
      <ProtectedPageLayout title="Document Control" description="Manage and control important documents related to acquisition processes.">
        <Container>
          <Row>
            <Col>
              <p>This is the Document Control page content.</p>
              <Button>Example Button</Button>
            </Col>
          </Row>
        </Container>
      </ProtectedPageLayout>
    </PageErrorBoundary>
  );
};

export default DocumentControlPage;
