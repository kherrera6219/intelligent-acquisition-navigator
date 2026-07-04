
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryProvider } from "@/providers/QueryProvider";
import { ErrorBoundary } from "@/lib/error/ErrorBoundary";
import { MainLayout } from "@/components/layout/MainLayout";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ProtectedRoute, PublicOnlyRoute } from "./components/auth/ProtectedRoute";

// Route-level code splitting: each page/screen is only downloaded when visited,
// keeping the initial bundle small. See PageSuspense fallback below.
const Index = lazy(() => import("./pages/Index"));
const Features = lazy(() => import("./pages/Features"));
const Pricing = lazy(() => import("./pages/Pricing"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const LoginForm = lazy(() => import("./components/auth/LoginForm"));
const SignUpForm = lazy(() => import("./components/auth/SignUpForm"));
const UserProfile = lazy(() => import("./components/auth/UserProfile"));
const PasswordReset = lazy(() => import("./components/auth/PasswordReset"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Proposals = lazy(() => import("./pages/Proposals"));
const Chat = lazy(() => import("./pages/Chat"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const SolicitationReview = lazy(() => import("./pages/acquisition/SolicitationReview"));
const MarketResearch = lazy(() => import("./pages/acquisition/MarketResearch"));
const DocumentControl = lazy(() => import("./pages/acquisition/DocumentControl"));
const KnowledgeBase = lazy(() => import("./pages/KnowledgeBase"));

/** Lightweight per-route fallback shown instead of a full blank page. */
const PageErrorFallback = (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
    <p className="text-lg font-semibold text-white">This page encountered an error.</p>
    <p className="text-gray-400 text-sm">Please refresh or navigate to another section.</p>
  </div>
);

/** Shown briefly while a lazily-loaded route chunk downloads. */
const PageLoadingFallback = (
  <div className="min-h-[60vh] flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

/** Wraps a route element with both an error boundary and a Suspense loading fallback. */
const PageSuspense = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary fallback={PageErrorFallback}>
    <Suspense fallback={PageLoadingFallback}>{children}</Suspense>
  </ErrorBoundary>
);

const App = () => (
  <ErrorBoundary>
    <QueryProvider>
      <TooltipProvider>
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<PageSuspense><Index /></PageSuspense>} />
              <Route path="/features" element={<PageSuspense><Features /></PageSuspense>} />
              <Route path="/pricing" element={<PageSuspense><Pricing /></PageSuspense>} />
              <Route path="/about" element={<PageSuspense><About /></PageSuspense>} />
              <Route path="/contact" element={<PageSuspense><Contact /></PageSuspense>} />
              <Route path="/privacy" element={<PageSuspense><Privacy /></PageSuspense>} />
              <Route path="/login" element={<PageSuspense><PublicOnlyRoute><LoginForm /></PublicOnlyRoute></PageSuspense>} />
              <Route path="/signup" element={<PageSuspense><PublicOnlyRoute><SignUpForm /></PublicOnlyRoute></PageSuspense>} />
              <Route path="/profile" element={<PageSuspense><ProtectedRoute><UserProfile /></ProtectedRoute></PageSuspense>} />
              <Route path="/reset-password" element={<PageSuspense><PublicOnlyRoute><PasswordReset /></PublicOnlyRoute></PageSuspense>} />
              <Route path="/dashboard" element={<PageSuspense><ProtectedRoute><Dashboard /></ProtectedRoute></PageSuspense>} />
              <Route path="/proposals" element={<PageSuspense><ProtectedRoute requiredPermission="READ_PROPOSALS"><Proposals /></ProtectedRoute></PageSuspense>} />
              <Route path="/chat" element={<PageSuspense><ProtectedRoute><Chat /></ProtectedRoute></PageSuspense>} />
              <Route path="/sitemap" element={<PageSuspense><Sitemap /></PageSuspense>} />
              <Route path="/knowledge-base" element={<PageSuspense><ProtectedRoute><KnowledgeBase /></ProtectedRoute></PageSuspense>} />
              <Route path="/acquisition/solicitation-review" element={<PageSuspense><ProtectedRoute requiredPermission="READ_SOLICITATIONS"><SolicitationReview /></ProtectedRoute></PageSuspense>} />
              <Route path="/acquisition/market-research" element={<PageSuspense><ProtectedRoute requiredPermission="READ_SOLICITATIONS"><MarketResearch /></ProtectedRoute></PageSuspense>} />
              <Route path="/acquisition/document-control" element={<PageSuspense><ProtectedRoute requiredPermission="MANAGE_CONTRACTS"><DocumentControl /></ProtectedRoute></PageSuspense>} />
            </Routes>
          </MainLayout>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryProvider>
  </ErrorBoundary>
);

export default App;
