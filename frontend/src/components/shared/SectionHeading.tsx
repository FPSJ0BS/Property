"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  gradient?: boolean;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
  gradient = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className={centered ? "text-center" : ""}
    >
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.12em] uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/50 rounded-full border border-indigo-100/80 dark:border-indigo-800/50 mb-5">
          {badge}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.15] font-display ${
          gradient ? "gradient-text" : "text-slate-900 dark:text-white"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-[17px] text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
