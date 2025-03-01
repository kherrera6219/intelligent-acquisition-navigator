
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { NetworkStatusBanner } from "@/components/ui/universal/NetworkStatusBanner";
import { VerificationBanner } from "@/components/auth/VerificationBanner";
import { SessionTimeoutWarning } from "@/components/auth/SessionTimeoutWarning";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading, isAuthorized, isAuthenticated } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth?returnUrl=${encodeURIComponent(location.pathname)}" state={{ from: location }} replace />;
  }

  if (user && !user.email_confirmed_at) {
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
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <NetworkStatusBanner />
      <VerificationBanner />
      <SessionTimeoutWarning />
      {children}
    </>
  );
}
