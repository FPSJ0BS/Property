"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Brain, MapPin, IndianRupee, Home, Trees } from "lucide-react";
import Link from "next/link";

const quizQuestions = [
  { icon: IndianRupee, text: "What's your monthly rent budget?" },
  { icon: Home, text: "What type of home are you looking for?" },
  { icon: MapPin, text: "Which part of the city do you prefer?" },
  { icon: Trees, text: "How important are parks and green spaces?" },
  { icon: Brain, text: "What matters most — commute, safety, or social life?" },
];

const miniAvatars = [
  { initial: "P", color: "from-violet-500 to-indigo-600" },
  { initial: "R", color: "from-pink-500 to-rose-600" },
  { initial: "A", color: "from-amber-500 to-orange-600" },
  { initial: "S", color: "from-emerald-500 to-teal-600" },
  { initial: "D", color: "from-cyan-500 to-blue-600" },
];

export default function QuizCTA() {
  const [activeQuestion, setActiveQuestion] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuestion((prev) => (prev + 1) % quizQuestions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl overflow-hidden
          bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700
          dark:from-violet-900 dark:via-indigo-900 dark:to-purple-950
          p-6 sm:p-10 lg:p-14"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Floating glow orbs */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-violet-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
          {/* Left: Question previews */}
          <div className="flex-1 w-full">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-5">
              <Brain className="w-3.5 h-3.5 text-violet-200" />
              <span className="text-xs font-semibold text-violet-100">
                CityFit{"\u2122"} Quiz
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
              Find your perfect neighborhood in 60 seconds
            </h2>
            <p className="text-sm sm:text-base text-violet-200/80 mb-8 max-w-lg">
              Answer 5 questions. Get a personalized area match with AI-powered lifestyle intelligence.
            </p>

            {/* Animated question previews */}
            <div className="relative h-14 mb-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeQuestion}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/20">
                    {(() => {
                      const Icon = quizQuestions[activeQuestion].icon;
                      return <Icon className="w-5 h-5 text-white" />;
                    })()}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-violet-300/60 font-medium">
                      Question {activeQuestion + 1} of 5
                    </p>
                    <p className="text-sm sm:text-base text-white font-medium">
                      {quizQuestions[activeQuestion].text}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress dots */}
            <div className="flex gap-1.5">
              {quizQuestions.map((_, i) => (
                <motion.div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeQuestion
                      ? "w-6 bg-white"
                      : "w-1.5 bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: CTA block */}
          <div className="flex-shrink-0 w-full lg:w-auto flex flex-col items-center lg:items-end gap-6">
            {/* Take the Quiz button with animated gradient border */}
            <div className="relative group">
              {/* Animated border glow */}
              <motion.div
                className="absolute -inset-[2px] rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #c084fc, #818cf8, #67e8f9, #c084fc)",
                  backgroundSize: "300% 300%",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />

              <Link
                href="/discover"
                className="relative flex items-center gap-3 px-8 py-4 rounded-2xl
                  bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white
                  font-bold text-base sm:text-lg
                  hover:shadow-2xl hover:shadow-violet-500/25 transition-shadow duration-300"
              >
                <Sparkles className="w-5 h-5 text-violet-500" />
                Take the Quiz
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              {/* Mini avatar stack */}
              <div className="flex -space-x-2">
                {miniAvatars.map((avatar, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full bg-gradient-to-br ${avatar.color}
                      flex items-center justify-center border-2 border-violet-700 dark:border-violet-950`}
                  >
                    <span className="text-[10px] font-bold text-white">
                      {avatar.initial}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-violet-200/80">
                <span className="text-white font-semibold">12,400</span> people found their match
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
