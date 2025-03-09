
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routes } from "./routes";

// Create a client
const queryClient = new QueryClient();

const AppRoutes = () => {
  return useRoutes(routes);
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </Router>
  );
}
