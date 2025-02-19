
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const AuthPage = lazy(() => import("@/pages/auth/AuthPage"));
const PasswordReset = lazy(() => import("@/components/auth/PasswordReset"));

export const authRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: <AuthPage />
  },
  {
    path: "/auth/reset-password",
    element: <PasswordReset />
  }
];
