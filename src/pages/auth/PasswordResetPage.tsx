
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';
import { PasswordResetForm } from '@/components/auth/PasswordResetForm';
import { Card } from '@/components/ui/card';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const PasswordResetContent = () => {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Get token and email from URL params
    const searchParams = new URLSearchParams(location.search);
    const urlToken = searchParams.get('token');
    const urlEmail = searchParams.get('email');
    
    if (!urlToken || !urlEmail) {
      setIsError(true);
      setErrorMessage('Invalid or missing reset token. Please request a new password reset link.');
      return;
    }
    
    setToken(urlToken);
    setEmail(urlEmail);
  }, [location]);
  
  const handleSuccess = () => {
    setIsSuccess(true);
    toast({
      title: "Password reset successful",
      description: "Your password has been updated. You can now log in with your new password.",
    });
    
    // Redirect to login after 3 seconds
    setTimeout(() => {
      navigate('/auth');
    }, 3000);
  };
  
  const handleError = (error: string) => {
    setIsError(true);
    setErrorMessage(error);
    toast({
      variant: "destructive",
      title: "Password reset failed",
      description: error,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md p-6 shadow-xl bg-card/80 backdrop-blur-sm border border-white/10">
        {isError ? (
          <div className="space-y-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
            
            <div className="text-center mt-6">
              <Button asChild variant="outline" className="w-full">
                <Link to="/auth/reset-request">Request New Reset Link</Link>
              </Button>
              
              <div className="mt-4">
                <Link to="/auth" className="text-primary hover:underline">
                  Return to login
                </Link>
              </div>
            </div>
          </div>
        ) : isSuccess ? (
          <div className="text-center py-6">
            <h2 className="text-2xl font-bold mb-4">Password Updated</h2>
            <p className="text-muted-foreground mb-6">
              Your password has been reset successfully. You will be redirected to the login page shortly.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/auth">Return to Login</Link>
            </Button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6">Reset Your Password</h2>
            <p className="text-muted-foreground mb-6">
              Enter your new password below.
            </p>
            
            {token && email && (
              <PasswordResetForm 
                token={token}
                email={email}
                onSuccess={handleSuccess}
                onError={handleError}
              />
            )}
            
            <div className="mt-6 text-center">
              <Link to="/auth" className="text-primary hover:underline">
                Return to login
              </Link>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

const PasswordResetPage = () => {
  return (
    <PageErrorBoundary>
      <MainLayout 
        showHeader={true} 
        showFooter={true} 
        variant="minimal"
      >
        <PasswordResetContent />
      </MainLayout>
    </PageErrorBoundary>
  );
};

export default PasswordResetPage;
