"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, BellOff, TrendingDown, Sparkles } from "lucide-react";

interface PriceDropAlertProps {
  propertyId: string;
  propertyTitle: string;
  currentPrice: number;
  belowMarket?: boolean;
}

const STORAGE_KEY = "99tolet-price-alerts";

function getAlerts(): Record<string, boolean> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function setAlerts(alerts: Record<string, boolean>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
}

export default function PriceDropAlert({
  propertyId,
  propertyTitle,
  currentPrice,
  belowMarket,
}: PriceDropAlertProps) {
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const alerts = getAlerts();
    setActive(!!alerts[propertyId]);
  }, [propertyId]);

  const toggle = () => {
    const alerts = getAlerts();
    const next = !active;
    if (next) {
      alerts[propertyId] = true;
    } else {
      delete alerts[propertyId];
    }
    setAlerts(alerts);
    setActive(next);
  };

  if (!mounted) return null;

  // If below market, show special badge
  if (belowMarket) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800"
      >
        <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
        <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
          Already below market — great deal!
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <button
        onClick={toggle}
        className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
          active
            ? "bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300"
            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700"
        }`}
      >
        <span className="flex items-center gap-2">
          {active ? (
            <BellOff className="w-4 h-4" />
          ) : (
            <Bell className="w-4 h-4" />
          )}
          {active ? "Price Alert Active" : "Alert me if price drops"}
        </span>

        {/* Toggle pill */}
        <div
          className={`relative w-9 h-5 rounded-full transition-colors ${
            active ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-600"
          }`}
        >
          <motion.div
            className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
            animate={{ left: active ? 18 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </div>
      </button>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-800/50">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400">
                You&apos;ll be notified if rent drops below {"\u20B9"}
                {currentPrice.toLocaleString("en-IN")}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
