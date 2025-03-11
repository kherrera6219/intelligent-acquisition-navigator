
import React, { useState } from 'react';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';
import { Container, Row, Col } from '@/components/ui/universal/Grid';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthForm from '@/components/auth/AuthForm';

const AuthenticationPage = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <PageErrorBoundary>
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Container>
          <Row className="justify-center">
            <Col sm={12} md={8} lg={6} xl={5}>
              <Card className="p-6 shadow-lg">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login">
                    <AuthForm mode="login" />
                  </TabsContent>
                  <TabsContent value="register">
                    <AuthForm mode="register" />
                  </TabsContent>
                </Tabs>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </PageErrorBoundary>
  );
};

export default AuthenticationPage;
