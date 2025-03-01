
import React, { useState } from 'react';
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export const VerificationBanner = () => {
  const { user, resendVerificationEmail, isProcessing } = useAuth();
  const { toast } = useToast();
  const [isResending, setIsResending] = useState(false);

  const handleResend = async () => {
    try {
      setIsResending(true);
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
    } finally {
      setIsResending(false);
    }
  };

  // Only show banner if user exists and email is not verified
  if (!user || user.email_confirmed_at) {
    return null;
  }

  return (
    <div className="bg-yellow-500/10 text-yellow-200 px-4 py-3 flex flex-col sm:flex-row items-center justify-between">
      <div>
        <p className="text-sm mb-2 sm:mb-0 font-medium">
          Please verify your email address to access all features
        </p>
        <p className="text-xs opacity-80">
          Check your inbox for a verification email sent to: {user.email}
        </p>
      </div>
      <button
        onClick={handleResend}
        disabled={isResending || isProcessing}
        className="text-sm px-4 py-1 mt-2 sm:mt-0 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isResending ? "Sending..." : "Resend verification email"}
      </button>
    </div>
  );
};
