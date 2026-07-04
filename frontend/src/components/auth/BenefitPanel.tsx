"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, type LucideIcon } from "lucide-react";

interface BenefitPanelProps {
  title: string;
  description: string;
  benefits: string[];
  icon?: LucideIcon;
}

export default function BenefitPanel({
  title,
  description,
  benefits,
  icon: Icon = Sparkles,
}: BenefitPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 p-6 dark:from-indigo-950/30 dark:to-violet-950/30"
    >
      <div className="space-y-4">
        {/* Icon */}
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600">
          <Icon className="h-5 w-5 text-white" />
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {description}
        </p>

        {/* Benefits */}
        <ul className="space-y-2.5 pt-1">
          {benefits.map((b, i) => (
            <motion.li
              key={b}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.3 }}
              className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300"
            >
              <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
                <Check className="h-2.5 w-2.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              {b}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
