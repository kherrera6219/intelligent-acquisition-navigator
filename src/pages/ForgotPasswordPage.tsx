
import React from 'react';
import { Container, Row, Col } from '@/components/ui/universal/Grid';
import { Card } from '@/components/ui/universal/Card';
import PasswordResetRequest from '@/components/auth/PasswordResetRequest';
import { Link } from 'react-router-dom';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSuccess = () => {
    navigate('/login');
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
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    <Link to="/login" className="text-primary hover:underline">Back to login</Link>
                  </p>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </PageErrorBoundary>
  );
};

export default ForgotPasswordPage;
