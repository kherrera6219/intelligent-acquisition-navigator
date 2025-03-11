
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSearchParams, Navigate, useLocation } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import { Container } from '@/components/ui/universal/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/universal/Card';

export default function AuthenticationPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const mode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  
  // Get the return URL from searchParams, location state, or default to dashboard
  const returnUrl = searchParams.get('returnUrl') || (location.state?.from?.pathname || '/dashboard');

  // Page title based on mode
  useEffect(() => {
    document.title = mode === 'login' ? 'Sign In | ProcurityIQ' : 'Create Account | ProcurityIQ';
  }, [mode]);

  if (isLoading) {
    return (
      <MainLayout containerSize="sm">
        <div className="flex justify-center items-center min-h-[50vh]">
          <LoadingSpinner size="lg" />
          <span className="sr-only">Loading authentication page</span>
        </div>
      </MainLayout>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={returnUrl} replace />;
  }

  return (
    <MainLayout containerSize="sm">
      <div className="py-8 animate-fade-in bg-noise"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.15) 100%),
            radial-gradient(at 50% 0%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.2) 75%)
          `,
          backgroundAttachment: 'fixed'
        }}
      >
        <PageHeader
          title={mode === 'login' ? "Sign In" : "Create Account"}
          description={mode === 'login' 
            ? "Welcome back! Sign in to access your account" 
            : "Join us today! Create an account to get started"
          }
        />
        
        <Card 
          variant="metal" 
          className="max-w-md mx-auto mt-8 p-6"
        >
          <AuthForm mode={mode} returnUrl={returnUrl} />
          
          <div className="mt-6 text-center">
            {mode === 'login' ? (
              <div className="text-sm text-gray-400">
                Don't have an account?{' '}
                <a href="/auth?mode=register" className="text-primary hover:underline">
                  Create one
                </a>
              </div>
            ) : (
              <div className="text-sm text-gray-400">
                Already have an account?{' '}
                <a href="/auth" className="text-primary hover:underline">
                  Sign in
                </a>
              </div>
            )}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
