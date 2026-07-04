"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  TrendingUp,
  MapPin,
  Heart,
  Wallet,
  Navigation,
  Home,
  BarChart3,
  Shield,
  Bus,
  Volume2,
  GraduationCap,
  Stethoscope,
  UtensilsCrossed,
  TrainFront,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

/* ─── Tab Data ─── */
const tabs = [
  { id: "match", label: "Match Intelligence", icon: Brain },
  { id: "price", label: "Price Intelligence", icon: TrendingUp },
  { id: "neighborhood", label: "Neighborhood Score", icon: MapPin },
] as const;

type TabId = (typeof tabs)[number]["id"];

/* ─── Match Intelligence Data ─── */
const matchMetrics = [
  {
    label: "Lifestyle Fit",
    value: 94,
    icon: Heart,
    color: "from-rose-500 to-pink-500",
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    explanation: "Based on your work schedule, social preferences, and daily routines",
  },
  {
    label: "Budget Optimization",
    value: 88,
    icon: Wallet,
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    explanation: "Rent-to-income ratio, utility estimates, and commute cost factored in",
  },
  {
    label: "Commute Score",
    value: 91,
    icon: Navigation,
    color: "from-blue-500 to-indigo-500",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    explanation: "Average 22 min to your office via preferred route and transport mode",
  },
  {
    label: "Neighborhood Match",
    value: 86,
    icon: Home,
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    explanation: "Safety index, noise levels, and amenity proximity aligned to your profile",
  },
];

/* ─── Price Intelligence Data ─── */
const monthlyBars = [
  { month: "Oct", value: 70, color: "bg-indigo-500/40" },
  { month: "Nov", value: 75, color: "bg-indigo-500/50" },
  { month: "Dec", value: 68, color: "bg-indigo-500/40" },
  { month: "Jan", value: 80, color: "bg-indigo-500/60" },
  { month: "Feb", value: 85, color: "bg-indigo-500/70" },
  { month: "Mar", value: 92, color: "bg-indigo-500" },
];

/* ─── Neighborhood Data ─── */
const neighborhoodScores = [
  { label: "Walk Score", value: 82, max: 100, icon: MapPin, color: "from-emerald-500 to-green-500" },
  { label: "Safety Score", value: 88, max: 100, icon: Shield, color: "from-blue-500 to-indigo-500" },
  { label: "Transit Score", value: 76, max: 100, icon: Bus, color: "from-violet-500 to-purple-500" },
];

const nearbyAmenities = [
  { label: "Schools", count: 3, icon: GraduationCap, color: "text-amber-400 bg-amber-500/10" },
  { label: "Hospitals", count: 2, icon: Stethoscope, color: "text-rose-400 bg-rose-500/10" },
  { label: "Restaurants", count: 5, icon: UtensilsCrossed, color: "text-orange-400 bg-orange-500/10" },
  { label: "Metro", count: 1, icon: TrainFront, color: "text-blue-400 bg-blue-500/10" },
];

/* ─── Animated Progress Bar ─── */
function ProgressBar({
  value,
  gradient,
  delay = 0,
}: {
  value: number;
  gradient: string;
  delay?: number;
}) {
  return (
    <div className="h-2 w-full rounded-full bg-slate-700/50 overflow-hidden">
      <motion.div
        className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

/* ─── Tab Content Components ─── */
function MatchIntelligence() {
  return (
    <motion.div
      key="match"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-5"
    >
      {/* Header Card */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white font-display">AI Compatibility Analysis</p>
          <p className="text-xs text-slate-400">Analyzing 47 factors across your profile and property</p>
        </div>
        <div className="ml-auto px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="text-xs font-bold text-emerald-400">90% Match</span>
        </div>
      </div>

      {/* Metrics */}
      {matchMetrics.map((metric, i) => {
        const Icon = metric.icon;
        return (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`w-7 h-7 rounded-md ${metric.bg} flex items-center justify-center`}>
                  <Icon className={`w-3.5 h-3.5 ${metric.text}`} />
                </div>
                <span className="text-sm font-medium text-slate-200">{metric.label}</span>
              </div>
              <span className="text-sm font-bold text-white tabular-nums">{metric.value}%</span>
            </div>
            <ProgressBar value={metric.value} gradient={metric.color} delay={i * 0.15} />
            <p className="text-[11px] text-slate-500 leading-relaxed pl-9">{metric.explanation}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function PriceIntelligence() {
  return (
    <motion.div
      key="price"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-5"
    >
      {/* Property Header */}
      <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold text-white font-display">3BHK Vaishali Nagar</p>
            <p className="text-xs text-slate-400">Semi-furnished &middot; 1,450 sq.ft</p>
          </div>
          <div className="px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20">
            <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-400">RentIQ</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-slate-900/60">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Fair Value Range</p>
            <p className="text-lg font-bold text-emerald-400 font-display">&#8377;30K&ndash;34K</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/60">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Listed Price</p>
            <p className="text-lg font-bold text-white font-display">&#8377;32,000</p>
          </div>
        </div>
      </div>

      {/* Fair Rating */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-emerald-400">Fair Price</p>
          <p className="text-xs text-slate-400">This property is priced within the AI-estimated fair value range</p>
        </div>
      </div>

      {/* Market Position Bar */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Market Position</p>
        <div className="relative h-3 rounded-full bg-gradient-to-r from-emerald-500/20 via-amber-500/20 to-rose-500/20 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-emerald-500/30 to-emerald-500/10 rounded-full" />
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg shadow-white/20 border-2 border-emerald-400"
            initial={{ left: "0%" }}
            whileInView={{ left: "52%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-500">
          <span>Below Market</span>
          <span>Fair</span>
          <span>Above Market</span>
        </div>
      </div>

      {/* Trend + Chart */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">YoY Trend</p>
          <div className="flex items-center gap-1.5">
            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            <span className="text-lg font-bold text-emerald-400 font-display">+8%</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Area appreciation</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">Last 6 Months</p>
          <div className="flex items-end gap-1.5 h-10">
            {monthlyBars.map((bar, i) => (
              <motion.div
                key={bar.month}
                className={`flex-1 rounded-sm ${bar.color}`}
                initial={{ height: 0 }}
                whileInView={{ height: `${bar.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {monthlyBars.map((bar) => (
              <span key={bar.month} className="text-[8px] text-slate-600 flex-1 text-center">
                {bar.month}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Confidence */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-700/30">
        <span className="text-xs text-slate-400">AI Confidence Level</span>
        <div className="flex items-center gap-2">
          <div className="w-20 h-1.5 rounded-full bg-slate-700 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
              initial={{ width: 0 }}
              whileInView={{ width: "94%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
          <span className="text-sm font-bold text-white">94%</span>
        </div>
      </div>
    </motion.div>
  );
}

function NeighborhoodScore() {
  return (
    <motion.div
      key="neighborhood"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-5"
    >
      {/* Score Cards */}
      <div className="grid grid-cols-3 gap-3">
        {neighborhoodScores.map((score, i) => {
          const Icon = score.icon;
          return (
            <motion.div
              key={score.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-center"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br mx-auto mb-2 flex items-center justify-center"
                style={{
                  backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                }}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${score.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mb-1">{score.label}</p>
              <div className="flex items-baseline justify-center gap-0.5">
                <motion.span
                  className="text-xl font-bold text-white font-display"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.3 }}
                >
                  {score.value}
                </motion.span>
                <span className="text-xs text-slate-500">/{score.max}</span>
              </div>
              <div className="mt-2 h-1 rounded-full bg-slate-700/50 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${score.color}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${score.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Noise Level */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
        <div className="w-9 h-9 rounded-lg bg-teal-500/10 flex items-center justify-center">
          <Volume2 className="w-4.5 h-4.5 text-teal-400" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-200">Noise Level</p>
          <p className="text-xs text-slate-400">Residential zone, minimal traffic</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold text-teal-400">
          Quiet
        </span>
      </div>

      {/* Nearby Amenities */}
      <div className="space-y-2.5">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Nearby Amenities</p>
        <div className="grid grid-cols-2 gap-2.5">
          {nearbyAmenities.map((amenity, i) => {
            const Icon = amenity.icon;
            return (
              <motion.div
                key={amenity.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/30"
              >
                <div className={`w-8 h-8 rounded-md flex items-center justify-center ${amenity.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{amenity.count}</p>
                  <p className="text-[10px] text-slate-500">{amenity.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* AI Summary */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="p-3 rounded-xl bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/20"
      >
        <div className="flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-slate-300 leading-relaxed">
            <span className="font-semibold text-indigo-300">AI Summary:</span> This neighborhood scores above average across all livability parameters. Ideal for families and working professionals seeking a quiet, well-connected locality.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function AIInsightsWidget() {
  const [activeTab, setActiveTab] = useState<TabId>("match");

  return (
    <section className="py-20 sm:py-32 bg-slate-900 dark:bg-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="AI Intelligence"
          title="Your rental decisions, powered by deep AI"
          subtitle="Go beyond listings. Our AI analyzes hundreds of data points to give you intelligence no other platform can."
        />

        {/* Widget Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14 sm:mt-20 max-w-3xl mx-auto"
        >
          <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm overflow-hidden shadow-2xl shadow-slate-950/50">
            {/* Tab Header */}
            <div className="flex border-b border-slate-700/50 bg-slate-800/30 p-1.5 gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
                      isActive ? "text-white" : "text-slate-400 hover:text-slate-300"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabBg"
                        className="absolute inset-0 bg-slate-700/50 rounded-xl"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="p-5 sm:p-6 min-h-[420px]">
              <AnimatePresence mode="wait">
                {activeTab === "match" && <MatchIntelligence />}
                {activeTab === "price" && <PriceIntelligence />}
                {activeTab === "neighborhood" && <NeighborhoodScore />}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-5 sm:px-6 py-3.5 border-t border-slate-700/50 bg-slate-800/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-slate-500">AI Engine Active &middot; Real-time analysis</span>
              </div>
              <span className="text-[11px] text-slate-600">Powered by 99tolet AI</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
