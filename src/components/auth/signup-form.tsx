"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

interface SignUpFormProps {
  onSubmit?: (data: SignUpData) => void;
  className?: string;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const CardDecorator = () => (
  <>
    <span className="border-primary/30 absolute -left-px -top-px block size-2 border-l-2 border-t-2"></span>
    <span className="border-primary/30 absolute -right-px -top-px block size-2 border-r-2 border-t-2"></span>
    <span className="border-primary/30 absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
    <span className="border-primary/30 absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
  </>
);

export function SignUpForm({ onSubmit, className }: SignUpFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<SignUpData>>({});
  const [authError, setAuthError] = useState<string>("");

  const validateForm = (): boolean => {
    const newErrors: Partial<SignUpData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setAuthError("");

    const { data, error } = await authClient.signUp.email(
      {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        callbackURL: "/dashboard",
      },
      {
        onRequest: (ctx) => {
          // Loading state is already handled by setIsLoading(true) above
        },
        onSuccess: (ctx) => {
          onSubmit?.(formData);
          router.push("/dashboard");
          setIsLoading(false);
        },
        onError: (ctx) => {
          setAuthError(ctx.error.message);
          setIsLoading(false);
        },
      }
    );
  };

  const handleInputChange = (field: keyof SignUpData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (authError) {
      setAuthError("");
    }
  };

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="border-border/50 bg-card/20 group relative border backdrop-blur-sm rounded-lg p-8">
        <CardDecorator />

        <CardHeader className="pb-4">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Create your account
            </h2>
            <p className="text-muted-foreground text-sm">
              Get started with ZEIT
            </p>
          </div>
        </CardHeader>

        <CardContent className="">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Full name
              </Label>
              <div className="relative">
                <User className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={cn(
                    "pl-10",
                    errors.name &&
                      "border-destructive focus-visible:ring-destructive"
                  )}
                  disabled={isLoading}
                />
              </div>
              {errors.name && (
                <p className="text-destructive text-xs">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email address
              </Label>
              <div className="relative">
                <Mail className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={cn(
                    "pl-10",
                    errors.email &&
                      "border-destructive focus-visible:ring-destructive"
                  )}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-destructive text-xs">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={cn(
                    "pl-10 pr-10",
                    errors.password &&
                      "border-destructive focus-visible:ring-destructive"
                  )}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-foreground absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-destructive text-xs">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm password
              </Label>
              <div className="relative">
                <Lock className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className={cn(
                    "pl-10 pr-10",
                    errors.confirmPassword &&
                      "border-destructive focus-visible:ring-destructive"
                  )}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-muted-foreground hover:text-foreground absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-destructive text-xs">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {authError && (
              <div className="rounded-md bg-destructive/15 p-3">
                <p className="text-destructive text-sm">{authError}</p>
              </div>
            )}

            <Button type="submit" className="w-full group" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          <p className="text-muted-foreground mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login">
              <Button variant="link" className="h-auto p-0 text-sm">
                Sign in
              </Button>
            </Link>
          </p>
        </CardContent>
      </div>
    </div>
  );
}
