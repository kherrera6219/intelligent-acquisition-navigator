
import React from 'react';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';
import { Container, Row, Col } from '@/components/ui/universal/Grid';
import { Card } from '@/components/ui/card';
import PasswordResetRequest from '@/components/auth/PasswordResetRequest';
import { useNavigate } from 'react-router-dom';

// Update the PasswordResetRequestPage component to handle the onSuccess callback
const PasswordResetRequestPage = () => {
  const navigate = useNavigate();
  
  const handleSuccess = () => {
    // Navigate to login page or show success message
    navigate('/auth');
  };
  
  return (
    <PageErrorBoundary>
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Container>
          <Row className="justify-center">
            <Col sm={12} md={8} lg={6} xl={5}>
              <Card className="p-6 shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
                <PasswordResetRequest onSuccess={handleSuccess} />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </PageErrorBoundary>
  );
};

export default PasswordResetRequestPage;
