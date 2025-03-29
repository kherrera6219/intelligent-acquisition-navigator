
import React, { useState } from 'react';
import { Container } from '@/components/ui/universal/Container';
import { Card } from '@/components/ui/universal/Card';
import AuthForm from '@/components/auth/AuthForm';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';
import { Responsive } from '@/components/ui/universal/Responsive';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { ArrowRight, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

const LoginPage: React.FC = () => {
  const { isAbove } = useBreakpoint();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get return URL from location state or query params
  const returnUrl = new URLSearchParams(location.search).get('returnUrl') || '/dashboard';
  
  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      toast({
        title: "Already logged in",
        description: "You are already authenticated"
      });
      navigate(returnUrl);
    }
  }, [isAuthenticated, navigate, returnUrl, toast]);
  
  return (
    <PageErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4 sm:p-6">
        <Container className="max-w-lg">
          <div className="text-center mb-6">
            <Responsive showAt="md">
              <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-400">
                Log in to your account to continue
              </p>
            </Responsive>
            <Responsive hideAt="md">
              <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
                Login
              </h1>
            </Responsive>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4 bg-red-900/40 border-red-800">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card 
            className="bg-black/40 backdrop-blur-sm border-white/10 shadow-xl p-6"
            noShadow
          >
            <AuthForm 
              mode="login" 
              returnUrl={returnUrl}
              onError={(msg) => setError(msg)} 
              onLoad={(loading) => setIsLoading(loading)} 
            />
            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:underline inline-flex items-center">
                  Register 
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </p>
              <p className="text-sm text-muted-foreground">
                <Link to="/forgot-password" className="text-primary hover:underline">
                  Forgot password?
                </Link>
              </p>
            </div>
          </Card>
          
          {isAbove('md') && (
            <div className="text-center mt-8 text-sm text-gray-500">
              <p>© {new Date().getFullYear()} ProcurityIQ. All rights reserved.</p>
            </div>
          )}
        </Container>
      </div>
    </PageErrorBoundary>
  );
};

export default LoginPage;
