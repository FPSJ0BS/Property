"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Loader2,
  CheckCircle2,
  RotateCw,
  Phone,
} from "lucide-react";

import AuthShell from "@/components/auth/AuthShell";
import OTPInput from "@/components/auth/OTPInput";
import { Button } from "@/components/ui/button";

export default function VerifyAccountPage() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
    setOtp(Array(6).fill(""));
  };

  const handleComplete = useCallback(
    (_otpValue: string) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setVerified(true);
        setTimeout(() => {
          router.push("/onboarding");
        }, 2000);
      }, 1500);
    },
    [router]
  );

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <AuthShell
      title="Verify your account"
      subtitle="We sent a 6-digit code to your phone. Verification helps us create safer rental interactions."
    >
      <AnimatePresence mode="wait">
        {!verified ? (
          <motion.div
            key="otp-form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Masked Phone */}
            <div className="flex items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
              <Phone className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                +91 98***99999
              </span>
            </div>

            {/* OTP Input */}
            <div className="space-y-4">
              <OTPInput
                length={6}
                value={otp}
                onChange={setOtp}
                onComplete={handleComplete}
              />

              {/* Loading indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400"
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying...
                </motion.div>
              )}
            </div>

            {/* Timer / Resend */}
            <div className="flex flex-col items-center gap-2">
              {canResend ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleResend}
                  className="gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  <RotateCw className="h-3.5 w-3.5" />
                  Resend Code
                </Button>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Resend code in{" "}
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {formatTime(timer)}
                  </span>
                </p>
              )}

              <Link
                href="/signup"
                className="text-xs font-medium text-slate-400 transition-colors hover:text-indigo-600 dark:text-slate-500 dark:hover:text-indigo-400"
              >
                Change phone number
              </Link>
            </div>

            {/* Trust Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50/50 px-4 py-3 dark:border-indigo-900/30 dark:bg-indigo-950/20"
            >
              <ShieldCheck className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
              <p className="text-xs text-indigo-700 dark:text-indigo-300">
                A trusted platform starts with verified access.
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="space-y-6"
          >
            {/* Success Checkmark */}
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 12,
                  delay: 0.1,
                }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: 0.3,
                  }}
                >
                  <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                </motion.div>
              </motion.div>
            </div>

            <div className="space-y-2 text-center">
              <motion.h3
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl font-bold text-slate-900 dark:text-white"
              >
                Account Verified
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-slate-500 dark:text-slate-400"
              >
                Redirecting you to onboarding...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthShell>
  );
}
