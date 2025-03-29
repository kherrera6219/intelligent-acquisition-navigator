
import React, { useEffect } from 'react';
import { Container } from '@/components/ui/universal/Container';
import { Card } from '@/components/ui/universal/Card';
import AuthForm from '@/components/auth/AuthForm';
import { Link, useNavigate } from 'react-router-dom';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';
import { Responsive } from '@/components/ui/universal/Responsive';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const RegisterPage: React.FC = () => {
  const { isAbove } = useBreakpoint();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      toast({
        title: "Already logged in",
        description: "You are already registered and authenticated"
      });
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate, toast]);

  return (
    <PageErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4 sm:p-6">
        <Container className="max-w-lg">
          <div className="text-center mb-6">
            <Responsive showAt="md">
              <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                Create an Account
              </h1>
              <p className="text-gray-400">
                Join ProcurityIQ to access powerful acquisition tools
              </p>
            </Responsive>
            <Responsive hideAt="md">
              <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
                Sign Up
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
              mode="register"
              onError={(msg) => setError(msg)} 
              onLoad={(loading) => setIsLoading(loading)}
            />
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline inline-flex items-center">
                  <ArrowLeft className="mr-1 h-3 w-3" />
                  Login
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

export default RegisterPage;
