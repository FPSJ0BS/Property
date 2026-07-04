"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validateEmail = (value: string) => {
    if (!value) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
    return "";
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) {
      setEmailError(err);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter your email and we'll send you a secure reset link."
    >
      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  required
                  className="h-11 pl-10 dark:bg-slate-800 dark:border-slate-700"
                />
              </div>
              {emailError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-500"
                >
                  {emailError}
                </motion.p>
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
                  Send Reset Link
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>

            {/* Back to login */}
            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              Remember your password?{" "}
              <Link
                href="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Back to login
              </Link>
            </p>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
            className="space-y-6"
          >
            {/* Success Icon */}
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.15,
                  type: "spring",
                  stiffness: 200,
                  damping: 12,
                }}
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/30"
              >
                <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </motion.div>
            </div>

            <div className="space-y-2 text-center">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Reset link sent
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                We&apos;ve sent a password reset link to{" "}
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {email}
                </span>
                . Check your inbox.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSent(false);
                  setEmail("");
                }}
                className="h-11 w-full rounded-xl text-sm font-medium dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
              >
                Try a different email
              </Button>

              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                <Link
                  href="/login"
                  className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Back to login
                </Link>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthShell>
  );
}
