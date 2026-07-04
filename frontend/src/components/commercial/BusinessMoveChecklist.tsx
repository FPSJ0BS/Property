"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  FileText,
  Wifi,
  Armchair,
  DoorOpen,
  ShieldCheck,
  CreditCard,
  Monitor,
  UtensilsCrossed,
  PenTool,
  Flame,
  Users,
  Briefcase,
  MapPin,
  ClipboardList,
  Store,
  ShoppingCart,
  Lightbulb,
  Eye,
  Camera,
  Megaphone,
  MessageSquare,
  GraduationCap,
  Truck,
  Box,
  Zap,
  Lock,
  Globe,
  BarChart3,
  Car,
  CalendarClock,
  Handshake,
  Route,
  FileCheck,
  Shield,
} from "lucide-react";

interface ChecklistItem {
  id: string;
  label: string;
  icon: React.ElementType;
  category: "week1" | "week2-3" | "month1";
}

const officeChecklist: ChecklistItem[] = [
  // Week 1
  { id: "off-lease", label: "Finalize lease agreement", icon: FileText, category: "week1" },
  { id: "off-internet", label: "Set up internet and phone lines", icon: Wifi, category: "week1" },
  { id: "off-furniture", label: "Order furniture and equipment", icon: Armchair, category: "week1" },
  { id: "off-reception", label: "Set up reception area", icon: DoorOpen, category: "week1" },
  { id: "off-security", label: "Activate security system", icon: ShieldCheck, category: "week1" },
  // Week 2-3
  { id: "off-access", label: "Employee access cards/parking", icon: CreditCard, category: "week2-3" },
  { id: "off-it", label: "IT infrastructure setup", icon: Monitor, category: "week2-3" },
  { id: "off-kitchen", label: "Kitchen/pantry setup", icon: UtensilsCrossed, category: "week2-3" },
  { id: "off-signage", label: "Signage installation", icon: PenTool, category: "week2-3" },
  { id: "off-fire", label: "Fire safety compliance", icon: Flame, category: "week2-3" },
  // Month 1
  { id: "off-meeting", label: "Client meeting room ready", icon: Users, category: "month1" },
  { id: "off-cafeteria", label: "Cafeteria/food partnerships", icon: UtensilsCrossed, category: "month1" },
  { id: "off-orientation", label: "Employee orientation", icon: Briefcase, category: "month1" },
  { id: "off-address", label: "Business address updates", icon: MapPin, category: "month1" },
  { id: "off-compliance", label: "Compliance documentation", icon: ClipboardList, category: "month1" },
];

const retailChecklist: ChecklistItem[] = [
  // Week 1
  { id: "ret-signage", label: "Shopfront signage", icon: Store, category: "week1" },
  { id: "ret-pos", label: "POS system setup", icon: Monitor, category: "week1" },
  { id: "ret-inventory", label: "Inventory placement", icon: ShoppingCart, category: "week1" },
  { id: "ret-staff", label: "Staff hiring", icon: Users, category: "week1" },
  { id: "ret-power", label: "Power and lighting", icon: Lightbulb, category: "week1" },
  // Week 2-3
  { id: "ret-visual", label: "Visual merchandising", icon: Eye, category: "week2-3" },
  { id: "ret-flow", label: "Customer flow optimization", icon: Route, category: "week2-3" },
  { id: "ret-camera", label: "Security cameras", icon: Camera, category: "week2-3" },
  { id: "ret-payment", label: "Payment systems", icon: CreditCard, category: "week2-3" },
  { id: "ret-promo", label: "Opening promotion", icon: Megaphone, category: "week2-3" },
  // Month 1
  { id: "ret-feedback", label: "Customer feedback system", icon: MessageSquare, category: "month1" },
  { id: "ret-training", label: "Staff training", icon: GraduationCap, category: "month1" },
  { id: "ret-supplier", label: "Supplier relationships", icon: Handshake, category: "month1" },
  { id: "ret-marketing", label: "Local marketing", icon: Megaphone, category: "month1" },
];

const warehouseChecklist: ChecklistItem[] = [
  // Week 1
  { id: "wh-loading", label: "Loading bay setup", icon: Truck, category: "week1" },
  { id: "wh-racking", label: "Racking and storage", icon: Box, category: "week1" },
  { id: "wh-power", label: "Power systems", icon: Zap, category: "week1" },
  { id: "wh-security", label: "Security and CCTV", icon: Lock, category: "week1" },
  { id: "wh-internet", label: "Internet for operations", icon: Globe, category: "week1" },
  // Week 2-3
  { id: "wh-inventory", label: "Inventory management system", icon: BarChart3, category: "week2-3" },
  { id: "wh-vehicle", label: "Vehicle access protocols", icon: Car, category: "week2-3" },
  { id: "wh-fire", label: "Fire safety", icon: Flame, category: "week2-3" },
  { id: "wh-staff", label: "Staff zones", icon: Users, category: "week2-3" },
  { id: "wh-schedules", label: "Loading schedules", icon: CalendarClock, category: "week2-3" },
  // Month 1
  { id: "wh-vendor", label: "Vendor coordination", icon: Handshake, category: "month1" },
  { id: "wh-route", label: "Route optimization", icon: Route, category: "month1" },
  { id: "wh-compliance", label: "Compliance audits", icon: FileCheck, category: "month1" },
  { id: "wh-insurance", label: "Insurance", icon: Shield, category: "month1" },
];

const checklistMap: Record<string, ChecklistItem[]> = {
  office: officeChecklist,
  retail: retailChecklist,
  warehouse: warehouseChecklist,
};

const categoryLabels: Record<
  ChecklistItem["category"],
  { label: string; color: string }
> = {
  week1: {
    label: "Week 1 -- Setup Essentials",
    color:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  "week2-3": {
    label: "Week 2-3 -- Operational Readiness",
    color:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  month1: {
    label: "Month 1 -- Full Operations",
    color:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
};

interface BusinessMoveChecklistProps {
  businessType: string;
  variant?: "compact" | "full";
}

export default function BusinessMoveChecklist({
  businessType,
  variant = "full",
}: BusinessMoveChecklistProps) {
  const normalizedType = businessType.toLowerCase();
  const items =
    checklistMap[normalizedType] || checklistMap.office;

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
    variant === "compact" && !expanded ? items.slice(0, 5) : items;

  const completedCount = checked.size;
  const totalCount = items.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  // Group items by category
  const grouped = displayItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, ChecklistItem[]>
  );

  const categoryOrder: ChecklistItem["category"][] = [
    "week1",
    "week2-3",
    "month1",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-lg dark:border-gray-800 dark:bg-gray-900 sm:p-6"
    >
      {/* Premium top accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-emerald-500 to-violet-500" />

      {/* Header */}
      <div className="mb-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
          Business Move Checklist
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-xs font-semibold capitalize text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
            {normalizedType}
          </span>{" "}
          setup — {completedCount} of {totalCount} completed
        </p>

        {/* Progress Bar */}
        <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        {progress === 100 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400"
          >
            All tasks completed! You are ready for business.
          </motion.p>
        )}
      </div>

      {/* Checklist */}
      <div className="space-y-5">
        {categoryOrder.map((cat) => {
          const catItems = grouped[cat];
          if (!catItems) return null;
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
                  {catItems.map((item) => {
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
