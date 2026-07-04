"use client";

import { motion } from "framer-motion";
import { Rocket, Brain, Users, Heart, MapPin, ArrowRight, Briefcase, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/shared/SectionHeading";
import { jobs } from "@/data/jobs";
import Link from "next/link";

const benefits = [
  "Competitive salary + equity",
  "Hybrid work \u2014 Jaipur HQ",
  "Health insurance for family",
  "Learning & conference budget",
  "Team retreats",
  "Free lunch at office",
];

const hiringSteps = [
  { step: "Apply", description: "Submit your application with resume and a brief note on why you\u2019re excited about 99tolet." },
  { step: "Screen", description: "30-minute conversation with our hiring team to assess mutual fit and alignment." },
  { step: "Challenge", description: "A take-home assignment or technical discussion relevant to the role." },
  { step: "Team Meet", description: "Meet the team you\u2019d work with. Ask anything. We want this to be a two-way decision." },
  { step: "Offer", description: "If it\u2019s a match, we move fast. Offer within 48 hours of final round." },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 sm:py-24 md:py-32 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wide uppercase text-indigo-300 bg-indigo-900/50 rounded-full border border-indigo-700/50 mb-6">
              <Rocket className="w-3 h-3" /> We&apos;re Hiring
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5 sm:mb-6">
              Build the future of{" "}
              <span className="text-indigo-400">rental intelligence</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
              We&apos;re a team of engineers, designers, data scientists, and operators building something that doesn&apos;t exist yet. If you want to work on real problems with real AI \u2014 not AI-washing \u2014 this is the place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-20 sm:py-24 md:py-32 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeading badge="Why 99tolet" title="Why build with us" subtitle="We\u2019re not a typical startup. We\u2019re a Jaipur-rooted company with 8 years of rental operations experience, now building India\u2019s most intelligent leasing platform." />
          <div className="mt-12 sm:mt-16 grid sm:grid-cols-3 gap-5 sm:gap-6">
            {[
              { icon: Brain, title: "AI-First Culture", description: "Real AI \u2014 not dashboards with sparkle icons. We build ML models, NLP engines, and recommendation systems that solve actual rental problems." },
              { icon: Users, title: "Small, Senior Team", description: "No layers of management. Work directly with founders and domain experts. Every person has outsized impact on the product." },
              { icon: Heart, title: "Real Problem, Real Users", description: "Millions of people deal with broken rental experiences daily. Your work directly improves lives \u2014 not just metrics." },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-slate-50/50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 sm:py-16 bg-indigo-50/30 dark:bg-indigo-950/20">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center mb-6 sm:mb-8">Benefits & Perks</h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {benefits.map((b) => (
              <Badge key={b} variant="secondary" className="text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 px-4 py-2 sm:py-1.5">
                {b}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-20 sm:py-24 md:py-32 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <SectionHeading badge="Open Roles" title="Current opportunities" subtitle="We\u2019re growing the team. If you see a role that excites you \u2014 apply." />
          <div className="mt-10 sm:mt-12 space-y-4">
            {jobs.map((job, i) => (
              <motion.div key={job.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-lg hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10 transition-all hover:-translate-y-0.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{job.title}</h4>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.department}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.experience}</span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{job.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {job.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0 gap-1 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 self-start sm:self-center">
                    Apply <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-20 sm:py-24 md:py-32 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <SectionHeading badge="Process" title="How we hire" subtitle="Transparent, fast, and respectful. We value your time." />
          <div className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
            {hiringSteps.map((step, i) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 text-center">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-sm font-bold flex items-center justify-center mx-auto mb-3">
                  {i + 1}
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">{step.step}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
