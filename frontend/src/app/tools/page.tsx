"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Wrench,
  FileText,
  CheckSquare,
  Calculator,
  CalendarCheck,
  Receipt,
  ArrowRight,
  Sparkles,
  Shield,
} from "lucide-react";

const tools = [
  {
    title: "Rental Agreement Generator",
    description: "Generate a professional rental agreement in minutes. Customizable clauses, legally formatted, ready to print.",
    href: "/tools/agreement",
    icon: <FileText className="w-6 h-6" />,
    gradient: "from-indigo-500 to-blue-600",
    shadowColor: "shadow-indigo-500/25",
    badge: "Most Popular",
    badgeColor: "bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300",
  },
  {
    title: "Document Checklist",
    description: "Know exactly what to verify before, during, and after signing. Never miss a critical document again.",
    href: "/tools/checklist",
    icon: <CheckSquare className="w-6 h-6" />,
    gradient: "from-emerald-500 to-green-600",
    shadowColor: "shadow-emerald-500/25",
    badge: null,
    badgeColor: "",
  },
  {
    title: "Deposit Calculator",
    description: "Plan your move-in costs and explore EMI options. Covers deposit, brokerage, advance rent, and more.",
    href: "/tools/deposit",
    icon: <Calculator className="w-6 h-6" />,
    gradient: "from-violet-500 to-purple-600",
    shadowColor: "shadow-violet-500/25",
    badge: null,
    badgeColor: "",
  },
  {
    title: "Move-in Day Planner",
    description: "Hour-by-hour moving day plan with task tracking. Smart tips for before, during, and after your move.",
    href: "/tools/move-planner",
    icon: <CalendarCheck className="w-6 h-6" />,
    gradient: "from-amber-500 to-orange-600",
    shadowColor: "shadow-amber-500/25",
    badge: null,
    badgeColor: "",
  },
  {
    title: "Rent Receipt Generator",
    description: "Generate HRA-compliant rent receipts for tax savings. Single or bulk for the full financial year.",
    href: "/tools/rent-receipt",
    icon: <Receipt className="w-6 h-6" />,
    gradient: "from-cyan-500 to-blue-600",
    shadowColor: "shadow-cyan-500/25",
    badge: "Tax Essential",
    badgeColor: "bg-cyan-100 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300",
  },
  {
    title: "Maintenance Request",
    description: "Professional maintenance request templates in one click. Send via WhatsApp, email, or copy to clipboard.",
    href: "/tools/maintenance",
    icon: <Wrench className="w-6 h-6" />,
    gradient: "from-teal-500 to-emerald-600",
    shadowColor: "shadow-teal-500/25",
    badge: null,
    badgeColor: "",
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-br from-indigo-100/40 via-violet-100/30 to-transparent dark:from-indigo-950/30 dark:via-violet-950/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-xl shadow-indigo-500/30 mb-6">
              <Wrench className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
              Rental Tools That Save You{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Time & Money
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Free utilities for tenants and landlords — agreement generator, rent receipts, checklists, and more. No signup required.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link href={tool.href} className="group block h-full">
                <div className={`relative h-full p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${tool.shadowColor}`}>
                  {/* Badge */}
                  {tool.badge && (
                    <span className={`absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase ${tool.badgeColor}`}>
                      {tool.badge}
                    </span>
                  )}

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-4 text-white shadow-lg ${tool.shadowColor}`}>
                    {tool.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {tool.description}
                  </p>

                  {/* CTA */}
                  <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 group-hover:gap-2.5 transition-all">
                    Open Tool
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
            <Shield className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              All tools are <strong className="text-slate-900 dark:text-white">free</strong>. No signup required. Your data stays in your browser.
            </span>
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
