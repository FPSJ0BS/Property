"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";

interface TrustProgressProps {
  completedSteps: number;
  totalSteps: number;
  items: { label: string; done: boolean }[];
}

const RADIUS = 34;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function TrustProgress({
  completedSteps,
  totalSteps,
  items,
}: TrustProgressProps) {
  const pct = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
  const offset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/50">
      <div className="flex items-start gap-5">
        {/* SVG ring */}
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
          <svg
            width={80}
            height={80}
            viewBox="0 0 80 80"
            className="-rotate-90"
          >
            {/* Track */}
            <circle
              cx={40}
              cy={40}
              r={RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth={6}
              className="text-slate-100 dark:text-slate-700"
            />
            {/* Progress */}
            <motion.circle
              cx={40}
              cy={40}
              r={RADIUS}
              fill="none"
              stroke="url(#trust-gradient)"
              strokeWidth={6}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              initial={{ strokeDashoffset: CIRCUMFERENCE }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="trust-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              {pct}%
            </span>
          </div>
        </div>

        {/* Label */}
        <div className="space-y-1 pt-1">
          <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white">
            Profile Strength
          </h4>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {completedSteps} of {totalSteps} steps completed
          </p>
        </div>
      </div>

      {/* Checklist */}
      <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5 dark:border-slate-700">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2.5">
            {item.done ? (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
                <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              </div>
            ) : (
              <Circle className="h-5 w-5 text-slate-300 dark:text-slate-600" />
            )}
            <span
              className={`text-sm ${
                item.done
                  ? "font-medium text-slate-700 dark:text-slate-200"
                  : "text-slate-400 dark:text-slate-500"
              }`}
            >
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
