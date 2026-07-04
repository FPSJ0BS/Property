"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { X, Keyboard } from "lucide-react";

interface ShortcutEntry {
  keys: string[];
  description: string;
}

const shortcuts: ShortcutEntry[] = [
  { keys: ["⌘K", "Ctrl+K"], description: "Open Search" },
  { keys: ["/"], description: "Focus Search" },
  { keys: ["Esc"], description: "Close Modal" },
  { keys: ["?"], description: "Show Shortcuts" },
  { keys: ["←", "→"], description: "Navigate Gallery" },
  { keys: ["T"], description: "Toggle Theme" },
];

function KeyBadge({ label }: { label: string }) {
  return (
    <kbd className="inline-flex items-center justify-center min-w-[28px] px-1.5 py-0.5 text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 rounded shadow-sm">
      {label}
    </kbd>
  );
}

export default function KeyboardShortcuts() {
  const [showHelp, setShowHelp] = useState(false);
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  const isInputFocused = useCallback(() => {
    const tag = document.activeElement?.tagName?.toLowerCase();
    const isContentEditable = document.activeElement?.getAttribute("contenteditable") === "true";
    return tag === "input" || tag === "textarea" || tag === "select" || isContentEditable;
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K / Ctrl+K — always intercept
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        router.push("/discover");
        return;
      }

      // Don't fire shortcuts when typing in inputs
      if (isInputFocused()) return;

      // ? (Shift + /) — toggle shortcuts help
      if (e.key === "?" && e.shiftKey) {
        e.preventDefault();
        setShowHelp((prev) => !prev);
        return;
      }

      // Escape — close help or dispatch custom event
      if (e.key === "Escape") {
        if (showHelp) {
          setShowHelp(false);
        } else {
          window.dispatchEvent(new CustomEvent("escape-pressed"));
        }
        return;
      }

      // / — focus search
      if (e.key === "/") {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("focus-search"));
        return;
      }

      // T — toggle theme
      if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        window.dispatchEvent(new CustomEvent("toggle-theme"));
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, isInputFocused, showHelp, setTheme, resolvedTheme]);

  return (
    <AnimatePresence>
      {showHelp && (
        <motion.div
          key="shortcut-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={() => setShowHelp(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10">
                  <Keyboard className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Keyboard Shortcuts
                </h2>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Shortcuts grid */}
            <div className="px-6 pb-6 space-y-1">
              {shortcuts.map((shortcut, i) => (
                <motion.div
                  key={shortcut.description}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {shortcut.description}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {shortcut.keys.map((key, ki) => (
                      <span key={ki} className="flex items-center gap-1">
                        {ki > 0 && (
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 mx-0.5">
                            /
                          </span>
                        )}
                        <KeyBadge label={key} />
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                Press <KeyBadge label="?" /> to toggle this panel
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
