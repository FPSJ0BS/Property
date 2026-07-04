"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Search,
  BadgeCheck,
  Home,
  ArrowRight,
} from "lucide-react";
import TrustProgress from "@/components/auth/TrustProgress";
import { Button } from "@/components/ui/button";

export default function WelcomePage() {
  const router = useRouter();
  const mockName = "Rahul";
  const mockRole = "Tenant";

  const actions = [
    {
      icon: Search,
      title: "Start AI Search",
      description:
        "Let our AI find your perfect rental based on your preferences",
      href: "/discover",
      primary: true,
    },
    {
      icon: BadgeCheck,
      title: "Complete Verification",
      description: "Get verified for priority access and landlord trust",
      href: "/verification-pending",
      primary: false,
    },
    {
      icon: Home,
      title: "Explore Verified Rentals",
      description: "Browse trust-verified properties in your preferred areas",
      href: "/discover",
      primary: false,
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Success Animation */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/25"
          >
            <CheckCircle2 className="h-10 w-10 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 font-display text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white"
          >
            Welcome to 99tolet, {mockName}!
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-3"
          >
            <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
              {mockRole}
            </span>
          </motion.div>
        </div>

        {/* Trust Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <TrustProgress
            completedSteps={4}
            totalSteps={6}
            items={[
              { label: "Account created", done: true },
              { label: "Role selected", done: true },
              { label: "Preferences saved", done: true },
              { label: "Profile completed", done: true },
              { label: "Identity verification", done: false },
              { label: "Document upload", done: false },
            ]}
          />
        </motion.div>

        {/* Action Cards */}
        <div className="mt-8 space-y-4">
          {actions.map((action, i) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
            >
              <button
                type="button"
                onClick={() => router.push(action.href)}
                className={`group flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition-all ${
                  action.primary
                    ? "border-indigo-200 bg-gradient-to-r from-indigo-50 to-violet-50 hover:shadow-lg hover:shadow-indigo-500/10 dark:border-indigo-800 dark:from-indigo-950/40 dark:to-violet-950/40"
                    : "border-slate-200 bg-white hover:border-indigo-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-indigo-700"
                }`}
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                    action.primary
                      ? "bg-gradient-to-br from-indigo-500 to-violet-600"
                      : "bg-slate-100 dark:bg-slate-700"
                  }`}
                >
                  <action.icon
                    className={`h-6 w-6 ${
                      action.primary
                        ? "text-white"
                        : "text-slate-600 dark:text-slate-300"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    {action.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                    {action.description}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 dark:text-slate-600" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Skip link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-8 text-center"
        >
          <Button
            variant="link"
            onClick={() => router.push("/")}
            className="text-sm text-slate-400 dark:text-slate-500"
          >
            Skip to dashboard
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
