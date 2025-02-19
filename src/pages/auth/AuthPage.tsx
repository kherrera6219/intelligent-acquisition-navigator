
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Mail, Lock, AlertCircle, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";

interface FormErrors {
  email?: string;
  password?: string;
}

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showVerificationBanner, setShowVerificationBanner] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, resendVerificationEmail } = useAuth();

  useEffect(() => {
    if (user) {
      if (!user.email_confirmed_at) {
        setShowVerificationBanner(true);
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Enhanced email validation with regex and sanitization
    if (!email) {
      newErrors.email = "Email is required";
    } else {
      // Trim whitespace
      const sanitizedEmail = email.trim().toLowerCase();
      
      // Comprehensive email regex
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(sanitizedEmail)) {
        newErrors.email = "Please enter a valid email address";
      }
      
      // Check length
      if (sanitizedEmail.length > 254) {
        newErrors.email = "Email address is too long";
      }
    }

    // Enhanced password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (isSignUp) {
      // For sign up, enforce stronger password requirements
      if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      } else if (!/[A-Z]/.test(password)) {
        newErrors.password = "Password must contain at least one uppercase letter";
      } else if (!/[a-z]/.test(password)) {
        newErrors.password = "Password must contain at least one lowercase letter";
      } else if (!/[0-9]/.test(password)) {
        newErrors.password = "Password must contain at least one number";
      } else if (!/[!@#$%^&*]/.test(password)) {
        newErrors.password = "Password must contain at least one special character (!@#$%^&*)";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Rate limiting implementation
  const [attemptCount, setAttemptCount] = useState(0);
  const [lastAttemptTime, setLastAttemptTime] = useState(Date.now());
  const MAX_ATTEMPTS = 5;
  const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check rate limiting
    const now = Date.now();
    if (attemptCount >= MAX_ATTEMPTS) {
      if (now - lastAttemptTime < LOCKOUT_DURATION) {
        const remainingTime = Math.ceil((LOCKOUT_DURATION - (now - lastAttemptTime)) / 60000);
        toast({
          title: "Too many attempts",
          description: `Please try again in ${remainingTime} minutes`,
          variant: "destructive",
        });
        return;
      } else {
        // Reset attempts after lockout period
        setAttemptCount(0);
      }
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setAttemptCount(prev => prev + 1);
    setLastAttemptTime(now);

    try {
      // Sanitize email input
      const sanitizedEmail = email.trim().toLowerCase();
      
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: sanitizedEmail,
          password,
        });
        if (error) throw error;

        setShowVerificationBanner(true);
        toast({
          title: "Check your email",
          description: "We've sent you a verification link to complete your registration.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: sanitizedEmail,
          password,
        });
        if (error) throw error;

        // Reset attempt count on successful login
        setAttemptCount(0);
        
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      await resendVerificationEmail();
      toast({
        title: "Verification email sent",
        description: "Please check your inbox for the verification link.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    if (field === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      {showVerificationBanner && (
        <div className="fixed top-0 left-0 right-0 bg-blue-500/10 backdrop-blur-sm p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-blue-400" />
              <p className="text-blue-400">
                Please verify your email address to access your account.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleResendVerification}
              className="border-blue-400 text-blue-400 hover:bg-blue-400/10"
            >
              Resend verification email
            </Button>
          </div>
        </div>
      )}

      <Card className="w-full max-w-md p-8 bg-black/40 backdrop-blur-sm border-white/5">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-400 mt-2">
            {isSignUp
              ? "Sign up to get started"
              : "Sign in to access your account"}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-1">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                value={email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                className={`pl-10 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                required
                disabled={isLoading}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 flex items-center gap-1" id="email-error">
                <X className="h-4 w-4" />
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                value={password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter your password"
                className={`pl-10 ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                required
                disabled={isLoading}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 flex items-center gap-1" id="password-error">
                <X className="h-4 w-4" />
                {errors.password}
              </p>
            )}
          </div>

          {!isSignUp && (
            <div className="flex justify-end">
              <Link
                to="/auth/reset-password"
                className="text-sm text-gray-400 hover:text-white"
              >
                Forgot password?
              </Link>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600"
            disabled={isLoading}
          >
            {isLoading
              ? "Please wait..."
              : isSignUp
              ? "Sign Up"
              : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrors({});
            }}
            className="text-white hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>

        {isSignUp && (
          <div className="mt-4 p-4 bg-blue-500/10 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-400">
              After signing up, you'll need to verify your email address. Check your inbox for a verification link.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
