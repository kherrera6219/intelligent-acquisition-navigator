
import { Toaster } from "@/components/ui/toaster";
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
import NotFound from "./pages/NotFound";

const App = () => (
  <ErrorBoundary>
    <QueryProvider>
      <TooltipProvider>
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/reset-password" element={<PasswordReset />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/proposals" element={<Proposals />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/knowledge-base" element={<KnowledgeBase />} />
              <Route path="/acquisition/solicitation-review" element={<SolicitationReview />} />
              <Route path="/acquisition/market-research" element={<MarketResearch />} />
              <Route path="/acquisition/document-control" element={<DocumentControl />} />
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
