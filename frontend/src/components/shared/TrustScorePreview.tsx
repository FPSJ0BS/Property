"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  ShieldCheck,
  Phone,
  Mail,
  CreditCard,
  Briefcase,
  UserCheck,
  Building,
  FileCheck,
  Eye,
  Star,
  Sparkles,
  Zap,
  TrendingUp,
  Crown,
  ArrowRight,
  Lock,
  CheckCircle2,
  Circle,
  ChevronRight,
} from "lucide-react";

interface TrustScorePreviewProps {
  variant: "tenant" | "landlord";
}

interface Step {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  completed: boolean;
  cta: string;
}

interface Level {
  name: string;
  minSteps: number;
  color: string;
  bgGradient: string;
  borderColor: string;
  textColor: string;
  benefits: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const TENANT_STEPS: Step[] = [
  { id: "phone", label: "Phone Verified", icon: Phone, completed: true, cta: "Verified" },
  { id: "email", label: "Email Verified", icon: Mail, completed: true, cta: "Verified" },
  { id: "aadhaar", label: "Aadhaar Verification", icon: CreditCard, completed: false, cta: "Verify Now" },
  { id: "employment", label: "Employment Proof", icon: Briefcase, completed: false, cta: "Upload" },
  { id: "landlord-ref", label: "Previous Landlord Reference", icon: UserCheck, completed: false, cta: "Add" },
  { id: "bank", label: "Bank Statement", icon: FileCheck, completed: false, cta: "Upload" },
];

const LANDLORD_STEPS: Step[] = [
  { id: "phone", label: "Phone Verified", icon: Phone, completed: true, cta: "Verified" },
  { id: "email", label: "Email Verified", icon: Mail, completed: true, cta: "Verified" },
  { id: "aadhaar", label: "Aadhaar Verification", icon: CreditCard, completed: false, cta: "Verify Now" },
  { id: "ownership", label: "Property Ownership Docs", icon: Building, completed: false, cta: "Upload" },
  { id: "inspection", label: "Physical Inspection", icon: Eye, completed: false, cta: "Schedule" },
  { id: "bank", label: "Bank Account", icon: FileCheck, completed: false, cta: "Add" },
];

const TENANT_LEVELS: Level[] = [
  {
    name: "Bronze",
    minSteps: 0,
    color: "#CD7F32",
    bgGradient: "from-amber-700 to-amber-900",
    borderColor: "border-amber-600",
    textColor: "text-amber-600 dark:text-amber-400",
    benefits: ["Basic search access", "Standard listing visibility"],
    icon: Shield,
  },
  {
    name: "Silver",
    minSteps: 2,
    color: "#C0C0C0",
    bgGradient: "from-gray-400 to-gray-600",
    borderColor: "border-gray-400",
    textColor: "text-gray-500 dark:text-gray-400",
    benefits: ["Priority responses from landlords (2x faster)", "Enhanced search filters"],
    icon: Shield,
  },
  {
    name: "Gold",
    minSteps: 4,
    color: "#FFD700",
    bgGradient: "from-yellow-400 to-amber-500",
    borderColor: "border-yellow-400",
    textColor: "text-yellow-600 dark:text-yellow-400",
    benefits: ["Instant approval for verified properties", "Lower security deposits", "Priority support"],
    icon: ShieldCheck,
  },
  {
    name: "Platinum",
    minSteps: 6,
    color: "#E5E4E2",
    bgGradient: "from-violet-400 to-purple-600",
    borderColor: "border-violet-400",
    textColor: "text-violet-500 dark:text-violet-400",
    benefits: ["Premium trust badge", "Negotiation advantage", "Priority listings", "Exclusive deals"],
    icon: Crown,
  },
];

const LANDLORD_LEVELS: Level[] = [
  {
    name: "Bronze",
    minSteps: 0,
    color: "#CD7F32",
    bgGradient: "from-amber-700 to-amber-900",
    borderColor: "border-amber-600",
    textColor: "text-amber-600 dark:text-amber-400",
    benefits: ["Basic listing", "Standard visibility"],
    icon: Shield,
  },
  {
    name: "Silver",
    minSteps: 2,
    color: "#C0C0C0",
    bgGradient: "from-gray-400 to-gray-600",
    borderColor: "border-gray-400",
    textColor: "text-gray-500 dark:text-gray-400",
    benefits: ["Verified badge on listings", "1.5x more inquiries"],
    icon: Shield,
  },
  {
    name: "Gold",
    minSteps: 4,
    color: "#FFD700",
    bgGradient: "from-yellow-400 to-amber-500",
    borderColor: "border-yellow-400",
    textColor: "text-yellow-600 dark:text-yellow-400",
    benefits: ["3x more inquiries", "Trust score visibility", "Featured in search"],
    icon: ShieldCheck,
  },
  {
    name: "Platinum",
    minSteps: 6,
    color: "#E5E4E2",
    bgGradient: "from-violet-400 to-purple-600",
    borderColor: "border-violet-400",
    textColor: "text-violet-500 dark:text-violet-400",
    benefits: ["Premium placement", "Dedicated account manager", "Tenant pre-screening", "Analytics dashboard"],
    icon: Crown,
  },
];

export default function TrustScorePreview({ variant }: TrustScorePreviewProps) {
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);

  const steps = variant === "tenant" ? TENANT_STEPS : LANDLORD_STEPS;
  const levels = variant === "tenant" ? TENANT_LEVELS : LANDLORD_LEVELS;

  const completedCount = steps.filter((s) => s.completed).length;
  const totalSteps = steps.length;
  const progressPct = (completedCount / totalSteps) * 100;

  const currentLevel = useMemo(() => {
    let level = levels[0];
    for (const l of levels) {
      if (completedCount >= l.minSteps) level = l;
    }
    return level;
  }, [completedCount, levels]);

  const nextLevel = useMemo(() => {
    for (const l of levels) {
      if (l.minSteps > completedCount) return l;
    }
    return null;
  }, [completedCount, levels]);

  const stepsToNext = nextLevel ? nextLevel.minSteps - completedCount : 0;

  // Ring dimensions
  const ringSize = 120;
  const strokeWidth = 8;
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const ringOffset = circumference * (1 - progressPct / 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              {variant === "tenant" ? "Tenant" : "Landlord"} Trust Score
            </h3>
            <p className="text-violet-200 text-xs">Complete verification to unlock benefits</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Current Level + Progress Ring */}
        <div className="flex flex-col sm:flex-row items-center gap-5">
          {/* Ring */}
          <div className="relative flex items-center justify-center" style={{ width: ringSize, height: ringSize }}>
            <svg width={ringSize} height={ringSize} className="transform -rotate-90">
              <circle
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                className="text-gray-200 dark:text-gray-700"
              />
              <motion.circle
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={radius}
                fill="none"
                stroke="url(#trustGradient)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: ringOffset }}
                transition={{ duration: 1.4, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="trustGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <currentLevel.icon className={`w-6 h-6 ${currentLevel.textColor}`} />
              </motion.div>
              <span className="text-xs font-bold text-gray-900 dark:text-white mt-0.5">
                {completedCount}/{totalSteps}
              </span>
              <span className="text-[9px] text-gray-500 dark:text-gray-400">steps</span>
            </div>

            {/* Sparkle effects */}
            {completedCount > 0 && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <Sparkles
                  className="absolute text-violet-400/50 w-3 h-3"
                  style={{ top: "5%", left: "50%" }}
                />
              </motion.div>
            )}
          </div>

          {/* Level Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className={`text-lg font-bold ${currentLevel.textColor}`}>
                {currentLevel.name} Level
              </span>
              <span
                className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-gradient-to-r ${currentLevel.bgGradient} text-white`}
              >
                Current
              </span>
            </div>
            {nextLevel ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Complete <span className="font-bold text-gray-700 dark:text-gray-300">{stepsToNext} more step{stepsToNext > 1 ? "s" : ""}</span>{" "}
                to reach <span className={`font-bold ${nextLevel.textColor}`}>{nextLevel.name}</span>
              </p>
            ) : (
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                Maximum trust level achieved!
              </p>
            )}
          </div>
        </div>

        {/* Steps Checklist */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Verification Steps
          </h4>
          <div className="space-y-1.5">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors ${
                  step.completed
                    ? "bg-emerald-50 dark:bg-emerald-900/20"
                    : "bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.completed
                      ? "bg-emerald-500"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : (
                    <step.icon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium ${
                      step.completed
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
                {step.completed ? (
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                    Done
                  </span>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-xs font-medium transition-colors"
                  >
                    {step.cta}
                    <ArrowRight className="w-3 h-3" />
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Level Benefits */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            What You Unlock
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {levels.map((level, i) => {
              const isCurrentOrBelow = completedCount >= level.minSteps;
              const isHovered = hoveredLevel === level.name;

              return (
                <motion.div
                  key={level.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  onMouseEnter={() => setHoveredLevel(level.name)}
                  onMouseLeave={() => setHoveredLevel(null)}
                  className={`relative p-3 rounded-xl border transition-all cursor-default ${
                    isCurrentOrBelow
                      ? `bg-gradient-to-br ${level.bgGradient} bg-opacity-10 ${level.borderColor} border-opacity-50`
                      : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <level.icon
                      className={`w-4 h-4 ${isCurrentOrBelow ? "text-white" : "text-gray-400"}`}
                    />
                    <span
                      className={`text-xs font-bold ${
                        isCurrentOrBelow ? "text-white" : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {level.name}
                    </span>
                    {!isCurrentOrBelow && (
                      <Lock className="w-3 h-3 text-gray-400 ml-auto" />
                    )}
                    {isCurrentOrBelow && currentLevel.name === level.name && (
                      <span className="ml-auto text-[9px] font-bold bg-white/20 text-white px-1.5 py-0.5 rounded-full">
                        YOU
                      </span>
                    )}
                  </div>
                  <AnimatePresence>
                    {(isHovered || isCurrentOrBelow) && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-1"
                      >
                        {level.benefits.map((b) => (
                          <li
                            key={b}
                            className={`text-[11px] flex items-start gap-1.5 ${
                              isCurrentOrBelow
                                ? "text-white/80"
                                : "text-gray-400 dark:text-gray-500"
                            }`}
                          >
                            {isCurrentOrBelow ? (
                              <CheckCircle2 className="w-3 h-3 flex-shrink-0 mt-0.5" />
                            ) : (
                              <Lock className="w-3 h-3 flex-shrink-0 mt-0.5" />
                            )}
                            {b}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        {nextLevel && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-violet-500/25"
          >
            <Zap className="w-4 h-4" />
            Complete Next Step to Reach {nextLevel.name}
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
