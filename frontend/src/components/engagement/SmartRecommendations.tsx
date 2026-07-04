"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, MapPin, Star } from "lucide-react";
import { properties } from "@/data/properties";
import { areas } from "@/data/areas";
import Link from "next/link";

interface SmartRecommendationsProps {
  variant?: "homepage" | "sidebar" | "inline";
}

const recommendations = [
  {
    property: properties[0],
    area: areas.find((a) => a.slug === "vaishali-nagar") ?? areas[0],
    matchPercent: 96,
    reasons: [
      "Within your budget",
      "3 top schools nearby",
      "92% safety score",
      "12 min metro commute",
    ],
  },
  {
    property: properties[1],
    area: areas.find((a) => a.slug === "malviya-nagar") ?? areas[1],
    matchPercent: 92,
    reasons: [
      "Below-market rent detected",
      "Central Park 5 min walk",
      "Low deposit saves \u20b922K",
      "Fully furnished move-in",
    ],
  },
  {
    property: properties.length > 2 ? properties[2] : properties[0],
    area: areas.find((a) => a.slug === "c-scheme") ?? areas[2],
    matchPercent: 89,
    reasons: [
      "Premium walkable locality",
      "96% safety score area",
      "5 min to city center",
      "High appreciation zone",
    ],
  },
];

function MatchBadge({ percent }: { percent: number }) {
  return (
    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20">
      <Star className="w-3 h-3 text-emerald-500 fill-emerald-500" />
      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
        {percent}% match
      </span>
    </div>
  );
}

function RecommendationCard({
  rec,
  compact = false,
}: {
  rec: (typeof recommendations)[0];
  compact?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`relative group rounded-2xl overflow-hidden
        bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800
        ${compact ? "p-3" : "p-4"} transition-shadow duration-300
        ${hovered ? "shadow-xl shadow-violet-500/10 dark:shadow-violet-500/5" : "shadow-sm"}`}
    >
      {/* Animated border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: hovered
            ? "inset 0 0 0 1.5px rgba(139, 92, 246, 0.4)"
            : "inset 0 0 0 0px rgba(139, 92, 246, 0)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Property image */}
      <div className={`relative rounded-xl overflow-hidden ${compact ? "h-28" : "h-36"} mb-3`}>
        <img
          src={rec.property.images[0]}
          alt={rec.property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-2 left-2">
          <MatchBadge percent={rec.matchPercent} />
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className={`font-semibold text-zinc-900 dark:text-white truncate ${compact ? "text-sm" : "text-base"}`}>
              {rec.property.title}
            </h4>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-zinc-400" />
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {rec.area.name}
              </span>
            </div>
          </div>
        </div>

        <p className={`font-bold text-violet-600 dark:text-violet-400 ${compact ? "text-sm" : "text-lg"}`}>
          {"\u20b9"}{rec.property.price.toLocaleString("en-IN")}
          <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400">/mo</span>
        </p>

        {/* Why explanation */}
        <div className="bg-violet-50 dark:bg-violet-500/10 rounded-lg p-2.5 border border-violet-100 dark:border-violet-500/20">
          <p className="text-[10px] uppercase font-semibold text-violet-600 dark:text-violet-400 tracking-wider mb-1.5">
            Why this matches you
          </p>
          <div className="flex flex-wrap gap-1">
            {rec.reasons.map((reason, i) => (
              <span
                key={i}
                className="inline-block text-[11px] text-zinc-700 dark:text-zinc-300 bg-white/60 dark:bg-white/5 px-1.5 py-0.5 rounded-md"
              >
                {reason}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/property/${rec.property.slug}`}
          className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg
            bg-zinc-900 dark:bg-white text-white dark:text-zinc-900
            text-xs font-semibold
            hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function SmartRecommendations({
  variant = "homepage",
}: SmartRecommendationsProps) {
  const isCompact = variant === "sidebar" || variant === "inline";

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-violet-500" />
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
            Recommended for You
          </h3>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Based on popular preferences in Jaipur
        </p>
      </div>

      {/* Cards grid based on variant */}
      {variant === "homepage" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommendations.map((rec, i) => (
            <motion.div
              key={rec.property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <RecommendationCard rec={rec} />
            </motion.div>
          ))}
        </div>
      )}

      {variant === "sidebar" && (
        <div className="flex flex-col gap-4">
          {recommendations.map((rec, i) => (
            <motion.div
              key={rec.property.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <RecommendationCard rec={rec} compact />
            </motion.div>
          ))}
        </div>
      )}

      {variant === "inline" && (
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {recommendations.map((rec, i) => (
            <motion.div
              key={rec.property.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex-shrink-0 w-[280px]"
            >
              <RecommendationCard rec={rec} compact />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
