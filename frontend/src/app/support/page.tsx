"use client";

import { motion } from "framer-motion";
import { Search, Home, CreditCard, ShieldCheck, Settings, FileText, MessageCircle, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const categories = [
  { icon: Home, title: "Finding a Rental", description: "Search, filters, AI matching, and property recommendations." },
  { icon: ShieldCheck, title: "Verification & Trust", description: "Identity verification, property inspection, and trust scores." },
  { icon: CreditCard, title: "Payments & Deposits", description: "Rent collection, deposit tracking, and payment issues." },
  { icon: Settings, title: "RentalOS Dashboard", description: "Post-lease management, maintenance, and renewals." },
  { icon: FileText, title: "Agreements & Legal", description: "Digital agreements, compliance, and documentation." },
  { icon: Search, title: "Account & Settings", description: "Profile management, notifications, and preferences." },
];

const quickHelp = [
  "How do I verify my property?",
  "How does the AI Match Score work?",
  "What is a Trust Score?",
  "How to schedule a property visit?",
  "How to report a fraudulent listing?",
  "How to track rent payments?",
];

export default function SupportPage() {
  return (
    <>
      <section className="py-20 sm:py-24 md:py-32 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 relative">
        <div className="absolute inset-0 bg-grid opacity-30 dark:opacity-10" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">Help & Support</h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-8">Find answers, get help, and reach our support team.</p>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
              <input type="text" placeholder="Search for help..." className="w-full pl-11 pr-4 py-3 text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 focus:border-indigo-300 dark:focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8 text-center">Browse by Category</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {categories.map((cat, i) => (
              <motion.div key={cat.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="bg-slate-50/50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 hover:shadow-lg hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10 transition-all hover:-translate-y-1 cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center mb-3">
                  <cat.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">{cat.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{cat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-5 sm:mb-6 text-center">Quick Help</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {quickHelp.map((q) => (
              <Link key={q} href="/faq" className="flex items-center gap-2 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow transition-all text-sm text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400">
                <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                {q}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">Still need help?</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6 sm:mb-8">Our support team is available Mon\u2013Sat, 9 AM to 7 PM.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 w-full sm:w-auto" asChild>
              <Link href="/contact"><MessageCircle className="w-4 h-4" /> Chat With Us</Link>
            </Button>
            <Button variant="outline" className="gap-2 w-full sm:w-auto dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800" asChild>
              <Link href="/contact"><Phone className="w-4 h-4" /> Call Support</Link>
            </Button>
            <Button variant="outline" className="gap-2 w-full sm:w-auto dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800" asChild>
              <Link href="/contact"><Mail className="w-4 h-4" /> Email Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
