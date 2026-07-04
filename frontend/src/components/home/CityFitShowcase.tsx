"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  GraduationCap,
  Heart,
  TreePine,
  ShoppingBag,
  Clock,
  TrendingUp,
  ArrowRight,
  School,
  Building2,
  Landmark,
  TrainFront,
} from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";

/* ─── Mock Data for Area Card ─── */
const areaScores = [
  { label: "Family", score: 95, color: "#10b981" },
  { label: "Safety", score: 92, color: "#6366f1" },
  { label: "Walk", score: 82, color: "#f59e0b" },
];

const bestForTags = ["Families", "Senior Professionals", "Retirees"];

const essentials = [
  { icon: School, count: 3, label: "Schools" },
  { icon: Building2, count: 2, label: "Hospitals" },
  { icon: TreePine, count: 2, label: "Parks" },
  { icon: TrainFront, count: 1, label: "Metro" },
];

const benefits = [
  { icon: MapPin, text: "Neighborhood fit scoring for families, students, and professionals" },
  { icon: GraduationCap, text: "Schools, colleges, and daycare proximity" },
  { icon: Heart, text: "Hospitals, clinics, and healthcare access" },
  { icon: TreePine, text: "Parks, playgrounds, and green spaces" },
  { icon: ShoppingBag, text: "Shopping, markets, and daily essentials" },
  { icon: Clock, text: "Commute time and transit accessibility" },
];

/* ─── Score Circle ─── */
function ScoreCircle({ label, score, color }: { label: string; score: number; color: string }) {
  const r = 20;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative h-14 w-14">
        <svg className="h-14 w-14 -rotate-90" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r={r} fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-200 dark:text-slate-700" />
          <motion.circle
            cx="24" cy="24" r={r} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            whileInView={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-900 dark:text-white">
          {score}%
        </span>
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </span>
    </div>
  );
}

export default function CityFitShowcase() {
  return (
    <section className="py-20 sm:py-32 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-emerald-100/40 via-teal-100/20 to-transparent dark:from-emerald-950/30 dark:via-teal-950/10 dark:to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-indigo-100/30 via-violet-100/10 to-transparent dark:from-indigo-950/20 dark:via-violet-950/5 dark:to-transparent rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="CityFit™"
          title="Know the neighborhood before you commit"
          subtitle="Choose a home with area intelligence — schools, hospitals, parks, commute, daily life, and who this area truly fits."
        />

        <div className="mt-14 sm:mt-20 grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* ─── Left: Interactive Area Card ─── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 overflow-hidden">
              {/* Header with gradient */}
              <div className="relative h-36 sm:h-44 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="absolute inset-0 flex items-end p-5 sm:p-6">
                  <div className="flex items-end justify-between w-full">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                        Vaishali Nagar
                      </h3>
                      <p className="flex items-center gap-1.5 text-sm text-white/80 mt-1">
                        <MapPin className="w-3.5 h-3.5" />
                        Jaipur
                      </p>
                    </div>
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500/80 backdrop-blur-md text-white text-[11px] font-bold">
                      <TrendingUp className="w-3 h-3" />
                      Very High Demand
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-5">
                {/* Score Circles */}
                <div className="flex justify-around">
                  {areaScores.map((s) => (
                    <ScoreCircle key={s.label} label={s.label} score={s.score} color={s.color} />
                  ))}
                </div>

                {/* Best For Tags */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Best for</p>
                  <div className="flex flex-wrap gap-1.5">
                    {bestForTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium border border-emerald-200/60 dark:border-emerald-800/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Nearby Essentials Mini Grid */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Nearby essentials</p>
                  <div className="grid grid-cols-4 gap-2">
                    {essentials.map((e) => {
                      const Icon = e.icon;
                      return (
                        <div
                          key={e.label}
                          className="flex flex-col items-center gap-1 rounded-xl bg-slate-50 dark:bg-slate-800/50 py-3 px-2"
                        >
                          <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{e.count}</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">{e.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Rent Range */}
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-slate-900 dark:text-white font-display">
                    &#8377;15,000 — &#8377;45,000
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 ml-1">/month</span>
                </div>

                {/* CTA */}
                <Link
                  href="/area/vaishali-nagar"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/20"
                >
                  Explore Full Area Profile
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* ─── Right: Benefits List ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 space-y-5"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              What CityFit&trade; reveals
            </h3>

            <div className="space-y-3">
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.text}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {benefit.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <Link href="/compare-areas">
              <Button
                variant="outline"
                size="lg"
                className="w-full mt-2 gap-2 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
              >
                Explore All Areas
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
