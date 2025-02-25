
import { RouteObject } from "react-router-dom";
import { wrapWithLayout } from "./routeTypes";
import { PasswordResetRequest } from "@/components/auth/PasswordResetRequest";
import { PasswordResetForm } from "@/components/auth/PasswordResetForm";

export const authRoutes: RouteObject[] = [
  {
    path: "/auth/forgot-password",
    element: wrapWithLayout(PasswordResetRequest, false)
  },
  {
    path: "/auth/reset-password",
    element: wrapWithLayout(PasswordResetForm, false)
  }
];
