
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Container } from '@/components/ui/universal/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/universal/Card';
import { AlertCircle, Mail } from 'lucide-react';

export default function PasswordResetRequestPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const { resetPassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    
    if (!email) {
      setEmailError('Please enter your email address');
      return false;
    }
    
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    
    setEmailError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      await resetPassword(email);
      setIsSubmitted(true);
      toast({
        title: "Reset Email Sent",
        description: "If an account exists with that email, we've sent password reset instructions.",
      });
    } catch (error) {
      console.error('Reset password error:', error);
      // Error message is shown in useAuthActions already
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <div className="py-6 animate-fade-in">
        <PageHeader
          title="Reset Your Password"
          description="Enter your email to receive password reset instructions"
          breadcrumbs={[
            { label: 'Authentication', href: '/auth' },
            { label: 'Reset Password', href: '/auth/reset-password' }
          ]}
        />
        
        <div className="max-w-md mx-auto mt-8">
          {isSubmitted ? (
            <Card className="p-6 text-center space-y-6">
              <div className="mx-auto bg-blue-500/20 p-3 rounded-full w-fit">
                <Mail className="h-8 w-8 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold">Check Your Email</h2>
              <p className="text-gray-400">
                We've sent password reset instructions to <span className="font-medium text-gray-300">{email}</span>. Please check your inbox.
              </p>
              <div className="flex flex-col gap-4">
                <Button onClick={() => setIsSubmitted(false)}>
                  Try Another Email
                </Button>
                <Button variant="outline" onClick={() => navigate('/auth')}>
                  Return to Login
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="bg-white/5"
                      disabled={isSubmitting}
                      required
                      autoFocus
                      aria-invalid={emailError ? "true" : "false"}
                    />
                  </div>

                  {emailError && (
                    <div className="bg-red-500/10 p-3 rounded-md flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-red-500" role="alert">
                        {emailError}
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
                      Sending...
                    </span>
                  ) : (
                    'Send Reset Instructions'
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
