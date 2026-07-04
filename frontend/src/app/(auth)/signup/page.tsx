"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Building,
  Briefcase,
  Building2,
  Globe,
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  User,
  Phone,
  Loader2,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

import AuthShell from "@/components/auth/AuthShell";
import RoleCard from "@/components/auth/RoleCard";
import PasswordStrength from "@/components/auth/PasswordStrength";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import type { User as AuthUser } from "@/lib/auth";

interface Role {
  id: string;
  title: string;
  icon: typeof Users;
  description: string;
  benefits: string[];
}

const roles: Role[] = [
  {
    id: "tenant",
    title: "Tenant",
    icon: Users,
    description: "Find verified rentals",
    benefits: [
      "AI-matched properties",
      "Trust-verified landlords",
      "Fair pricing insights",
    ],
  },
  {
    id: "landlord",
    title: "Landlord",
    icon: Building,
    description: "List with more trust",
    benefits: [
      "Verified tenant screening",
      "AI pricing intelligence",
      "Lifecycle management",
    ],
  },
  {
    id: "broker",
    title: "Broker/Agent",
    icon: Briefcase,
    description: "Convert with trust",
    benefits: [
      "Structured lead flow",
      "Verified inventory",
      "Commission tracking",
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise",
    icon: Building2,
    description: "Manage employee rentals",
    benefits: [
      "Bulk rental coordination",
      "Compliance support",
      "Dedicated account manager",
    ],
  },
  {
    id: "nri",
    title: "NRI Owner",
    icon: Globe,
    description: "Manage remotely",
    benefits: [
      "Remote property oversight",
      "Verified tenant placement",
      "Rental lifecycle tracking",
    ],
  },
];

// Map role IDs to the User role type
const roleIdToUserRole: Record<string, AuthUser["role"]> = {
  tenant: "tenant",
  landlord: "landlord",
  broker: "broker",
  enterprise: "enterprise",
  nri: "nri-owner",
};

export default function SignupPage() {
  const router = useRouter();
  const { signup, isLoggedIn, isLoading: authLoading } = useAuth();

  const [phase, setPhase] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState("");

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && isLoggedIn) {
      router.push("/dashboard");
    }
  }, [authLoading, isLoggedIn, router]);

  const selectedRoleData = roles.find((r) => r.id === selectedRole);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";
    if (!mobile || mobile.length < 10)
      newErrors.mobile = "Valid mobile number required";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Minimum 8 characters";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords don't match";
    if (!agreed) newErrors.agreed = "You must agree to the terms";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!selectedRole) return;

    setLoading(true);
    setSignupError("");

    try {
      const success = await signup({
        name: fullName,
        email,
        phone: "+91 " + mobile,
        password,
        role: roleIdToUserRole[selectedRole] || "tenant",
      });

      if (success) {
        router.push("/verify-account");
      } else {
        setSignupError("Signup failed. Please try again.");
        setLoading(false);
      }
    } catch {
      setSignupError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <AuthShell title="Start your rental journey" subtitle="Checking your session...">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
        </div>
      </AuthShell>
    );
  }

  // If already logged in, show redirect state
  if (isLoggedIn) {
    return (
      <AuthShell title="Welcome back" subtitle="Redirecting to your dashboard...">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
        </div>
      </AuthShell>
    );
  }

  const shellTitle =
    phase === 1 ? "Start your rental journey" : "Create your account";
  const shellSubtitle =
    phase === 1
      ? "Create your 99tolet account. More than discovery — this is where your rental workflow begins."
      : `Setting up your ${selectedRoleData?.title} account`;

  return (
    <AuthShell title={shellTitle} subtitle={shellSubtitle}>
      <AnimatePresence mode="wait">
        {phase === 1 ? (
          <motion.div
            key="phase-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Role Grid */}
            <div className="grid grid-cols-2 gap-3">
              {roles.map((role, i) => (
                <RoleCard
                  key={role.id}
                  icon={role.icon}
                  title={role.title}
                  description={role.description}
                  benefits={role.benefits}
                  selected={selectedRole === role.id}
                  onSelect={() => setSelectedRole(role.id)}
                  index={i}
                />
              ))}
            </div>

            {/* Continue */}
            <Button
              type="button"
              disabled={!selectedRole}
              onClick={() => setPhase(2)}
              className="h-11 w-full gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 disabled:opacity-50"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>

            {/* Sign In Link */}
            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="phase-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            {/* Back + Role Badge */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setPhase(1)}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                <ArrowLeft className="h-4 w-4" />
                Change role
              </button>

              {selectedRoleData && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300"
                >
                  <selectedRoleData.icon className="h-3 w-3" />
                  {selectedRoleData.title}
                </motion.div>
              )}
            </div>

            {/* Signup Error */}
            <AnimatePresence>
              {signupError && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {signupError}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-11 pl-10 dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-red-500">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 pl-10 dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Mobile */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Mobile Number
                </label>
                <div className="relative flex">
                  <div className="flex h-11 items-center rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                    +91
                  </div>
                  <Input
                    type="tel"
                    placeholder="98765 43210"
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    className="h-11 rounded-l-none dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>
                {errors.mobile && (
                  <p className="text-xs text-red-500">{errors.mobile}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pl-10 pr-10 dark:bg-slate-800 dark:border-slate-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <PasswordStrength password={password} />
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-11 pl-10 pr-10 dark:bg-slate-800 dark:border-slate-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showConfirm ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="space-y-1">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800"
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy-policy"
                      className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.agreed && (
                  <p className="text-xs text-red-500">{errors.agreed}</p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="h-11 w-full gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500">
              <ShieldCheck className="h-3.5 w-3.5" />
              Your data is encrypted and never shared
            </div>

            {/* Sign In Link */}
            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthShell>
  );
}
