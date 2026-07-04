"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, Users, Shield, Footprints, Train } from "lucide-react";
import { areas, type Area } from "@/data/areas";
import Link from "next/link";

function getDemandGradient(demand: Area["demand"]) {
  switch (demand) {
    case "Very High":
      return "from-indigo-600 to-violet-700";
    case "High":
      return "from-violet-600 to-purple-700";
    case "Moderate":
      return "from-violet-500 to-fuchsia-600";
    case "Emerging":
      return "from-cyan-500 to-teal-600";
    default:
      return "from-zinc-600 to-zinc-700";
  }
}

function getDemandBadgeColor(demand: Area["demand"]) {
  switch (demand) {
    case "Very High":
      return "bg-indigo-500/80 text-white";
    case "High":
      return "bg-violet-500/80 text-white";
    case "Moderate":
      return "bg-fuchsia-500/80 text-white";
    case "Emerging":
      return "bg-cyan-500/80 text-white";
    default:
      return "bg-zinc-500/80 text-white";
  }
}

function getTopScores(area: Area) {
  const scores = [
    { label: "Walk", value: area.walkScore, icon: Footprints },
    { label: "Safety", value: area.safetyScore, icon: Shield },
    { label: "Transit", value: area.transitScore, icon: Train },
    { label: "Family", value: area.familyScore, icon: Users },
  ];
  return scores.sort((a, b) => b.value - a.value).slice(0, 3);
}

function AreaCard({ area, featured = false }: { area: Area; featured?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const topScores = getTopScores(area);

  return (
    <Link href={`/area/${area.slug}`} className="block">
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`relative rounded-2xl overflow-hidden cursor-pointer group
          ${featured ? "h-72 sm:h-80 lg:col-span-2" : "h-60 sm:h-64"}`}
      >
        {/* Background image */}
        <img
          src={area.image}
          alt={area.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t ${getDemandGradient(area.demand)} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Demand badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`text-[10px] font-semibold px-2 py-1 rounded-full backdrop-blur-sm ${getDemandBadgeColor(area.demand)}`}
          >
            {area.demand === "Very High" ? "Hot" : area.demand}
          </span>
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="flex items-center gap-1 mb-1">
            <MapPin className="w-3 h-3 text-white/70" />
            <span className="text-[11px] text-white/70">{area.city}</span>
          </div>

          <h3
            className={`font-bold text-white mb-2 ${featured ? "text-xl sm:text-2xl" : "text-lg"}`}
          >
            {area.name}
          </h3>

          {/* Score badges */}
          <div className="flex gap-1.5 mb-2">
            {topScores.map((score) => (
              <div
                key={score.label}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-sm"
              >
                <score.icon className="w-3 h-3 text-white/80" />
                <span className="text-[10px] text-white font-medium">
                  {score.value}
                </span>
              </div>
            ))}
          </div>

          {/* Rent range */}
          <p className="text-sm text-white/90 font-medium mb-1.5">
            {"\u20b9"}{area.rentRange.min.toLocaleString("en-IN")} - {"\u20b9"}{area.rentRange.max.toLocaleString("en-IN")}
            <span className="text-white/60 text-xs">/mo</span>
          </p>

          {/* Best for tags */}
          <div className="flex gap-1.5 flex-wrap">
            {area.bestFor.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/80 backdrop-blur-sm border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hover overlay: full score breakdown */}
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 pointer-events-none"
        >
          <div className="text-center space-y-3 w-full max-w-xs">
            <h4 className="text-lg font-bold text-white">{area.name}</h4>
            <p className="text-xs text-zinc-300">{area.tagline}</p>

            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Walk Score", value: area.walkScore },
                { label: "Safety", value: area.safetyScore },
                { label: "Transit", value: area.transitScore },
                { label: "Family", value: area.familyScore },
                { label: "Student", value: area.studentScore },
                { label: "Professional", value: area.professionalScore },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/10"
                >
                  <span className="text-[11px] text-zinc-300">{s.label}</span>
                  <span className="text-sm font-bold text-white">{s.value}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-1 text-xs text-zinc-400">
              <TrendingUp className="w-3 h-3" />
              <span>{area.avgRentTrend}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
}

export default function NeighborhoodExplorer() {
  const featuredAreas = areas.slice(0, 2);
  const standardAreas = areas.slice(2);

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="w-5 h-5 text-violet-500" />
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
            Explore Neighborhoods
          </h2>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Discover Jaipur's best areas with real scores, verified data, and local intelligence
        </p>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Featured: span 2 cols each on lg */}
        {featuredAreas.map((area, i) => (
          <motion.div
            key={area.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="lg:col-span-2"
          >
            <AreaCard area={area} featured />
          </motion.div>
        ))}

        {/* Standard cards */}
        {standardAreas.map((area, i) => (
          <motion.div
            key={area.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.08 }}
          >
            <AreaCard area={area} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
