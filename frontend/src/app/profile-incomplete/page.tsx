"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  UserCircle,
  ArrowRight,
  MapPin,
  Briefcase,
  Camera,
  FileText,
  Sparkles,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const PROGRESS = 40;
const OFFSET = CIRCUMFERENCE - (PROGRESS / 100) * CIRCUMFERENCE;

const incompleteItems = [
  {
    label: "Add profile photo",
    description: "Builds trust with landlords and agents",
    icon: Camera,
    href: "/onboarding/tenant",
  },
  {
    label: "Set location preferences",
    description: "Get better property matches in your area",
    icon: MapPin,
    href: "/onboarding/tenant",
  },
  {
    label: "Add occupation details",
    description: "Landlords prefer tenants with verified employment",
    icon: Briefcase,
    href: "/onboarding/tenant",
  },
  {
    label: "Upload identity document",
    description: "Required for trust score and verified badge",
    icon: FileText,
    href: "/verification-pending",
  },
];

const benefits = [
  {
    icon: Sparkles,
    title: "Better AI Matching",
    description:
      "Complete profiles get 5x better AI property recommendations",
  },
  {
    icon: ShieldCheck,
    title: "Higher Trust Score",
    description:
      "Verified profiles are prioritized by landlords and agents",
  },
  {
    icon: Star,
    title: "Priority Listings",
    description:
      "Get early access to new listings before other searchers",
  },
];

export default function ProfileIncompletePage() {
  const router = useRouter();

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        {/* Progress Ring */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative flex h-24 w-24 items-center justify-center"
          >
            <svg
              width={96}
              height={96}
              viewBox="0 0 96 96"
              className="-rotate-90"
            >
              <circle
                cx={48}
                cy={48}
                r={RADIUS}
                fill="none"
                stroke="currentColor"
                strokeWidth={6}
                className="text-slate-100 dark:text-slate-700"
              />
              <motion.circle
                cx={48}
                cy={48}
                r={RADIUS}
                fill="none"
                stroke="url(#profile-gradient)"
                strokeWidth={6}
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                initial={{ strokeDashoffset: CIRCUMFERENCE }}
                animate={{ strokeDashoffset: OFFSET }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              />
              <defs>
                <linearGradient
                  id="profile-gradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {PROGRESS}%
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 font-display text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white"
          >
            Complete your profile for better matches
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-2 text-base text-slate-500 dark:text-slate-400"
          >
            A few more steps to unlock the full 99tolet experience
          </motion.p>
        </div>

        {/* Incomplete Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 space-y-3"
        >
          {incompleteItems.map((item, i) => (
            <motion.button
              key={item.label}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.08 }}
              onClick={() => router.push(item.href)}
              className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-indigo-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-indigo-700"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
                <item.icon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {item.label}
                </h4>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
              <span className="flex items-center gap-1 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 transition-colors group-hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 dark:group-hover:bg-indigo-900/50">
                Complete
                <ArrowRight className="h-3 w-3" />
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/50"
        >
          <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
            Benefits of completing your profile
          </h3>
          <div className="mt-4 space-y-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30">
                  <b.icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {b.title}
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {b.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-6 text-center"
        >
          <Button
            variant="link"
            onClick={() => router.push("/")}
            className="text-sm text-slate-400 dark:text-slate-500"
          >
            <UserCircle className="mr-1.5 h-4 w-4" />
            Skip for now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
