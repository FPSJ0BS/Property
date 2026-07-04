"use client";

import { motion } from "framer-motion";
import { Star, ShieldCheck } from "lucide-react";

interface ResponsivenessIndicatorProps {
  responseTime: string;
  rating: number;
  verified: boolean;
}

function getResponsivenessLevel(responseTime: string) {
  const lower = responseTime.toLowerCase();
  if (lower.includes("instant") || lower.includes("under 1 hour") || lower.includes("within 1")) {
    return {
      label: "Very Responsive",
      dotColor: "bg-emerald-500",
      pulseColor: "bg-emerald-400",
      textColor: "text-emerald-600 dark:text-emerald-400",
    };
  }
  if (lower.includes("under 2") || lower.includes("under 3") || lower.includes("within 2") || lower.includes("within 3")) {
    return {
      label: "Responsive",
      dotColor: "bg-lime-500",
      pulseColor: "bg-lime-400",
      textColor: "text-lime-600 dark:text-lime-400",
    };
  }
  if (lower.includes("under 4") || lower.includes("same day") || lower.includes("within 4")) {
    return {
      label: "Moderate",
      dotColor: "bg-amber-500",
      pulseColor: "bg-amber-400",
      textColor: "text-amber-600 dark:text-amber-400",
    };
  }
  // Default
  return {
    label: "Responsive",
    dotColor: "bg-lime-500",
    pulseColor: "bg-lime-400",
    textColor: "text-lime-600 dark:text-lime-400",
  };
}

export default function ResponsivenessIndicator({
  responseTime,
  rating,
  verified,
}: ResponsivenessIndicatorProps) {
  const level = getResponsivenessLevel(responseTime);
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-col gap-2 py-3 px-0"
    >
      {/* Response time row */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <motion.span
            animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute inset-0 rounded-full ${level.pulseColor} opacity-70`}
          />
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${level.dotColor}`} />
        </span>
        <span className={`text-xs font-semibold ${level.textColor}`}>
          {level.label}
        </span>
        <span className="text-[11px] text-slate-400 dark:text-slate-500">
          Typically responds {responseTime.toLowerCase()}
        </span>
      </div>

      {/* Rating + Verified row */}
      <div className="flex items-center gap-3">
        {/* Stars */}
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < fullStars
                  ? "text-amber-400 fill-amber-400"
                  : i === fullStars && hasHalf
                    ? "text-amber-400 fill-amber-400/50"
                    : "text-slate-200 dark:text-slate-700"
              }`}
            />
          ))}
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 ml-1">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* Verified badge */}
        {verified && (
          <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-3 h-3" />
            Identity Verified
          </span>
        )}
      </div>
    </motion.div>
  );
}
