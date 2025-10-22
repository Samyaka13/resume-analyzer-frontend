import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { User, Mail, Lock, UserCircle, Loader2 } from "lucide-react";
import AuthInput from "@/components/auth/AuthInput";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

/**
 * Registration form validation schema
 */
const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters"),
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * RegisterPage - User registration page
 * Handles new user account creation with validation
 */
const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  /**
   * Handle registration form submission
   */
  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    try {
      // Call backend registration endpoint
       await axios.post(
        "/api/v1/users/register",
        {
          username: data.username,
          email: data.email,
          fullName: data.fullName,
          password: data.password,
        }
      );

      // Success - show toast and redirect to login
      toast({
        title: "Registration successful!",
        description: "Please log in with your new account.",
      });

      // Redirect to login page
      navigate("/login");
    } catch (error: any) {
      // Handle registration errors
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Registration failed. Please try again.";

      toast({
        variant: "destructive",
        title: "Registration failed",
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
          Create Account
        </h2>
        <p className="text-muted-foreground text-sm">
          Get started with AI-powered resume analysis
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <AuthInput
          label="Full Name"
          placeholder="John Doe"
          icon={<UserCircle className="w-5 h-5" />}
          error={errors.fullName?.message}
          disabled={isLoading}
          {...register("fullName")}
        />

        {/* Username */}
        <AuthInput
          label="Username"
          placeholder="johndoe"
          icon={<User className="w-5 h-5" />}
          error={errors.username?.message}
          disabled={isLoading}
          {...register("username")}
        />

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
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      {/* Login link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary hover:underline font-medium transition-colors"
          >
            Login here
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default RegisterPage;
