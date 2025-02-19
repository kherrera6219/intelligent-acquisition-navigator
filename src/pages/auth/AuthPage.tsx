
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, resendVerificationEmail } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;

        toast({
          title: "Check your email",
          description: "We've sent you a verification link to complete your registration.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
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
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="pl-10"
              required
              disabled={isLoading}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="pl-10"
              required
              disabled={isLoading}
            />
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
            onClick={() => setIsSignUp(!isSignUp)}
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
