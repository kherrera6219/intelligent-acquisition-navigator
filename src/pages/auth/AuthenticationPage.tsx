
import React, { useState } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';

const AuthenticationContent = () => {
  const [activeTab, setActiveTab] = useState<string>('login');

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md p-6 shadow-xl bg-card/80 backdrop-blur-sm border border-white/10">
        <Tabs defaultValue="login" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <AuthForm setActiveTab={setActiveTab} />
          </TabsContent>
          
          <TabsContent value="signup">
            <SignUpForm setActiveTab={setActiveTab} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

const AuthenticationPage = () => {
  return (
    <PageErrorBoundary>
      <MainLayout 
        showHeader={true} 
        showFooter={true} 
        variant="minimal"
      >
        <AuthenticationContent />
      </MainLayout>
    </PageErrorBoundary>
  );
};

export default AuthenticationPage;
