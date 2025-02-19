
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/providers/AuthProvider";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { MainLayout } from "@/components/layout/MainLayout";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load all pages
const AuthPage = lazy(() => import("@/pages/auth/AuthPage"));
const PasswordReset = lazy(() => import("@/components/auth/PasswordReset"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const DocumentControl = lazy(() => import("@/pages/acquisition/DocumentControl"));
const MarketResearch = lazy(() => import("@/pages/acquisition/MarketResearch"));
const SolicitationReview = lazy(() => import("@/pages/acquisition/SolicitationReview"));
const TexasAcquisition = lazy(() => import("@/pages/acquisition/TexasAcquisition"));
const FederalAcquisition = lazy(() => import("@/pages/acquisition/FederalAcquisition"));
const Analytics = lazy(() => import("@/pages/Analytics"));
const Settings = lazy(() => import("@/pages/Settings"));
const Help = lazy(() => import("@/pages/Help"));
const Sitemap = lazy(() => import("@/pages/Sitemap"));

// Loading component
const PageLoader = () => (
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

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route 
            path="/auth" 
            element={
              <Suspense fallback={<PageLoader />}>
                <AuthPage />
              </Suspense>
            } 
          />
          <Route 
            path="/auth/reset-password" 
            element={
              <Suspense fallback={<PageLoader />}>
                <PasswordReset />
              </Suspense>
            } 
          />
          
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Suspense fallback={<PageLoader />}>
                    <Dashboard />
                  </Suspense>
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/acquisition/document-control"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Suspense fallback={<PageLoader />}>
                    <DocumentControl />
                  </Suspense>
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/acquisition/market-research"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Suspense fallback={<PageLoader />}>
                    <MarketResearch />
                  </Suspense>
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/acquisition/solicitation-review"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Suspense fallback={<PageLoader />}>
                    <SolicitationReview />
                  </Suspense>
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/acquisition/texas-acquisition"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Suspense fallback={<PageLoader />}>
                    <TexasAcquisition />
                  </Suspense>
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/acquisition/federal-acquisition"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Suspense fallback={<PageLoader />}>
                    <FederalAcquisition />
                  </Suspense>
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Suspense fallback={<PageLoader />}>
                    <Analytics />
                  </Suspense>
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Suspense fallback={<PageLoader />}>
                    <Settings />
                  </Suspense>
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/help"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Suspense fallback={<PageLoader />}>
                    <Help />
                  </Suspense>
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/sitemap"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Suspense fallback={<PageLoader />}>
                    <Sitemap />
                  </Suspense>
                </MainLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}
