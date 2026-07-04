"use client";

import { motion } from "framer-motion";
import {
  Brain,
  ShieldCheck,
  TrendingUp,
  Settings,
  Search,
  UserCheck,
  FileSearch,
  BarChart3,
  CreditCard,
  Wrench,
  Bell,
  ArrowRight,
  Sparkles,
  Layers,
  Globe,
  Compass,
  GraduationCap,
  Zap,
  MapPin,
} from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const modules = [
  {
    id: "rentalbrain",
    icon: Brain,
    name: "RentalBrain\u2122",
    tagline: "AI Matching Engine",
    color: "from-indigo-500 to-violet-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
    description: "Natural language search that understands intent, lifestyle, and context \u2014 not just property filters. RentalBrain uses 50+ intelligence signals to match you to properties that truly fit.",
    features: [
      { icon: Search, label: "Semantic Search", desc: "Describe what you want in plain language. Our NLP engine parses intent, budget, location, lifestyle preferences, and trust requirements." },
      { icon: Sparkles, label: "AI Match Score", desc: "Every property gets a personalized match score based on your unique requirements, preferences, and behavioral patterns." },
      { icon: Layers, label: "Contextual Ranking", desc: "Results ranked by genuine fit \u2014 not by who paid to be on top. Factors include commute, schools, lifestyle, and neighborhood character." },
    ],
  },
  {
    id: "trustshield",
    icon: ShieldCheck,
    name: "TrustShield\u2122",
    tagline: "Dual-Sided Verification",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    description: "Both landlords and tenants verified. Properties physically inspected. Trust scores visible on every listing. Because in Indian rentals, both sides take risks \u2014 and both deserve confidence.",
    features: [
      { icon: UserCheck, label: "Identity Verification", desc: "Aadhaar/PAN-based identity verification for both landlords and tenants. Employment and income validation for tenants." },
      { icon: FileSearch, label: "Property Inspection", desc: "On-ground physical verification of property condition, amenities, and ownership. Photo-verified listings." },
      { icon: ShieldCheck, label: "Trust Score", desc: "Transparent composite trust rating visible to both parties. Based on verification depth, history, and service quality." },
    ],
  },
  {
    id: "rentiq",
    icon: TrendingUp,
    name: "RentIQ\u2122",
    tagline: "AI Pricing Intelligence",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    description: "Know if a rent is fair before you negotiate. RentIQ analyzes market data, locality trends, comparable transactions, and property condition to deliver transparent pricing insights.",
    features: [
      { icon: BarChart3, label: "Fair Rent Analysis", desc: "AI compares the listed rent against 50+ market variables to determine if pricing is fair, below market, or above market." },
      { icon: TrendingUp, label: "Market Benchmarks", desc: "Real-time locality benchmarks based on actual transactions, demand trends, and supply analysis." },
      { icon: Globe, label: "Micro-Market Intelligence", desc: "Pricing confidence scores, YoY trends, and demand-supply dynamics at the micro-market level." },
    ],
  },
  {
    id: "rentalos",
    icon: Settings,
    name: "RentalOS\u2122",
    tagline: "Post-Lease Operating System",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50 dark:bg-violet-950/30",
    description: "Most platforms disappear after the deal closes. RentalOS manages rent collection, maintenance, agreements, renewals, disputes, and move-outs \u2014 because leasing is a lifecycle, not a transaction.",
    features: [
      { icon: CreditCard, label: "Rent Collection", desc: "Automated rent reminders, online payment tracking, receipt generation, and payment history dashboard." },
      { icon: Wrench, label: "Maintenance Management", desc: "Ticket-based maintenance requests with SLA tracking, vendor coordination, and resolution reporting." },
      { icon: Bell, label: "Lifecycle Alerts", desc: "Renewal reminders, agreement expiry alerts, move-out coordination, and deposit reconciliation." },
    ],
  },
  {
    id: "cityfit",
    icon: Compass,
    name: "CityFit\u2122",
    tagline: "Neighborhood & Lifestyle Intelligence",
    color: "from-cyan-500 to-teal-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/30",
    description: "Don\u2019t just find a home \u2014 find the right area. CityFit\u2122 scores neighborhoods for families, students, and professionals using schools, hospitals, parks, commute data, and daily-life intelligence. Compare areas, understand trade-offs, and settle faster with a structured city setup engine.",
    features: [
      { icon: MapPin, label: "Neighborhood Fit Scoring", desc: "AI scores each area for family suitability, student friendliness, professional convenience, safety, walkability, and transit access \u2014 so you choose based on data, not guesswork." },
      { icon: GraduationCap, label: "Essentials Intelligence", desc: "Schools, hospitals, parks, shopping, gyms, restaurants \u2014 mapped and scored for proximity. Know what\u2019s nearby before you commit." },
      { icon: Zap, label: "Settle-Fast Engine", desc: "First 7, 30, and 90 day settlement guidance. Utility setup, registrations, local services, daily routine \u2014 everything to become functional faster." },
    ],
  },
];

export default function ProductPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 sm:py-24 md:py-32 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 relative">
        <div className="absolute inset-0 bg-grid opacity-30 dark:opacity-10" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wide uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 rounded-full border border-indigo-100 dark:border-indigo-800 mb-6">
              <Layers className="w-3.5 h-3.5" /> Platform
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-5 sm:mb-6">
              The AI Leasing OS for{" "}
              <span className="gradient-text">modern rentals</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Four integrated platform modules that cover the entire rental lifecycle &mdash; from AI-powered search to post-lease operations. Not another listing portal. A complete operating system.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modules */}
      {modules.map((mod, idx) => (
        <section
          key={mod.id}
          id={mod.id}
          className={`py-20 sm:py-24 md:py-32 ${idx % 2 === 0 ? "bg-white dark:bg-slate-950" : "bg-slate-50/50 dark:bg-slate-900/50"}`}
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center`}>
                  <mod.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{mod.name}</h2>
                  <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{mod.tagline}</p>
                </div>
              </div>
              <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl text-[15px]">{mod.description}</p>
            </motion.div>

            <div className="mt-10 sm:mt-12 grid md:grid-cols-3 gap-5 sm:gap-6">
              {mod.features.map((f, i) => (
                <motion.div key={f.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 hover:shadow-lg hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10 transition-all hover:-translate-y-1">
                  <div className={`w-10 h-10 rounded-lg ${mod.bgColor} flex items-center justify-center mb-4`}>
                    <f.icon className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">{f.label}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Future */}
      <section className="py-20 sm:py-24 md:py-32 bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">What&apos;s Next</h2>
            <p className="text-slate-400 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              99tolet is starting with rentals &mdash; but our platform intelligence is designed to expand. City intelligence expansion to 50+ cities, property sales, mortgage intelligence, and commercial real estate operations are on our roadmap.
            </p>
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 gap-2 w-full sm:w-auto" asChild>
              <Link href="/contact">Talk to Our Team <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
