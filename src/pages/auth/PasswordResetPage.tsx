
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Container } from '@/components/ui/universal/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/card';
import { AlertCircle, Check, ArrowLeft, Lock } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';

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

  // Update page title
  useEffect(() => {
    document.title = 'Set New Password | ProcurityIQ';
  }, []);

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

  // Password strength indicator
  const getPasswordStrength = (pass: string): { strength: 'weak' | 'medium' | 'strong', message: string } => {
    if (pass.length < 8) {
      return { strength: 'weak', message: 'Password is too short' };
    }
    
    const hasLowercase = /[a-z]/.test(pass);
    const hasUppercase = /[A-Z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    
    const criteria = [hasLowercase, hasUppercase, hasNumber, hasSpecial];
    const metCriteria = criteria.filter(Boolean).length;
    
    if (metCriteria === 4) {
      return { strength: 'strong', message: 'Strong password' };
    } else if (metCriteria >= 2) {
      return { strength: 'medium', message: 'Medium strength password' };
    } else {
      return { strength: 'weak', message: 'Weak password' };
    }
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }
    
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    
    // Additional strength validation
    const { strength } = getPasswordStrength(password);
    if (strength === 'weak') {
      setPasswordError('Password is too weak. Please include uppercase, lowercase, numbers, and special characters.');
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

  const passwordStrength = getPasswordStrength(password);
  const strengthColors = {
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-green-500'
  };

  return (
    <MainLayout containerSize="sm">
      <div className="py-6 animate-fade-in">
        <PageHeader
          title="Set New Password"
          description="Create a new password for your account"
        />
        
        <div className="max-w-md mx-auto mt-8">
          {isSubmitted ? (
            <Card className="p-6 text-center space-y-6 border-white/10 bg-black/30">
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
            <Card className="p-6 border-white/10 bg-black/30">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white/5 pl-10"
                        disabled={isSubmitting}
                        required
                        autoFocus
                        aria-invalid={passwordError ? "true" : "false"}
                      />
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    
                    {password && (
                      <div className="mt-2">
                        <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${strengthColors[passwordStrength.strength]} transition-all duration-300`} 
                            style={{ width: password ? (passwordStrength.strength === 'weak' ? '33%' : passwordStrength.strength === 'medium' ? '66%' : '100%') : '0%' }}
                          />
                        </div>
                        <p className="text-xs mt-1 text-gray-400">
                          {passwordStrength.message}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-white/5 pl-10"
                        disabled={isSubmitting}
                        required
                        aria-invalid={passwordError ? "true" : "false"}
                      />
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
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
                    className="inline-flex items-center text-primary hover:underline text-sm gap-1"
                  >
                    <ArrowLeft className="h-3 w-3" />
                    Return to login
                  </Link>
                </div>
              </form>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
