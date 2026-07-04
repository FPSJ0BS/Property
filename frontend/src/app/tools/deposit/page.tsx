"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IndianRupee,
  Calculator,
  TrendingDown,
  Calendar,
  PiggyBank,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Info,
  BadgeCheck,
  ArrowRight,
  Minus,
  Plus,
} from "lucide-react";

/* ─── Animated Number ─── */
function AnimatedNumber({ value, prefix = "₹" }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const diff = value - display;
    if (Math.abs(diff) < 1) {
      setDisplay(value);
      return;
    }
    const step = diff / 10;
    const timer = setTimeout(() => setDisplay((prev) => {
      const next = prev + step;
      return Math.abs(value - next) < Math.abs(step) ? value : next;
    }), 20);
    return () => clearTimeout(timer);
  }, [value, display]);

  return (
    <span>
      {prefix}{Math.round(display).toLocaleString("en-IN")}
    </span>
  );
}

/* ─── Donut Chart ─── */
function DonutChart({
  segments,
}: {
  segments: { label: string; value: number; color: string; strikethrough?: boolean }[];
}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  if (total === 0) return null;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let cumulativeOffset = 0;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
          {segments
            .filter((s) => s.value > 0)
            .map((seg, i) => {
              const pct = seg.value / total;
              const dashLength = pct * circumference;
              const dashOffset = cumulativeOffset * circumference;
              cumulativeOffset += pct;

              return (
                <motion.circle
                  key={i}
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="20"
                  strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                  strokeDashoffset={-dashOffset}
                  strokeLinecap="round"
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  animate={{ strokeDasharray: `${dashLength} ${circumference - dashLength}` }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                />
              );
            })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">Total</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            <AnimatedNumber value={total} />
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
        {segments
          .filter((s) => s.value > 0)
          .map((seg, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: seg.color }}
              />
              <span
                className={`text-xs font-medium ${
                  seg.strikethrough
                    ? "line-through text-slate-400 dark:text-slate-600"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {seg.label}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

/* ─── Main ─── */
export default function DepositCalculator() {
  const [monthlyRent, setMonthlyRent] = useState(25000);
  const [depositMultiplier, setDepositMultiplier] = useState(2);
  const [brokerage, setBrokerage] = useState(false);
  const [firstMonthAdvance, setFirstMonthAdvance] = useState(true);
  const [societyDeposit, setSocietyDeposit] = useState(0);
  const [maintenanceAdvance, setMaintenanceAdvance] = useState(0);
  const [showEmi, setShowEmi] = useState(false);
  const [showSavings, setShowSavings] = useState(false);

  const calc = useMemo(() => {
    const totalDeposit = monthlyRent * depositMultiplier;
    const brokerageAmount = brokerage ? monthlyRent : 0;
    const firstMonth = firstMonthAdvance ? monthlyRent : 0;
    const totalMoveIn = totalDeposit + brokerageAmount + firstMonth + societyDeposit + maintenanceAdvance;

    // EMI Plans
    const today = new Date();
    const plan2 = [
      { amount: Math.round(totalDeposit * 0.5), date: new Date(today), label: "Now" },
      {
        amount: Math.round(totalDeposit * 0.5),
        date: new Date(today.getTime() + 30 * 86400000),
        label: "30 days",
      },
    ];
    const plan3 = [
      { amount: Math.round(totalDeposit * 0.4), date: new Date(today), label: "Now" },
      {
        amount: Math.round(totalDeposit * 0.3),
        date: new Date(today.getTime() + 30 * 86400000),
        label: "30 days",
      },
      {
        amount: Math.round(totalDeposit * 0.3),
        date: new Date(today.getTime() + 60 * 86400000),
        label: "60 days",
      },
    ];

    // Savings with 99tolet
    const brokerageSaved = monthlyRent; // What a broker would charge
    const lowerDepositSaving = monthlyRent * (depositMultiplier - 1); // 1-month deposit vs multi-month
    const totalPotentialSavings = brokerageSaved + (depositMultiplier > 1 ? lowerDepositSaving : 0);

    return {
      totalDeposit,
      brokerageAmount,
      firstMonth,
      totalMoveIn,
      plan2,
      plan3,
      brokerageSaved,
      lowerDepositSaving,
      totalPotentialSavings,
    };
  }, [monthlyRent, depositMultiplier, brokerage, firstMonthAdvance, societyDeposit, maintenanceAdvance]);

  const donutSegments = [
    { label: "Security Deposit", value: calc.totalDeposit, color: "#6366f1" },
    { label: "First Month Rent", value: calc.firstMonth, color: "#8b5cf6" },
    ...(calc.brokerageAmount > 0
      ? [{ label: "Brokerage", value: calc.brokerageAmount, color: "#ef4444", strikethrough: true }]
      : []),
    ...(societyDeposit > 0
      ? [{ label: "Society Deposit", value: societyDeposit, color: "#64748b" }]
      : []),
    ...(maintenanceAdvance > 0
      ? [{ label: "Maintenance", value: maintenanceAdvance, color: "#94a3b8" }]
      : []),
  ];

  function formatDate(d: Date) {
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-8 sm:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 dark:bg-violet-950/50 border border-violet-100 dark:border-violet-900/50 mb-4">
            <Calculator className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            <span className="text-xs font-semibold text-violet-700 dark:text-violet-300 tracking-wide uppercase">
              Move-in Cost Planner
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white font-display">
            Deposit Calculator &amp; EMI Splitter
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Know your exact move-in costs. Plan deposit installments. See how much you can save.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="card-premium rounded-2xl p-6"
          >
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-indigo-500" />
              Your Rental Details
            </h2>

            <div className="space-y-6">
              {/* Monthly Rent */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Monthly Rent
                  </label>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    ₹{monthlyRent.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMonthlyRent((v) => Math.max(1000, v - 1000))}
                    className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  </button>
                  <input
                    type="range"
                    min={3000}
                    max={200000}
                    step={1000}
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(Number(e.target.value))}
                    className="flex-1 h-2 rounded-full appearance-none bg-slate-200 dark:bg-slate-700 accent-indigo-600"
                  />
                  <button
                    onClick={() => setMonthlyRent((v) => Math.min(200000, v + 1000))}
                    className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  </button>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-1 px-1">
                  <span>₹3K</span>
                  <span>₹2L</span>
                </div>
              </div>

              {/* Deposit Multiplier */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Deposit Amount
                  </label>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    {depositMultiplier}x rent = ₹{(monthlyRent * depositMultiplier).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6].map((m) => (
                    <button
                      key={m}
                      onClick={() => setDepositMultiplier(m)}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        depositMultiplier === m
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {m}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3 border-t border-slate-200 dark:border-slate-700/50 pt-4">
                <ToggleRow
                  label="Brokerage"
                  description={brokerage ? `₹${monthlyRent.toLocaleString("en-IN")} (1 month)` : "No broker involved"}
                  checked={brokerage}
                  onChange={setBrokerage}
                />
                <ToggleRow
                  label="First Month Rent Advance"
                  description={firstMonthAdvance ? `₹${monthlyRent.toLocaleString("en-IN")}` : "Not required upfront"}
                  checked={firstMonthAdvance}
                  onChange={setFirstMonthAdvance}
                />
              </div>

              {/* Extra Costs */}
              <div className="space-y-3 border-t border-slate-200 dark:border-slate-700/50 pt-4">
                <NumberInput
                  label="Society/Club Deposit"
                  value={societyDeposit}
                  onChange={setSocietyDeposit}
                  placeholder="0"
                />
                <NumberInput
                  label="Maintenance Advance"
                  value={maintenanceAdvance}
                  onChange={setMaintenanceAdvance}
                  placeholder="0"
                />
              </div>
            </div>
          </motion.div>

          {/* Output Section */}
          <div className="space-y-6">
            {/* Total Move-in Cost */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card-premium rounded-2xl p-6"
            >
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-violet-500" />
                Total Move-in Cost
              </h2>

              {/* Big Number */}
              <div className="text-center mb-6">
                <motion.p
                  key={calc.totalMoveIn}
                  initial={{ scale: 0.95, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white"
                >
                  <AnimatedNumber value={calc.totalMoveIn} />
                </motion.p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Total amount needed on day one
                </p>
              </div>

              {/* Breakdown */}
              <div className="space-y-2">
                <BreakdownRow label="Security Deposit" amount={calc.totalDeposit} sub={`${depositMultiplier}x rent`} />
                {firstMonthAdvance && (
                  <BreakdownRow label="First Month Rent" amount={calc.firstMonth} />
                )}
                {brokerage && (
                  <BreakdownRow label="Brokerage" amount={calc.brokerageAmount} highlight="red" />
                )}
                {societyDeposit > 0 && (
                  <BreakdownRow label="Society Deposit" amount={societyDeposit} />
                )}
                {maintenanceAdvance > 0 && (
                  <BreakdownRow label="Maintenance Advance" amount={maintenanceAdvance} />
                )}
              </div>

              {/* Donut Chart */}
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700/50">
                <DonutChart segments={donutSegments} />
              </div>
            </motion.div>

            {/* EMI Splitter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card-premium rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setShowEmi(!showEmi)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/30 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                      Deposit Installment Plans
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Can&apos;t pay the full deposit at once?
                    </p>
                  </div>
                </div>
                {showEmi ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>

              <AnimatePresence>
                {showEmi && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-4">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Negotiate with your landlord to split the deposit of{" "}
                        <strong>₹{calc.totalDeposit.toLocaleString("en-IN")}</strong> into installments:
                      </p>

                      {/* 2-installment plan */}
                      <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40">
                        <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-3">
                          2-Installment Plan (50/50)
                        </p>
                        <div className="space-y-2">
                          {calc.plan2.map((p, i) => (
                            <div key={i} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                                  {i + 1}
                                </span>
                                <span className="text-sm text-slate-700 dark:text-slate-300">
                                  {formatDate(p.date)}{" "}
                                  <span className="text-xs text-slate-500">({p.label})</span>
                                </span>
                              </div>
                              <span className="text-sm font-bold text-slate-900 dark:text-white">
                                ₹{p.amount.toLocaleString("en-IN")}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 3-installment plan */}
                      <div className="p-4 rounded-xl bg-violet-50/60 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900/40">
                        <p className="text-sm font-semibold text-violet-700 dark:text-violet-300 mb-3">
                          3-Installment Plan (40/30/30)
                        </p>
                        <div className="space-y-2">
                          {calc.plan3.map((p, i) => (
                            <div key={i} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/50 text-xs font-bold text-violet-600 dark:text-violet-400 flex items-center justify-center">
                                  {i + 1}
                                </span>
                                <span className="text-sm text-slate-700 dark:text-slate-300">
                                  {formatDate(p.date)}{" "}
                                  <span className="text-xs text-slate-500">({p.label})</span>
                                </span>
                              </div>
                              <span className="text-sm font-bold text-slate-900 dark:text-white">
                                ₹{p.amount.toLocaleString("en-IN")}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
                        <Info className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        <p className="text-xs text-amber-800 dark:text-amber-300">
                          Tip: Many landlords agree to 2 installments if you ask politely.
                          Get the plan mentioned in your rental agreement for legal protection.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Savings with 99tolet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card-premium rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setShowSavings(!showSavings)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                      Save with 99tolet
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      See how much you could keep in your pocket
                    </p>
                  </div>
                </div>
                {showSavings ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>

              <AnimatePresence>
                {showSavings && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-4">
                      {/* Brokerage saved */}
                      <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Brokerage Eliminated
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm line-through text-red-400 dark:text-red-500">
                              ₹{calc.brokerageSaved.toLocaleString("en-IN")}
                            </span>
                            <ArrowRight className="w-3 h-3 text-slate-400" />
                            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                              ₹0
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          99tolet connects you directly with verified owners. No middlemen.
                        </p>
                      </div>

                      {/* Lower deposit */}
                      {depositMultiplier > 1 && (
                        <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              Lower Deposit Options
                            </span>
                            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                              Save ₹{calc.lowerDepositSaving.toLocaleString("en-IN")}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Some verified properties on 99tolet offer 1-month deposit instead of {depositMultiplier} months.
                          </p>
                        </div>
                      )}

                      {/* Total Savings */}
                      <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700">
                        <div className="flex items-center gap-2 mb-1">
                          <Sparkles className="w-5 h-5 text-emerald-100" />
                          <span className="text-sm font-medium text-emerald-100">
                            Total Potential Savings
                          </span>
                        </div>
                        <p className="text-3xl font-bold text-white">
                          ₹{calc.totalPotentialSavings.toLocaleString("en-IN")}
                        </p>
                        <p className="text-sm text-emerald-100 mt-1">
                          That&apos;s {Math.round((calc.totalPotentialSavings / monthlyRent) * 10) / 10} months of rent you keep.
                        </p>
                      </div>

                      <a
                        href="/discover"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all"
                      >
                        <BadgeCheck className="w-4 h-4" />
                        Browse Verified Properties
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-slate-400 dark:text-slate-600 mt-8"
        >
          All calculations are instant and stay in your browser. Nothing is saved or tracked.
        </motion.p>
      </div>
    </div>
  );
}

/* ─── Sub-components ─── */
function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${
          checked ? "bg-indigo-600" : "bg-slate-200 dark:bg-slate-700"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 shrink-0">
        {label}
      </label>
      <div className="relative w-36">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">₹</span>
        <input
          type="number"
          value={value || ""}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 pl-7 pr-3 py-2 text-sm text-right text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
        />
      </div>
    </div>
  );
}

function BreakdownRow({
  label,
  amount,
  sub,
  highlight,
}: {
  label: string;
  amount: number;
  sub?: string;
  highlight?: "red";
}) {
  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-50 dark:bg-slate-800/40">
      <div>
        <p className={`text-sm font-medium ${highlight === "red" ? "text-red-600 dark:text-red-400" : "text-slate-700 dark:text-slate-300"}`}>
          {label}
        </p>
        {sub && <p className="text-xs text-slate-500 dark:text-slate-400">{sub}</p>}
      </div>
      <p className={`text-sm font-bold ${highlight === "red" ? "text-red-600 dark:text-red-400" : "text-slate-900 dark:text-white"}`}>
        ₹{amount.toLocaleString("en-IN")}
      </p>
    </div>
  );
}
