
import React, { useState } from 'react';
import { Container } from '@/components/ui/universal/Container';
import { Card } from '@/components/ui/universal/Card';
import { Link } from 'react-router-dom';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PasswordResetFormData {
  email: string;
}

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<PasswordResetFormData>();
  
  const onSubmit = async (data: PasswordResetFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (resetError) throw resetError;
      
      setIsSuccess(true);
      toast({
        title: "Reset email sent",
        description: "Check your inbox for the password reset link"
      });
    } catch (err: any) {
      console.error('Password reset error:', err);
      setError(err.message || "Failed to send password reset email");
      toast({
        title: "Error",
        description: err.message || "Failed to send password reset email",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <PageErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4 sm:p-6">
        <Container className="max-w-md">
          <Card className="bg-black/40 backdrop-blur-sm border-white/10 shadow-xl p-6">
            <h1 className="text-2xl font-bold mb-6 text-center text-white">Reset Password</h1>
            
            {error && (
              <Alert variant="destructive" className="mb-4 bg-red-900/40 border-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {isSuccess ? (
              <div className="text-center space-y-4">
                <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-4 flex flex-col items-center">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mb-2" />
                  <h2 className="text-xl font-medium text-white mb-2">Check Your Email</h2>
                  <p className="text-gray-300">
                    We've sent a password reset link to your email address. Please check your inbox and spam folder.
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => navigate('/login')}
                >
                  Return to Login
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    disabled={isLoading}
                    className="bg-white/5 text-white"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.email.message}
                    </p>
                  )}
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending reset link...
                      </span>
                    ) : (
                      'Send Reset Link'
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full flex items-center justify-center"
                    onClick={() => navigate('/login')}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </Container>
      </div>
    </PageErrorBoundary>
  );
};

export default ForgotPasswordPage;
