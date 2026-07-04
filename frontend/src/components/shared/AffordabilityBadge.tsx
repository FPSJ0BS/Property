"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertTriangle, XCircle, Wallet, X } from "lucide-react";
import { useAffordability } from "@/lib/store";

interface AffordabilityBadgeProps {
  rent: number;
  compact?: boolean;
}

const statusConfig = {
  comfortable: {
    label: "Within Budget",
    icon: CheckCircle,
    dotColor: "bg-emerald-500",
    badgeBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    badgeText: "text-emerald-700 dark:text-emerald-400",
    badgeBorder: "border-emerald-200 dark:border-emerald-800",
    popoverAccent: "text-emerald-600 dark:text-emerald-400",
  },
  stretching: {
    label: "Stretching Budget",
    icon: AlertTriangle,
    dotColor: "bg-amber-500",
    badgeBg: "bg-amber-500/10 dark:bg-amber-500/20",
    badgeText: "text-amber-700 dark:text-amber-400",
    badgeBorder: "border-amber-200 dark:border-amber-800",
    popoverAccent: "text-amber-600 dark:text-amber-400",
  },
  expensive: {
    label: "Over Budget",
    icon: XCircle,
    dotColor: "bg-red-500",
    badgeBg: "bg-red-500/10 dark:bg-red-500/20",
    badgeText: "text-red-700 dark:text-red-400",
    badgeBorder: "border-red-200 dark:border-red-800",
    popoverAccent: "text-red-600 dark:text-red-400",
  },
};

export default function AffordabilityBadge({ rent, compact = false }: AffordabilityBadgeProps) {
  const { income, setIncome, canAfford, getRatio } = useAffordability();
  const [showPopover, setShowPopover] = useState(false);
  const [editingIncome, setEditingIncome] = useState(false);
  const [incomeInput, setIncomeInput] = useState("");
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const status = canAfford(rent);
  const ratio = getRatio(rent);

  // Close popover on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setShowPopover(false);
        setEditingIncome(false);
      }
    }
    if (showPopover) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPopover]);

  const handleSaveIncome = () => {
    const val = parseInt(incomeInput.replace(/[^0-9]/g, ""));
    if (val > 0) {
      setIncome(val);
      setEditingIncome(false);
      setIncomeInput("");
    }
  };

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  // No income set
  if (!status) {
    if (compact) return null;
    return (
      <div className="relative inline-flex">
        <button
          ref={triggerRef}
          onClick={() => {
            setShowPopover(true);
            setEditingIncome(true);
          }}
          className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors flex items-center gap-1"
        >
          <Wallet className="w-3 h-3" />
          <span>Set budget</span>
        </button>

        <AnimatePresence>
          {showPopover && (
            <motion.div
              ref={popoverRef}
              initial={{ opacity: 0, y: 4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 top-full mt-2 left-0 w-64 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Set Monthly Income</p>
                <button onClick={() => setShowPopover(false)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                We&apos;ll show affordability badges on every property.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 50000"
                  value={incomeInput}
                  onChange={(e) => setIncomeInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveIncome()}
                  className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 outline-none"
                  autoFocus
                />
                <button
                  onClick={handleSaveIncome}
                  className="px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const config = statusConfig[status];
  const Icon = config.icon;

  // Compact mode: colored dot with tooltip
  if (compact) {
    return (
      <div className="relative inline-flex group">
        <button
          ref={triggerRef}
          onClick={() => setShowPopover(!showPopover)}
          className="relative"
          aria-label={config.label}
        >
          <span className={`block w-2.5 h-2.5 rounded-full ${config.dotColor}`} />
          {/* Tooltip on hover */}
          <span className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 text-[10px] font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
            {config.label} ({ratio}%)
          </span>
        </button>

        <AnimatePresence>
          {showPopover && (
            <motion.div
              ref={popoverRef}
              initial={{ opacity: 0, y: 4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 top-full mt-2 right-0 w-56 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-semibold ${config.popoverAccent}`}>{config.label}</span>
                <button onClick={() => setShowPopover(false)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
                  <X className="w-3 h-3" />
                </button>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 mb-2">
                Income: {formatCurrency(income)}. This rent is <strong>{ratio}%</strong> of income.
              </p>
              <button
                onClick={() => {
                  setEditingIncome(true);
                  setIncomeInput(income.toString());
                }}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                Update Income
              </button>
              {editingIncome && (
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={incomeInput}
                    onChange={(e) => setIncomeInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveIncome()}
                    className="flex-1 px-2 py-1 text-xs rounded-md border border-zinc-200 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 outline-none"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveIncome}
                    className="px-2 py-1 text-xs font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Full mode: badge with text + percentage
  return (
    <div className="relative inline-flex">
      <motion.button
        ref={triggerRef}
        onClick={() => setShowPopover(!showPopover)}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.badgeBg} ${config.badgeText} ${config.badgeBorder} transition-shadow hover:shadow-sm`}
      >
        <Icon className="w-3.5 h-3.5" />
        <span>{config.label}</span>
        <span className="opacity-70">{ratio}%</span>
      </motion.button>

      <AnimatePresence>
        {showPopover && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 top-full mt-2 left-0 w-64 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-semibold ${config.popoverAccent}`}>{config.label}</span>
              <button onClick={() => setShowPopover(false)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-1.5 mb-3">
              <p className="text-xs text-zinc-600 dark:text-zinc-300">
                Your monthly income: <strong>{formatCurrency(income)}</strong>
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-300">
                This rent ({formatCurrency(rent)}) is <strong className={config.popoverAccent}>{ratio}% of your income</strong>.
              </p>
              {status === "comfortable" && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400">Recommended: Rent should be under 30% of income.</p>
              )}
              {status === "stretching" && (
                <p className="text-xs text-amber-600 dark:text-amber-400">This is between 30-40% of income. Manageable, but tight.</p>
              )}
              {status === "expensive" && (
                <p className="text-xs text-red-600 dark:text-red-400">Above 40% of income. Consider more affordable options.</p>
              )}
            </div>
            <button
              onClick={() => {
                setEditingIncome(true);
                setIncomeInput(income.toString());
              }}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Update Income
            </button>
            {editingIncome && (
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  inputMode="numeric"
                  value={incomeInput}
                  onChange={(e) => setIncomeInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveIncome()}
                  className="flex-1 px-2.5 py-1.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  onClick={handleSaveIncome}
                  className="px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
