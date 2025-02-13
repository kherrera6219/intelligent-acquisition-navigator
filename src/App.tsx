
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryProvider } from "@/providers/QueryProvider";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignUpForm from "./components/auth/SignUpForm";
import UserProfile from "./components/auth/UserProfile";
import PasswordReset from "./components/auth/PasswordReset";
import Dashboard from "./pages/Dashboard";
import Proposals from "./pages/Proposals";
import Chat from "./pages/Chat";

const App = () => (
  <QueryProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryProvider>
);

export default App;
