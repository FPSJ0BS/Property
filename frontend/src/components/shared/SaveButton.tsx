"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useSavedProperties } from "@/lib/store";

interface SaveButtonProps {
  propertyId: string;
  variant?: "icon" | "full";
}

export default function SaveButton({
  propertyId,
  variant = "icon",
}: SaveButtonProps) {
  const { toggle, isSaved } = useSavedProperties();
  const saved = isSaved(propertyId);
  const [toast, setToast] = useState<string | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(propertyId);
    const message = saved ? "Removed" : "Saved!";
    setToast(message);
    setTimeout(() => setToast(null), 1500);
  };

  if (variant === "full") {
    return (
      <div className="relative">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleClick}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
            saved
              ? "bg-indigo-600 border-indigo-600 text-white"
              : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-600"
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-all duration-200 ${
              saved ? "fill-white text-white" : ""
            }`}
          />
          {saved ? "Saved" : "Save"}
        </motion.button>

        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs rounded-full whitespace-nowrap z-50 shadow-lg"
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={handleClick}
        className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 transition-colors duration-200 shadow-sm"
        aria-label={saved ? "Remove from saved" : "Save property"}
      >
        <motion.div
          key={saved ? "saved" : "unsaved"}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          <Heart
            className={`w-4 h-4 transition-all duration-200 ${
              saved
                ? "fill-red-500 text-red-500"
                : "text-slate-400 dark:text-slate-500"
            }`}
          />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs rounded-full whitespace-nowrap z-50 shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
