import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { accessControl, type Permission, type Role } from "@/lib/security/accessControl";
import { errorTracker } from "@/lib/security/errorTracking";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermission?: Permission;
}

const VALID_ROLES: ReadonlySet<Role> = new Set([
  "CONTRACTING_OFFICER",
  "CONTRACT_SPECIALIST",
  "PROGRAM_MANAGER",
  "LEGAL_REVIEWER",
  "SMALL_BUSINESS_SPECIALIST",
  "SYSTEM_ADMIN",
]);

const resolveRole = (candidate: unknown): Role => {
  return typeof candidate === "string" && VALID_ROLES.has(candidate as Role)
    ? (candidate as Role)
    : "CONTRACT_SPECIALIST";
};

export const ProtectedRoute = ({ children, requiredPermission }: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }

        const session = data.session;
        if (!mounted) {
          return;
        }

        if (!session?.user) {
          accessControl.logout();
          setIsAuthenticated(false);
          return;
        }

        const role = resolveRole(session.user.user_metadata?.role);
        const currentContext = accessControl.getSecurityContext();
        if (!currentContext || currentContext.userId !== session.user.id) {
          accessControl.setSecurityContext({
            userId: session.user.id,
            role,
            permissions: accessControl.getRolePermissions(role),
            authMethod: {
              type: "PASSWORD",
              lastAuthenticated: new Date(),
              expiresAt: session.expires_at
                ? new Date(session.expires_at * 1000)
                : new Date(Date.now() + 15 * 60 * 1000),
            },
            sessionId: session.access_token.slice(0, 16),
            ipAddress: window.location.hostname,
            userAgent: navigator.userAgent,
          });
        }

        setIsAuthenticated(true);
      } catch (error) {
        errorTracker.trackError({
          message: error instanceof Error ? error.message : "Failed to validate auth session",
          stack: error instanceof Error ? error.stack : undefined,
          severity: "HIGH",
          errorType: "SECURITY",
          status: "NEW",
        });
        accessControl.logout();
        if (mounted) {
          setIsAuthenticated(false);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    bootstrap();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) {
        return;
      }

      if (!session?.user) {
        accessControl.logout();
        setIsAuthenticated(false);
        return;
      }

      setIsAuthenticated(true);
    });

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-sm text-gray-400">Validating session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (requiredPermission && !accessControl.hasPermission(requiredPermission)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export const PublicOnlyRoute = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setIsAuthenticated(!!data.session);
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};
