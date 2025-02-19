
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface VerificationBannerProps {
  onResendVerification: () => Promise<void>;
}

export function VerificationBanner({ onResendVerification }: VerificationBannerProps) {
  return (
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
          onClick={onResendVerification}
          className="border-blue-400 text-blue-400 hover:bg-blue-400/10"
        >
          Resend verification email
        </Button>
      </div>
    </div>
  );
}
