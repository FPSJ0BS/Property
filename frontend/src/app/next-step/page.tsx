"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Search,
  ShieldCheck,
  Home,
  ArrowRight,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  {
    icon: Search,
    title: "Start AI Property Search",
    description:
      "Our AI analyzes your preferences and finds the best matches in your area. Get instant recommendations tailored to your budget, location, and lifestyle.",
    href: "/discover",
    color: "from-indigo-500 to-violet-600",
    bgLight: "bg-indigo-50 dark:bg-indigo-950/30",
    borderLight: "border-indigo-200 dark:border-indigo-800",
  },
  {
    icon: ShieldCheck,
    title: "Complete Verification",
    description:
      "Verified users get priority access to premium listings, faster landlord responses, and a higher trust score on the platform.",
    href: "/verification-pending",
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
    borderLight: "border-emerald-200 dark:border-emerald-800",
  },
  {
    icon: Home,
    title: "Explore Verified Rentals",
    description:
      "Browse through our curated collection of trust-verified properties. Every listing is checked for accuracy, pricing fairness, and landlord verification.",
    href: "/discover",
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50 dark:bg-amber-950/30",
    borderLight: "border-amber-200 dark:border-amber-800",
  },
];

export default function NextStepPage() {
  const router = useRouter();

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600"
          >
            <Sparkles className="h-7 w-7 text-white" />
          </motion.div>
          <h1 className="mt-5 font-display text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
            What&apos;s next for you
          </h1>
          <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
            Choose your next step to get the most out of 99tolet
          </p>
        </motion.div>

        {/* Action Cards */}
        <div className="mt-10 space-y-5">
          {actions.map((action, i) => (
            <motion.button
              key={action.title}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => router.push(action.href)}
              className={`group w-full rounded-2xl border ${action.borderLight} ${action.bgLight} p-6 text-left transition-all hover:shadow-lg`}
            >
              <div className="flex items-start gap-5">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${action.color}`}
                >
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                      {action.title}
                    </h3>
                    <ArrowRight className="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 dark:text-slate-600" />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {action.description}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Help Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 text-center"
        >
          <Button
            variant="ghost"
            onClick={() => router.push("/support")}
            className="gap-2 text-sm text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
          >
            <MessageCircle className="h-4 w-4" />
            Need help? Talk to our team
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
