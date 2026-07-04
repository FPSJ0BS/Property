"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { languages, type Language } from "@/i18n/translations";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface LanguageSwitcherProps {
  /** "compact" — small button + dropdown (navbar). "full" — pill buttons (footer/settings). */
  variant?: "full" | "compact";
}

// ---------------------------------------------------------------------------
// Short labels for the compact variant button
// ---------------------------------------------------------------------------

const shortLabels: Record<Language, string> = {
  en: "EN",
  hi: "\u0939\u093F",
  hinglish: "Hi",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LanguageSwitcher({
  variant = "compact",
}: LanguageSwitcherProps) {
  if (variant === "full") return <FullVariant />;
  return <CompactVariant />;
}

// ===========================================================================
// COMPACT variant — navbar dropdown
// ===========================================================================

function CompactVariant() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
      >
        {shortLabels[lang]}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-50 mt-2 w-44 origin-top-right overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            {languages.map((l) => {
              const isActive = lang === l.code;
              return (
                <li key={l.code}>
                  <button
                    role="option"
                    aria-selected={isActive}
                    onClick={() => {
                      setLang(l.code);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm transition-colors ${
                      isActive
                        ? "bg-indigo-50 font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                        : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    <span className="text-base leading-none">{l.flag}</span>
                    <span>{l.nativeLabel}</span>
                    {isActive && (
                      <svg
                        className="ml-auto h-4 w-4 text-indigo-600 dark:text-indigo-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// ===========================================================================
// FULL variant — pill buttons
// ===========================================================================

function FullVariant() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="inline-flex gap-1 rounded-xl border border-gray-200 bg-gray-100 p-1 dark:border-gray-700 dark:bg-gray-800">
      {languages.map((l) => {
        const isActive = lang === l.code;
        return (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className={`relative rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? "text-white"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            }`}
          >
            {/* Active pill background */}
            {isActive && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-lg bg-indigo-600"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <span className="text-base leading-none">{l.flag}</span>
              <span>{l.nativeLabel}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
