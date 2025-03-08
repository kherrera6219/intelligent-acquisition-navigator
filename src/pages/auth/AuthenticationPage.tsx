
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSearchParams, Navigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import { Container } from '@/components/ui/universal/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function AuthenticationPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') === 'register' ? 'register' : 'login';

  if (isLoading) {
    return (
      <Container>
        <div className="flex justify-center items-center min-h-[50vh]">
          <LoadingSpinner size="lg" />
          <span className="sr-only">Loading</span>
        </div>
      </Container>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Container>
      <div className="py-8 animate-fade-in">
        <PageHeader
          title={mode === 'login' ? "Sign In" : "Create Account"}
          description={mode === 'login' 
            ? "Welcome back! Sign in to access your account" 
            : "Join us today! Create an account to get started"
          }
        />
        
        <div className="max-w-md mx-auto mt-8">
          <AuthForm mode={mode} />
        </div>
      </div>
    </Container>
  );
}
