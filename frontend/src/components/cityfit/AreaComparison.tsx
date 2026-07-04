"use client";

import { motion } from "framer-motion";
import {
  Footprints,
  Shield,
  Users,
  GraduationCap,
  Briefcase,
  Volume2,
  TrendingUp,
  Train,
  IndianRupee,
} from "lucide-react";
import type { Area } from "@/data/areas";

interface AreaComparisonProps {
  areas: Area[];
}

interface ComparisonRow {
  label: string;
  icon: React.ElementType;
  getValue: (area: Area) => string | number;
  getNumericValue?: (area: Area) => number;
  format?: "score" | "text" | "currency";
  higherIsBetter?: boolean;
}

const rows: ComparisonRow[] = [
  {
    label: "Rent Range",
    icon: IndianRupee,
    getValue: (a) =>
      `\u20B9${a.rentRange.min.toLocaleString("en-IN")} - \u20B9${a.rentRange.max.toLocaleString("en-IN")}`,
    getNumericValue: (a) => -a.rentRange.min,
    format: "text",
    higherIsBetter: true, // lower rent = better, negated in getNumericValue
  },
  {
    label: "Walk Score",
    icon: Footprints,
    getValue: (a) => a.walkScore,
    getNumericValue: (a) => a.walkScore,
    format: "score",
    higherIsBetter: true,
  },
  {
    label: "Safety Score",
    icon: Shield,
    getValue: (a) => a.safetyScore,
    getNumericValue: (a) => a.safetyScore,
    format: "score",
    higherIsBetter: true,
  },
  {
    label: "Family Score",
    icon: Users,
    getValue: (a) => a.familyScore,
    getNumericValue: (a) => a.familyScore,
    format: "score",
    higherIsBetter: true,
  },
  {
    label: "Student Score",
    icon: GraduationCap,
    getValue: (a) => a.studentScore,
    getNumericValue: (a) => a.studentScore,
    format: "score",
    higherIsBetter: true,
  },
  {
    label: "Professional Score",
    icon: Briefcase,
    getValue: (a) => a.professionalScore,
    getNumericValue: (a) => a.professionalScore,
    format: "score",
    higherIsBetter: true,
  },
  {
    label: "Noise Level",
    icon: Volume2,
    getValue: (a) => a.noiseLevel,
    format: "text",
  },
  {
    label: "Demand",
    icon: TrendingUp,
    getValue: (a) => a.demand,
    format: "text",
  },
  {
    label: "Transit Access",
    icon: Train,
    getValue: (a) => a.commuteToCenter,
    format: "text",
  },
];

function ScoreBar({ score, isBest }: { score: number; isBest: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-full max-w-[100px] overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <motion.div
          className={`h-full rounded-full ${isBest ? "bg-emerald-500" : "bg-gray-400 dark:bg-gray-500"}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>
      <span
        className={`text-sm font-bold ${isBest ? "text-emerald-600 dark:text-emerald-400" : "text-gray-700 dark:text-gray-300"}`}
      >
        {score}
      </span>
    </div>
  );
}

export default function AreaComparison({ areas }: AreaComparisonProps) {
  if (areas.length < 2) return null;

  const displayAreas = areas.slice(0, 3);

  function getBestIndex(row: ComparisonRow): number | null {
    if (!row.getNumericValue) return null;
    let bestIdx = 0;
    let bestVal = row.getNumericValue(displayAreas[0]);
    for (let i = 1; i < displayAreas.length; i++) {
      const val = row.getNumericValue(displayAreas[i]);
      if (val > bestVal) {
        bestVal = val;
        bestIdx = i;
      }
    }
    return bestIdx;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      {/* Header */}
      <div className="grid border-b border-gray-200 dark:border-gray-800"
        style={{ gridTemplateColumns: `200px repeat(${displayAreas.length}, 1fr)` }}
      >
        <div className="bg-gray-50 p-4 dark:bg-gray-800/50">
          <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white">
            Compare Areas
          </h3>
        </div>
        {displayAreas.map((area) => (
          <div
            key={area.id}
            className="flex flex-col items-center gap-2 bg-gray-50 p-4 dark:bg-gray-800/50"
          >
            <div className="h-16 w-16 overflow-hidden rounded-xl">
              <img
                src={area.image}
                alt={area.name}
                className="h-full w-full object-cover"
              />
            </div>
            <h4 className="font-display text-center text-sm font-bold text-gray-900 dark:text-white">
              {area.name}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {area.city}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile-friendly scroll wrapper */}
      <div className="overflow-x-auto">
        <div
          className="min-w-[500px]"
        >
          {rows.map((row, rowIdx) => {
            const Icon = row.icon;
            const bestIdx = getBestIndex(row);

            return (
              <div
                key={row.label}
                className={`grid items-center ${rowIdx % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50/50 dark:bg-gray-800/20"}`}
                style={{ gridTemplateColumns: `200px repeat(${displayAreas.length}, 1fr)` }}
              >
                {/* Row Label */}
                <div className="flex items-center gap-2 p-4">
                  <Icon className="h-4 w-4 flex-shrink-0 text-gray-400 dark:text-gray-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {row.label}
                  </span>
                </div>

                {/* Values */}
                {displayAreas.map((area, areaIdx) => {
                  const value = row.getValue(area);
                  const isBest = bestIdx === areaIdx;

                  return (
                    <div key={area.id} className="p-4">
                      {row.format === "score" && typeof value === "number" ? (
                        <ScoreBar score={value} isBest={isBest} />
                      ) : (
                        <span
                          className={`text-sm font-medium ${
                            isBest
                              ? "font-bold text-emerald-600 dark:text-emerald-400"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {value}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
