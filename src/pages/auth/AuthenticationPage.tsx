
import { useSearchParams, Navigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/providers/AuthProvider';

const AuthenticationPage = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const { isAuthenticated } = useAuth();
  
  // Redirect authenticated users to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="w-full max-w-md p-6">
        <Card className="p-6 bg-black/40 backdrop-blur-sm border-white/5">
          <AuthForm mode={mode === 'register' ? 'register' : 'login'} />
        </Card>
      </div>
    </div>
  );
};

export default AuthenticationPage;
