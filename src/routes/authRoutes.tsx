
import { RouteObject } from "react-router-dom";
import { wrapWithLayout } from "./routeTypes";
import { lazy } from "react";

// Lazy-load auth components
const AuthPage = lazy(() => import("@/pages/auth/AuthenticationPage"));
const PasswordResetRequestPage = lazy(() => import("@/pages/auth/PasswordResetRequestPage"));
const PasswordResetPage = lazy(() => import("@/pages/auth/PasswordResetPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));

const routes: RouteObject[] = [
  {
    path: "/auth",
    element: wrapWithLayout(AuthPage, false)
  },
  {
    path: "/auth/forgot-password",
    element: wrapWithLayout(PasswordResetRequestPage, false)
  },
  {
    path: "/auth/reset-password",
    element: wrapWithLayout(PasswordResetPage, false)
  },
  {
    path: "/profile",
    element: wrapWithLayout(ProfilePage)
  }
];

export { routes };
