
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Loader2, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast({
          variant: "destructive",
          title: "Sign in failed",
          description: error.message,
        });
        return;
      }
      navigate("/dashboard");
    } catch {
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 bg-black/40 backdrop-blur-sm border-white/5">
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20
                         rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-fuchsia-400" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Sign in to ProcurityIQ</h1>
          <p className="text-gray-400 text-sm">
            AI-powered federal acquisition management
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1.5">
              Email address
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-600"
              placeholder="you@agency.gov"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                Password
              </label>
              <Link
                to="/reset-password"
                className="text-xs text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500
                     hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </Button>

          <p className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors">
              Create one
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Login;
