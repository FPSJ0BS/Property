"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Store,
  Warehouse,
  GraduationCap,
  Heart,
  Factory,
  Sparkles,
} from "lucide-react";
import type { Property } from "@/data/properties";
import type { BusinessFit } from "@/data/commercial";

interface BusinessFitCardProps {
  property: Property;
}

const businessTypeIcons: Record<string, React.ElementType> = {
  office: Building2,
  retail: Store,
  warehouse: Warehouse,
  coaching: GraduationCap,
  clinic: Heart,
  industrial: Factory,
};

const businessTypeScores: Record<
  string,
  { labels: string[]; bestFor: string[] }
> = {
  office: {
    labels: [
      "Employee Access",
      "Customer Access",
      "Parking",
      "Visibility",
      "Transit Access",
    ],
    bestFor: [
      "IT Company",
      "Consulting Firm",
      "Startup",
      "BPO",
      "Legal Office",
    ],
  },
  retail: {
    labels: [
      "Customer Access",
      "Visibility",
      "Footfall",
      "Parking",
      "Walk-in Potential",
    ],
    bestFor: [
      "Showroom",
      "Fashion Store",
      "Electronics",
      "Restaurant",
      "Pharmacy",
    ],
  },
  warehouse: {
    labels: [
      "Logistics Readiness",
      "Loading Bay",
      "Parking",
      "Road Access",
      "Storage Capacity",
    ],
    bestFor: [
      "Distribution Center",
      "Cold Storage",
      "E-commerce Fulfillment",
      "Manufacturing",
    ],
  },
  coaching: {
    labels: [
      "Student Access",
      "Transit",
      "Parking",
      "Classroom Suitability",
      "Area Density",
    ],
    bestFor: [
      "IIT/NEET Coaching",
      "Language Institute",
      "Skill Training",
      "Test Prep Center",
    ],
  },
  clinic: {
    labels: [
      "Patient Access",
      "Parking",
      "Accessibility",
      "Medical Ecosystem",
      "Trust Zone",
    ],
    bestFor: [
      "Dental Clinic",
      "Diagnostic Lab",
      "Physiotherapy",
      "Eye Care",
      "General Practice",
    ],
  },
};

function deriveBusinessType(property: Property): string {
  const sub = (property.subType || "").toLowerCase();
  const type = (property.type || "").toLowerCase();

  if (sub.includes("warehouse") || sub.includes("storage"))
    return "warehouse";
  if (sub.includes("retail") || sub.includes("shop") || sub.includes("showroom"))
    return "retail";
  if (sub.includes("clinic") || sub.includes("medical") || sub.includes("hospital"))
    return "clinic";
  if (sub.includes("coaching") || sub.includes("institute") || sub.includes("training"))
    return "coaching";
  if (type === "industrial") return "warehouse";
  return "office";
}

function generateScores(businessType: string, property: Property): number[] {
  // Deterministic pseudo-random from property id
  const seed = property.id
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  const config = businessTypeScores[businessType] || businessTypeScores.office;
  return config.labels.map((_, i) => {
    const base = 55 + ((seed * (i + 3) * 17) % 40);
    return Math.min(98, Math.max(35, base));
  });
}

function calculateOverallScore(scores: number[]): number {
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
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

function getBarBg(value: number): string {
  if (value >= 80) return "bg-emerald-500/20";
  if (value >= 60) return "bg-amber-500/20";
  return "bg-red-400/20";
}

const RING_RADIUS = 42;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function BusinessFitCard({ property }: BusinessFitCardProps) {
  const businessType = deriveBusinessType(property);
  const config = businessTypeScores[businessType] || businessTypeScores.office;
  const scores = generateScores(businessType, property);
  const overallScore = calculateOverallScore(scores);
  const [animatedScore, setAnimatedScore] = useState(0);

  const Icon = businessTypeIcons[businessType] || Building2;

  useEffect(() => {
    let frame: number;
    const duration = 1200;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * overallScore));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [overallScore]);

  const strokeOffset =
    RING_CIRCUMFERENCE - (animatedScore / 100) * RING_CIRCUMFERENCE;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-white p-6 shadow-lg transition-shadow hover:shadow-xl dark:border-slate-700/60 dark:from-slate-900 dark:via-slate-800/80 dark:to-slate-900"
    >
      {/* Premium gradient border on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-violet-500 via-emerald-500 to-violet-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] [-webkit-mask-composite:xor] [mask-composite:exclude]" />

      {/* Subtle glow */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-400/5" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-400/5" />

      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-md">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Business Fit Analysis
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            How well this space fits your business
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold capitalize text-violet-700 dark:border-violet-800/50 dark:bg-violet-950/30 dark:text-violet-400">
          <Icon className="h-3 w-3" />
          {businessType}
        </span>
      </div>

      {/* Ring + Score Bars */}
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        {/* SVG Ring */}
        <div className="relative flex-shrink-0">
          <svg
            width="120"
            height="120"
            viewBox="0 0 100 100"
            className="drop-shadow-lg"
          >
            <defs>
              <linearGradient
                id="businessFitGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r={RING_RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className="text-slate-200 dark:text-slate-700"
            />
            <circle
              cx="50"
              cy="50"
              r={RING_RADIUS}
              fill="none"
              stroke="url(#businessFitGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={strokeOffset}
              transform="rotate(-90 50 50)"
              className="transition-all duration-100"
            />
          </svg>
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

        {/* Score Bars */}
        <div className="w-full flex-1 space-y-3">
          {config.labels.map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.35 }}
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  {label}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    scores[i] >= 80
                      ? "text-emerald-600 dark:text-emerald-400"
                      : scores[i] >= 60
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {scores[i]}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${scores[i]}%` }}
                  transition={{
                    delay: 0.4 + i * 0.08,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  className={`h-full rounded-full ${getBarColor(scores[i])}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Best For Tags */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        className="mt-6"
      >
        <h4 className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <Sparkles className="h-4 w-4 text-violet-500" />
          Best for
        </h4>
        <div className="flex flex-wrap gap-2">
          {config.bestFor.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.05, duration: 0.25 }}
              className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-800/50 dark:bg-emerald-950/30 dark:text-emerald-400"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
