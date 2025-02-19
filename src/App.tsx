
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/providers/AuthProvider";
import { routes } from "./routes";
import { Suspense, useEffect } from "react";
import { PageLoader } from "./routes";
import { preloadCriticalAssets, lazyLoadImages } from "./utils/assetOptimization";

const AppRoutes = () => {
  return useRoutes(routes);
};

export default function App() {
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/serviceWorker.js').then(registration => {
          console.log('ServiceWorker registration successful');
        }).catch(err => {
          console.log('ServiceWorker registration failed:', err);
        });
      });
    }

    // Initialize asset optimization
    preloadCriticalAssets();
    lazyLoadImages();
  }, []);

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
