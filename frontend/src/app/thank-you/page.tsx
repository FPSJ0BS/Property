"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Home, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center py-20 sm:py-24 bg-white dark:bg-slate-950">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto max-w-md px-5 text-center">
        <div className="w-20 h-20 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center mx-auto mb-6 sm:mb-8">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">Thank You!</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-2">Your inquiry has been received.</p>
        <p className="text-sm text-slate-400 dark:text-slate-500 mb-8">
          Our team will review your request and get back to you within 24 hours. For urgent matters, feel free to reach us directly.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 gap-2 w-full sm:w-auto" asChild>
            <Link href="/"><Home className="w-4 h-4" /> Back to Home</Link>
          </Button>
          <Button variant="outline" className="gap-2 w-full sm:w-auto dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800" asChild>
            <Link href="/contact"><Phone className="w-4 h-4" /> Contact Us</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
