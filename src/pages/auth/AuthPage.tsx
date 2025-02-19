
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { AuthForm } from "@/components/auth/AuthForm";
import { VerificationBanner } from "@/components/auth/VerificationBanner";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showVerificationBanner, setShowVerificationBanner] = useState(false);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      {showVerificationBanner && (
        <VerificationBanner onResendVerification={resendVerificationEmail} />
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

        <AuthForm 
          isSignUp={isSignUp} 
          onToggleMode={() => setIsSignUp(!isSignUp)} 
        />

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
