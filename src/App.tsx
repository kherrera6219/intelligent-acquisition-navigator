
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/providers/AuthProvider";
import { routes } from "./routes";
import { Suspense } from "react";
import { PageLoader } from "./routes";

const AppRoutes = () => {
  return useRoutes(routes);
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<PageLoader />}>
          <AppRoutes />
          <Toaster />
        </Suspense>
      </AuthProvider>
    </Router>
  );
}
