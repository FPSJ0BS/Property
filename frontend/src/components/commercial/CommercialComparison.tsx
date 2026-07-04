"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Store,
  Warehouse,
  Users,
  Eye,
  Car,
  Truck,
  Briefcase,
  IndianRupee,
  Footprints,
  Zap,
  UserCheck,
} from "lucide-react";
import type { CommercialAreaProfile } from "@/data/commercial";

interface CommercialComparisonProps {
  profiles: CommercialAreaProfile[];
}

interface ComparisonRow {
  label: string;
  icon: React.ElementType;
  getValue: (p: CommercialAreaProfile) => string | number;
  getNumericValue?: (p: CommercialAreaProfile) => number;
  format: "score" | "text";
  higherIsBetter?: boolean;
}

const rows: ComparisonRow[] = [
  {
    label: "Office Fit",
    icon: Building2,
    getValue: (p) => p.businessFit.officeFit,
    getNumericValue: (p) => p.businessFit.officeFit,
    format: "score",
    higherIsBetter: true,
  },
  {
    label: "Retail Fit",
    icon: Store,
    getValue: (p) => p.businessFit.retailFit,
    getNumericValue: (p) => p.businessFit.retailFit,
    format: "score",
    higherIsBetter: true,
  },
  {
    label: "Warehouse Fit",
    icon: Warehouse,
    getValue: (p) => p.businessFit.warehouseFit,
    getNumericValue: (p) => p.businessFit.warehouseFit,
    format: "score",
    higherIsBetter: true,
  },
  {
    label: "Employee Access",
    icon: Users,
    getValue: (p) => p.businessFit.employeeAccess,
    getNumericValue: (p) => p.businessFit.employeeAccess,
    format: "score",
    higherIsBetter: true,
  },
  {
    label: "Customer Access",
    icon: UserCheck,
    getValue: (p) => p.businessFit.customerAccess,
    getNumericValue: (p) => p.businessFit.customerAccess,
    format: "score",
    higherIsBetter: true,
  },
  {
    label: "Visibility",
    icon: Eye,
    getValue: (p) => p.businessFit.visibility,
    getNumericValue: (p) => p.businessFit.visibility,
    format: "score",
    higherIsBetter: true,
  },
  {
    label: "Parking",
    icon: Car,
    getValue: (p) => p.businessFit.parking,
    getNumericValue: (p) => p.businessFit.parking,
    format: "score",
    higherIsBetter: true,
  },
  {
    label: "Logistics",
    icon: Truck,
    getValue: (p) => p.businessFit.logisticsReadiness,
    getNumericValue: (p) => p.businessFit.logisticsReadiness,
    format: "score",
    higherIsBetter: true,
  },
  {
    label: "Business Ecosystem",
    icon: Briefcase,
    getValue: (p) => p.businessFit.businessEcosystem,
    getNumericValue: (p) => p.businessFit.businessEcosystem,
    format: "score",
    higherIsBetter: true,
  },
  {
    label: "Commercial Rent",
    icon: IndianRupee,
    getValue: (p) =>
      `\u20B9${p.commercialRentRange.min.toLocaleString("en-IN")} - \u20B9${p.commercialRentRange.max.toLocaleString("en-IN")}`,
    getNumericValue: (p) => -p.commercialRentRange.min,
    format: "text",
    higherIsBetter: true,
  },
  {
    label: "Footfall Level",
    icon: Footprints,
    getValue: (p) => p.footfallLevel,
    format: "text",
  },
  {
    label: "Move Readiness",
    icon: Zap,
    getValue: (p) => p.businessMoveReadiness,
    getNumericValue: (p) => p.businessMoveReadiness,
    format: "score",
    higherIsBetter: true,
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
        className={`text-sm font-bold tabular-nums ${isBest ? "text-emerald-600 dark:text-emerald-400" : "text-gray-700 dark:text-gray-300"}`}
      >
        {score}
      </span>
    </div>
  );
}

export default function CommercialComparison({
  profiles,
}: CommercialComparisonProps) {
  if (profiles.length < 2) return null;

  const displayProfiles = profiles.slice(0, 3);

  function getBestIndex(row: ComparisonRow): number | null {
    if (!row.getNumericValue) return null;
    let bestIdx = 0;
    let bestVal = row.getNumericValue(displayProfiles[0]);
    for (let i = 1; i < displayProfiles.length; i++) {
      const val = row.getNumericValue(displayProfiles[i]);
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
      className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900"
    >
      {/* Premium top accent */}
      <div className="h-1 bg-gradient-to-r from-violet-500 via-emerald-500 to-violet-500" />

      {/* Header Row + Data Rows */}
      <div className="overflow-x-auto">
        <div className="min-w-[560px]">
          {/* Header */}
          <div
            className="grid border-b border-gray-200 dark:border-gray-800"
            style={{
              gridTemplateColumns: `180px repeat(${displayProfiles.length}, 1fr)`,
            }}
          >
            <div className="sticky left-0 z-10 bg-gray-50 p-4 dark:bg-gray-800/50">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Compare Areas
              </h3>
            </div>
            {displayProfiles.map((profile) => (
              <div
                key={profile.areaSlug}
                className="flex flex-col items-center justify-center gap-1 bg-gray-50 p-4 dark:bg-gray-800/50"
              >
                <h4 className="text-center text-sm font-bold text-gray-900 dark:text-white">
                  {profile.areaName}
                </h4>
                <span className="inline-flex rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
                  {profile.footfallLevel} Footfall
                </span>
              </div>
            ))}
          </div>

          {/* Data Rows */}
          {rows.map((row, rowIdx) => {
            const Icon = row.icon;
            const bestIdx = getBestIndex(row);

            return (
              <div
                key={row.label}
                className={`grid items-center ${rowIdx % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50/50 dark:bg-gray-800/20"}`}
                style={{
                  gridTemplateColumns: `180px repeat(${displayProfiles.length}, 1fr)`,
                }}
              >
                {/* Row Label */}
                <div className="sticky left-0 z-10 flex items-center gap-2 bg-inherit p-4">
                  <Icon className="h-4 w-4 flex-shrink-0 text-gray-400 dark:text-gray-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {row.label}
                  </span>
                </div>

                {/* Values */}
                {displayProfiles.map((profile, areaIdx) => {
                  const value = row.getValue(profile);
                  const isBest = bestIdx === areaIdx;

                  return (
                    <div key={profile.areaSlug} className="p-4">
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
