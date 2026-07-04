"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Trash2,
  Check,
  Minus,
  BarChart3,
  Shield,
  Star,
  ArrowUpRight,
} from "lucide-react";
import { Property } from "@/data/properties";

interface ComparisonDrawerProps {
  properties: Property[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
}

function ScoreBar({ value, max = 100, color }: { value: number; max?: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 h-2.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 w-8 text-right">
        {value}
      </span>
    </div>
  );
}

function BooleanCell({ value }: { value: boolean }) {
  return value ? (
    <div className="flex items-center justify-center">
      <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40">
        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <div className="p-1 rounded-full bg-gray-100 dark:bg-gray-800">
        <Minus className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
      </div>
    </div>
  );
}

// Returns index of best (lowest or highest) among properties for a numeric field
function bestIndex(properties: Property[], key: keyof Property, mode: "min" | "max"): number {
  if (properties.length === 0) return -1;
  let bestIdx = 0;
  let bestVal = Number(properties[0][key]) || 0;
  properties.forEach((p, i) => {
    const v = Number(p[key]) || 0;
    if (mode === "min" ? v < bestVal : v > bestVal) {
      bestVal = v;
      bestIdx = i;
    }
  });
  return bestIdx;
}

const formatCurrency = (n: number) => "₹" + n.toLocaleString("en-IN");

type RowDef = {
  label: string;
  icon?: React.ReactNode;
  render: (p: Property, idx: number) => React.ReactNode;
  best?: number;
};

export default function ComparisonDrawer({
  properties,
  isOpen,
  onClose,
  onRemove,
}: ComparisonDrawerProps) {
  const rows: RowDef[] = useMemo(() => {
    const bestRent = bestIndex(properties, "price", "min");
    const bestDeposit = bestIndex(properties, "deposit", "min");
    const bestArea = bestIndex(properties, "area", "max");
    const bestAI = bestIndex(properties, "aiMatchScore", "max");
    const bestTrust = bestIndex(properties, "trustScore", "max");

    return [
      {
        label: "Property",
        icon: <Star className="w-3.5 h-3.5" />,
        render: (p) => (
          <div className="flex items-center gap-1 font-medium text-gray-900 dark:text-white text-sm">
            <span className="line-clamp-2">{p.title}</span>
            <ArrowUpRight className="w-3 h-3 text-indigo-500 dark:text-indigo-400 shrink-0" />
          </div>
        ),
      },
      {
        label: "Monthly Rent",
        render: (p, idx) => (
          <span className={idx === bestRent ? "font-bold text-emerald-700 dark:text-emerald-400" : "text-gray-800 dark:text-gray-200"}>
            {formatCurrency(p.price)}/mo
          </span>
        ),
        best: bestRent,
      },
      {
        label: "Deposit",
        render: (p, idx) => (
          <span className={idx === bestDeposit ? "font-bold text-emerald-700 dark:text-emerald-400" : "text-gray-800 dark:text-gray-200"}>
            {formatCurrency(p.deposit)}
          </span>
        ),
        best: bestDeposit,
      },
      {
        label: "Area",
        render: (p, idx) => (
          <span className={idx === bestArea ? "font-bold text-emerald-700 dark:text-emerald-400" : "text-gray-800 dark:text-gray-200"}>
            {p.area.toLocaleString()} sqft
          </span>
        ),
        best: bestArea,
      },
      {
        label: "AI Match Score",
        icon: <BarChart3 className="w-3.5 h-3.5" />,
        render: (p) => <ScoreBar value={p.aiMatchScore} color="bg-indigo-500 dark:bg-indigo-400" />,
        best: bestAI,
      },
      {
        label: "Trust Score",
        icon: <Shield className="w-3.5 h-3.5" />,
        render: (p) => <ScoreBar value={p.trustScore} color="bg-violet-500 dark:bg-violet-400" />,
        best: bestTrust,
      },
      {
        label: "Fair Rent",
        render: (p) => {
          const colors =
            p.fairRent === "Below Market"
              ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400"
              : p.fairRent === "Fair"
              ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400"
              : "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400";
          return (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors}`}>
              {p.fairRent}
            </span>
          );
        },
      },
      {
        label: "Furnishing",
        render: (p) => (
          <span className="text-gray-700 dark:text-gray-300 text-sm">{p.furnishing}</span>
        ),
      },
      {
        label: "Bedrooms / Bathrooms",
        render: (p) => (
          <span className="text-gray-700 dark:text-gray-300 text-sm">
            {p.bedrooms ?? "—"} bed / {p.bathrooms ?? "—"} bath
          </span>
        ),
      },
      {
        label: "Locality Pulse",
        render: (p) => {
          const colors =
            p.localityPulse === "High Demand"
              ? "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400"
              : p.localityPulse === "Moderate"
              ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400"
              : "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400";
          return (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors}`}>
              {p.localityPulse}
            </span>
          );
        },
      },
      {
        label: "Move-in Ready",
        render: (p) => <BooleanCell value={p.moveInReady} />,
      },
      {
        label: "Verified",
        render: (p) => <BooleanCell value={p.isVerified} />,
      },
      {
        label: "Low Deposit",
        render: (p) => <BooleanCell value={p.lowDeposit} />,
      },
      {
        label: "Parking",
        render: (p) => <BooleanCell value={p.parking} />,
      },
    ];
  }, [properties]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] flex flex-col rounded-t-2xl border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Compare Properties</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400">
                  {properties.length}/3
                </span>
              </div>
              <div className="flex items-center gap-2">
                {properties.length > 0 && (
                  <button
                    onClick={() => properties.forEach((p) => onRemove(p.id))}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear All
                  </button>
                )}
                {properties.length < 3 && (
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 rounded-lg transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                    Add More
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
              {properties.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <BarChart3 className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 font-medium">No properties to compare</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Add up to 3 properties to see a side-by-side comparison</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr>
                        <th className="sticky left-0 z-10 bg-gray-50 dark:bg-gray-800/80 backdrop-blur-sm px-5 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-40 min-w-[160px]">
                          Feature
                        </th>
                        {properties.map((p) => (
                          <th key={p.id} className="px-4 py-3 text-left min-w-[200px] bg-gray-50 dark:bg-gray-800/80">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider truncate">
                                {p.locality}
                              </span>
                              <button
                                onClick={() => onRemove(p.id)}
                                className="p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, ri) => (
                        <tr
                          key={ri}
                          className={ri % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50/50 dark:bg-gray-800/30"}
                        >
                          <td className="sticky left-0 z-10 px-5 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 bg-inherit whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              {row.icon && <span className="text-gray-400 dark:text-gray-500">{row.icon}</span>}
                              {row.label}
                            </div>
                          </td>
                          {properties.map((p, ci) => (
                            <td
                              key={p.id}
                              className={`px-4 py-3 text-sm bg-inherit ${
                                row.best !== undefined && row.best === ci && properties.length > 1
                                  ? "bg-emerald-50/60 dark:bg-emerald-900/10"
                                  : ""
                              }`}
                            >
                              {row.render(p, ci)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {properties.length > 1
                  ? "Green highlights indicate the best value in each row"
                  : "Add more properties to compare"}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Powered by 99tolet</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
