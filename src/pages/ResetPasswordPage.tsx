
import React, { useState, useEffect } from 'react';
import { Container } from '@/components/ui/universal/Container';
import { Card } from '@/components/ui/universal/Card';
import { Link, useNavigate } from 'react-router-dom';
import { PageErrorBoundary } from '@/components/ui/universal/PageErrorBoundary';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Loader2, CheckCircle2, ArrowLeft, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hashPresent, setHashPresent] = useState<boolean>(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordFormData>();
  
  useEffect(() => {
    // Check if we have the recovery hash in the URL
    const hash = window.location.hash;
    setHashPresent(hash.includes('type=recovery'));
    
    if (!hash.includes('type=recovery')) {
      setError("Invalid or missing recovery link. Please request a new password reset.");
    }
  }, []);
  
  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { error: updateError } = await supabase.auth.updateUser({
        password: data.password
      });
      
      if (updateError) throw updateError;
      
      setIsSuccess(true);
      toast({
        title: "Password updated",
        description: "Your password has been reset successfully"
      });
      
      // Redirect to login after a delay
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: any) {
      console.error('Password reset error:', err);
      setError(err.message || "Failed to reset password");
      toast({
        title: "Error",
        description: err.message || "Failed to reset password",
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
            <h1 className="text-2xl font-bold mb-6 text-center text-white">Reset Your Password</h1>
            
            {error && (
              <Alert variant="destructive" className="mb-4 bg-red-900/40 border-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {!hashPresent && (
              <div className="text-center space-y-4">
                <p className="text-gray-300">
                  The reset link appears to be invalid or expired. Please request a new password reset.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => navigate('/forgot-password')}
                >
                  Request New Reset Link
                </Button>
              </div>
            )}
            
            {hashPresent && isSuccess ? (
              <div className="text-center space-y-4">
                <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-4 flex flex-col items-center">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mb-2" />
                  <h2 className="text-xl font-medium text-white mb-2">Password Updated!</h2>
                  <p className="text-gray-300">
                    Your password has been reset successfully. You'll be redirected to login shortly.
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => navigate('/login')}
                >
                  Go to Login
                </Button>
              </div>
            ) : hashPresent && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">New Password</Label>
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
                    disabled={isLoading}
                    className="bg-white/5 text-white"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.password.message}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: value => value === watch('password') || 'Passwords do not match'
                    })}
                    disabled={isLoading}
                    className="bg-white/5 text-white"
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                
                <div className="flex flex-col space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Resetting Password...
                      </span>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        Reset Password
                      </>
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

export default ResetPasswordPage;
