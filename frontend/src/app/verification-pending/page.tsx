"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Check,
  Circle,
  Clock,
  ArrowRight,
  Upload,
  CreditCard,
  User,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const verificationItems = [
  {
    label: "Email verified",
    status: "done" as const,
    icon: Check,
  },
  {
    label: "Phone verified",
    status: "done" as const,
    icon: Check,
  },
  {
    label: "Identity document upload",
    status: "pending" as const,
    icon: CreditCard,
    action: "Upload Now",
  },
  {
    label: "Profile photo",
    status: "pending" as const,
    icon: User,
    action: "Upload Now",
  },
  {
    label: "Address proof",
    status: "pending" as const,
    icon: FileText,
    action: "Upload Now",
  },
];

export default function VerificationPendingPage() {
  const router = useRouter();

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        {/* Animated Shield */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25">
              <ShieldCheck className="h-10 w-10 text-white" />
            </div>
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -inset-3 rounded-full border-2 border-indigo-300/50 dark:border-indigo-500/30"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 font-display text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white"
          >
            Verification in progress
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-3 max-w-sm text-base leading-relaxed text-slate-500 dark:text-slate-400"
          >
            Complete these steps to unlock full platform access and build your
            trust score
          </motion.p>
        </div>

        {/* Verification Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/50"
        >
          <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
            Verification Checklist
          </h3>
          <ul className="mt-4 space-y-1">
            {verificationItems.map((item, i) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
                className="flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <div className="flex items-center gap-3">
                  {item.status === "done" ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
                      <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700">
                      <Circle className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                    </div>
                  )}
                  <span
                    className={`text-sm font-medium ${
                      item.status === "done"
                        ? "text-slate-700 dark:text-slate-200"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                {item.action && (
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 transition-colors hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
                  >
                    <Upload className="h-3 w-3" />
                    {item.action}
                  </button>
                )}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Timeline Estimate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-6 rounded-2xl border border-amber-100 bg-amber-50/50 p-5 dark:border-amber-900 dark:bg-amber-950/20"
        >
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <h4 className="text-sm font-bold text-amber-800 dark:text-amber-200">
                Estimated Timeline
              </h4>
              <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
                Once all documents are uploaded, verification typically takes{" "}
                <strong>12-24 hours</strong>. You&apos;ll receive notifications
                at each step.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <Button
            className="h-11 gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-700 hover:to-violet-700"
          >
            <Upload className="h-4 w-4" />
            Complete Verification
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="link"
            onClick={() => router.push("/")}
            className="text-sm text-slate-400 dark:text-slate-500"
          >
            I&apos;ll do this later
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
