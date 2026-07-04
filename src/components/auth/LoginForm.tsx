import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { errorTracker } from "@/lib/security/errorTracking";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Welcome back",
        description: "You have been signed in successfully.",
      });
      navigate("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign-in failed";
      errorTracker.trackError({
        message,
        severity: "MEDIUM",
        errorType: "APPLICATION",
        status: "NEW",
      });
      toast({
        variant: "destructive",
        title: "Sign-in failed",
        description: message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
      <Card className="w-full max-w-md p-8 bg-black/40 backdrop-blur-sm border-white/5">
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-fuchsia-400" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Sign In</h1>
          <p className="text-gray-400">Access the Intelligent Acquisition Navigator</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              className="bg-white/5 border-white/10 text-white"
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
              Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password")}
              className="bg-white/5 border-white/10 text-white"
              aria-describedby={errors.password ? "password-error" : undefined}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p id="password-error" className="mt-1 text-sm text-red-400" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600 disabled:opacity-50"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>

          <div className="text-center text-sm text-gray-400 space-y-2">
            <p>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="text-fuchsia-400 hover:text-fuchsia-300 underline-offset-2 hover:underline"
              >
                Create one
              </button>
            </p>
            <p>
              <button
                type="button"
                onClick={() => navigate("/reset-password")}
                className="text-fuchsia-400 hover:text-fuchsia-300 underline-offset-2 hover:underline"
              >
                Forgot password?
              </button>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
