"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { plans } from "@/data/plans";
import Link from "next/link";

export default function PricingPage() {
  const mainPlans = plans.filter((p) => ["1", "2", "3", "4", "5"].includes(p.id));
  const coPlans = plans.filter((p) => !["1", "2", "3", "4", "5"].includes(p.id));

  return (
    <>
      {/* Hero */}
      <section className="py-20 sm:py-24 md:py-32 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 relative">
        <div className="absolute inset-0 bg-grid opacity-30 dark:opacity-10" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wide uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 rounded-full border border-indigo-100 dark:border-indigo-800 mb-6">
              Pricing
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Start searching for free. Upgrade when you need premium verification, AI insights, or full lifecycle management.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Plans */}
      <section className="py-12 sm:py-16 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6">
            {mainPlans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-2xl border p-5 sm:p-6 flex flex-col ${
                  plan.highlighted
                    ? "border-indigo-300 dark:border-indigo-700 bg-indigo-50/30 dark:bg-indigo-950/30 shadow-lg shadow-indigo-500/10 relative"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Most Popular
                  </div>
                )}
                <div className="mb-4">
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">{plan.audience}</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{plan.name}</h3>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                  {plan.period && <span className="text-sm text-slate-400 dark:text-slate-500">{plan.period}</span>}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{plan.description}</p>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full gap-1 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
                      : "dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                  variant={plan.highlighted ? "default" : "outline"}
                  asChild
                >
                  <Link href="/contact">{plan.cta} <ArrowRight className="w-3.5 h-3.5" /></Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Co-Living & Co-Working Plans */}
      {coPlans.length > 0 && (
        <section className="py-12 sm:py-16 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wide uppercase text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/30 rounded-full border border-cyan-100 dark:border-cyan-800 mb-4">
                New
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                Co-Living &amp; Co-Working Plans
              </h3>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                Specialized plans for co-living operators and co-working space providers with AI-powered management tools.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
              {coPlans.map((plan, i) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-2xl border p-5 sm:p-6 flex flex-col ${
                    plan.highlighted
                      ? "border-indigo-300 dark:border-indigo-700 bg-indigo-50/30 dark:bg-indigo-950/30 shadow-lg shadow-indigo-500/10 relative"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Most Popular
                    </div>
                  )}
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">{plan.audience}</span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{plan.name}</h3>
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                    {plan.period && <span className="text-sm text-slate-400 dark:text-slate-500">{plan.period}</span>}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{plan.description}</p>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full gap-1 ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
                        : "dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`}
                    variant={plan.highlighted ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/contact">{plan.cta} <ArrowRight className="w-3.5 h-3.5" /></Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Enterprise CTA */}
      <section className="py-20 sm:py-24 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">Need a custom plan?</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">For enterprises, institutional landlords, and co-living operators &mdash; we build custom solutions with dedicated support.</p>
          <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 gap-2 w-full sm:w-auto" asChild>
            <Link href="/contact">Contact Sales <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
}
