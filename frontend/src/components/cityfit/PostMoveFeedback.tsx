"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  ShoppingBag,
  Shield,
  Car,
  IndianRupee,
  Heart,
  Star,
  Send,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface PostMoveFeedbackProps {
  areaName: string;
}

interface RatingDimension {
  key: string;
  label: string;
  icon: React.ReactNode;
}

const DIMENSIONS: RatingDimension[] = [
  { key: "convenience", label: "Daily convenience", icon: <ShoppingBag className="h-4 w-4" /> },
  { key: "safety", label: "Safety & comfort", icon: <Shield className="h-4 w-4" /> },
  { key: "commute", label: "Commute experience", icon: <Car className="h-4 w-4" /> },
  { key: "value", label: "Value for money", icon: <IndianRupee className="h-4 w-4" /> },
  { key: "overall", label: "Overall satisfaction", icon: <Heart className="h-4 w-4" /> },
];

const PERSONA_PILLS = [
  "Families",
  "Students",
  "Professionals",
  "Retirees",
  "Couples",
];

export default function PostMoveFeedback({ areaName }: PostMoveFeedbackProps) {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [hoveredStars, setHoveredStars] = useState<Record<string, number>>({});
  const [comment, setComment] = useState("");
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleRate = (key: string, value: number) => {
    setRatings((prev) => ({ ...prev, [key]: value }));
  };

  const handleHover = (key: string, value: number) => {
    setHoveredStars((prev) => ({ ...prev, [key]: value }));
  };

  const handleHoverEnd = (key: string) => {
    setHoveredStars((prev) => ({ ...prev, [key]: 0 }));
  };

  const togglePersona = (persona: string) => {
    setSelectedPersonas((prev) =>
      prev.includes(persona)
        ? prev.filter((p) => p !== persona)
        : [...prev, persona]
    );
  };

  const canSubmit = Object.keys(ratings).length >= 3;

  const handleSubmit = () => {
    if (canSubmit) setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-white p-6 shadow-lg dark:border-slate-700/60 dark:from-slate-900 dark:via-slate-800/80 dark:to-slate-900"
    >
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-500 via-rose-400 to-orange-400" />

      {/* Glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-pink-500/10 blur-3xl dark:bg-pink-400/5" />

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-md">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  How&apos;s life in {areaName}?
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Help future movers make better decisions
                </p>
              </div>
            </div>

            {/* Rating Dimensions */}
            <div className="mb-6 space-y-3">
              {DIMENSIONS.map((dim, idx) => {
                const currentRating = ratings[dim.key] || 0;
                const currentHover = hoveredStars[dim.key] || 0;
                const displayValue = currentHover || currentRating;

                return (
                  <motion.div
                    key={dim.key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06, duration: 0.3 }}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-white/60 px-4 py-3 dark:border-slate-700/30 dark:bg-slate-800/40"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-slate-500 dark:text-slate-400">
                        {dim.icon}
                      </span>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {dim.label}
                      </span>
                    </div>
                    <div
                      className="flex gap-1"
                      onMouseLeave={() => handleHoverEnd(dim.key)}
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRate(dim.key, star)}
                          onMouseEnter={() => handleHover(dim.key, star)}
                          className="p-0.5 transition-transform hover:scale-110"
                        >
                          <Star
                            className={`h-5 w-5 transition-colors ${
                              star <= displayValue
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-300 dark:text-slate-600"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Comment */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mb-5"
            >
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                What should new residents know?
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share tips, warnings, or things you wish you knew before moving..."
                rows={3}
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-pink-400 focus:ring-2 focus:ring-pink-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-500 dark:focus:border-pink-500 dark:focus:ring-pink-900/30"
              />
            </motion.div>

            {/* Persona Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Area best suited for:
              </label>
              <div className="flex flex-wrap gap-2">
                {PERSONA_PILLS.map((persona) => {
                  const isSelected = selectedPersonas.includes(persona);
                  return (
                    <button
                      key={persona}
                      onClick={() => togglePersona(persona)}
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                        isSelected
                          ? "border-pink-300 bg-pink-50 text-pink-700 shadow-sm dark:border-pink-700 dark:bg-pink-950/30 dark:text-pink-400"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600"
                      }`}
                    >
                      {isSelected && (
                        <CheckCircle2 className="-ml-0.5 mr-1 inline h-3 w-3" />
                      )}
                      {persona}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Submit */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              onClick={handleSubmit}
              disabled={!canSubmit}
              whileHover={canSubmit ? { scale: 1.02 } : {}}
              whileTap={canSubmit ? { scale: 0.98 } : {}}
              className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
                canSubmit
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/30 dark:shadow-pink-900/30"
                  : "cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-500"
              }`}
            >
              <Send className="h-4 w-4" />
              Share Your Experience
            </motion.button>

            {!canSubmit && (
              <p className="mt-2 text-center text-xs text-slate-400 dark:text-slate-500">
                Rate at least 3 dimensions to submit
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center py-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: "spring", bounce: 0.5 }}
              className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-500 text-white shadow-lg shadow-emerald-500/30"
            >
              <CheckCircle2 className="h-8 w-8" />
            </motion.div>
            <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
              Thank You!
            </h3>
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
              Your experience with {areaName} has been recorded
            </p>
            <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 dark:border-emerald-800/40 dark:bg-emerald-950/20">
              <Sparkles className="h-4 w-4 text-emerald-500" />
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                Your feedback helps 25,000+ users make better decisions
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
