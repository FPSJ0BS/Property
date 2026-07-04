"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, MapPin, BarChart3 } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const microMarkets = [
  { name: "Vaishali Nagar", avgRent: "\u20B918,500", trend: "+8%", trending: true, demand: "Very High", supply: "Low", confidence: 94 },
  { name: "Malviya Nagar", avgRent: "\u20B922,000", trend: "+5%", trending: true, demand: "High", supply: "Moderate", confidence: 91 },
  { name: "C-Scheme", avgRent: "\u20B935,000", trend: "+3%", trending: true, demand: "High", supply: "Low", confidence: 96 },
  { name: "Mansarovar", avgRent: "\u20B914,000", trend: "+2%", trending: true, demand: "Moderate", supply: "High", confidence: 88 },
  { name: "Jagatpura", avgRent: "\u20B912,500", trend: "+12%", trending: true, demand: "Rising", supply: "Moderate", confidence: 85 },
  { name: "Tonk Road", avgRent: "\u20B916,000", trend: "-1%", trending: false, demand: "Stable", supply: "High", confidence: 89 },
];

const barHeights = [35, 45, 40, 55, 65, 60, 72, 78, 68, 85, 75, 88];

export default function CityIntelligence() {
  return (
    <section className="py-20 sm:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 dark:from-slate-900/50 dark:via-slate-950 dark:to-slate-900/50" />
      <div className="absolute inset-0 bg-dots opacity-20 dark:opacity-[0.05]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-indigo-50/30 dark:from-indigo-950/20 to-transparent rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="RentIQ\u2122 Market Intelligence"
          title="Rental intelligence at micro-market depth"
          subtitle="Real-time pricing signals, demand trends, and supply analysis across Jaipur\u2019s key localities."
        />

        <div className="mt-12 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {microMarkets.map((market, i) => (
            <motion.div
              key={market.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group"
            >
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700 p-5 sm:p-6 hover:shadow-2xl hover:shadow-indigo-500/[0.06] transition-all duration-500 hover:-translate-y-1.5 hover:border-slate-200/40 dark:hover:border-slate-600">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display truncate">
                      {market.name}
                    </h4>
                  </div>
                  <span
                    className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg shrink-0 ${
                      market.trending
                        ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/50"
                        : "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200/60 dark:border-red-800/50"
                    }`}
                  >
                    {market.trending ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {market.trend} YoY
                  </span>
                </div>

                {/* Price */}
                <div className="mb-4 sm:mb-5">
                  <span className="text-2xl sm:text-[1.75rem] font-bold text-slate-900 dark:text-white font-display tracking-tight">
                    {market.avgRent}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 ml-1.5 font-medium">/mo avg</span>
                </div>

                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-5">
                  {[
                    { label: "Demand", value: market.demand },
                    { label: "Supply", value: market.supply },
                    { label: "Confidence", value: `${market.confidence}%` },
                  ].map((m) => (
                    <div key={m.label} className="text-center bg-slate-50/70 dark:bg-slate-800/50 rounded-lg py-2">
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider mb-0.5">{m.label}</div>
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-200">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Mini chart */}
                <div className="flex items-end gap-[3px] h-10 px-1">
                  {barHeights.map((h, j) => (
                    <motion.div
                      key={j}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 + j * 0.03 }}
                      className="flex-1 bg-gradient-to-t from-indigo-200 to-indigo-100 dark:from-indigo-600 dark:to-indigo-800 rounded-t-sm group-hover:from-indigo-400 group-hover:to-indigo-200 dark:group-hover:from-indigo-500 dark:group-hover:to-indigo-700 transition-colors duration-500"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
