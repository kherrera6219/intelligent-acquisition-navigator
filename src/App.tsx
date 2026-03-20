
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryProvider } from "@/providers/QueryProvider";
import { ErrorBoundary } from "@/lib/error/ErrorBoundary";
import { MainLayout } from "@/components/layout/MainLayout";

// Public / landing
import Index from "./pages/Index";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Sitemap from "./pages/Sitemap";
import NotFound from "./pages/NotFound";

// Auth
import Login from "./pages/Login";
import SignUpForm from "./components/auth/SignUpForm";
import UserProfile from "./components/auth/UserProfile";
import PasswordReset from "./components/auth/PasswordReset";

// Authenticated app
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Proposals from "./pages/Proposals";
import KnowledgeBase from "./pages/KnowledgeBase";
import Analytics from "./pages/Analytics";
import Compliance from "./pages/Compliance";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import SystemStatus from "./pages/SystemStatus";

// Acquisition sub-pages
import SolicitationReview from "./pages/acquisition/SolicitationReview";
import MarketResearch from "./pages/acquisition/MarketResearch";
import DocumentControl from "./pages/acquisition/DocumentControl";

const App = () => (
  <ErrorBoundary>
    <QueryProvider>
      <TooltipProvider>
        <BrowserRouter>
          <MainLayout>
            <Routes>
              {/* Landing / public */}
              <Route path="/" element={<Index />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/sitemap" element={<Sitemap />} />

              {/* Auth */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/reset-password" element={<PasswordReset />} />

              {/* Core app */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/proposals" element={<Proposals />} />
              <Route path="/knowledge-base" element={<KnowledgeBase />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/compliance" element={<Compliance />} />
              <Route path="/help" element={<Help />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/system-status" element={<SystemStatus />} />

              {/* Acquisition workflow */}
              <Route path="/acquisition/solicitation-review" element={<SolicitationReview />} />
              <Route path="/acquisition/market-research" element={<MarketResearch />} />
              <Route path="/acquisition/document-control" element={<DocumentControl />} />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
          <Toaster />
        </BrowserRouter>
      </TooltipProvider>
    </QueryProvider>
  </ErrorBoundary>
);

export default App;
