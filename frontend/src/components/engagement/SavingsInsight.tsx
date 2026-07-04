"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingDown, Car, Wallet, PiggyBank } from "lucide-react";
import type { Property } from "@/data/properties";
import type { Area } from "@/data/areas";

interface SavingsInsightProps {
  property: Property;
  area: Area;
}

function AnimatedNumber({ target, prefix = "" }: { target: number; prefix?: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const increment = target / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      if (step >= steps) {
        setCurrent(target);
        clearInterval(timer);
      } else {
        setCurrent(Math.round(increment * step));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span className="text-emerald-500 font-bold">
      {prefix}{current.toLocaleString("en-IN")}
    </span>
  );
}

export default function SavingsInsight({ property, area }: SavingsInsightProps) {
  // Calculate rent savings
  const cityAvgRent = 20000; // Jaipur average for comparable unit
  const rentSaving =
    property.fairRent === "Below Market"
      ? Math.max(0, cityAvgRent - property.price + Math.round(property.price * 0.12))
      : 0;

  // Commute savings based on transit score
  // Higher transit = less spent on private transport
  const maxCommuteCost = 4000;
  const commuteSaving = Math.round((area.transitScore / 100) * maxCommuteCost);

  // Deposit savings
  const threeMonthDeposit = property.price * 3;
  const depositSaving = property.lowDeposit
    ? Math.max(0, threeMonthDeposit - property.deposit)
    : 0;

  const monthlyTotal = rentSaving + commuteSaving;
  const annualTotal = monthlyTotal * 12 + depositSaving;

  const savings = [
    ...(rentSaving > 0
      ? [
          {
            icon: TrendingDown,
            label: "Rent savings",
            amount: rentSaving,
            suffix: "/month below market average",
          },
        ]
      : []),
    {
      icon: Car,
      label: "Commute savings",
      amount: commuteSaving,
      suffix: "/month on transport",
    },
    ...(depositSaving > 0
      ? [
          {
            icon: Wallet,
            label: "Deposit savings",
            amount: depositSaving,
            suffix: " saved vs 3-month norm",
          },
        ]
      : []),
  ];

  if (savings.length === 0 && annualTotal === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl overflow-hidden
        bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30
        border border-emerald-200/60 dark:border-emerald-800/40
        p-4"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center">
          <PiggyBank className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
            Living here saves you...
          </h4>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Compared to Jaipur city average
          </p>
        </div>
      </div>

      {/* Savings breakdown */}
      <div className="space-y-3 mb-4">
        {savings.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="flex items-start gap-2.5"
          >
            <div className="w-6 h-6 rounded-md bg-white/80 dark:bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
              <item.icon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300">
                <AnimatedNumber target={item.amount} prefix={"\u20b9"} />
                <span className="text-zinc-500 dark:text-zinc-400">
                  {item.suffix}
                </span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Total annual savings */}
      {annualTotal > 0 && (
        <div className="pt-3 border-t border-emerald-200/60 dark:border-emerald-800/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Est. annual savings
            </span>
            <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              <AnimatedNumber target={annualTotal} prefix={"\u20b9"} />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
