
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Container } from '@/components/ui/universal/Container';
import { PageHeader } from '@/components/layout/PageHeader';

export default function PasswordResetPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchParams] = useSearchParams();
  const { updatePassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if token exists in URL
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    if (password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters",
        variant: "destructive",
      });
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
      <div className="py-6">
        <PageHeader
          title="Set New Password"
          description="Create a new password for your account"
        />
        
        <div className="max-w-md mx-auto mt-8">
          {isSubmitted ? (
            <div className="space-y-6 text-center">
              <h2 className="text-2xl font-bold">Password Reset Successful</h2>
              <p className="text-gray-400">
                Your password has been updated. You can now sign in with your new password.
              </p>
              <Button onClick={() => navigate('/auth')}>
                Sign In
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 glass-card p-6">
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
                    minLength={8}
                  />
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
                    minLength={8}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Reset Password'}
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
          )}
        </div>
      </div>
    </Container>
  );
}
