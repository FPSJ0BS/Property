"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NotebookPen, ChevronDown, Check } from "lucide-react";
import { usePropertyNotes } from "@/lib/store";

interface VisitNotesProps {
  propertyId: string;
}

const REACTIONS = [
  { emoji: "\ud83d\udc4d", label: "Liked" },
  { emoji: "\ud83d\udc4e", label: "Didn't like" },
  { emoji: "\ud83e\udd14", label: "Maybe" },
  { emoji: "\u2b50", label: "Favorite" },
];

export default function VisitNotes({ propertyId }: VisitNotesProps) {
  const { getNote, setNote } = usePropertyNotes();
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [showSaved, setShowSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load existing note
  useEffect(() => {
    const existing = getNote(propertyId);
    if (existing) setText(existing);
  }, [getNote, propertyId]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [text, isOpen]);

  const persistNote = useCallback(
    (value: string) => {
      setNote(propertyId, value);
      setSavedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000);
    },
    [propertyId, setNote]
  );

  const handleChange = (value: string) => {
    setText(value);
    // Debounced auto-save
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => persistNote(value), 1500);
  };

  const handleBlur = () => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    persistNote(text);
  };

  const handleReaction = (reaction: string) => {
    const prefix = `[${reaction}] `;
    // Don't add duplicate reactions
    if (text.includes(prefix)) return;
    const newText = prefix + text;
    setText(newText);
    persistNote(newText);
  };

  const firstLine = text.split("\n")[0]?.substring(0, 60) || "";
  const charCount = text.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800/50 overflow-hidden"
    >
      {/* Header / Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-700/30 transition-colors"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1.5 bg-violet-100 dark:bg-violet-900/40 rounded-lg shrink-0">
            <NotebookPen className="w-4 h-4 text-violet-600 dark:text-violet-400" />
          </div>
          <div className="text-left min-w-0">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">My Notes</p>
            {!isOpen && firstLine && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate max-w-[220px] sm:max-w-sm">
                {firstLine}
              </p>
            )}
            {!isOpen && !firstLine && (
              <p className="text-xs text-zinc-400 dark:text-zinc-500">Add notes about this property</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <AnimatePresence>
            {showSaved && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1"
              >
                <Check className="w-3 h-3" />
                Saved
              </motion.span>
            )}
          </AnimatePresence>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          </motion.div>
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3 border-t border-zinc-100 dark:border-zinc-700/50 pt-3">
              {/* Quick reactions */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 mr-1">Quick:</span>
                {REACTIONS.map((r) => (
                  <button
                    key={r.label}
                    onClick={() => handleReaction(`${r.emoji} ${r.label}`)}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border transition-colors ${
                      text.includes(`[${r.emoji} ${r.label}]`)
                        ? "bg-violet-100 dark:bg-violet-900/40 border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-300"
                        : "bg-zinc-50 dark:bg-zinc-700/50 border-zinc-200 dark:border-zinc-600 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                    }`}
                  >
                    <span>{r.emoji}</span>
                    <span className="hidden sm:inline">{r.label}</span>
                  </button>
                ))}
              </div>

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                placeholder="Write your thoughts after visiting... What did you like? Any concerns?"
                rows={3}
                className="w-full px-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 resize-none outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-400 dark:focus:border-violet-600 transition-all"
                style={{ minHeight: "80px" }}
              />

              {/* Footer: char count + saved time */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                  {charCount > 0 ? `${charCount} characters` : ""}
                </span>
                {savedAt && (
                  <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                    Last saved at {savedAt}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
