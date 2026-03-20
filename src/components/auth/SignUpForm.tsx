
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Shield } from "lucide-react";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
      return;
    }

    // Handle sign up logic here
    toast({
      title: "Account created",
      description: "Welcome to ProcurityIQ!",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
      <Card className="w-full max-w-md p-8 bg-black/40 backdrop-blur-sm border-white/5">
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 
                         rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-fuchsia-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Join ProcurityIQ to streamline your acquisition process</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Email Address
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-white/5 border-white/10 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Password
            </label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-white/5 border-white/10 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Confirm Password
            </label>
            <Input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="bg-white/5 border-white/10 text-white"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 
                     hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600"
          >
            Create Account
          </Button>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-fuchsia-400 hover:text-fuchsia-300"
            >
              Sign in
            </button>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default SignUpForm;
