"use client";

import { motion } from "framer-motion";
import { Brain, ShieldCheck, TrendingUp, Settings, Compass, ArrowRight, Sparkles } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import Link from "next/link";

const pillars = [
  {
    icon: Brain,
    name: "RentalBrain\u2122",
    tagline: "AI Matching Engine",
    description:
      "Natural language search that understands context, lifestyle, and fit \u2014 not just filters. Matches you to the right property using 50+ intelligence signals.",
    gradient: "from-indigo-500 via-violet-500 to-indigo-600",
    bgGlow: "bg-indigo-500/10",
    accentBg: "bg-indigo-50 dark:bg-indigo-950/30",
    accentText: "text-indigo-600 dark:text-indigo-400",
    features: ["Semantic NLP search", "Lifestyle matching", "Smart ranking", "Context awareness"],
    metric: { value: "50+", label: "Intelligence Signals" },
    href: "/product#rentalbrain",
  },
  {
    icon: ShieldCheck,
    name: "TrustShield\u2122",
    tagline: "Dual-Sided Verification",
    description:
      "Both landlords and tenants are verified. Properties are inspected. Trust scores are visible. No more blind decisions in rental transactions.",
    gradient: "from-emerald-500 via-teal-500 to-emerald-600",
    bgGlow: "bg-emerald-500/10",
    accentBg: "bg-emerald-50 dark:bg-emerald-950/30",
    accentText: "text-emerald-600 dark:text-emerald-400",
    features: ["Identity verification", "Physical inspection", "Trust scoring", "Document validation"],
    metric: { value: "98%", label: "Trust Score Avg." },
    href: "/product#trustshield",
  },
  {
    icon: TrendingUp,
    name: "RentIQ\u2122",
    tagline: "AI Pricing Intelligence",
    description:
      "Know if a rent is fair before you negotiate. AI analyzes market data, locality trends, and property condition to deliver transparent pricing insights.",
    gradient: "from-amber-500 via-orange-500 to-amber-600",
    bgGlow: "bg-amber-500/10",
    accentBg: "bg-amber-50 dark:bg-amber-950/30",
    accentText: "text-amber-600 dark:text-amber-400",
    features: ["Fair rent analysis", "Market benchmarks", "Price forecasting", "Locality trends"],
    metric: { value: "78%", label: "Pricing Accuracy" },
    href: "/product#rentiq",
  },
  {
    icon: Settings,
    name: "RentalOS\u2122",
    tagline: "Post-Lease Operating System",
    description:
      "The rental relationship doesn\u2019t end at signing. Manage rent collection, maintenance, renewals, disputes, and move-outs from one intelligent dashboard.",
    gradient: "from-violet-500 via-purple-500 to-violet-600",
    bgGlow: "bg-violet-500/10",
    accentBg: "bg-violet-50 dark:bg-violet-950/30",
    accentText: "text-violet-600 dark:text-violet-400",
    features: ["Rent tracking", "Maintenance SLAs", "Renewal alerts", "Move-out flow"],
    metric: { value: "100%", label: "Lifecycle Coverage" },
    href: "/product#rentalos",
  },
  {
    icon: Compass,
    name: "CityFit\u2122",
    tagline: "Neighborhood & Lifestyle Intelligence",
    description:
      "Don't just find a home \u2014 find the right area. AI-powered neighborhood scoring for families, students, and professionals with schools, hospitals, parks, and daily life insights.",
    gradient: "from-cyan-500 via-teal-500 to-cyan-600",
    bgGlow: "bg-cyan-500/10",
    accentBg: "bg-cyan-50 dark:bg-cyan-950/30",
    accentText: "text-cyan-600 dark:text-cyan-400",
    features: ["Neighborhood scoring", "School & hospital proximity", "Lifestyle matching", "Settlement guides"],
    metric: { value: "8+", label: "Area Fit Signals" },
    href: "/compare-areas",
  },
];

export default function WhyDifferent() {
  return (
    <section className="py-20 sm:py-36 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-50/50 dark:from-indigo-950/30 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-violet-50/30 dark:from-violet-950/20 to-transparent rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Platform Pillars"
          title="Not another listing portal"
          subtitle="Four integrated AI modules that make 99tolet the most intelligent rental platform in India."
        />

        <div className="mt-14 sm:mt-20 grid sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative"
            >
              <Link href={pillar.href}>
                <div className="relative h-full rounded-2xl border border-slate-200/70 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 sm:p-7 lg:p-8 hover:shadow-2xl hover:shadow-indigo-500/[0.06] transition-all duration-500 hover:-translate-y-1.5 hover:border-slate-200/40 dark:hover:border-slate-600 overflow-hidden">
                  {/* Hover glow */}
                  <div className={`absolute -top-24 -right-24 w-48 h-48 ${pillar.bgGlow} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                  <div className="relative">
                    {/* Icon + title row */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${pillar.gradient} shadow-lg shrink-0`}>
                          <pillar.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display truncate">{pillar.name}</h3>
                          <p className={`text-sm font-semibold ${pillar.accentText} mt-0.5`}>{pillar.tagline}</p>
                        </div>
                      </div>
                      {/* Metric badge */}
                      <div className={`hidden sm:flex flex-col items-center px-3 py-1.5 ${pillar.accentBg} rounded-xl border border-slate-200/40 dark:border-slate-700`}>
                        <span className={`text-lg font-bold ${pillar.accentText} font-display leading-none`}>{pillar.metric.value}</span>
                        <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">{pillar.metric.label}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed mb-5">{pillar.description}</p>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {pillar.features.map((f) => (
                        <span key={f} className="text-[11px] font-medium px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 border border-slate-100/80 dark:border-slate-700">
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-1.5 text-[13px] font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                      <span>Learn more</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
