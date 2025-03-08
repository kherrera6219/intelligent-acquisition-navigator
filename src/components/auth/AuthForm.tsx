
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

interface AuthFormProps {
  mode: 'login' | 'register';
}

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      if (mode === 'register') {
        await signup(data.email, data.password);
        toast({
          title: "Account created",
          description: "Welcome! Your account has been created successfully.",
        });
      } else {
        await login(data.email, data.password);
        toast({
          title: "Welcome back!",
          description: "You have been logged in successfully.",
        });
      }
      navigate('/dashboard');
    } catch (error) {
      // Error is already handled in useAuthActions, showing toast there
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card p-6 rounded-lg shadow-lg animate-fade-in">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            {mode === 'login' ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="text-sm text-gray-400">
            {mode === 'login' 
              ? 'Enter your credentials to access your account' 
              : 'Enter your details to create your account'}
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="bg-white/5"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="text-sm text-red-500 flex items-center gap-1" role="alert">
                <AlertCircle className="h-4 w-4" />
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                }
              })}
              className="bg-white/5"
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <p className="text-sm text-red-500 flex items-center gap-1" role="alert">
                <AlertCircle className="h-4 w-4" />
                {errors.password.message}
              </p>
            )}
          </div>

          {mode === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value => value === watch('password') || 'Passwords do not match'
                })}
                className="bg-white/5"
                aria-invalid={errors.confirmPassword ? "true" : "false"}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 flex items-center gap-1" role="alert">
                  <AlertCircle className="h-4 w-4" />
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          )}

          {mode === 'login' && (
            <div className="text-right">
              <Link 
                to="/auth/reset-password" 
                className="text-primary hover:underline text-sm"
              >
                Forgot password?
              </Link>
            </div>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⟳</span>
              {mode === 'login' ? 'Signing in...' : 'Creating account...'}
            </span>
          ) : (
            mode === 'login' ? 'Sign in' : 'Create account'
          )}
        </Button>

        <p className="text-sm text-center text-gray-400">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <Button 
                variant="link" 
                className="p-0 h-auto font-normal"
                onClick={() => navigate('/auth?mode=register')}
              >
                Sign up
              </Button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Button 
                variant="link" 
                className="p-0 h-auto font-normal"
                onClick={() => navigate('/auth?mode=login')}
              >
                Sign in
              </Button>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
