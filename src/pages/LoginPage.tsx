
import React from 'react';
import { Container, Row, Col } from '@/components/ui/universal/Grid';
import { Card } from '@/components/ui/universal/Card';
import AuthForm from '@/components/auth/AuthForm';
import { Link } from 'react-router-dom';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';

const LoginPage: React.FC = () => {
  return (
    <PageErrorBoundary>
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Container>
          <Row className="justify-center">
            <Col sm={12} md={8} lg={6} xl={5}>
              <Card className="p-6 shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                <AuthForm mode="login" />
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account? <Link to="/register" className="text-primary hover:underline">Register</Link>
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    <Link to="/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
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

export default LoginPage;
