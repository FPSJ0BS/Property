"use client";

import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Building2,
  Store,
  Warehouse,
  GraduationCap,
  Heart,
  ArrowRight,
} from "lucide-react";

const businessTypes = [
  {
    name: "Office",
    icon: Building2,
    gradient: "from-indigo-500 to-indigo-600",
    bgLight: "bg-indigo-50 dark:bg-indigo-950/30",
    textColor: "text-indigo-600 dark:text-indigo-400",
    borderColor: "border-indigo-200 dark:border-indigo-800",
    signals: "Employee access, transit, parking, professional image",
    areaExample: "C-Scheme",
    fitScore: 95,
    fitLabel: "Office Fit",
  },
  {
    name: "Retail",
    icon: Store,
    gradient: "from-emerald-500 to-emerald-600",
    bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
    textColor: "text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    signals: "Customer access, visibility, walk-in potential, footfall",
    areaExample: "Raja Park",
    fitScore: 88,
    fitLabel: "Retail Fit",
  },
  {
    name: "Warehouse",
    icon: Warehouse,
    gradient: "from-amber-500 to-amber-600",
    bgLight: "bg-amber-50 dark:bg-amber-950/30",
    textColor: "text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-200 dark:border-amber-800",
    signals: "Logistics, loading, road access, truck parking",
    areaExample: "Sitapura",
    fitScore: 95,
    fitLabel: "Warehouse Fit",
  },
  {
    name: "Coaching",
    icon: GraduationCap,
    gradient: "from-violet-500 to-violet-600",
    bgLight: "bg-violet-50 dark:bg-violet-950/30",
    textColor: "text-violet-600 dark:text-violet-400",
    borderColor: "border-violet-200 dark:border-violet-800",
    signals: "Student access, catchment, transit, affordability",
    areaExample: "Mansarovar",
    fitScore: 80,
    fitLabel: "Coaching Fit",
  },
  {
    name: "Clinic",
    icon: Heart,
    gradient: "from-cyan-500 to-cyan-600",
    bgLight: "bg-cyan-50 dark:bg-cyan-950/30",
    textColor: "text-cyan-600 dark:text-cyan-400",
    borderColor: "border-cyan-200 dark:border-cyan-800",
    signals: "Patient access, medical ecosystem, parking, trust zone",
    areaExample: "Malviya Nagar",
    fitScore: 90,
    fitLabel: "Clinic Fit",
  },
];

export default function CommercialShowcase() {
  return (
    <section className="relative py-16 sm:py-20 bg-slate-50/50 dark:bg-slate-900/50 overflow-hidden">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 mb-4">
            BusinessFit&trade;
          </span>
          <SectionHeading
            title="Commercial spaces that fit your business operations"
            subtitle="Not just square footage — 99tolet scores locations for employee access, customer reach, visibility, parking, and operational fit."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {businessTypes.map((biz, i) => (
            <motion.div
              key={biz.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              whileHover={{ y: -6 }}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 text-center cursor-pointer transition-shadow hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-900/60"
            >
              {/* Icon */}
              <div
                className={`mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br ${biz.gradient} flex items-center justify-center mb-4 shadow-md`}
              >
                <biz.icon className="w-7 h-7 text-white" />
              </div>

              {/* Business type name */}
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                {biz.name}
              </h3>

              {/* Signals */}
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                {biz.signals}
              </p>

              {/* Area example with score */}
              <div
                className={`rounded-xl ${biz.bgLight} border ${biz.borderColor} px-3 py-2.5`}
              >
                <div
                  className={`text-sm font-bold ${biz.textColor}`}
                >
                  {biz.areaExample}: {biz.fitScore}% {biz.fitLabel}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/discover">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 gap-2 px-6"
            >
              <Building2 className="w-4 h-4" />
              Find Commercial Spaces
            </Button>
          </Link>
          <Link
            href="/compare-areas"
            className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            Compare Business Areas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
