"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  AlertTriangle,
  Shield,
  FileCheck,
  ClipboardList,
  Download,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Info,
  Home,
  Sparkles,
} from "lucide-react";

/* ─── Types ─── */
type Importance = "Critical" | "Important" | "Recommended";

interface ChecklistItem {
  id: string;
  label: string;
  why: string;
  importance: Importance;
}

interface Phase {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  darkBgColor: string;
  borderColor: string;
  darkBorderColor: string;
  items: ChecklistItem[];
}

/* ─── Data ─── */
const phases: Phase[] = [
  {
    id: "before",
    title: "Before Signing",
    subtitle: "Verify these before committing to anything",
    icon: Shield,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50",
    darkBgColor: "dark:bg-amber-950/30",
    borderColor: "border-amber-200",
    darkBorderColor: "dark:border-amber-900/40",
    items: [
      {
        id: "b1",
        label: "Verify landlord ownership documents (sale deed / registry)",
        why: "Confirms the person renting to you actually owns the property. Without this, you could be dealing with a fraudster or unauthorized subletter. Ask for the original sale deed or property registry document.",
        importance: "Critical",
      },
      {
        id: "b2",
        label: "Check property tax receipts (confirms ownership)",
        why: "Property tax receipts are issued by the municipal corporation in the owner's name. This is an easy cross-verification of ownership that many tenants skip.",
        importance: "Critical",
      },
      {
        id: "b3",
        label: "Verify landlord Aadhaar / PAN card",
        why: "You need the landlord's identity proof for the rental agreement, police verification, and for your own security. A genuine landlord will have no issue sharing this.",
        importance: "Critical",
      },
      {
        id: "b4",
        label: "Inspect property condition and document with photos",
        why: "Take timestamped photos/videos of every room, wall, fixture, and appliance. This is your strongest evidence if the landlord later claims damage and deducts from your deposit.",
        importance: "Critical",
      },
      {
        id: "b5",
        label: "Check electricity and water meter readings",
        why: "Note down current meter readings before moving in. Without this, you might end up paying for the previous tenant's unpaid bills.",
        importance: "Important",
      },
      {
        id: "b6",
        label: "Verify society/association NOC if applicable",
        why: "Many housing societies require a No Objection Certificate before a new tenant can move in. Not having this can lead to issues with society services and access.",
        importance: "Important",
      },
      {
        id: "b7",
        label: "Confirm maintenance charges and what's included",
        why: "Maintenance can be ₹2,000-10,000/month. Know exactly what it covers (water, security, lift, generator, club) and who pays it — this should be in the agreement.",
        importance: "Important",
      },
      {
        id: "b8",
        label: "Clarify painting/repair responsibility at move-out",
        why: "The #1 reason for deposit disputes. Many landlords deduct ₹10,000-30,000 for painting. Get it in writing — ideally, painting after normal use should be the landlord's cost.",
        importance: "Important",
      },
      {
        id: "b9",
        label: "Discuss rent increase terms explicitly",
        why: "Standard annual increase is 5-10%. If not documented, landlords can demand unreasonable hikes. Get the exact percentage written in the agreement.",
        importance: "Important",
      },
      {
        id: "b10",
        label: "Check for any pending dues on the property",
        why: "Unpaid electricity bills, water charges, or society dues from previous tenants can become your headache. Verify all dues are cleared.",
        importance: "Recommended",
      },
    ],
  },
  {
    id: "during",
    title: "During Signing",
    subtitle: "Collect and secure these documents",
    icon: FileCheck,
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-50",
    darkBgColor: "dark:bg-indigo-950/30",
    borderColor: "border-indigo-200",
    darkBorderColor: "dark:border-indigo-900/40",
    items: [
      {
        id: "d1",
        label: "Signed rental agreement (2 copies)",
        why: "Both landlord and tenant should have an original signed copy. A single copy with the landlord puts you at a disadvantage in any dispute.",
        importance: "Critical",
      },
      {
        id: "d2",
        label: "Deposit payment receipt with amount and date",
        why: "Without a receipt, there is zero proof you paid the deposit. Many tenants lose ₹50,000-2,00,000 because they paid in cash with no receipt. Always get one, even for UPI payments.",
        importance: "Critical",
      },
      {
        id: "d3",
        label: "Copy of landlord's ID proof",
        why: "Required for police verification and essential if you ever need to take legal action. Keep a photocopy of their Aadhaar or PAN.",
        importance: "Critical",
      },
      {
        id: "d4",
        label: "Property condition report (signed by both parties)",
        why: "A jointly signed report listing the condition of walls, floors, fixtures, and appliances. This single document prevents 90% of deposit disputes at move-out.",
        importance: "Critical",
      },
      {
        id: "d5",
        label: "Key handover acknowledgment",
        why: "Document how many keys (main door, room, mailbox, gate) were handed over. Landlords sometimes claim keys were not returned to justify deposit deductions.",
        importance: "Important",
      },
      {
        id: "d6",
        label: "Society registration form if applicable",
        why: "Gated communities require tenant registration. Without it, you may face issues with security access, parking, amenities, and deliveries.",
        importance: "Important",
      },
      {
        id: "d7",
        label: "Emergency contact exchange",
        why: "Exchange emergency contacts with the landlord — who to call for plumbing emergencies at 2 AM, electrical issues, or if you are locked out.",
        importance: "Important",
      },
      {
        id: "d8",
        label: "Inventory list of furnished items (if furnished/semi-furnished)",
        why: "List every piece of furniture, appliance, and fixture with condition notes. Without this, you could be charged for items that were already damaged or missing.",
        importance: "Important",
      },
    ],
  },
  {
    id: "after",
    title: "After Move-in",
    subtitle: "Complete these within 30 days of moving in",
    icon: ClipboardList,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50",
    darkBgColor: "dark:bg-emerald-950/30",
    borderColor: "border-emerald-200",
    darkBorderColor: "dark:border-emerald-900/40",
    items: [
      {
        id: "a1",
        label: "Police verification / tenant registration",
        why: "Mandatory in most Indian cities. Failure to register can result in a fine for both landlord and tenant. In Bengaluru, it's required within 15 days. Visit your local police station or do it online.",
        importance: "Critical",
      },
      {
        id: "a2",
        label: "Electricity name transfer or new connection",
        why: "Get the electricity connection in your name or at least informed to the electricity board. This prevents billing disputes and ensures the connection isn't cut if the landlord has other properties with dues.",
        importance: "Important",
      },
      {
        id: "a3",
        label: "Water connection transfer",
        why: "Similar to electricity — inform the water supply authority about the new occupant to avoid billing issues.",
        importance: "Important",
      },
      {
        id: "a4",
        label: "Gas connection registration",
        why: "If using piped gas or taking over an existing LPG cylinder connection, register it in your name. This is both a safety requirement and ensures uninterrupted service.",
        importance: "Important",
      },
      {
        id: "a5",
        label: "Address change on Aadhaar (if staying long-term)",
        why: "Useful as address proof for bank accounts, SIM cards, and government services. UIDAI allows online address updates. Change it back when you move out.",
        importance: "Recommended",
      },
      {
        id: "a6",
        label: "Bank address update",
        why: "Update your bank's records with the new address for correspondence, debit card delivery, and KYC compliance.",
        importance: "Recommended",
      },
      {
        id: "a7",
        label: "Society / RWA introduction",
        why: "Introduce yourself to the Resident Welfare Association. This helps with building access, parking allocation, amenity usage, and being part of important community decisions.",
        importance: "Recommended",
      },
      {
        id: "a8",
        label: "Contents insurance for your belongings",
        why: "Optional but smart. A basic contents insurance policy (₹1,000-3,000/year) covers theft, fire, and natural disaster damage to your belongings worth lakhs.",
        importance: "Recommended",
      },
    ],
  },
];

const STORAGE_KEY = "99tolet-rental-checklist";

const importanceBadge: Record<Importance, { bg: string; text: string }> = {
  Critical: {
    bg: "bg-red-100 dark:bg-red-950/50 border-red-200 dark:border-red-900/50",
    text: "text-red-700 dark:text-red-300",
  },
  Important: {
    bg: "bg-amber-100 dark:bg-amber-950/50 border-amber-200 dark:border-amber-900/50",
    text: "text-amber-700 dark:text-amber-300",
  },
  Recommended: {
    bg: "bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50",
    text: "text-slate-600 dark:text-slate-400",
  },
};

/* ─── Main Component ─── */
export default function DocumentChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [expandedTip, setExpandedTip] = useState<string | null>(null);
  const [collapsedPhases, setCollapsedPhases] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch {}
    setMounted(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
      } catch {}
    }
  }, [checked, mounted]);

  const toggleItem = useCallback((id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const togglePhase = useCallback((id: string) => {
    setCollapsedPhases((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const totalItems = useMemo(
    () => phases.reduce((sum, p) => sum + p.items.length, 0),
    []
  );
  const checkedCount = useMemo(
    () => Object.values(checked).filter(Boolean).length,
    [checked]
  );
  const progress = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  function getPhaseProgress(phase: Phase) {
    const done = phase.items.filter((i) => checked[i.id]).length;
    return { done, total: phase.items.length, pct: (done / phase.items.length) * 100 };
  }

  function resetChecklist() {
    if (window.confirm("Reset all progress? This cannot be undone.")) {
      setChecked({});
    }
  }

  function downloadChecklist() {
    let text = "RENTAL DOCUMENT CHECKLIST\n";
    text += `Generated on ${new Date().toLocaleDateString("en-IN")}\n`;
    text += `Progress: ${checkedCount}/${totalItems} completed\n\n`;

    phases.forEach((phase) => {
      text += `${"=".repeat(60)}\n`;
      text += `${phase.title.toUpperCase()} — ${phase.subtitle}\n`;
      text += `${"=".repeat(60)}\n\n`;

      phase.items.forEach((item) => {
        const mark = checked[item.id] ? "[x]" : "[ ]";
        text += `${mark} ${item.label} [${item.importance}]\n`;
        text += `    Why: ${item.why}\n\n`;
      });
    });

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Rental_Checklist.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-8 sm:py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/50 mb-4">
            <ClipboardList className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 tracking-wide uppercase">
              Tenant&apos;s Essential Checklist
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white font-display">
            Rental Document Checklist
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Everything to verify, collect, and complete before, during, and after signing your
            rental agreement. Don&apos;t skip these — they protect your money.
          </p>
        </motion.div>

        {/* Overall Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-premium rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Overall Progress
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {checkedCount}
                <span className="text-base font-normal text-slate-500 dark:text-slate-400">
                  {" "}/ {totalItems} completed
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={downloadChecklist}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </button>
              <button
                onClick={resetChecklist}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full transition-colors duration-500 ${
                progress === 100
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                  : progress > 60
                  ? "bg-gradient-to-r from-indigo-500 to-violet-500"
                  : "bg-gradient-to-r from-indigo-500 to-indigo-400"
              }`}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          {progress === 100 && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 flex items-center gap-2 text-emerald-600 dark:text-emerald-400"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">All done! You&apos;re fully prepared for your rental.</span>
            </motion.div>
          )}
        </motion.div>

        {/* Phase Cards */}
        <div className="space-y-4">
          {phases.map((phase, phaseIdx) => {
            const Icon = phase.icon;
            const { done, total, pct } = getPhaseProgress(phase);
            const isCollapsed = collapsedPhases[phase.id];

            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + phaseIdx * 0.08 }}
                className="card-premium rounded-2xl overflow-hidden"
              >
                {/* Phase Header */}
                <button
                  onClick={() => togglePhase(phase.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl ${phase.bgColor} ${phase.darkBgColor} flex items-center justify-center`}
                    >
                      <Icon className={`w-5 h-5 ${phase.color}`} />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {phase.title}
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {phase.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${done === total ? "text-emerald-600 dark:text-emerald-400" : "text-slate-700 dark:text-slate-300"}`}>
                        {done}/{total}
                      </p>
                      <div className="w-20 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${done === total ? "bg-emerald-500" : "bg-indigo-500"}`}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    </div>
                    {isCollapsed ? (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Checklist Items */}
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-1">
                        {phase.items.map((item) => {
                          const isChecked = checked[item.id] || false;
                          const isExpanded = expandedTip === item.id;
                          const badge = importanceBadge[item.importance];

                          return (
                            <div key={item.id}>
                              <div
                                className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                                  isChecked
                                    ? "bg-emerald-50/60 dark:bg-emerald-950/20"
                                    : "hover:bg-slate-50 dark:hover:bg-slate-800/30"
                                }`}
                              >
                                {/* Checkbox */}
                                <button
                                  onClick={() => toggleItem(item.id)}
                                  className="mt-0.5 shrink-0 focus:outline-none"
                                  aria-label={`Toggle: ${item.label}`}
                                >
                                  {isChecked ? (
                                    <motion.div
                                      initial={{ scale: 0.8 }}
                                      animate={{ scale: 1 }}
                                      transition={{ type: "spring", stiffness: 400 }}
                                    >
                                      <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                                    </motion.div>
                                  ) : (
                                    <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-indigo-400 transition-colors" />
                                  )}
                                </button>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <p
                                      className={`text-sm font-medium transition-all ${
                                        isChecked
                                          ? "text-slate-500 dark:text-slate-500 line-through"
                                          : "text-slate-800 dark:text-slate-200"
                                      }`}
                                    >
                                      {item.label}
                                    </p>
                                    <span
                                      className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider border ${badge.bg} ${badge.text}`}
                                    >
                                      {item.importance}
                                    </span>
                                  </div>

                                  {/* Why tooltip toggle */}
                                  <button
                                    onClick={() =>
                                      setExpandedTip(isExpanded ? null : item.id)
                                    }
                                    className="inline-flex items-center gap-1 mt-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                                  >
                                    <Info className="w-3 h-3" />
                                    {isExpanded ? "Hide details" : "Why is this important?"}
                                  </button>

                                  <AnimatePresence>
                                    {isExpanded && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                      >
                                        <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                                          {item.why}
                                        </p>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Pro Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 card-premium rounded-2xl p-6"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Common Mistakes That Cost Tenants Money
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                title: "Paying deposit in cash without receipt",
                desc: "Always get a signed receipt. UPI/bank transfer has automatic proof.",
              },
              {
                title: "Not photographing the property before moving in",
                desc: "Timestamped photos are your best defense against unfair deposit deductions.",
              },
              {
                title: "Verbal agreements about painting costs",
                desc: "If it's not in the written agreement, it doesn't exist. Painting disputes are the #1 reason for deposit fights.",
              },
              {
                title: "Skipping police verification",
                desc: "It's legally mandatory. Both landlord and tenant can be fined for non-compliance.",
              },
            ].map((tip, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50"
              >
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  {tip.title}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center"
        >
          <a
            href="/tools/agreement"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all"
          >
            <Home className="w-4 h-4" />
            Generate Your Rental Agreement Free
          </a>
          <p className="text-xs text-slate-400 dark:text-slate-600 mt-3">
            Your checklist progress is saved in your browser automatically.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
