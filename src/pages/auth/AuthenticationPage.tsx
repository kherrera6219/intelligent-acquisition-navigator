
import React, { Suspense, useEffect } from 'react';
import { Container } from "@/components/ui/universal/Container";
import { Card } from "@/components/ui/universal/Card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from "@/providers/AuthProvider";

const AuthForm = React.lazy(() => import('@/components/auth/AuthForm'));

export const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const mode = searchParams.get('mode') || 'login';
  const redirectTo = searchParams.get('redirectTo') || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      toast({
        title: "Already authenticated",
        description: "Redirecting you to the dashboard",
      });
    }
  }, [isAuthenticated, toast]);

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <Container className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-6 sm:p-8 bg-black/40 backdrop-blur-sm border-white/10">
          <Suspense fallback={
            <div className="flex justify-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          }>
            <AuthForm mode={mode as 'login' | 'register'} />
          </Suspense>
        </Card>
      </div>

      {/* Background Animation */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-[#0000001a]">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-violet-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default AuthPage;
