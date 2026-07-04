"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  FileText,
  Zap,
  Droplets,
  Flame,
  Wifi,
  ShoppingCart,
  Heart,
  Store,
  GraduationCap,
  Landmark,
  Car,
  Dumbbell,
  UtensilsCrossed,
  Users,
  MessageCircle,
  Wrench,
  Shield,
  TreePine,
  ChevronDown,
} from "lucide-react";

interface ChecklistItem {
  id: string;
  label: string;
  icon: React.ElementType;
  category: "week1" | "week2-3" | "month1";
}

const checklistItems: ChecklistItem[] = [
  // Week 1
  { id: "rental-agreement", label: "Verify rental agreement", icon: FileText, category: "week1" },
  { id: "electricity", label: "Set up electricity connection", icon: Zap, category: "week1" },
  { id: "water", label: "Get water supply sorted", icon: Droplets, category: "week1" },
  { id: "gas", label: "Register for gas connection", icon: Flame, category: "week1" },
  { id: "wifi", label: "Set up WiFi/internet", icon: Wifi, category: "week1" },
  { id: "grocery", label: "Find nearest grocery store", icon: ShoppingCart, category: "week1" },
  { id: "hospital", label: "Locate nearest hospital/clinic", icon: Heart, category: "week1" },

  // Week 2-3
  { id: "markets", label: "Explore neighborhood markets", icon: Store, category: "week2-3" },
  { id: "schools", label: "Find schools/daycare nearby", icon: GraduationCap, category: "week2-3" },
  { id: "bank", label: "Set up bank account if new city", icon: Landmark, category: "week2-3" },
  { id: "parking", label: "Register vehicle/parking", icon: Car, category: "week2-3" },
  { id: "gym", label: "Find gym/fitness center", icon: Dumbbell, category: "week2-3" },
  { id: "restaurants", label: "Discover local restaurants", icon: UtensilsCrossed, category: "week2-3" },

  // Month 1
  { id: "neighbors", label: "Meet neighbors", icon: Users, category: "month1" },
  { id: "community", label: "Join local community groups", icon: MessageCircle, category: "month1" },
  { id: "maintenance", label: "Set up maintenance contacts", icon: Wrench, category: "month1" },
  { id: "police", label: "Register at local police station", icon: Shield, category: "month1" },
  { id: "recreation", label: "Explore parks and recreation", icon: TreePine, category: "month1" },
];

const categoryLabels: Record<ChecklistItem["category"], { label: string; color: string }> = {
  week1: {
    label: "Week 1 — Move-in Essentials",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  "week2-3": {
    label: "Week 2-3 — Settle In",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  month1: {
    label: "Month 1 — Build Your Life",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
};

interface SettlementChecklistProps {
  variant?: "compact" | "full";
}

export default function SettlementChecklist({
  variant = "full",
}: SettlementChecklistProps) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState(variant === "full");

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const displayItems =
    variant === "compact" && !expanded
      ? checklistItems.slice(0, 5)
      : checklistItems;

  const completedCount = checked.size;
  const totalCount = checklistItems.length;
  const progress = (completedCount / totalCount) * 100;

  // Group items by category
  const grouped = displayItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, ChecklistItem[]>
  );

  const categoryOrder: ChecklistItem["category"][] = ["week1", "week2-3", "month1"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6"
    >
      {/* Header */}
      <div className="mb-5">
        <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
          Your First 30 Days
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Settlement checklist — {completedCount} of {totalCount} completed
        </p>

        {/* Progress Bar */}
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <motion.div
            className="h-full rounded-full bg-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-5">
        {categoryOrder.map((cat) => {
          const items = grouped[cat];
          if (!items) return null;
          const catConfig = categoryLabels[cat];

          return (
            <div key={cat}>
              <span
                className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${catConfig.color}`}
              >
                {catConfig.label}
              </span>
              <div className="space-y-1">
                <AnimatePresence>
                  {items.map((item) => {
                    const Icon = item.icon;
                    const isChecked = checked.has(item.id);

                    return (
                      <motion.button
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        onClick={() => toggle(item.id)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                          isChecked ? "opacity-60" : ""
                        }`}
                      >
                        {isChecked ? (
                          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                        ) : (
                          <Circle className="h-5 w-5 flex-shrink-0 text-gray-300 dark:text-gray-600" />
                        )}
                        <Icon className="h-4 w-4 flex-shrink-0 text-gray-400 dark:text-gray-500" />
                        <span
                          className={`text-sm font-medium ${
                            isChecked
                              ? "text-gray-400 line-through dark:text-gray-500"
                              : "text-gray-800 dark:text-gray-200"
                          }`}
                        >
                          {item.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Compact CTA */}
      {variant === "compact" && !expanded && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setExpanded(true)}
          className="mt-4 flex w-full items-center justify-center gap-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-emerald-600 transition-colors hover:bg-emerald-50 dark:border-gray-700 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
        >
          See full checklist
          <ChevronDown className="h-4 w-4" />
        </motion.button>
      )}
    </motion.div>
  );
}
