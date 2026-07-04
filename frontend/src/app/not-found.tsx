"use client";

import { motion } from "framer-motion";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center py-20 sm:py-24 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 relative">
      <div className="absolute inset-0 bg-grid opacity-20 dark:opacity-10" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mx-auto max-w-md px-5 text-center"
      >
        <div className="text-7xl sm:text-8xl font-bold gradient-text mb-4">404</div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
          Page not found
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s
          get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            className="bg-gradient-to-r from-indigo-600 to-violet-600 gap-2 w-full sm:w-auto"
            asChild
          >
            <Link href="/">
              <Home className="w-4 h-4" /> Back to Home
            </Link>
          </Button>
          <Button
            variant="outline"
            className="gap-2 w-full sm:w-auto dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            asChild
          >
            <Link href="/discover">
              <Search className="w-4 h-4" /> Search Properties
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
