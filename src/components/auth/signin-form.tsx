"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";

interface SignInFormProps {
  onSubmit?: (data: SignInData) => void;
  className?: string;
}

interface SignInData {
  email: string;
  password: string;
}

const CardDecorator = () => (
  <>
    <span className="border-primary/30 absolute -left-px -top-px block size-2 border-l-2 border-t-2"></span>
    <span className="border-primary/30 absolute -right-px -top-px block size-2 border-r-2 border-t-2"></span>
    <span className="border-primary/30 absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
    <span className="border-primary/30 absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
  </>
);

export function SignInForm({ onSubmit, className }: SignInFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<SignInData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<SignInData>>({});
  const [authError, setAuthError] = useState<string>("");

  const validateForm = (): boolean => {
    const newErrors: Partial<SignInData> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setAuthError("");

    try {
      const result = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (result.error) {
        setAuthError(result.error.message || "Failed to sign in");
        return;
      }

      onSubmit?.(formData);

      router.push("/dashboard");
    } catch (error) {
      console.error("Sign in error:", error);
      setAuthError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof SignInData,
    value: string | boolean
  ) => {
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
      <div className="border-border/50 bg-card/20 group relative border backdrop-blur-sm p-8">
        <CardDecorator />

        <CardHeader className="pb-4">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h2>
            <p className="text-muted-foreg text-sm">
              Sign in to your account to continue
            </p>
          </div>
        </CardHeader>

        <CardContent className="">
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="Enter your password"
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

            {authError && (
              <div className="rounded-md bg-destructive/15 p-3">
                <p className="text-destructive text-sm">{authError}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full group" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="mr-2 size-4 animate-spin border-2 border-current border-t-transparent" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="bg-background border-border w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background text-muted-foreground px-2">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" type="button" disabled={isLoading}>
              <FaGoogle />
              Google
            </Button>
            <Button variant="outline" type="button" disabled={isLoading}>
              <FaGithub />
              GitHub
            </Button>
          </div>

          <p className="text-muted-foreground mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Button variant="link" className="h-auto p-0 text-sm">
              Sign up for free
            </Button>
          </p>
        </CardContent>
      </div>
    </div>
  );
}
