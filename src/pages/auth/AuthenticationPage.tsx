
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSearchParams, Navigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';

export default function AuthenticationPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') === 'register' ? 'register' : 'login';

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <AuthForm mode={mode} />
      </div>
    </div>
  );
}
