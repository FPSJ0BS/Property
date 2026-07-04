"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Check,
  ArrowRight,
  LayoutDashboard,
  ShieldCheck,
  Bell,
  User,
  Home,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const completedItems = [
  { label: "Account created", icon: User },
  { label: "Role selected", icon: Home },
  { label: "Preferences configured", icon: Settings },
  { label: "Profile completed", icon: CheckCircle2 },
];

const recommendedItems = [
  {
    title: "Complete Identity Verification",
    description: "Get verified for priority access and higher trust score",
    icon: ShieldCheck,
    href: "/verification-pending",
  },
  {
    title: "Enable Smart Notifications",
    description: "Never miss a matching property or important update",
    icon: Bell,
    href: "/next-step",
  },
  {
    title: "Go to Dashboard",
    description: "Start exploring your personalized rental experience",
    icon: LayoutDashboard,
    href: "/",
  },
];

export default function SetupCompletePage() {
  const router = useRouter();

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Success Header */}
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
            transition={{ delay: 0.3 }}
            className="mt-6 font-display text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white"
          >
            Setup Complete!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-2 text-base text-slate-500 dark:text-slate-400"
          >
            Your account is configured and ready to use
          </motion.p>
        </div>

        {/* Profile Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/50"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl font-bold text-white">
              R
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Rahul Sharma
              </h3>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                  Tenant
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  Jaipur, Rajasthan
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* What's Completed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/50"
        >
          <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
            What&apos;s completed
          </h3>
          <ul className="mt-4 space-y-3">
            {completedItems.map((item, i) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
                  <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {item.label}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Recommended Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6"
        >
          <h3 className="mb-4 font-display text-base font-bold text-slate-900 dark:text-white">
            Recommended next steps
          </h3>
          <div className="space-y-3">
            {recommendedItems.map((item, i) => (
              <motion.button
                key={item.title}
                type="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                onClick={() => router.push(item.href)}
                className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left transition-all hover:border-indigo-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-indigo-700"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-700">
                  <item.icon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 dark:text-slate-600" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 flex justify-center"
        >
          <Button
            onClick={() => router.push("/")}
            className="h-11 gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-700 hover:to-violet-700"
          >
            <LayoutDashboard className="h-4 w-4" />
            Go to Dashboard
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
