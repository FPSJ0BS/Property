"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Clock,
  Check,
  Mail,
  Smartphone,
  FileText,
  ShieldCheck,
  Camera,
  MessageCircle,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const submittedItems = [
  { label: "Identity document (Aadhaar)", icon: FileText },
  { label: "Profile photo", icon: Camera },
  { label: "Ownership proof", icon: ShieldCheck },
];

export default function AccountUnderReviewPage() {
  const router = useRouter();

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        {/* Animated Clock */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/25">
              <Clock className="h-10 w-10 text-white" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -inset-2 rounded-full border-2 border-amber-300/40 dark:border-amber-600/30"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 font-display text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white"
          >
            Your account is under review
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-3 text-base leading-relaxed text-slate-500 dark:text-slate-400"
          >
            Our trust team is verifying your documents. This usually takes{" "}
            <strong className="text-slate-700 dark:text-slate-200">
              24-48 hours
            </strong>
            .
          </motion.p>
        </div>

        {/* What's Been Submitted */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/50"
        >
          <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
            What&apos;s been submitted
          </h3>
          <ul className="mt-4 space-y-3">
            {submittedItems.map((item, i) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
                  <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {item.label}
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Notification Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5 dark:border-indigo-900 dark:bg-indigo-950/20"
        >
          <h4 className="text-sm font-bold text-indigo-800 dark:text-indigo-200">
            We&apos;ll notify you when it&apos;s done
          </h4>
          <div className="mt-3 flex flex-col gap-2">
            <div className="flex items-center gap-2.5 text-sm text-indigo-700 dark:text-indigo-300">
              <Mail className="h-4 w-4 shrink-0" />
              Email notification
            </div>
            <div className="flex items-center gap-2.5 text-sm text-indigo-700 dark:text-indigo-300">
              <Smartphone className="h-4 w-4 shrink-0" />
              SMS notification
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <Button
            variant="outline"
            onClick={() => router.push("/support")}
            className="h-11 gap-2 rounded-xl px-6 text-sm font-semibold"
          >
            <MessageCircle className="h-4 w-4" />
            Contact Support
          </Button>
          <Button
            variant="link"
            onClick={() => router.push("/")}
            className="gap-1.5 text-sm text-slate-400 dark:text-slate-500"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
