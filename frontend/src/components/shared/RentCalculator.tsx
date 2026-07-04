"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calculator,
  IndianRupee,
  TrendingUp,
  Wallet,
  Zap,
  ChevronDown,
  Home,
  Lightbulb,
  Wrench,
  ShieldCheck,
} from "lucide-react";

interface RentCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  baseRent?: number;
}

const formatCurrency = (n: number) =>
  "₹" + n.toLocaleString("en-IN");

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getUpcomingMonths(): { label: string; value: string }[] {
  const now = new Date();
  return Array.from({ length: 4 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const label = `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    return { label, value: label };
  });
}

// Animated number display
function AnimatedNumber({ value, prefix = "" }: { value: number; prefix?: string }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="inline-block"
    >
      {prefix}{value.toLocaleString("en-IN")}
    </motion.span>
  );
}

// Donut chart segment
function DonutChart({
  segments,
}: {
  segments: { label: string; value: number; color: string; darkColor: string }[];
}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  if (total === 0) return null;

  const radius = 70;
  const cx = 90;
  const cy = 90;
  const strokeWidth = 28;
  const circumference = 2 * Math.PI * radius;

  let cumulativeOffset = 0;

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
      <svg width="180" height="180" viewBox="0 0 180 180" className="shrink-0">
        {segments.map((seg, i) => {
          const pct = seg.value / total;
          const dashLength = pct * circumference;
          const dashGap = circumference - dashLength;
          const offset = -cumulativeOffset * circumference;
          cumulativeOffset += pct;

          return (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              strokeWidth={strokeWidth}
              className={`${seg.color} ${seg.darkColor}`}
              stroke="currentColor"
              strokeDasharray={`${dashLength} ${dashGap}`}
              strokeDashoffset={offset}
              strokeLinecap="butt"
              transform={`rotate(-90 ${cx} ${cy})`}
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={{ strokeDasharray: `${dashLength} ${dashGap}` }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
            />
          );
        })}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          className="fill-gray-800 dark:fill-white text-sm font-semibold"
          fontSize="13"
        >
          Monthly
        </text>
        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          className="fill-gray-500 dark:fill-gray-400 text-xs"
          fontSize="11"
        >
          Breakdown
        </text>
      </svg>

      <div className="grid grid-cols-2 gap-2 text-sm">
        {segments.map((seg, i) => {
          const pct = total > 0 ? ((seg.value / total) * 100).toFixed(1) : "0";
          return (
            <div key={i} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${seg.color} ${seg.darkColor}`} style={{ color: "currentColor", backgroundColor: "currentColor" }} />
              <span className="text-gray-600 dark:text-gray-300">
                {seg.label} <span className="font-medium text-gray-800 dark:text-white">{pct}%</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function RentCalculator({ isOpen, onClose, baseRent }: RentCalculatorProps) {
  const defaultRent = baseRent || 25000;

  const [rent, setRent] = useState(defaultRent);
  const [depositMultiplier, setDepositMultiplier] = useState(2);
  const [brokerageOn, setBrokerageOn] = useState(true);
  const [maintenance, setMaintenance] = useState(2000);
  const [utilities, setUtilities] = useState(1500);
  const [moveInMonth, setMoveInMonth] = useState(() => getUpcomingMonths()[0].value);
  const [monthlyIncome, setMonthlyIncome] = useState(0);

  const upcomingMonths = useMemo(() => getUpcomingMonths(), []);

  // Reset when baseRent changes
  useEffect(() => {
    if (baseRent) setRent(baseRent);
  }, [baseRent]);

  const deposit = rent * depositMultiplier;
  const brokerage = brokerageOn ? rent : 0;
  const totalMoveIn = deposit + rent + brokerage;
  const monthlyRecurring = rent + maintenance + utilities;
  const annualCost = monthlyRecurring * 12;
  const rentRatio = monthlyIncome > 0 ? (rent / monthlyIncome) * 100 : 0;

  const ratioColor =
    rentRatio === 0
      ? "text-gray-400 dark:text-gray-500"
      : rentRatio <= 30
      ? "text-emerald-600 dark:text-emerald-400"
      : rentRatio <= 40
      ? "text-amber-600 dark:text-amber-400"
      : "text-red-600 dark:text-red-400";

  const ratioLabel =
    rentRatio === 0
      ? "Enter income above"
      : rentRatio <= 30
      ? "Healthy — well within budget"
      : rentRatio <= 40
      ? "Moderate — plan carefully"
      : "High — consider a lower rent";

  const donutSegments = [
    { label: "Rent", value: rent, color: "text-indigo-500", darkColor: "dark:text-indigo-400" },
    { label: "Deposit (amortized)", value: Math.round(deposit / 12), color: "text-violet-500", darkColor: "dark:text-violet-400" },
    { label: "Maintenance", value: maintenance, color: "text-emerald-500", darkColor: "dark:text-emerald-400" },
    { label: "Utilities", value: utilities, color: "text-amber-500", darkColor: "dark:text-amber-400" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/20 dark:border-white/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-start justify-between p-6 pb-4 bg-gradient-to-b from-white/95 dark:from-gray-900/95 to-transparent backdrop-blur-md">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Smart Move-in Cost Calculator
                  </h2>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 ml-11">
                  Know exactly what you&apos;ll spend — no surprises
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 pb-6 space-y-6">
              {/* Monthly Rent */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Home className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  Monthly Rent
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">₹</span>
                  <input
                    type="number"
                    value={rent}
                    onChange={(e) => setRent(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-400/50 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
                  />
                </div>
              </div>

              {/* Security Deposit Slider */}
              <div className="space-y-2">
                <label className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-violet-500 dark:text-violet-400" />
                    Security Deposit
                  </span>
                  <span className="text-violet-600 dark:text-violet-400 font-semibold">
                    {depositMultiplier}x rent = {formatCurrency(deposit)}
                  </span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={6}
                  step={0.5}
                  value={depositMultiplier}
                  onChange={(e) => setDepositMultiplier(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 dark:bg-gray-700 accent-violet-600 dark:accent-violet-400"
                />
                <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500">
                  <span>1x</span>
                  <span>3x</span>
                  <span>6x</span>
                </div>
              </div>

              {/* Brokerage Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Wallet className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                    Brokerage
                  </label>
                  {brokerageOn && (
                    <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                      Standard: {formatCurrency(rent)} &middot;{" "}
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        <span className="line-through text-gray-400 dark:text-gray-500 mr-1">{formatCurrency(rent)}</span>
                        ₹0 on 99tolet
                      </span>
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setBrokerageOn(!brokerageOn)}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    brokerageOn
                      ? "bg-orange-500 dark:bg-orange-600"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <motion.div
                    animate={{ x: brokerageOn ? 20 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md"
                  />
                </button>
              </div>

              {/* Maintenance Slider */}
              <div className="space-y-2">
                <label className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                  <span className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                    Monthly Maintenance
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    {formatCurrency(maintenance)}
                  </span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={5000}
                  step={100}
                  value={maintenance}
                  onChange={(e) => setMaintenance(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 dark:bg-gray-700 accent-emerald-600 dark:accent-emerald-400"
                />
              </div>

              {/* Utilities Slider */}
              <div className="space-y-2">
                <label className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                  <span className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                    Monthly Utilities
                  </span>
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">
                    {formatCurrency(utilities)}
                  </span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={5000}
                  step={100}
                  value={utilities}
                  onChange={(e) => setUtilities(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 dark:bg-gray-700 accent-amber-600 dark:accent-amber-400"
                />
              </div>

              {/* Move-in Month */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <ChevronDown className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  Move-in Month
                </label>
                <select
                  value={moveInMonth}
                  onChange={(e) => setMoveInMonth(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-400/50 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all appearance-none cursor-pointer"
                >
                  {upcomingMonths.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-700" />

              {/* Calculated Outputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <motion.div
                  layout
                  className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/40 border border-indigo-100 dark:border-indigo-800/40"
                >
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-1">Total Move-in Cost</p>
                  <p className="text-xl font-bold text-indigo-900 dark:text-indigo-100">
                    <AnimatedNumber value={totalMoveIn} prefix="₹" />
                  </p>
                  <p className="text-[10px] text-indigo-400 dark:text-indigo-500 mt-1">
                    Deposit + 1st month + Brokerage
                  </p>
                </motion.div>

                <motion.div
                  layout
                  className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-100 dark:border-emerald-800/40"
                >
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-1">Monthly Recurring</p>
                  <p className="text-xl font-bold text-emerald-900 dark:text-emerald-100">
                    <AnimatedNumber value={monthlyRecurring} prefix="₹" />
                  </p>
                  <p className="text-[10px] text-emerald-400 dark:text-emerald-500 mt-1">
                    Rent + Maintenance + Utilities
                  </p>
                </motion.div>

                <motion.div
                  layout
                  className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border border-amber-100 dark:border-amber-800/40"
                >
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mb-1">Annual Cost</p>
                  <p className="text-xl font-bold text-amber-900 dark:text-amber-100">
                    <AnimatedNumber value={annualCost} prefix="₹" />
                  </p>
                  <p className="text-[10px] text-amber-400 dark:text-amber-500 mt-1">
                    Monthly × 12
                  </p>
                </motion.div>
              </div>

              {/* Rent-to-Income Ratio */}
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50 space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <TrendingUp className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  Rent-to-Income Ratio
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">₹</span>
                  <input
                    type="number"
                    placeholder="Enter monthly income"
                    value={monthlyIncome || ""}
                    onChange={(e) => setMonthlyIncome(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-400/50 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
                  />
                </div>
                {monthlyIncome > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-2xl font-bold ${ratioColor}`}>
                        {rentRatio.toFixed(1)}%
                      </span>
                      <span className={`text-sm ${ratioColor}`}>{ratioLabel}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(rentRatio, 100)}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          rentRatio <= 30
                            ? "bg-emerald-500 dark:bg-emerald-400"
                            : rentRatio <= 40
                            ? "bg-amber-500 dark:bg-amber-400"
                            : "bg-red-500 dark:bg-red-400"
                        }`}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-500">
                      <span>0%</span>
                      <span className="text-emerald-500 dark:text-emerald-400">30%</span>
                      <span className="text-amber-500 dark:text-amber-400">40%</span>
                      <span className="text-red-500 dark:text-red-400">50%+</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Donut Chart */}
              <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Monthly Cost Distribution
                </h3>
                <DonutChart segments={donutSegments} />
              </div>

              {/* 99tolet Savings */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-3"
              >
                <div className="p-2 rounded-lg bg-emerald-500 dark:bg-emerald-600 text-white shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
                    With 99tolet: Save {formatCurrency(rent)} on brokerage
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    Zero brokerage, verified landlords, direct connections
                  </p>
                </div>
              </motion.div>

              {/* Move-in month note */}
              <p className="text-center text-xs text-gray-400 dark:text-gray-500">
                Planned move-in: <span className="font-medium text-gray-600 dark:text-gray-300">{moveInMonth}</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
