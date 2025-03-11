
import { RouteObject } from "react-router-dom";
import { wrapWithLayout } from "./routeTypes";
import { PasswordResetRequest } from "@/components/auth/PasswordResetRequest";
import PasswordResetForm from "@/components/auth/PasswordResetForm";
import { lazy } from "react";

// Lazy-load the auth page to improve initial page load performance
const AuthPage = lazy(() => import("@/pages/auth/AuthenticationPage"));

export const authRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: wrapWithLayout(AuthPage, false)
  },
  {
    path: "/auth/forgot-password",
    element: wrapWithLayout(PasswordResetRequest, false)
  },
  {
    path: "/auth/reset-password",
    element: wrapWithLayout(PasswordResetForm, false)
  }
];
