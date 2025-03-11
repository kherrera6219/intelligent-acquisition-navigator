
import React from 'react';
import { Container, Row, Col } from '@/components/ui/universal/Grid';
import { Card } from '@/components/ui/card';
import PasswordResetRequest from './PasswordResetRequest';

const PasswordReset: React.FC = () => {
  return (
    <Container>
      <Row className="justify-center">
        <Col sm={12} md={8} lg={6} xl={5}>
          <Card className="p-6 shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
            <PasswordResetRequest />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PasswordReset;
