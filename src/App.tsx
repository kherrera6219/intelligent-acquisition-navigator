
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/providers/AuthProvider";
import { routes } from "./routes";

const AppRoutes = () => {
  return useRoutes(routes);
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
        <Toaster />
      </AuthProvider>
    </Router>
  );
}
