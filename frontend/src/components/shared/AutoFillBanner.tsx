"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCheck, X } from "lucide-react";
import { useAuth } from "@/lib/auth";

interface AutoFillBannerProps {
  onFill: (data: { name: string; email: string; phone: string }) => void;
}

const DISMISS_KEY = "99tolet-autofill-dismissed";

export default function AutoFillBanner({ onFill }: AutoFillBannerProps) {
  const { user, isLoggedIn } = useAuth();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const wasDismissed = sessionStorage.getItem(DISMISS_KEY) === "true";
      setDismissed(wasDismissed || !isLoggedIn);
    }
  }, [isLoggedIn]);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem(DISMISS_KEY, "true");
  };

  const handleFill = () => {
    if (user) {
      onFill({ name: user.name, email: user.email, phone: user.phone });
    }
    handleDismiss();
  };

  return (
    <AnimatePresence>
      {!dismissed && user && (
        <motion.div
          initial={{ opacity: 0, y: -12, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -12, height: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <div className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-800/50 mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <UserCheck className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
              <span className="text-sm text-indigo-700 dark:text-indigo-300 truncate">
                Hi {user.name}, auto-fill from your profile?
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleFill}
                className="px-3 py-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
              >
                Fill
              </button>
              <button
                onClick={handleDismiss}
                className="p-1 text-indigo-400 dark:text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
