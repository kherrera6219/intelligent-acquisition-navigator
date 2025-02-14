
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Shield, Mail, User, Building, Lock, Github, Facebook, Chrome, Monitor } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const SignUpForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    organization: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSocialLogin = async (provider: 'github' | 'google' | 'facebook' | 'azure') => {
    try {
      setIsLoading(true); // Add loading state for social login
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          queryParams: provider === 'google' ? {
            access_type: 'offline',
            prompt: 'consent',
          } : undefined,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || `Failed to sign in with ${provider}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // Add password strength validation
    if (formData.password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email.trim(), // Trim whitespace
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName.trim(),
            organization: formData.organization.trim(),
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        }
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: "Account created",
          description: "Please check your email to verify your account.",
        });
        navigate("/login");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      <Card className="w-full max-w-md p-8 bg-black/40 backdrop-blur-sm border-white/5">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
            Create Account
          </h2>
          <p className="text-gray-400 mt-2">Join the secure enterprise network</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => handleSocialLogin('github')}
            disabled={isLoading}
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
          
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
          >
            <Chrome className="mr-2 h-4 w-4" />
            Google
          </Button>
          
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => handleSocialLogin('facebook')}
            disabled={isLoading}
          >
            <Facebook className="mr-2 h-4 w-4" />
            Facebook
          </Button>
          
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => handleSocialLogin('azure')}
            disabled={isLoading}
          >
            <Monitor className="mr-2 h-4 w-4" />
            Microsoft
          </Button>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-black px-2 text-gray-400">Or continue with</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                name="email"
                placeholder="Enterprise Email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10"
                required
                disabled={isLoading}
                aria-label="Email address"
              />
            </div>

            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="pl-10"
                required
                disabled={isLoading}
                aria-label="Full name"
              />
            </div>

            <div className="relative">
              <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                name="organization"
                placeholder="Organization"
                value={formData.organization}
                onChange={handleChange}
                className="pl-10"
                required
                disabled={isLoading}
                aria-label="Organization"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="pl-10"
                required
                disabled={isLoading}
                minLength={8}
                aria-label="Password"
              />
            </div>

            <div className="relative">
              <Shield className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pl-10"
                required
                disabled={isLoading}
                minLength={8}
                aria-label="Confirm password"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Secure Account"}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-fuchsia-400 hover:text-fuchsia-300">
                Sign in
              </Link>
            </p>
            <p className="text-sm text-gray-400">
              Forgot your password?{" "}
              <Link to="/reset-password" className="text-fuchsia-400 hover:text-fuchsia-300">
                Reset it here
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignUpForm;
