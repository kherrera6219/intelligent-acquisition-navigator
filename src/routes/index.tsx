
import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { LoadingState } from "@/components/ui/universal/LoadingState";
import { AppRoutes } from "./AppRoutes";

// Create the browser router with the AppRoutes component
export const browserRouter = createBrowserRouter([
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingState message="Loading..." />}>
        <AppRoutes />
      </Suspense>
    )
  }
]);

export default browserRouter;
