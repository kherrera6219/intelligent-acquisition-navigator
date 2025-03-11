
import React from 'react';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';
import { Container, Row, Col } from '@/components/ui/universal/Grid';
import { Button } from '@/components/ui/button';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';

const SolicitationReviewPage = () => {
  return (
    <PageErrorBoundary>
      <ProtectedPageLayout 
        title="Solicitation Review" 
        description="Review and manage solicitations"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Solicitation Review', href: '/solicitation-review' }
        ]}
      >
        <Container>
          <Row>
            <Col>
              <p>This is the Solicitation Review Page.</p>
              <Button>Review Solicitation</Button>
            </Col>
          </Row>
        </Container>
      </ProtectedPageLayout>
    </PageErrorBoundary>
  );
};

export default SolicitationReviewPage;
