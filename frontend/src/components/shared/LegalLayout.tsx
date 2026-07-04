"use client";

import { motion } from "framer-motion";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <>
      <section className="py-14 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">{title}</h1>
            <p className="text-sm text-slate-400 dark:text-slate-500">Last updated: {lastUpdated}</p>
          </motion.div>
        </div>
      </section>
      <section className="py-10 sm:py-12 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert prose-sm max-w-none">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            {children}
          </motion.div>
        </div>
      </section>
    </>
  );
}
