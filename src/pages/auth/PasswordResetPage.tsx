
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Container } from '@/components/ui/universal/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/universal/Card';
import { AlertCircle, Check } from 'lucide-react';

export default function PasswordResetPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const { updatePassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if token exists in URL parameters
  const token = searchParams.get('token');
  
  useEffect(() => {
    if (!token) {
      toast({
        title: "Invalid Reset Link",
        description: "The password reset link is invalid or has expired.",
        variant: "destructive",
      });
      navigate('/auth/reset-password');
    }
  }, [token, navigate, toast]);

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }
    
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    
    setPasswordError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      await updatePassword(password);
      setIsSubmitted(true);
      toast({
        title: "Password Updated",
        description: "Your password has been successfully reset.",
      });
    } catch (error) {
      console.error('Update password error:', error);
      toast({
        title: "Error",
        description: "There was a problem resetting your password",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return null; // Don't render anything, the useEffect will redirect
  }

  return (
    <Container>
      <div className="py-6 animate-fade-in">
        <PageHeader
          title="Set New Password"
          description="Create a new password for your account"
        />
        
        <div className="max-w-md mx-auto mt-8">
          {isSubmitted ? (
            <Card className="p-6 text-center space-y-6">
              <div className="mx-auto bg-green-500/20 p-3 rounded-full w-fit">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold">Password Reset Successful</h2>
              <p className="text-gray-400">
                Your password has been updated. You can now sign in with your new password.
              </p>
              <Button onClick={() => navigate('/auth')} className="w-full">
                Sign In
              </Button>
            </Card>
          ) : (
            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white/5"
                      disabled={isSubmitting}
                      required
                      autoFocus
                      aria-invalid={passwordError ? "true" : "false"}
                    />
                    <p className="text-xs text-gray-400">
                      Password must be at least 8 characters long
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-white/5"
                      disabled={isSubmitting}
                      required
                      aria-invalid={passwordError ? "true" : "false"}
                    />
                  </div>

                  {passwordError && (
                    <div className="bg-red-500/10 p-3 rounded-md flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-red-500" role="alert">
                        {passwordError}
                      </p>
                    </div>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⟳</span>
                      Updating...
                    </span>
                  ) : (
                    'Reset Password'
                  )}
                </Button>

                <div className="text-center">
                  <Link 
                    to="/auth" 
                    className="text-primary hover:underline text-sm"
                  >
                    Return to login
                  </Link>
                </div>
              </form>
            </Card>
          )}
        </div>
      </div>
    </Container>
  );
}
