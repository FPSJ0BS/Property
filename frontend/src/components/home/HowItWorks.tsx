"use client";

import { motion } from "framer-motion";
import {
  Search,
  ShieldCheck,
  Calendar,
  FileCheck,
  Home,
  Settings,
  RefreshCcw,
} from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const steps = [
  { icon: Search, title: "Discover", description: "AI matches you to properties that truly fit \u2014 beyond basic filters.", color: "from-indigo-500 to-violet-500", ring: "ring-indigo-200 dark:ring-indigo-800" },
  { icon: ShieldCheck, title: "Verify", description: "Both sides verified. Trust scores visible before you decide.", color: "from-emerald-500 to-teal-500", ring: "ring-emerald-200 dark:ring-emerald-800" },
  { icon: Calendar, title: "Visit", description: "Schedule visits directly. No broker run-around or wasted time.", color: "from-violet-500 to-purple-500", ring: "ring-violet-200 dark:ring-violet-800" },
  { icon: FileCheck, title: "Close", description: "AI-assisted negotiation. Fair pricing. Digital agreements.", color: "from-amber-500 to-orange-500", ring: "ring-amber-200 dark:ring-amber-800" },
  { icon: Home, title: "Move In", description: "Smooth handover. Condition docs. Deposit tracking.", color: "from-teal-500 to-emerald-500", ring: "ring-teal-200 dark:ring-teal-800" },
  { icon: Settings, title: "Manage", description: "Rent, maintenance, complaints \u2014 all in one OS.", color: "from-indigo-600 to-indigo-500", ring: "ring-indigo-200 dark:ring-indigo-800" },
  { icon: RefreshCcw, title: "Renew", description: "Smart renewal alerts and structured move-out.", color: "from-violet-600 to-violet-500", ring: "ring-violet-200 dark:ring-violet-800" },
];

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/80 dark:from-slate-900/80 dark:via-slate-950 dark:to-slate-900/80" />
      <div className="absolute inset-0 bg-dots opacity-25 dark:opacity-[0.06]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="The Rental Journey"
          title="From search to renewal, managed in one system"
          subtitle="Most platforms stop at discovery. 99tolet covers the entire rental lifecycle \u2014 every step, intelligently managed."
        />

        <div className="mt-14 sm:mt-20 relative">
          {/* Animated connection line */}
          <div className="hidden lg:block absolute top-[44px] left-[8%] right-[8%] h-[2px]">
            <div className="h-full bg-gradient-to-r from-indigo-200/40 via-violet-300/60 to-indigo-200/40 dark:from-indigo-800/40 dark:via-violet-700/60 dark:to-indigo-800/40 rounded-full" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute inset-0 h-full bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 rounded-full origin-left"
              style={{ opacity: 0.5 }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 sm:gap-8 lg:gap-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="relative mb-4 sm:mb-5">
                  {/* Outer ring */}
                  <div className={`w-[76px] h-[76px] sm:w-[88px] sm:h-[88px] rounded-2xl ${step.ring} ring-2 flex items-center justify-center bg-white dark:bg-slate-900 shadow-sm group-hover:shadow-xl group-hover:shadow-indigo-500/[0.06] transition-all duration-500 group-hover:-translate-y-1`}>
                    <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                  {/* Step number */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-slate-800 rounded-full border-2 border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center">
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{i + 1}</span>
                  </div>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 font-display">
                  {step.title}
                </h4>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-[140px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
