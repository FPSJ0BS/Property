"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface RoleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  selected: boolean;
  onSelect: () => void;
  index: number;
}

export default function RoleCard({
  icon: Icon,
  title,
  description,
  benefits,
  selected,
  onSelect,
  index,
}: RoleCardProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.35 }}
      onClick={onSelect}
      className={`group relative flex w-full flex-col gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
        selected
          ? "border-indigo-500 bg-indigo-50/60 shadow-lg shadow-indigo-500/10 dark:border-indigo-400 dark:bg-indigo-950/30"
          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/60 dark:hover:border-slate-600"
      }`}
    >
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600"
        >
          <Check className="h-3.5 w-3.5 text-white" />
        </motion.div>
      )}

      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
          selected
            ? "bg-indigo-600 text-white"
            : "bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-600 dark:bg-slate-700 dark:text-slate-300 dark:group-hover:bg-indigo-900/40 dark:group-hover:text-indigo-400"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <ul className="space-y-1">
        {benefits.map((b) => (
          <li
            key={b}
            className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400"
          >
            <span
              className={`h-1 w-1 rounded-full ${
                selected ? "bg-indigo-500" : "bg-slate-300 dark:bg-slate-600"
              }`}
            />
            {b}
          </li>
        ))}
      </ul>
    </motion.button>
  );
}
