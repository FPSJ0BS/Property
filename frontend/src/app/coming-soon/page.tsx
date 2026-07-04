"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Bell, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const upcomingCities = [
  { name: "Jodhpur", state: "Rajasthan", status: "Coming Q3 2026" },
  { name: "Udaipur", state: "Rajasthan", status: "Coming Q4 2026" },
  { name: "Delhi NCR", state: "Delhi", status: "Coming 2027" },
  { name: "Bangalore", state: "Karnataka", status: "Coming 2027" },
  { name: "Mumbai", state: "Maharashtra", status: "Coming 2027" },
  { name: "Pune", state: "Maharashtra", status: "Coming 2027" },
];

export default function ComingSoonPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="min-h-[80vh] flex items-center py-20 sm:py-24 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 relative">
      <div className="absolute inset-0 bg-grid opacity-30 dark:opacity-10" />
      <div className="relative mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wide uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 rounded-full border border-indigo-100 dark:border-indigo-800 mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Expanding
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            99tolet is coming to your city
          </h1>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            We&apos;re expanding beyond Jaipur. Get notified when AI-powered leasing intelligence arrives in your city.
          </p>
        </motion.div>

        {/* Notification signup */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-md mx-auto mb-12 sm:mb-16">
          {submitted ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 p-6 text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">You&apos;re on the list! We&apos;ll notify you when we launch.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="flex flex-col sm:flex-row gap-3 sm:gap-2">
              <Input placeholder="Enter your email" type="email" required className="flex-1 py-3 sm:py-2 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-500" />
              <Button type="submit" className="bg-gradient-to-r from-indigo-600 to-violet-600 gap-1 shrink-0 py-3 sm:py-2">
                <Bell className="w-4 h-4" /> Notify Me
              </Button>
            </form>
          )}
        </motion.div>

        {/* Cities grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {upcomingCities.map((city, i) => (
            <motion.div key={city.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 hover:shadow-lg dark:hover:shadow-indigo-500/10 transition-all hover:-translate-y-1">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                <h3 className="font-bold text-slate-900 dark:text-white">{city.name}</h3>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">{city.state}</p>
              <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-2 py-0.5 rounded-full">{city.status}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
