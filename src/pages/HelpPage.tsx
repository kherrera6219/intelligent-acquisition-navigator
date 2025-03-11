import React from 'react';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';
import { Container, Row, Col } from '@/components/ui/universal/Grid';
import { Button } from '@/components/ui/button';
import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';

const HelpPage = () => {
  return (
    <PageErrorBoundary>
      <ProtectedPageLayout title="Help & Support" description="Find answers to common questions and get support.">
        <Container>
          <Row>
            <Col>
              <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
              
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">How do I reset my password?</h3>
                <p>
                  To reset your password, go to the <Button variant="link" asChild><a href="/auth/forgot-password">Forgot Password</a></Button> page and follow the instructions.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">How do I contact support?</h3>
                <p>
                  You can contact our support team by sending an email to <a href="mailto:support@example.com">support@example.com</a>.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </ProtectedPageLayout>
    </PageErrorBoundary>
  );
};

export default HelpPage;
