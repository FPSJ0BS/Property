"use client";

import { motion } from "framer-motion";
import {
  GitCompare,
  Clock,
  GraduationCap,
  HeartPulse,
  ShoppingCart,
  TreePine,
  IndianRupee,
  Shield,
  Zap,
  Trophy,
} from "lucide-react";
import { Area, NearbyPlace } from "@/data/areas";

interface MoveSimulatorProps {
  areaA: Area;
  areaB: Area;
}

function countByType(places: NearbyPlace[], type: string): number {
  return places.filter((p) => p.type === type).length;
}

function nearestByType(places: NearbyPlace[], type: string): string {
  const filtered = places.filter((p) => p.type === type);
  if (filtered.length === 0) return "N/A";
  const sorted = filtered.sort(
    (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
  );
  return sorted[0].distance;
}

function calculateSettleFastInline(area: Area): number {
  const walkComponent = area.walkScore * 0.25;
  const safetyComponent = area.safetyScore * 0.15;
  const transitComponent = area.transitScore * 0.2;
  const nearbyNorm = Math.min(area.nearbyPlaces.length / 12, 1) * 100;
  const nearbyComponent = nearbyNorm * 0.2;
  const demandMap: Record<string, number> = {
    "Very High": 95,
    High: 80,
    Moderate: 60,
    Emerging: 40,
  };
  const demandComponent = (demandMap[area.demand] ?? 50) * 0.1;
  const quietBonus = area.noiseLevel === "Quiet" ? 10 : 0;
  return Math.min(
    Math.round(
      walkComponent +
        safetyComponent +
        transitComponent +
        nearbyComponent +
        demandComponent +
        quietBonus
    ),
    100
  );
}

interface ComparisonRow {
  label: string;
  icon: React.ReactNode;
  valueA: string | number;
  valueB: string | number;
  numericA: number;
  numericB: number;
  unit?: string;
  lowerIsBetter?: boolean;
}

export default function MoveSimulator({ areaA, areaB }: MoveSimulatorProps) {
  const rows: ComparisonRow[] = [
    {
      label: "Morning Commute",
      icon: <Clock className="h-4 w-4" />,
      valueA: areaA.commuteToCenter,
      valueB: areaB.commuteToCenter,
      numericA: parseInt(areaA.commuteToCenter) || 0,
      numericB: parseInt(areaB.commuteToCenter) || 0,
      lowerIsBetter: true,
    },
    {
      label: "School Run",
      icon: <GraduationCap className="h-4 w-4" />,
      valueA: `${countByType(areaA.nearbyPlaces, "school")} schools (${nearestByType(areaA.nearbyPlaces, "school")})`,
      valueB: `${countByType(areaB.nearbyPlaces, "school")} schools (${nearestByType(areaB.nearbyPlaces, "school")})`,
      numericA: countByType(areaA.nearbyPlaces, "school"),
      numericB: countByType(areaB.nearbyPlaces, "school"),
    },
    {
      label: "Healthcare Access",
      icon: <HeartPulse className="h-4 w-4" />,
      valueA: `${countByType(areaA.nearbyPlaces, "hospital")} hospitals (${nearestByType(areaA.nearbyPlaces, "hospital")})`,
      valueB: `${countByType(areaB.nearbyPlaces, "hospital")} hospitals (${nearestByType(areaB.nearbyPlaces, "hospital")})`,
      numericA: countByType(areaA.nearbyPlaces, "hospital"),
      numericB: countByType(areaB.nearbyPlaces, "hospital"),
    },
    {
      label: "Daily Shopping",
      icon: <ShoppingCart className="h-4 w-4" />,
      valueA: `${countByType(areaA.nearbyPlaces, "shopping")} options (${nearestByType(areaA.nearbyPlaces, "shopping")})`,
      valueB: `${countByType(areaB.nearbyPlaces, "shopping")} options (${nearestByType(areaB.nearbyPlaces, "shopping")})`,
      numericA: countByType(areaA.nearbyPlaces, "shopping"),
      numericB: countByType(areaB.nearbyPlaces, "shopping"),
    },
    {
      label: "Weekend Outdoors",
      icon: <TreePine className="h-4 w-4" />,
      valueA: `${countByType(areaA.nearbyPlaces, "park")} parks`,
      valueB: `${countByType(areaB.nearbyPlaces, "park")} parks`,
      numericA: countByType(areaA.nearbyPlaces, "park"),
      numericB: countByType(areaB.nearbyPlaces, "park"),
    },
    {
      label: "Monthly Rent",
      icon: <IndianRupee className="h-4 w-4" />,
      valueA: `₹${areaA.rentRange.min.toLocaleString()} - ₹${areaA.rentRange.max.toLocaleString()}`,
      valueB: `₹${areaB.rentRange.min.toLocaleString()} - ₹${areaB.rentRange.max.toLocaleString()}`,
      numericA: areaA.rentRange.min,
      numericB: areaB.rentRange.min,
      lowerIsBetter: true,
    },
    {
      label: "Safety Confidence",
      icon: <Shield className="h-4 w-4" />,
      valueA: `${areaA.safetyScore}/100`,
      valueB: `${areaB.safetyScore}/100`,
      numericA: areaA.safetyScore,
      numericB: areaB.safetyScore,
    },
    {
      label: "Settle-Fast Score",
      icon: <Zap className="h-4 w-4" />,
      valueA: `${calculateSettleFastInline(areaA)}/100`,
      valueB: `${calculateSettleFastInline(areaB)}/100`,
      numericA: calculateSettleFastInline(areaA),
      numericB: calculateSettleFastInline(areaB),
    },
  ];

  // Calculate overall winner
  let aWins = 0;
  let bWins = 0;
  rows.forEach((row) => {
    if (row.lowerIsBetter) {
      if (row.numericA < row.numericB) aWins++;
      else if (row.numericB < row.numericA) bWins++;
    } else {
      if (row.numericA > row.numericB) aWins++;
      else if (row.numericB > row.numericA) bWins++;
    }
  });

  const overallWinner = aWins >= bWins ? areaA.name : areaB.name;

  function getWinner(
    numA: number,
    numB: number,
    lowerIsBetter?: boolean
  ): "A" | "B" | "tie" {
    if (numA === numB) return "tie";
    if (lowerIsBetter) return numA < numB ? "A" : "B";
    return numA > numB ? "A" : "B";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-white p-6 shadow-lg dark:border-slate-700/60 dark:from-slate-900 dark:via-slate-800/80 dark:to-slate-900"
    >
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />

      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md">
          <GitCompare className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Life Comparison
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Side-by-side daily experience analysis
          </p>
        </div>
      </div>

      {/* Column Headers */}
      <div className="mb-4 grid grid-cols-[1fr_1fr_1fr] gap-2 sm:grid-cols-[1.2fr_1fr_1fr]">
        <div />
        <div className="text-center">
          <span className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
            {areaA.name}
          </span>
        </div>
        <div className="text-center">
          <span className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
            {areaB.name}
          </span>
        </div>
      </div>

      {/* Comparison Rows */}
      <div className="space-y-2">
        {rows.map((row, i) => {
          const winner = getWinner(row.numericA, row.numericB, row.lowerIsBetter);

          return (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
              className="grid grid-cols-[1fr_1fr_1fr] items-center gap-2 rounded-xl border border-slate-100 bg-white/60 px-3 py-2.5 dark:border-slate-700/30 dark:bg-slate-800/40 sm:grid-cols-[1.2fr_1fr_1fr]"
            >
              {/* Label */}
              <div className="flex items-center gap-2">
                <span className="text-slate-500 dark:text-slate-400">
                  {row.icon}
                </span>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 sm:text-sm">
                  {row.label}
                </span>
              </div>

              {/* Value A */}
              <div
                className={`text-center text-xs sm:text-sm ${
                  winner === "A"
                    ? "font-bold text-emerald-600 dark:text-emerald-400"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                <span className="inline-flex items-center gap-1">
                  {winner === "A" && (
                    <Trophy className="h-3 w-3 text-emerald-500" />
                  )}
                  <span className="line-clamp-2">{row.valueA}</span>
                </span>
              </div>

              {/* Value B */}
              <div
                className={`text-center text-xs sm:text-sm ${
                  winner === "B"
                    ? "font-bold text-emerald-600 dark:text-emerald-400"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                <span className="inline-flex items-center gap-1">
                  {winner === "B" && (
                    <Trophy className="h-3 w-3 text-emerald-500" />
                  )}
                  <span className="line-clamp-2">{row.valueB}</span>
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Conclusion */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="mt-5 rounded-xl border border-emerald-200/60 bg-emerald-50/60 px-4 py-3 dark:border-emerald-800/30 dark:bg-emerald-950/20"
      >
        <p className="text-center text-sm font-medium text-slate-700 dark:text-slate-300">
          Based on your profile,{" "}
          <span className="font-bold text-emerald-600 dark:text-emerald-400">
            {overallWinner}
          </span>{" "}
          gives you a smoother daily experience
        </p>
      </motion.div>
    </motion.div>
  );
}
