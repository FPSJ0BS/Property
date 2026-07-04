"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useSavedProperties } from "@/lib/store";

export default function SavedCount() {
  const { count } = useSavedProperties();

  return (
    <Link
      href="/saved"
      className="relative inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
      aria-label={`Saved properties${count > 0 ? ` (${count})` : ""}`}
    >
      <Heart className="w-[18px] h-[18px]" />

      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key="count"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[16px] h-4 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full leading-none"
          >
            {count > 99 ? "99+" : count}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
