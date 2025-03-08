
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Container } from '@/components/ui/universal/Container';
import { PageHeader } from '@/components/layout/PageHeader';

export default function PasswordResetRequestPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
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
      toast({
        title: "Error",
        description: "There was a problem sending the reset instructions",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <div className="py-6">
        <PageHeader
          title="Reset Your Password"
          description="Enter your email to receive password reset instructions"
        />
        
        <div className="max-w-md mx-auto mt-8">
          {isSubmitted ? (
            <div className="space-y-6 text-center">
              <h2 className="text-2xl font-bold">Check Your Email</h2>
              <p className="text-gray-400">
                We've sent password reset instructions to {email}. Please check your inbox.
              </p>
              <div className="flex flex-col gap-4">
                <Button onClick={() => setIsSubmitted(false)}>
                  Try Another Email
                </Button>
                <Button variant="outline" onClick={() => navigate('/auth')}>
                  Return to Login
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 glass-card p-6">
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
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Instructions'}
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
