"use client";

import { motion } from "framer-motion";
import { MapPin, Coffee, CalendarCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Choose the Right Area",
    description:
      "AI-powered neighborhood matching based on your lifestyle, budget, family needs, and commute preferences.",
    icon: MapPin,
    gradient: "from-indigo-500 to-indigo-600",
    bgLight: "bg-indigo-50 dark:bg-indigo-950/30",
    border: "border-indigo-200/60 dark:border-indigo-800/50",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    title: "Understand Daily Life",
    description:
      "Schools, hospitals, parks, shopping, gyms, restaurants — know what's nearby before you move.",
    icon: Coffee,
    gradient: "from-emerald-500 to-emerald-600",
    bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200/60 dark:border-emerald-800/50",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Settle in 30 Days",
    description:
      "Guided settlement checklist: utilities, registrations, essentials, community — everything you need to start.",
    icon: CalendarCheck,
    gradient: "from-violet-500 to-violet-600",
    bgLight: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-200/60 dark:border-violet-800/50",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
];

const lifestylePills = [
  "Family-friendly",
  "Schools nearby",
  "Hospital access",
  "Quiet area",
  "Parks & playgrounds",
  "Metro access",
  "Gym nearby",
  "Budget-friendly",
  "Student-safe",
  "Work commute < 30min",
];

export default function MovingToNewCity() {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 dark:from-slate-900/50 dark:via-slate-950 dark:to-slate-900/50" />
      <div className="absolute inset-0 bg-dots opacity-20 dark:opacity-[0.05]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-violet-50/30 dark:from-violet-950/20 to-transparent rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Moving to a New City?"
          title="More than renting — start life in a new city with confidence"
          subtitle="99tolet helps you choose the right area, understand daily life, find verified rentals, and settle faster."
        />

        {/* Feature Grid */}
        <div className="mt-14 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group"
              >
                <div className="relative h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700 p-6 sm:p-8 hover:shadow-2xl hover:shadow-indigo-500/[0.06] transition-all duration-500 hover:-translate-y-1.5 hover:border-slate-200/40 dark:hover:border-slate-600 overflow-hidden">
                  {/* Gradient accent top */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient}`} />

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.bgLight} border ${feature.border} mb-5`}>
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Lifestyle Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 sm:mt-16"
        >
          <p className="text-center text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
            What CityFit understands about your lifestyle
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-3xl mx-auto">
            {lifestylePills.map((pill, i) => (
              <motion.span
                key={pill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.04 }}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-default"
              >
                {pill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 sm:mt-14 text-center"
        >
          <Link href="/compare-areas">
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/20 px-8 py-3 text-sm font-semibold rounded-xl"
            >
              Find Your Perfect Neighborhood
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
