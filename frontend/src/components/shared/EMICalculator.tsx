"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  X,
  IndianRupee,
  TrendingUp,
  Info,
} from "lucide-react";

interface EMICalculatorProps {
  salePrice: number;
  isOpen: boolean;
  onClose: () => void;
}

function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} Lakh`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

function formatShort(amount: number): string {
  if (amount >= 10000000) return `${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `${(amount / 1000).toFixed(0)}K`;
  return amount.toFixed(0);
}

const tenureOptions = [10, 15, 20, 25, 30];

export default function EMICalculator({ salePrice, isOpen, onClose }: EMICalculatorProps) {
  const [propertyPrice, setPropertyPrice] = useState(salePrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [tenure, setTenure] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);

  useEffect(() => {
    setPropertyPrice(salePrice);
  }, [salePrice]);

  const calculations = useMemo(() => {
    const downPayment = (propertyPrice * downPaymentPercent) / 100;
    const loanAmount = propertyPrice - downPayment;
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = tenure * 12;

    let monthlyEMI = 0;
    if (monthlyRate > 0 && totalMonths > 0 && loanAmount > 0) {
      const factor = Math.pow(1 + monthlyRate, totalMonths);
      monthlyEMI = (loanAmount * monthlyRate * factor) / (factor - 1);
    }

    const totalPayment = monthlyEMI * totalMonths;
    const totalInterest = totalPayment - loanAmount;
    const principalPercent = loanAmount > 0 ? (loanAmount / totalPayment) * 100 : 0;
    const interestPercent = totalInterest > 0 ? (totalInterest / totalPayment) * 100 : 0;

    // Affordability: EMI should be < 40% of income
    const minMonthlyIncome = monthlyEMI / 0.4;

    // Payment schedule - outstanding principal at year 1, 5, 10
    const scheduleYears = [1, 5, 10].filter((y) => y <= tenure);
    const schedule = scheduleYears.map((year) => {
      const months = year * 12;
      let principalPaid = 0;
      let interestPaid = 0;
      let balance = loanAmount;

      for (let m = 1; m <= months && m <= totalMonths; m++) {
        const interestForMonth = balance * monthlyRate;
        const principalForMonth = monthlyEMI - interestForMonth;
        principalPaid += principalForMonth;
        interestPaid += interestForMonth;
        balance -= principalForMonth;
      }

      return {
        year,
        principalPaid,
        interestPaid,
        balance: Math.max(0, balance),
        totalPaid: principalPaid + interestPaid,
      };
    });

    return {
      downPayment,
      loanAmount,
      monthlyEMI,
      totalInterest,
      totalPayment,
      principalPercent,
      interestPercent,
      minMonthlyIncome,
      schedule,
    };
  }, [propertyPrice, downPaymentPercent, tenure, interestRate]);

  // Donut chart
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const principalArc = (calculations.principalPercent / 100) * circumference;
  const interestArc = (calculations.interestPercent / 100) * circumference;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700 shadow-2xl shadow-slate-900/20 dark:shadow-slate-950/50"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Calculator className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">EMI Calculator</h2>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">Estimate your monthly payments</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Property Price */}
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 block">
                  Property Price
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-10 pr-4 py-3 text-sm font-semibold border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-indigo-300 dark:focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 outline-none transition-all"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 font-medium">
                    {formatCurrency(propertyPrice)}
                  </span>
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Down Payment
                  </label>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {downPaymentPercent}% — {formatCurrency(calculations.downPayment)}
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={50}
                  step={1}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-slate-400">10%</span>
                  <span className="text-[10px] text-slate-400">50%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 block">
                  Loan Tenure
                </label>
                <div className="flex gap-2">
                  {tenureOptions.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTenure(t)}
                      className={`flex-1 py-2.5 text-xs font-semibold rounded-xl border transition-all ${
                        tenure === t
                          ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-700 shadow-sm"
                          : "text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-700 bg-white dark:bg-slate-800"
                      }`}
                    >
                      {t}y
                    </button>
                  ))}
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Interest Rate
                  </label>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {interestRate.toFixed(1)}% p.a.
                  </span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={12}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-slate-400">8%</span>
                  <span className="text-[10px] text-slate-400">12%</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 dark:border-slate-800" />

              {/* Results Section */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/20 dark:to-violet-950/20 border border-indigo-100/60 dark:border-indigo-900/30">
                  <p className="text-[10px] font-medium text-indigo-500 dark:text-indigo-400 uppercase tracking-wider mb-1">Monthly EMI</p>
                  <p className="text-lg font-bold text-indigo-700 dark:text-indigo-300 font-display">
                    ₹{calculations.monthlyEMI.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700">
                  <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Loan Amount</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white font-display">
                    {formatCurrency(calculations.loanAmount)}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100/60 dark:border-amber-900/30">
                  <p className="text-[10px] font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">Total Interest</p>
                  <p className="text-lg font-bold text-amber-700 dark:text-amber-300 font-display">
                    {formatCurrency(calculations.totalInterest)}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100/60 dark:border-emerald-900/30">
                  <p className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">Total Payment</p>
                  <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300 font-display">
                    {formatCurrency(calculations.totalPayment)}
                  </p>
                </div>
              </div>

              {/* Donut Chart */}
              <div className="flex items-center justify-center gap-6 py-2">
                <div className="relative">
                  <svg className="w-32 h-32 -rotate-90" viewBox="0 0 128 128">
                    {/* Principal arc */}
                    <motion.circle
                      cx="64"
                      cy="64"
                      r={radius}
                      fill="none"
                      stroke="url(#principal-grad)"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset: circumference - principalArc }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                    {/* Interest arc */}
                    <motion.circle
                      cx="64"
                      cy="64"
                      r={radius}
                      fill="none"
                      stroke="url(#interest-grad)"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference - interestArc}
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset: circumference - interestArc }}
                      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                      style={{ transform: `rotate(${(calculations.principalPercent / 100) * 360}deg)`, transformOrigin: "64px 64px" }}
                    />
                    <defs>
                      <linearGradient id="principal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4f46e5" />
                        <stop offset="100%" stopColor="#7c3aed" />
                      </linearGradient>
                      <linearGradient id="interest-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">EMI</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      ₹{formatShort(calculations.monthlyEMI)}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">/month</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
                    <div>
                      <p className="text-[11px] font-medium text-slate-600 dark:text-slate-400">Principal</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{formatCurrency(calculations.loanAmount)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-400 to-red-400" />
                    <div>
                      <p className="text-[11px] font-medium text-slate-600 dark:text-slate-400">Interest</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{formatCurrency(calculations.totalInterest)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Schedule */}
              {calculations.schedule.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2.5 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                    Payment Schedule
                  </h4>
                  <div className="space-y-2">
                    {calculations.schedule.map((s) => (
                      <div
                        key={s.year}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50"
                      >
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                          Year {s.year}
                        </span>
                        <div className="flex items-center gap-4 text-[11px]">
                          <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                            Principal: {formatCurrency(s.principalPaid)}
                          </span>
                          <span className="text-amber-600 dark:text-amber-400 font-medium">
                            Interest: {formatCurrency(s.interestPaid)}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400 font-medium">
                            Balance: {formatCurrency(s.balance)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Affordability Note */}
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100/60 dark:border-emerald-900/30">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      Affordability Check
                    </p>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400/80 mt-0.5">
                      You can afford this if monthly income is{" "}
                      <span className="font-bold">
                        &ge; ₹{calculations.minMonthlyIncome.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                      </span>{" "}
                      (EMI should be &lt; 40% of income)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
