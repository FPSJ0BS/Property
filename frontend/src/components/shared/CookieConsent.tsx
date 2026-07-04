"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie, Shield } from "lucide-react";

const STORAGE_KEY = "99tolet-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user has already consented
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (consent) return;
    } catch {
      // localStorage not available
    }

    // Show after 2 second delay
    const timer = setTimeout(() => {
      setVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: true, date: new Date().toISOString() }));
    } catch {
      // localStorage not available
    }
    setVisible(false);
  };

  const handleCustomize = () => {
    router.push("/cookies");
  };

  const handleDismiss = () => {
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-consent"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 inset-x-0 z-[9997] p-4 sm:p-6"
        >
          <div className="mx-auto max-w-4xl">
            <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              {/* Decorative gradient top border */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

              <div className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Content */}
                  <div className="flex-1 flex gap-3 sm:gap-4 min-w-0">
                    {/* Cookie icon */}
                    <div className="shrink-0 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 h-fit">
                      <Cookie className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Shield className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                          Cookie Preferences
                        </h3>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        We use cookies to enhance your experience, analyze site traffic, and
                        improve our AI matching. By continuing, you agree to our{" "}
                        <a
                          href="/cookies"
                          className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                        >
                          cookie policy
                        </a>
                        .
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:shrink-0">
                    <button
                      onClick={handleCustomize}
                      className="px-5 py-2.5 text-sm font-medium rounded-xl border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-center"
                    >
                      Customize
                    </button>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleAccept}
                      className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 transition-all text-center"
                    >
                      Accept All
                    </motion.button>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={handleDismiss}
                    className="absolute top-3 right-3 sm:relative sm:top-auto sm:right-auto p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
