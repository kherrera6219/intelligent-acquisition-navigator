
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/providers/AuthProvider";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import AuthPage from "@/pages/auth/AuthPage";
import { MainLayout } from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import DocumentControl from "@/pages/acquisition/DocumentControl";
import MarketResearch from "@/pages/acquisition/MarketResearch";
import SolicitationReview from "@/pages/acquisition/SolicitationReview";
import TexasAcquisition from "@/pages/acquisition/TexasAcquisition";
import FederalAcquisition from "@/pages/acquisition/FederalAcquisition";
import Analytics from "@/pages/Analytics";
import Settings from "@/pages/Settings";
import Help from "@/pages/Help";
import Sitemap from "@/pages/Sitemap";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/acquisition/document-control"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <DocumentControl />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/acquisition/market-research"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <MarketResearch />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/acquisition/solicitation-review"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <SolicitationReview />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/acquisition/texas-acquisition"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <TexasAcquisition />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/acquisition/federal-acquisition"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <FederalAcquisition />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Analytics />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Settings />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/help"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Help />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/sitemap"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Sitemap />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster />
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}
