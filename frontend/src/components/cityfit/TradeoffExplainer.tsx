"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";
import { Area } from "@/data/areas";

interface TradeoffExplainerProps {
  area: Area;
}

export default function TradeoffExplainer({ area }: TradeoffExplainerProps) {
  const notIdealStatements: { text: string; severity: "amber" | "red" }[] = [];

  if (area.familyScore < 65) {
    notIdealStatements.push({
      text: "Not ideal if you have school-age children",
      severity: "red",
    });
  }
  if (area.professionalScore < 70) {
    notIdealStatements.push({
      text: "May not suit daily office commuters",
      severity: "amber",
    });
  }
  if (area.walkScore < 70) {
    notIdealStatements.push({
      text: "You'll need personal transport for most errands",
      severity: "amber",
    });
  }
  if (area.safetyScore < 80) {
    notIdealStatements.push({
      text: "Extra caution recommended in late evenings",
      severity: "red",
    });
  }
  if (area.noiseLevel === "Active") {
    notIdealStatements.push({
      text: "Not ideal if you need complete quietness",
      severity: "amber",
    });
  }

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
      <motion.div variants={itemVariants} className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
          <BarChart3 className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Trade-off Analysis
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Honest strengths and watch-outs for {area.name}
          </p>
        </div>
      </motion.div>

      {/* Two-column: Strengths vs Watch Out */}
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
            {area.pros.map((pro, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                <span>{pro}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Watch Out */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-amber-200/60 bg-amber-50/50 p-4 dark:border-amber-800/40 dark:bg-amber-950/20"
        >
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
            <AlertTriangle className="h-4 w-4" />
            Watch Out
          </h4>
          <ul className="space-y-2.5">
            {area.cons.map((con, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                <span>{con}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Best For */}
      <motion.div variants={itemVariants} className="mb-5">
        <h4 className="mb-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
          Best For
        </h4>
        <div className="flex flex-wrap gap-2">
          {area.bestFor.map((tag, i) => (
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

      {/* Not Ideal If */}
      {notIdealStatements.length > 0 && (
        <motion.div variants={itemVariants}>
          <h4 className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <ShieldAlert className="h-4 w-4 text-amber-500" />
            Not Ideal If
          </h4>
          <div className="flex flex-wrap gap-2">
            {notIdealStatements.map((statement, i) => (
              <motion.span
                key={i}
                variants={itemVariants}
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                  statement.severity === "red"
                    ? "border border-red-200 bg-red-50 text-red-700 dark:border-red-800/50 dark:bg-red-950/30 dark:text-red-400"
                    : "border border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800/50 dark:bg-amber-950/30 dark:text-amber-400"
                }`}
              >
                <AlertTriangle className="mr-1.5 h-3 w-3" />
                {statement.text}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
