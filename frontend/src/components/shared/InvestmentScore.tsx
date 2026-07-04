"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Building2,
  Calculator,
  Ruler,
  CalendarDays,
  FileText,
  Lock,
  IndianRupee,
} from "lucide-react";
import type { Property } from "@/data/properties";
import EMICalculator from "./EMICalculator";

function formatCurrency(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} Lakh`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

function ScoreRing({ score }: { score: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const color =
    score >= 75
      ? { stroke: "url(#inv-high)", text: "text-emerald-600 dark:text-emerald-400", label: "Excellent" }
      : score >= 50
        ? { stroke: "url(#inv-mid)", text: "text-amber-600 dark:text-amber-400", label: "Good" }
        : { stroke: "url(#inv-low)", text: "text-red-500 dark:text-red-400", label: "Moderate" };

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-24 h-24 -rotate-90" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(99,102,241,0.08)" strokeWidth="5" />
        <motion.circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke={color.stroke}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="inv-high" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="inv-mid" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="inv-low" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-xl font-bold ${color.text} leading-none`}>{score}</span>
        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5">{color.label}</span>
      </div>
    </div>
  );
}

export default function InvestmentScore({ property }: { property: Property }) {
  const [emiOpen, setEmiOpen] = useState(false);

  // Sale properties
  if (property.listingType === "Sale") {
    const mockAvgPrice = property.pricePerSqft
      ? Math.round(property.pricePerSqft * 1.1)
      : undefined;

    return (
      <>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700 overflow-hidden shadow-sm">
          {/* Header */}
          <div className="px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-500/20">
              <TrendingUp className="w-3.5 h-3.5 text-white" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
              Investment Analysis
            </h3>
          </div>

          <div className="p-4 space-y-4">
            {/* Score Ring */}
            {property.investmentScore !== undefined && (
              <div className="flex items-center gap-4">
                <ScoreRing score={property.investmentScore} />
                <div className="flex-1 space-y-1.5">
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Investment Score
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Based on location, appreciation, and market demand analysis.
                  </p>
                </div>
              </div>
            )}

            {/* Appreciation Trend */}
            {property.appreciationTrend && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100/60 dark:border-emerald-900/30">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  Appreciation
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  {property.appreciationTrend}
                </span>
              </div>
            )}

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Price/sqft */}
              {property.pricePerSqft && (
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Ruler className="w-3 h-3 text-slate-400" />
                    <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">Price/sqft</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">₹{property.pricePerSqft.toLocaleString("en-IN")}</p>
                </div>
              )}

              {/* Possession */}
              {property.possessionStatus && (
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Building2 className="w-3 h-3 text-slate-400" />
                    <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">Possession</span>
                  </div>
                  <p className={`text-xs font-bold ${
                    property.possessionStatus === "Ready"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : property.possessionStatus === "Under Construction"
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-indigo-600 dark:text-indigo-400"
                  }`}>
                    {property.possessionStatus}
                  </p>
                </div>
              )}

              {/* Age */}
              {property.ageOfProperty && (
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">Age</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{property.ageOfProperty}</p>
                </div>
              )}

              {/* RERA */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center gap-1.5 mb-1">
                  {property.reraRegistered ? (
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 text-amber-500" />
                  )}
                  <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">RERA</span>
                </div>
                <p className={`text-xs font-bold ${
                  property.reraRegistered
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-amber-600 dark:text-amber-400"
                }`}>
                  {property.reraRegistered ? "Registered" : "Not Verified"}
                </p>
              </div>
            </div>

            {/* EMI Estimate */}
            {property.emiEstimate && (
              <button
                onClick={() => setEmiOpen(true)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100/60 dark:border-indigo-900/30 hover:bg-indigo-100/70 dark:hover:bg-indigo-950/30 transition-colors group"
              >
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-indigo-500" />
                  EMI Estimate
                </span>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline">
                  ₹{property.emiEstimate.toLocaleString("en-IN")}/mo
                </span>
              </button>
            )}

            {/* Area Comparison */}
            {mockAvgPrice && (
              <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-950/20 border border-violet-100/60 dark:border-violet-900/30">
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Average price in <span className="font-semibold">{property.locality}</span>:{" "}
                  <span className="font-bold text-violet-600 dark:text-violet-400">₹{mockAvgPrice.toLocaleString("en-IN")}/sqft</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* EMI Calculator Modal */}
        {property.salePrice && (
          <EMICalculator
            salePrice={property.salePrice}
            isOpen={emiOpen}
            onClose={() => setEmiOpen(false)}
          />
        )}
      </>
    );
  }

  // Lease properties
  if (property.listingType === "Lease") {
    const monthlyRent = property.price;
    const leaseDurationMonths = property.leaseDuration
      ? parseInt(property.leaseDuration) * 12
      : 36;
    const totalCommitment = monthlyRent * leaseDurationMonths;

    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-md shadow-cyan-500/20">
            <FileText className="w-3.5 h-3.5 text-white" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
            Lease Details
          </h3>
        </div>

        <div className="p-4 space-y-3">
          {/* Lease Duration */}
          {property.leaseDuration && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-100/60 dark:border-cyan-900/30">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5 text-cyan-500" />
                Lease Duration
              </span>
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                {property.leaseDuration}
              </span>
            </div>
          )}

          {/* Lock-in Period */}
          {property.lockInPeriod && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100/60 dark:border-amber-900/30">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-500" />
                Lock-in Period
              </span>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                {property.lockInPeriod}
              </span>
            </div>
          )}

          {/* Monthly Cost */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100/60 dark:border-indigo-900/30">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-indigo-500" />
              Monthly Rent
            </span>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              ₹{monthlyRent.toLocaleString("en-IN")}
            </span>
          </div>

          {/* Total Lease Commitment */}
          <div className="p-3.5 rounded-xl bg-violet-50 dark:bg-violet-950/20 border border-violet-100/60 dark:border-violet-900/30">
            <p className="text-[10px] font-medium text-violet-500 dark:text-violet-400 uppercase tracking-wider mb-1">
              Total Lease Commitment
            </p>
            <p className="text-lg font-bold text-violet-700 dark:text-violet-300 font-display">
              {formatCurrency(totalCommitment)}
            </p>
            <p className="text-[11px] text-violet-500 dark:text-violet-400/70 mt-0.5">
              Over {leaseDurationMonths} months ({(leaseDurationMonths / 12).toFixed(0)} years)
            </p>
          </div>

          {/* Deposit */}
          {property.deposit > 0 && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Security Deposit</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                ₹{property.deposit.toLocaleString("en-IN")}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Rent — do not render
  return null;
}
