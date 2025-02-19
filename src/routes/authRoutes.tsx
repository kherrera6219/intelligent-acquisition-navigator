
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const AuthenticationPage = lazy(() => import("@/pages/auth/AuthenticationPage"));
const PasswordReset = lazy(() => import("@/components/auth/PasswordReset"));

export const authRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: <AuthenticationPage />
  },
  {
    path: "/auth/reset-password",
    element: <PasswordReset />
  }
];
