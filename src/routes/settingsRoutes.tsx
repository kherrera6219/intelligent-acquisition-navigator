
import { RouteObject } from "react-router-dom";
import { wrapWithLayout } from "./routeTypes";
import { lazy } from "react";

// Lazy-load settings components
const SettingsPage = lazy(() => import("../pages/SettingsPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const SecurityPage = lazy(() => import("../pages/settings/SecurityPage"));
const NotificationsPage = lazy(() => import("../pages/settings/NotificationsPage"));

const routes: RouteObject[] = [
  {
    path: "/settings",
    element: wrapWithLayout(SettingsPage, true)
  },
  {
    path: "/settings/profile",
    element: wrapWithLayout(ProfilePage, true)
  },
  {
    path: "/settings/security",
    element: wrapWithLayout(SecurityPage, true)
  },
  {
    path: "/settings/notifications",
    element: wrapWithLayout(NotificationsPage, true)
  }
];

export default routes;
