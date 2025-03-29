
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AuthFormProps {
  mode: 'login' | 'register';
  returnUrl?: string;
  onError?: (message: string) => void;
  onLoad?: (loading: boolean) => void;
}

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

const AuthForm = ({ 
  mode, 
  returnUrl = '/dashboard',
  onError,
  onLoad
}: AuthFormProps) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    if (onLoad) onLoad(true);
    
    try {
      if (mode === 'register') {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Account created",
          description: "Please check your email to verify your account",
        });
        
        navigate('/login');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Welcome back!",
          description: "You have been logged in successfully.",
        });
        
        navigate(returnUrl);
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      
      // Handle different error types
      let errorMessage = "An unexpected error occurred. Please try again.";
      
      if (error.message) {
        if (error.message.includes("credentials")) {
          errorMessage = "Invalid email or password. Please try again.";
        } else if (error.message.includes("email") && error.message.includes("confirm")) {
          errorMessage = "Please verify your email before logging in.";
        } else if (error.message.includes("rate limit")) {
          errorMessage = "Too many attempts. Please try again later.";
        } else {
          errorMessage = error.message;
        }
      }
      
      if (onError) onError(errorMessage);
      
      toast({
        title: mode === 'login' ? "Login failed" : "Registration failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      if (onLoad) onLoad(false);
    }
  };

  return (
    <div className="glass-card rounded-lg animate-fade-in">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              disabled={isLoading}
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
              disabled={isLoading}
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
                disabled={isLoading}
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
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {mode === 'login' ? 'Signing in...' : 'Creating account...'}
            </span>
          ) : (
            mode === 'login' ? 'Sign in' : 'Create account'
          )}
        </Button>
      </form>
    </div>
  );
};

export default AuthForm;
