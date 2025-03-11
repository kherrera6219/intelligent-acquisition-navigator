import React from 'react';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';
import { Container, Row, Col } from '@/components/ui/universal/Grid';
import { Card } from '@/components/ui/card';
import PasswordResetForm from '@/components/auth/PasswordResetForm';

const PasswordResetPage = () => {
  return (
    <PageErrorBoundary>
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Container>
          <Row className="justify-center">
            <Col sm={12} md={8} lg={6} xl={5}>
              <Card className="p-6 shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
                <PasswordResetForm />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </PageErrorBoundary>
  );
};

export default PasswordResetPage;
