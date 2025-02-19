
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, X } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AuthFormProps, FormErrors } from "@/types/auth";
import { validateAuthForm } from "@/utils/authValidation";

export function AuthForm({ isSignUp, onToggleMode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const { toast } = useToast();

  // Rate limiting
  const [attemptCount, setAttemptCount] = useState(0);
  const [lastAttemptTime, setLastAttemptTime] = useState(Date.now());
  const MAX_ATTEMPTS = 5;
  const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

  const handleSubmit = async (e: React.FormEvent) => {
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
        setAttemptCount(0);
      }
    }

    const validation = validateAuthForm(email, password, isSignUp);
    setErrors(validation.errors);
    if (!validation.isValid) return;

    setIsLoading(true);
    setAttemptCount(prev => prev + 1);
    setLastAttemptTime(now);

    try {
      const sanitizedEmail = email.trim().toLowerCase();
      
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: sanitizedEmail,
          password,
        });
        if (error) throw error;

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

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    if (field === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div className="mt-6 text-center text-sm text-gray-400">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={onToggleMode}
          className="text-white hover:underline"
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </div>
    </form>
  );
}
