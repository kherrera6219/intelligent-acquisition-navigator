
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { NetworkStatusBanner } from "@/components/ui/universal/NetworkStatusBanner";
import { VerificationBanner } from "@/components/auth/VerificationBanner";
import { SessionTimeoutWarning } from "@/components/auth/SessionTimeoutWarning";
import { PageLoader } from "@/components/ui/universal/PageLoader";
import { SkipLinks } from "@/components/ui/universal/SkipLinks";
import { devConfig } from "@/config/devConfig";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading, isAuthorized, isAuthenticated } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  if (isLoading) {
    return <PageLoader message="Loading..." />;
  }

  // Skip authentication in development mode
  if (devConfig.BYPASS_AUTH) {
    return (
      <>
        <SkipLinks />
        {devConfig.SHOW_DEV_INDICATORS && (
          <div className="bg-yellow-500/20 border-y border-yellow-500/30 p-2 text-center text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Development Mode:</strong> Authentication checks are disabled
          </div>
        )}
        <NetworkStatusBanner />
        {children}
      </>
    );
  }

  if (!isAuthenticated) {
    toast({
      title: "Authentication Required",
      description: "Please sign in to access this resource.",
      variant: "destructive",
    });
    return <Navigate to={`/auth?returnUrl=${encodeURIComponent(location.pathname)}`} state={{ from: location }} replace />;
  }

  // Check if email is verified using user_metadata
  if (user && user.user_metadata && user.user_metadata.email_verified === false) {
    toast({
      title: "Email verification required",
      description: "Please verify your email address to access this resource.",
      variant: "destructive",
    });
    return <Navigate to="/auth/verify" state={{ from: location }} replace />;
  }

  if (requiredRole && !isAuthorized(requiredRole)) {
    toast({
      title: "Access Denied",
      description: "You don't have permission to access this resource.",
      variant: "destructive",
    });
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <SkipLinks />
      <NetworkStatusBanner />
      <VerificationBanner />
      {!devConfig.DISABLE_SESSION_TIMEOUT && <SessionTimeoutWarning />}
      {children}
    </>
  );
}
