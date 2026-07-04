
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryProvider } from "@/providers/QueryProvider";
import { ErrorBoundary } from "@/lib/error/ErrorBoundary";
import { MainLayout } from "@/components/layout/MainLayout";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import LoginForm from "./components/auth/LoginForm";
import { ProtectedRoute, PublicOnlyRoute } from "./components/auth/ProtectedRoute";
import SignUpForm from "./components/auth/SignUpForm";
import UserProfile from "./components/auth/UserProfile";
import PasswordReset from "./components/auth/PasswordReset";
import Dashboard from "./pages/Dashboard";
import Proposals from "./pages/Proposals";
import Chat from "./pages/Chat";
import Sitemap from "./pages/Sitemap";
import SolicitationReview from "./pages/acquisition/SolicitationReview";
import MarketResearch from "./pages/acquisition/MarketResearch";
import DocumentControl from "./pages/acquisition/DocumentControl";
import KnowledgeBase from "./pages/KnowledgeBase";

/** Lightweight per-route fallback shown instead of a full blank page. */
const PageErrorFallback = (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
    <p className="text-lg font-semibold text-white">This page encountered an error.</p>
    <p className="text-gray-400 text-sm">Please refresh or navigate to another section.</p>
  </div>
);

const App = () => (
  <ErrorBoundary>
    <QueryProvider>
      <TooltipProvider>
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<ErrorBoundary fallback={PageErrorFallback}><Index /></ErrorBoundary>} />
              <Route path="/features" element={<ErrorBoundary fallback={PageErrorFallback}><Features /></ErrorBoundary>} />
              <Route path="/pricing" element={<ErrorBoundary fallback={PageErrorFallback}><Pricing /></ErrorBoundary>} />
              <Route path="/about" element={<ErrorBoundary fallback={PageErrorFallback}><About /></ErrorBoundary>} />
              <Route path="/contact" element={<ErrorBoundary fallback={PageErrorFallback}><Contact /></ErrorBoundary>} />
              <Route path="/privacy" element={<ErrorBoundary fallback={PageErrorFallback}><Privacy /></ErrorBoundary>} />
              <Route path="/login" element={<ErrorBoundary fallback={PageErrorFallback}><PublicOnlyRoute><LoginForm /></PublicOnlyRoute></ErrorBoundary>} />
              <Route path="/signup" element={<ErrorBoundary fallback={PageErrorFallback}><PublicOnlyRoute><SignUpForm /></PublicOnlyRoute></ErrorBoundary>} />
              <Route path="/profile" element={<ErrorBoundary fallback={PageErrorFallback}><ProtectedRoute><UserProfile /></ProtectedRoute></ErrorBoundary>} />
              <Route path="/reset-password" element={<ErrorBoundary fallback={PageErrorFallback}><PublicOnlyRoute><PasswordReset /></PublicOnlyRoute></ErrorBoundary>} />
              <Route path="/dashboard" element={<ErrorBoundary fallback={PageErrorFallback}><ProtectedRoute><Dashboard /></ProtectedRoute></ErrorBoundary>} />
              <Route path="/proposals" element={<ErrorBoundary fallback={PageErrorFallback}><ProtectedRoute requiredPermission="READ_PROPOSALS"><Proposals /></ProtectedRoute></ErrorBoundary>} />
              <Route path="/chat" element={<ErrorBoundary fallback={PageErrorFallback}><ProtectedRoute><Chat /></ProtectedRoute></ErrorBoundary>} />
              <Route path="/sitemap" element={<ErrorBoundary fallback={PageErrorFallback}><Sitemap /></ErrorBoundary>} />
              <Route path="/knowledge-base" element={<ErrorBoundary fallback={PageErrorFallback}><ProtectedRoute><KnowledgeBase /></ProtectedRoute></ErrorBoundary>} />
              <Route path="/acquisition/solicitation-review" element={<ErrorBoundary fallback={PageErrorFallback}><ProtectedRoute requiredPermission="READ_SOLICITATIONS"><SolicitationReview /></ProtectedRoute></ErrorBoundary>} />
              <Route path="/acquisition/market-research" element={<ErrorBoundary fallback={PageErrorFallback}><ProtectedRoute requiredPermission="READ_SOLICITATIONS"><MarketResearch /></ProtectedRoute></ErrorBoundary>} />
              <Route path="/acquisition/document-control" element={<ErrorBoundary fallback={PageErrorFallback}><ProtectedRoute requiredPermission="MANAGE_CONTRACTS"><DocumentControl /></ProtectedRoute></ErrorBoundary>} />
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
