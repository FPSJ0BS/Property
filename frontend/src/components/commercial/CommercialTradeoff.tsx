"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Sparkles,
  MapPin,
} from "lucide-react";
import type { CommercialAreaProfile } from "@/data/commercial";

interface CommercialTradeoffProps {
  profile: CommercialAreaProfile;
}

const infraTypeColors: Record<string, string> = {
  Bank: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Co-working":
    "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  Transit:
    "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  "Shopping Complex":
    "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  "Shopping Mall":
    "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  Hospital:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  "Commercial Hub":
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  "Commercial Complex":
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  Government:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Logistics:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  "Logistics Corridor":
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  "Food Court":
    "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  "IT Park":
    "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  "Industrial Zone":
    "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400",
  Industrial:
    "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400",
  Landmark:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Premium Office Corridor":
    "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  "Financial Services":
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Transport Hub":
    "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  "Education Cluster":
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

function getInfraColor(type: string): string {
  return (
    infraTypeColors[type] ||
    "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
  );
}

export default function CommercialTradeoff({
  profile,
}: CommercialTradeoffProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-white p-6 shadow-lg dark:border-slate-700/60 dark:from-slate-900 dark:via-slate-800/80 dark:to-slate-900"
    >
      {/* Premium top accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500" />

      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="mb-6 flex items-center gap-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
          <BarChart3 className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Business Location Trade-offs
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Honest strengths and watch-outs for {profile.areaName}
          </p>
        </div>
      </motion.div>

      {/* Two-column: Strengths vs Weaknesses */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Strengths */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-emerald-200/60 bg-emerald-50/50 p-4 dark:border-emerald-800/40 dark:bg-emerald-950/20"
        >
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            Strengths
          </h4>
          <ul className="space-y-2.5">
            {profile.businessTradeoffs.map((t, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                <span>{t.strength}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Weaknesses */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-amber-200/60 bg-amber-50/50 p-4 dark:border-amber-800/40 dark:bg-amber-950/20"
        >
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
            <AlertTriangle className="h-4 w-4" />
            Weaknesses
          </h4>
          <ul className="space-y-2.5">
            {profile.businessTradeoffs.map((t, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                <span>{t.weakness}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Best Business Types */}
      <motion.div variants={itemVariants} className="mb-5">
        <h4 className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <Sparkles className="h-4 w-4 text-emerald-500" />
          Best Business Types
        </h4>
        <div className="flex flex-wrap gap-2">
          {profile.bestForBusiness.map((tag, i) => (
            <motion.span
              key={i}
              variants={itemVariants}
              className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-800/50 dark:bg-emerald-950/30 dark:text-emerald-400"
            >
              <CheckCircle2 className="mr-1.5 h-3 w-3" />
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Not Ideal For */}
      {profile.notIdealForBusiness.length > 0 && (
        <motion.div variants={itemVariants} className="mb-6">
          <h4 className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <ShieldAlert className="h-4 w-4 text-amber-500" />
            Not Ideal For
          </h4>
          <div className="flex flex-wrap gap-2">
            {profile.notIdealForBusiness.map((tag, i) => (
              <motion.span
                key={i}
                variants={itemVariants}
                className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 dark:border-amber-800/50 dark:bg-amber-950/30 dark:text-amber-400"
              >
                <AlertTriangle className="mr-1.5 h-3 w-3" />
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Nearby Business Infrastructure */}
      <motion.div variants={itemVariants}>
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <MapPin className="h-4 w-4 text-violet-500" />
          Nearby Business Infrastructure
        </h4>
        <div className="space-y-2">
          {profile.nearbyBusinessInfra.map((infra, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/50 px-3 py-2 dark:border-slate-800 dark:bg-slate-800/30"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-slate-400 dark:text-slate-500" />
                <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-300">
                  {infra.name}
                </span>
                <span
                  className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${getInfraColor(infra.type)}`}
                >
                  {infra.type}
                </span>
              </div>
              <span className="ml-2 flex-shrink-0 text-xs font-medium text-slate-500 dark:text-slate-400">
                {infra.distance}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
