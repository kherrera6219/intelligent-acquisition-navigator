
import React from 'react';
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "@/hooks/use-toast";

export const VerificationBanner = () => {
  const { user, resendVerificationEmail } = useAuth();
  const { toast } = useToast();

  const handleResend = async () => {
    try {
      await resendVerificationEmail();
      toast({
        title: "Verification email sent",
        description: "Please check your inbox for the verification link.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend verification email. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Only show banner if user exists and email is not verified
  if (!user || user.email_confirmed_at) {
    return null;
  }

  return (
    <div className="bg-yellow-500/10 text-yellow-200 px-4 py-3 flex flex-col sm:flex-row items-center justify-between">
      <p className="text-sm mb-2 sm:mb-0">
        Please verify your email address to access all features
      </p>
      <button
        onClick={handleResend}
        className="text-sm px-4 py-1 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-full transition-colors"
      >
        Resend verification email
      </button>
    </div>
  );
};
