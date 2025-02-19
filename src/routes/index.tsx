
import { Suspense } from "react";
import { RouteObject } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { authRoutes } from "./authRoutes";
import { acquisitionRoutes } from "./acquisitionRoutes";
import { dashboardRoutes } from "./dashboardRoutes";
import { settingsRoutes } from "./settingsRoutes";

// Loading component
export const PageLoader = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="space-y-4 w-full max-w-3xl px-4">
      <Skeleton className="h-12 w-[250px]" />
      <Skeleton className="h-4 w-[300px]" />
      <div className="space-y-2">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  </div>
);

// Wrap routes with Suspense
const wrapRoutesWithSuspense = (routes: RouteObject[]): RouteObject[] => {
  return routes.map(route => ({
    ...route,
    element: <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
  }));
};

// Combine all routes
export const routes: RouteObject[] = [
  ...wrapRoutesWithSuspense(authRoutes),
  ...wrapRoutesWithSuspense(acquisitionRoutes),
  ...wrapRoutesWithSuspense(dashboardRoutes),
  ...wrapRoutesWithSuspense(settingsRoutes)
];
