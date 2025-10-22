import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, Loader2 } from "lucide-react";
import AuthInput from "@/components/auth/AuthInput";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

/**
 * Login form validation schema
 */
const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(100, "Password must be less than 100 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

/**
 * LoginPage - User authentication page
 * Handles user login with JWT token storage
 */
const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  /**
   * Handle login form submission
   */
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      // Call backend login endpoint
      const response = await axios.post(
        "/api/v1/users/login",
        {
          email: data.email,
          password: data.password,
        }
      );

      // Store authentication tokens
      const { accessToken, refreshToken, user } = response.data.data;
      
      // Save tokens to localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      // Success toast
      toast({
        title: "Login successful!",
        description: `Welcome back, ${user.fullName || user.username}!`,
      });

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error: any) {
      // Handle login errors
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Invalid email or password. Please try again.";

      toast({
        variant: "destructive",
        title: "Login failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Welcome Back
        </h2>
        <p className="text-muted-foreground text-sm">
          Sign in to continue to your dashboard
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <AuthInput
          label="Email"
          type="email"
          placeholder="john@example.com"
          icon={<Mail className="w-5 h-5" />}
          error={errors.email?.message}
          disabled={isLoading}
          {...register("email")}
        />

        {/* Password */}
        <AuthInput
          label="Password"
          type="password"
          placeholder="••••••••"
          icon={<Lock className="w-5 h-5" />}
          error={errors.password?.message}
          disabled={isLoading}
          {...register("password")}
        />

        {/* Forgot password link */}
        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm text-primary hover:underline transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full btn-glow transition-all duration-300 hover:scale-[1.02]"
          disabled={isLoading}
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      {/* Register link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary hover:underline font-medium transition-colors"
          >
            Register here
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;
