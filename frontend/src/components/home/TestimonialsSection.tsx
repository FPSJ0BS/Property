"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { testimonials } from "@/data/testimonials";

const typeColors: Record<string, string> = {
  tenant: "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border-indigo-200/60 dark:border-indigo-800/50",
  landlord: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/50",
  enterprise: "bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400 border-violet-200/60 dark:border-violet-800/50",
  broker: "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/50",
};

export default function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 dark:from-slate-900/50 dark:via-slate-950 dark:to-slate-900/50" />
      <div className="absolute inset-0 bg-dots opacity-20 dark:opacity-[0.05]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Testimonials"
          title="Trusted by tenants, landlords, and businesses"
          subtitle="Real stories from real users who\u2019ve experienced the 99tolet difference."
        />

        <div className="mt-12 sm:mt-16 grid sm:grid-cols-2 gap-4 sm:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700 p-5 sm:p-7 lg:p-8 hover:shadow-2xl hover:shadow-indigo-500/[0.06] transition-all duration-500 hover:-translate-y-1 hover:border-slate-200/40 dark:hover:border-slate-600 relative overflow-hidden">
                {/* Subtle corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-50/50 dark:from-indigo-950/30 to-transparent rounded-bl-3xl" />

                <div className="relative">
                  {/* Quote mark */}
                  <Quote className="w-10 h-10 text-indigo-100 dark:text-indigo-900/50 mb-5" />

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`w-4 h-4 ${
                          j < t.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-200 dark:text-slate-700"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p className="text-[14px] text-slate-600 dark:text-slate-300 leading-[1.7] mb-6 sm:mb-7">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3.5 pt-5 border-t border-slate-100 dark:border-slate-800">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900 dark:to-violet-900 flex items-center justify-center text-sm font-bold text-indigo-600 dark:text-indigo-400 ring-2 ring-white dark:ring-slate-900 shadow-sm shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-900 dark:text-white font-display truncate">
                        {t.name}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="text-[11px] text-slate-400 dark:text-slate-500">{t.location}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${typeColors[t.type]}`}>
                          {t.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
