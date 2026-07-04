"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckSquare, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import type { Property } from "@/data/properties";

interface ChecklistItem {
  id: string;
  label: string;
}

function getChecklist(property: Property): { items: ChecklistItem[]; label: string } {
  const type = property.type;
  const listingType = property.listingType;

  if (listingType === "Sale") {
    return {
      label: "Purchase Property",
      items: [
        { id: "stamp-duty", label: "Pay stamp duty and registration fees" },
        { id: "registration", label: "Complete property registration at sub-registrar" },
        { id: "loan-disburse", label: "Ensure home loan disbursement" },
        { id: "possession-letter", label: "Collect possession letter from builder/seller" },
        { id: "key-handover", label: "Key handover and physical inspection" },
        { id: "mutation", label: "Apply for property mutation at municipal office" },
        { id: "society-transfer", label: "Society share certificate transfer" },
        { id: "utility-transfer", label: "Transfer electricity and water connections" },
        { id: "insurance", label: "Set up property insurance" },
      ],
    };
  }

  if (listingType === "Lease") {
    return {
      label: "Lease Property",
      items: [
        { id: "agreement-reg", label: "Register lease agreement at sub-registrar" },
        { id: "security-escrow", label: "Security deposit escrow arrangement" },
        { id: "lock-in-ack", label: "Acknowledge lock-in period terms" },
        { id: "escalation-review", label: "Review rent escalation clause" },
        { id: "exit-clause", label: "Understand exit and termination clauses" },
        { id: "maintenance-terms", label: "Clarify maintenance responsibility" },
        { id: "insurance-clause", label: "Review insurance and liability clauses" },
        { id: "fit-out", label: "Plan and execute interior fit-out" },
      ],
    };
  }

  if (type === "co-living") {
    return {
      label: "Co-Living Space",
      items: [
        { id: "wifi-check", label: "Test WiFi speed and coverage in room" },
        { id: "house-rules", label: "Review house rules and community guidelines" },
        { id: "community-intro", label: "Attend community introduction session" },
        { id: "laundry-setup", label: "Set up laundry schedule and access" },
        { id: "meal-plan", label: "Activate meal plan (if applicable)" },
        { id: "key-card", label: "Collect access key card or digital key" },
        { id: "emergency-contacts", label: "Save emergency contacts and manager number" },
        { id: "inventory-check", label: "Complete room inventory checklist" },
      ],
    };
  }

  if (type === "commercial" || type === "industrial") {
    return {
      label: "Commercial/Office Space",
      items: [
        { id: "internet-setup", label: "Set up high-speed internet and IT infrastructure" },
        { id: "furniture", label: "Arrange office furniture and workstations" },
        { id: "signage", label: "Install company signage and branding" },
        { id: "reception", label: "Set up reception and visitor management" },
        { id: "fire-safety", label: "Complete fire safety compliance check" },
        { id: "access-cards", label: "Arrange employee access cards and biometrics" },
        { id: "electrical", label: "Verify electrical load capacity" },
        { id: "pest-control", label: "Schedule initial pest control treatment" },
        { id: "vendor-setup", label: "Set up housekeeping and pantry vendors" },
      ],
    };
  }

  // Default: residential rent
  return {
    label: "Residential Rental",
    items: [
      { id: "electricity", label: "Transfer electricity connection to your name" },
      { id: "water", label: "Set up water supply and billing" },
      { id: "gas", label: "Get gas connection (piped/cylinder)" },
      { id: "internet", label: "Set up broadband internet connection" },
      { id: "police-verification", label: "Complete police verification for tenant" },
      { id: "society-reg", label: "Register with housing society/RWA" },
      { id: "inventory", label: "Document existing inventory and condition" },
      { id: "spare-keys", label: "Get spare keys from landlord" },
      { id: "neighbor-intro", label: "Introduce yourself to immediate neighbors" },
      { id: "emergency", label: "Note emergency exits and fire equipment locations" },
    ],
  };
}

export default function AdaptiveChecklist({ property }: { property: Property }) {
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const { items, label } = getChecklist(property);
  const storageKey = `99tolet-checklist-${property.id}`;

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) setChecked(JSON.parse(stored));
    } catch {}
  }, [storageKey]);

  const toggleItem = useCallback(
    (id: string) => {
      setChecked((prev) => {
        const next = { ...prev, [id]: !prev[id] };
        localStorage.setItem(storageKey, JSON.stringify(next));
        return next;
      });
    },
    [storageKey]
  );

  const completedCount = items.filter((i) => checked[i.id]).length;
  const progress = Math.round((completedCount / items.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
    >
      {/* Header — always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center shrink-0">
            <CheckSquare className="w-4.5 h-4.5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
              Move-in Checklist
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {completedCount} of {items.length} completed
              </span>
              <span className="flex items-center gap-1 text-[10px] font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-1.5 py-0.5 rounded-full">
                <Sparkles className="w-2.5 h-2.5" />
                Adapted for {label}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {/* Mini progress bar */}
          <div className="hidden sm:block w-20 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
            {progress}%
          </span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          )}
        </div>
      </button>

      {/* Checklist body */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 space-y-1">
              {/* Full progress bar */}
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-3">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>

              {items.map((item, idx) => (
                <motion.label
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors ${
                    checked[item.id]
                      ? "bg-emerald-50/60 dark:bg-emerald-950/20"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={!!checked[item.id]}
                    onChange={() => toggleItem(item.id)}
                    className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500 dark:bg-slate-800 cursor-pointer"
                  />
                  <span
                    className={`text-sm transition-colors ${
                      checked[item.id]
                        ? "text-slate-400 dark:text-slate-500 line-through"
                        : "text-slate-700 dark:text-slate-200"
                    }`}
                  >
                    {item.label}
                  </span>
                </motion.label>
              ))}

              {completedCount === items.length && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center"
                >
                  <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                    All done! You&apos;re fully set up.
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
