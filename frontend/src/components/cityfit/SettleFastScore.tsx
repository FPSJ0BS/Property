"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { Area } from "@/data/areas";

interface SettleFastScoreProps {
  area: Area;
}

function calculateSettleFast(area: Area): {
  total: number;
  factors: { label: string; value: number; maxLabel: string }[];
} {
  const walkComponent = area.walkScore * 0.25;
  const safetyComponent = area.safetyScore * 0.15;
  const transitComponent = area.transitScore * 0.2;

  const nearbyCount = area.nearbyPlaces.length;
  const nearbyNorm = Math.min(nearbyCount / 12, 1) * 100;
  const nearbyComponent = nearbyNorm * 0.2;

  const demandMap: Record<string, number> = {
    "Very High": 95,
    High: 80,
    Moderate: 60,
    Emerging: 40,
  };
  const demandScore = demandMap[area.demand] ?? 50;
  const demandComponent = demandScore * 0.1;

  const quietBonus = area.noiseLevel === "Quiet" ? 10 : 0;

  const total = Math.round(
    walkComponent +
      safetyComponent +
      transitComponent +
      nearbyComponent +
      demandComponent +
      quietBonus
  );

  return {
    total: Math.min(total, 100),
    factors: [
      { label: "Daily Errands", value: area.walkScore, maxLabel: "Walk Score" },
      {
        label: "Safety Comfort",
        value: area.safetyScore,
        maxLabel: "Safety Score",
      },
      {
        label: "Transit Access",
        value: area.transitScore,
        maxLabel: "Transit Score",
      },
      {
        label: "Essential Services",
        value: Math.round(nearbyNorm),
        maxLabel: `${nearbyCount} places`,
      },
      {
        label: "Area Maturity",
        value: demandScore,
        maxLabel: area.demand,
      },
    ],
  };
}

function getInterpretation(score: number): string {
  if (score >= 90) return "You'll feel at home within a week";
  if (score >= 75) return "Most essentials accessible within 2 weeks";
  if (score >= 60) return "Allow 3-4 weeks to fully settle";
  return "Budget extra time for setup — services are developing";
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-emerald-500";
  if (score >= 60) return "text-amber-500";
  return "text-red-500";
}

function getBarColor(value: number): string {
  if (value >= 80) return "bg-emerald-500";
  if (value >= 60) return "bg-amber-500";
  return "bg-red-400";
}

const RING_RADIUS = 42;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function SettleFastScore({ area }: SettleFastScoreProps) {
  const { total, factors } = calculateSettleFast(area);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let frame: number;
    const duration = 1200;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * total));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [total]);

  const strokeOffset =
    RING_CIRCUMFERENCE - (animatedScore / 100) * RING_CIRCUMFERENCE;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-white p-6 shadow-lg dark:border-slate-700/60 dark:from-slate-900 dark:via-slate-800/80 dark:to-slate-900"
    >
      {/* Subtle glow */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-400/5" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-400/5" />

      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-md">
          <Zap className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Settle-Fast Score
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            How quickly you become fully functional
          </p>
        </div>
      </div>

      {/* Ring + Factors */}
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        {/* SVG Ring */}
        <div className="relative flex-shrink-0">
          <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-lg">
            <defs>
              <linearGradient id="settleFastGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r={RING_RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className="text-slate-200 dark:text-slate-700"
            />
            {/* Score ring */}
            <circle
              cx="50"
              cy="50"
              r={RING_RADIUS}
              fill="none"
              stroke="url(#settleFastGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={strokeOffset}
              transform="rotate(-90 50 50)"
              className="transition-all duration-100"
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={`text-3xl font-extrabold ${getScoreColor(animatedScore)}`}
            >
              {animatedScore}
            </span>
            <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
              / 100
            </span>
          </div>
        </div>

        {/* Factors */}
        <div className="w-full flex-1 space-y-3">
          {factors.map((factor, i) => (
            <motion.div
              key={factor.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.35 }}
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  {factor.label}
                </span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {factor.value}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${factor.value}%` }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                  className={`h-full rounded-full ${getBarColor(factor.value)}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interpretation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        className="mt-6 rounded-xl border border-slate-200/60 bg-slate-50/80 px-4 py-3 dark:border-slate-700/40 dark:bg-slate-800/50"
      >
        <div className="flex items-center gap-2">
          <Zap className={`h-4 w-4 ${getScoreColor(total)}`} />
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {getInterpretation(total)}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export { calculateSettleFast };
