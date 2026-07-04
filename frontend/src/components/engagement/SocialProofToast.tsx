"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Home } from "lucide-react";

const activityMessages = [
  { message: "Priya from Delhi just explored Vaishali Nagar", initial: "P" },
  { message: "Rahul booked a visit for 2BHK in Malviya Nagar", initial: "R" },
  { message: "5 people viewing co-living spaces right now", initial: "5" },
  { message: "Ananya completed her CityFit\u2122 quiz \u2014 96% match!", initial: "A" },
  { message: "A verified landlord just listed in C-Scheme", initial: "L" },
  { message: "Deepak saved a co-working space in Tonk Road", initial: "D" },
  { message: "12 new verified properties added today", initial: "12" },
  { message: "Neha moved into The Hive Co-Living yesterday", initial: "N" },
  { message: "3 families found homes in Vaishali Nagar this week", initial: "3" },
  { message: "RentIQ\u2122 detected a below-market deal in Jagatpura", initial: "R" },
  { message: "A 4BHK villa in C-Scheme just got verified", initial: "V" },
  { message: "Sanjay\u2019s tenant screening completed in 2 hours", initial: "S" },
];

export default function SocialProofToast() {
  const [currentToast, setCurrentToast] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [hasScrolledEnough, setHasScrolledEnough] = useState(false);

  // Check sessionStorage for dismissal
  useEffect(() => {
    if (typeof window !== "undefined") {
      const wasDismissed = sessionStorage.getItem("socialProofDismissed");
      if (wasDismissed === "true") setDismissed(true);
    }
  }, []);

  // Track scroll position
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 500) {
        setHasScrolledEnough(true);
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showNextToast = useCallback(() => {
    if (dismissed || !hasScrolledEnough) return;
    const randomIndex = Math.floor(Math.random() * activityMessages.length);
    setCurrentToast(randomIndex);
    setVisible(true);

    // Hide after 5 seconds
    setTimeout(() => {
      setVisible(false);
    }, 5000);
  }, [dismissed, hasScrolledEnough]);

  // Cycle toasts at random intervals (8-15s)
  useEffect(() => {
    if (dismissed || !hasScrolledEnough) return;

    function scheduleNext() {
      const delay = 8000 + Math.random() * 7000;
      return setTimeout(() => {
        showNextToast();
        timerRef = scheduleNext();
      }, delay);
    }

    let timerRef = scheduleNext();
    return () => clearTimeout(timerRef);
  }, [dismissed, hasScrolledEnough, showNextToast]);

  function handleDismiss() {
    setDismissed(true);
    setVisible(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("socialProofDismissed", "true");
    }
  }

  function handleClickToast() {
    setVisible(false);
  }

  if (dismissed) return null;

  const toast = currentToast !== null ? activityMessages[currentToast] : null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto z-50 pointer-events-none">
      <AnimatePresence>
        {visible && toast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="pointer-events-auto max-w-[200px] w-full sm:w-auto cursor-pointer
              bg-white/10 dark:bg-white/5 backdrop-blur-xl
              border border-white/20 dark:border-white/10
              rounded-xl p-3 shadow-2xl shadow-black/20"
            onClick={handleClickToast}
          >
            <div className="flex items-start gap-2.5">
              {/* Avatar */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {toast.initial}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-zinc-800 dark:text-zinc-100 leading-snug line-clamp-3">
                  {toast.message}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <Home className="w-3 h-3 text-violet-500" />
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                    just now
                  </span>
                </div>
              </div>

              {/* Close */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDismiss();
                }}
                className="flex-shrink-0 p-0.5 rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
                aria-label="Dismiss notifications"
              >
                <X className="w-3 h-3 text-zinc-500 dark:text-zinc-400" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
