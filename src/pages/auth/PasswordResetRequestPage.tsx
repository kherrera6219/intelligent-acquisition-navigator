
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';
import { PasswordResetRequest } from '@/components/auth/PasswordResetRequest';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PasswordResetRequestContent = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md p-6 shadow-xl bg-card/80 backdrop-blur-sm border border-white/10">
        {!isSubmitted ? (
          <>
            <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
            <p className="text-muted-foreground mb-6">
              Enter your email address below and we'll send you a link to reset your password.
            </p>
            
            <PasswordResetRequest onSuccess={() => setIsSubmitted(true)} />
            
            <div className="mt-6 text-center">
              <Link to="/auth" className="text-primary hover:underline">
                Return to login
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <h2 className="text-2xl font-bold mb-4">Email Sent</h2>
            <p className="text-muted-foreground mb-6">
              If an account exists with that email, we've sent password reset instructions.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/auth">Return to Login</Link>
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

const PasswordResetRequestPage = () => {
  return (
    <PageErrorBoundary>
      <MainLayout 
        showHeader={true} 
        showFooter={true} 
        variant="minimal"
      >
        <PasswordResetRequestContent />
      </MainLayout>
    </PageErrorBoundary>
  );
};

export default PasswordResetRequestPage;
