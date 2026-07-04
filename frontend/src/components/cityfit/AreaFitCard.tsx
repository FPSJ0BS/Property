"use client";

import { motion } from "framer-motion";
import { MapPin, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Area } from "@/data/areas";

interface AreaFitCardProps {
  area: Area;
}

function ScoreCircle({
  label,
  score,
  color,
}: {
  label: string;
  score: number;
  color: string;
}) {
  const circumference = 2 * Math.PI * 18;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative h-12 w-12">
        <svg className="h-12 w-12 -rotate-90" viewBox="0 0 40 40">
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-gray-200 dark:text-gray-700"
          />
          <motion.circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900 dark:text-white">
          {score}
        </span>
      </div>
      <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
        {label}
      </span>
    </div>
  );
}

function DemandBadge({ demand }: { demand: Area["demand"] }) {
  const styles: Record<Area["demand"], string> = {
    "Very High":
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    High: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    Moderate:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    Emerging:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[demand]}`}
    >
      <TrendingUp className="h-3 w-3" />
      {demand} Demand
    </span>
  );
}

export default function AreaFitCard({ area }: AreaFitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden sm:h-56">
        <img
          src={area.image}
          alt={area.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <div>
            <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
              {area.name}
            </h3>
            <p className="flex items-center gap-1 text-sm text-white/80">
              <MapPin className="h-3.5 w-3.5" />
              {area.city}
            </p>
          </div>
          <DemandBadge demand={area.demand} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {area.tagline}
        </p>

        {/* Rent Range */}
        <div className="mb-4 flex items-baseline gap-1">
          <span className="font-display text-lg font-bold text-gray-900 dark:text-white">
            {"\u20B9"}{area.rentRange.min.toLocaleString("en-IN")} — {"\u20B9"}
            {area.rentRange.max.toLocaleString("en-IN")}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            /month
          </span>
        </div>

        {/* Score Circles */}
        <div className="mb-4 flex justify-around">
          <ScoreCircle
            label="Family"
            score={area.familyScore}
            color="#10b981"
          />
          <ScoreCircle
            label="Student"
            score={area.studentScore}
            color="#6366f1"
          />
          <ScoreCircle
            label="Professional"
            score={area.professionalScore}
            color="#f59e0b"
          />
        </div>

        {/* Best For Tags */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {area.bestFor.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={`/area/${area.slug}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
        >
          Explore Area
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
