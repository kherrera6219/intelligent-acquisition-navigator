
import React, { useState } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';
import { Container, Row, Col } from '@/components/ui/universal/Grid';
import { FlexCenter } from '@/components/ui/universal/Flexbox';

const AuthenticationContent = () => {
  const [activeTab, setActiveTab] = useState<string>('login');

  return (
    <FlexCenter className="min-h-[80vh] px-4 ms-motion-fadeIn">
      <Card className="w-full max-w-md p-6 shadow-xl ms-fluent-panel border border-white/10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Welcome to ProcurityIQ</h1>
          <p className="text-sm text-gray-400 mt-2">Sign in to your account or create a new one</p>
        </div>
        
        <Tabs defaultValue="login" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <AuthForm mode="login" setActiveTab={setActiveTab} />
          </TabsContent>
          
          <TabsContent value="signup">
            <AuthForm mode="register" setActiveTab={setActiveTab} />
          </TabsContent>
        </Tabs>
      </Card>
    </FlexCenter>
  );
};

const AuthenticationPage = () => {
  return (
    <PageErrorBoundary>
      <div className="min-h-screen bg-background flex flex-col">
        <Container fluid className="flex-1">
          <Row className="h-full">
            <Col className="flex items-center justify-center">
              <AuthenticationContent />
            </Col>
          </Row>
        </Container>
      </div>
    </PageErrorBoundary>
  );
};

export default AuthenticationPage;
