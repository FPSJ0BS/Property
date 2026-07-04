"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Brain,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Check,
  Share2,
  Copy,
  RotateCcw,
  MapPin,
  Shield,
  Footprints,
  Train,
  Heart,
  GraduationCap,
  Briefcase,
  TreePine,
  Star,
  Home,
  Zap,
  Clock,
  Users,
  Target,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { areas, Area } from "@/data/areas";

// ─── Types ──────────────────────────────────────────────────────────────────

type Phase = "welcome" | "questions" | "processing" | "results";

interface QuizAnswers {
  persona: string;
  budget: string;
  priorities: string[];
  commute: string;
  timeline: string;
}

interface ScoredArea {
  area: Area;
  score: number;
  matchPercent: number;
  reasons: string[];
}

// ─── Quiz Data ──────────────────────────────────────────────────────────────

const personaOptions = [
  { id: "family", label: "Family with kids", icon: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}" },
  { id: "professional", label: "Working professional", icon: "\u{1F4BC}" },
  { id: "student", label: "Student", icon: "\u{1F393}" },
  { id: "couple", label: "Couple (no kids)", icon: "\u{1F46B}" },
  { id: "solo", label: "Solo / Independent", icon: "\u{1F9D1}" },
  { id: "corporate", label: "Corporate relocator", icon: "\u{1F3E2}" },
];

const budgetOptions = [
  { id: "under10k", label: "Under \u20B910,000", min: 0, max: 10000 },
  { id: "10k-20k", label: "\u20B910,000 \u2013 \u20B920,000", min: 10000, max: 20000 },
  { id: "20k-35k", label: "\u20B920,000 \u2013 \u20B935,000", min: 20000, max: 35000 },
  { id: "35k-50k", label: "\u20B935,000 \u2013 \u20B950,000", min: 35000, max: 50000 },
  { id: "50k+", label: "\u20B950,000+", min: 50000, max: 999999 },
];

const priorityOptions = [
  { id: "schools", label: "Schools nearby", icon: "\u{1F3EB}" },
  { id: "hospital", label: "Hospital access", icon: "\u{1F3E5}" },
  { id: "parks", label: "Parks & green spaces", icon: "\u{1F333}" },
  { id: "shopping", label: "Shopping & markets", icon: "\u{1F6D2}" },
  { id: "metro", label: "Metro / transit", icon: "\u{1F687}" },
  { id: "gym", label: "Gym & fitness", icon: "\u{1F3CB}\uFE0F" },
  { id: "food", label: "Restaurants & food", icon: "\u{1F355}" },
  { id: "quiet", label: "Quiet & peaceful", icon: "\u{1F92B}" },
  { id: "safety", label: "Safety & security", icon: "\u{1F512}" },
  { id: "ithub", label: "Near IT hub / offices", icon: "\u{1F4BB}" },
];

const commuteOptions = [
  { id: "car", label: "Car / bike", icon: "\u{1F697}" },
  { id: "metro", label: "Metro / bus", icon: "\u{1F687}" },
  { id: "walk", label: "Walk / cycle", icon: "\u{1F6B6}" },
  { id: "wfh", label: "Work from home", icon: "\u{1F4BB}" },
  { id: "mix", label: "Mix of above", icon: "\u{1F504}" },
];

const timelineOptions = [
  { id: "immediately", label: "Immediately", icon: "\u26A1" },
  { id: "this-month", label: "This month", icon: "\u{1F4C5}" },
  { id: "1-3-months", label: "Next 1-3 months", icon: "\u{1F5D3}\uFE0F" },
  { id: "exploring", label: "Just exploring", icon: "\u{1F50D}" },
];

// ─── Scoring Algorithm ──────────────────────────────────────────────────────

function scoreAreas(answers: QuizAnswers): ScoredArea[] {
  const budgetDef = budgetOptions.find((b) => b.id === answers.budget);

  return areas
    .map((area) => {
      let score = 0;
      const maxScore = 100;

      // Persona scoring (weight: 30)
      switch (answers.persona) {
        case "family":
          score += (area.familyScore / 100) * 30;
          break;
        case "professional":
        case "corporate":
          score += (area.professionalScore / 100) * 30;
          break;
        case "student":
          score += (area.studentScore / 100) * 30;
          break;
        case "couple":
          score +=
            ((area.professionalScore * 0.5 + area.safetyScore * 0.5) / 100) *
            30;
          break;
        case "solo":
          score +=
            ((area.walkScore * 0.4 +
              area.transitScore * 0.3 +
              area.professionalScore * 0.3) /
              100) *
            30;
          break;
      }

      // Budget scoring (weight: 25)
      if (budgetDef) {
        const budgetMid = (budgetDef.min + budgetDef.max) / 2;
        const areaMid = (area.rentRange.min + area.rentRange.max) / 2;
        if (
          area.rentRange.min <= budgetDef.max &&
          area.rentRange.max >= budgetDef.min
        ) {
          // Overlap exists
          const overlapMin = Math.max(area.rentRange.min, budgetDef.min);
          const overlapMax = Math.min(area.rentRange.max, budgetDef.max);
          const overlapRange = overlapMax - overlapMin;
          const budgetRange = budgetDef.max - budgetDef.min || 10000;
          const fit = Math.min(overlapRange / budgetRange, 1);
          score += fit * 25;
        } else {
          // Penalize based on distance from budget
          const dist = Math.min(
            Math.abs(area.rentRange.min - budgetMid),
            Math.abs(area.rentRange.max - budgetMid)
          );
          score += Math.max(0, 25 - dist / 1000);
        }
      }

      // Priorities scoring (weight: 30)
      const priorityWeight = 30 / Math.max(answers.priorities.length, 1);
      answers.priorities.forEach((priority) => {
        switch (priority) {
          case "schools":
            const schoolCount = area.nearbyPlaces.filter(
              (p) => p.type === "school"
            ).length;
            score += Math.min(schoolCount / 2, 1) * priorityWeight;
            break;
          case "hospital":
            const hospitalCount = area.nearbyPlaces.filter(
              (p) => p.type === "hospital"
            ).length;
            score += Math.min(hospitalCount / 1.5, 1) * priorityWeight;
            break;
          case "parks":
            const parkCount = area.nearbyPlaces.filter(
              (p) => p.type === "park"
            ).length;
            score += Math.min(parkCount / 2, 1) * priorityWeight;
            break;
          case "shopping":
            const shopCount = area.nearbyPlaces.filter(
              (p) => p.type === "shopping"
            ).length;
            score += Math.min(shopCount / 2, 1) * priorityWeight;
            break;
          case "metro":
            score += (area.transitScore / 100) * priorityWeight;
            break;
          case "gym":
            const gymCount = area.nearbyPlaces.filter(
              (p) => p.type === "gym"
            ).length;
            score += Math.min(gymCount, 1) * priorityWeight;
            break;
          case "food":
            const foodCount = area.nearbyPlaces.filter(
              (p) => p.type === "restaurant"
            ).length;
            score += Math.min(foodCount / 2, 1) * priorityWeight;
            break;
          case "quiet":
            score +=
              (area.noiseLevel === "Quiet"
                ? 1
                : area.noiseLevel === "Moderate"
                  ? 0.5
                  : 0.15) * priorityWeight;
            break;
          case "safety":
            score += (area.safetyScore / 100) * priorityWeight;
            break;
          case "ithub":
            if (
              area.slug === "jagatpura" ||
              area.slug === "tonk-road" ||
              area.slug === "sitapura"
            ) {
              score += priorityWeight;
            } else if (
              area.slug === "mansarovar" ||
              area.slug === "malviya-nagar"
            ) {
              score += priorityWeight * 0.4;
            }
            break;
        }
      });

      // Commute scoring (weight: 15)
      switch (answers.commute) {
        case "metro":
          score += (area.transitScore / 100) * 15;
          break;
        case "walk":
          score += (area.walkScore / 100) * 15;
          break;
        case "car":
          score += 10; // car works everywhere
          break;
        case "wfh":
          // Prefer quiet + affordable
          score +=
            ((area.noiseLevel === "Quiet" ? 15 : area.noiseLevel === "Moderate" ? 10 : 5) /
              15) *
            15;
          break;
        case "mix":
          score +=
            ((area.transitScore * 0.4 + area.walkScore * 0.3 + 30) / 100) * 15;
          break;
      }

      const matchPercent = Math.round(Math.min((score / maxScore) * 100, 99));

      // Generate personalized reasons
      const reasons = generateReasons(area, answers);

      return { area, score, matchPercent, reasons };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item, index) => ({
      ...item,
      // Top match gets boosted display score
      matchPercent:
        index === 0
          ? Math.max(item.matchPercent, 92)
          : index === 1
            ? Math.max(Math.min(item.matchPercent, 91), 82)
            : Math.max(Math.min(item.matchPercent, 85), 75),
    }));
}

function generateReasons(area: Area, answers: QuizAnswers): string[] {
  const reasons: string[] = [];

  // Persona-based reasons
  if (answers.persona === "family") {
    const schools = area.nearbyPlaces.filter((p) => p.type === "school");
    if (schools.length > 0)
      reasons.push(
        `Top-rated schools within ${schools[0].distance}`
      );
    if (area.safetyScore >= 85)
      reasons.push(`${area.safetyScore}% family safety score`);
    const parks = area.nearbyPlaces.filter((p) => p.type === "park");
    if (parks.length > 0)
      reasons.push(
        `${parks.length} park${parks.length > 1 ? "s" : ""} within walking distance`
      );
  }

  if (
    answers.persona === "professional" ||
    answers.persona === "corporate"
  ) {
    if (area.professionalScore >= 80)
      reasons.push(
        `${area.professionalScore}% professional suitability score`
      );
    if (area.walkScore >= 80)
      reasons.push(`Walk score of ${area.walkScore} — most errands on foot`);
    const restaurants = area.nearbyPlaces.filter(
      (p) => p.type === "restaurant"
    );
    if (restaurants.length > 0)
      reasons.push(`${restaurants.length}+ dining options nearby`);
  }

  if (answers.persona === "student") {
    const colleges = area.nearbyPlaces.filter((p) => p.type === "college");
    if (colleges.length > 0)
      reasons.push(
        `${colleges.length} college${colleges.length > 1 ? "s" : ""} within easy reach`
      );
    if (area.rentRange.min <= 12000)
      reasons.push(
        `Rents start at just \u20B9${area.rentRange.min.toLocaleString("en-IN")}`
      );
    if (area.transitScore >= 75) reasons.push("Strong public transit network");
  }

  if (answers.persona === "couple") {
    if (area.safetyScore >= 85)
      reasons.push(`${area.safetyScore}% safety score — peace of mind`);
    const restaurants = area.nearbyPlaces.filter(
      (p) => p.type === "restaurant"
    );
    if (restaurants.length >= 2) reasons.push("Great dining scene for date nights");
    if (area.walkScore >= 80) reasons.push("Highly walkable for evening strolls");
  }

  if (answers.persona === "solo") {
    if (area.walkScore >= 80)
      reasons.push(`Walk score ${area.walkScore} — true independence`);
    if (area.transitScore >= 75) reasons.push("Metro/bus for easy mobility");
    const food = area.nearbyPlaces.filter((p) => p.type === "restaurant");
    if (food.length > 0) reasons.push("No cooking? Plenty of food options nearby");
  }

  // Priority-based additions
  if (
    answers.priorities.includes("quiet") &&
    area.noiseLevel === "Quiet"
  ) {
    reasons.push("Peaceful environment — low noise levels confirmed");
  }
  if (
    answers.priorities.includes("safety") &&
    area.safetyScore >= 85
  ) {
    if (!reasons.some((r) => r.includes("safety")))
      reasons.push(`Top-tier safety score: ${area.safetyScore}/100`);
  }
  if (answers.priorities.includes("metro") && area.transitScore >= 80) {
    if (!reasons.some((r) => r.includes("transit")))
      reasons.push(`Transit score ${area.transitScore} — metro accessible`);
  }
  if (answers.priorities.includes("ithub")) {
    if (area.slug === "jagatpura")
      reasons.push("Closest area to Mahindra World City IT hub");
    if (area.slug === "tonk-road")
      reasons.push("Corporate offices line both sides of the road");
  }

  // Commute-based
  if (answers.commute === "wfh" && area.noiseLevel !== "Active") {
    if (!reasons.some((r) => r.includes("Peaceful") || r.includes("quiet")))
      reasons.push("WFH-friendly — calm daytime environment");
  }

  // Always include at least 3 reasons, fill with generic positives
  if (reasons.length < 3) {
    const fillers = [
      ...area.pros.filter((p) => !reasons.some((r) => r.includes(p.slice(0, 20)))),
    ];
    while (reasons.length < 3 && fillers.length > 0) {
      reasons.push(fillers.shift()!);
    }
  }

  return reasons.slice(0, 3);
}

// ─── Animation Variants ─────────────────────────────────────────────────────

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardPop = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 25 },
  },
};

// ─── Component ──────────────────────────────────────────────────────────────

export default function QuizPage() {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    persona: "",
    budget: "",
    priorities: [],
    commute: "",
    timeline: "",
  });
  const [results, setResults] = useState<ScoredArea[]>([]);
  const [processingStage, setProcessingStage] = useState(0);
  const [copied, setCopied] = useState(false);
  const [ringAnimated, setRingAnimated] = useState(false);

  // Processing animation
  useEffect(() => {
    if (phase !== "processing") return;
    const stages = [0, 1, 2, 3];
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx < stages.length) {
        setProcessingStage(idx);
      } else {
        clearInterval(interval);
        const scored = scoreAreas(answers);
        setResults(scored);
        setPhase("results");
        setTimeout(() => setRingAnimated(true), 400);
      }
    }, 900);
    return () => clearInterval(interval);
  }, [phase, answers]);

  const handleAnswer = useCallback(
    (questionIndex: number, value: string | string[]) => {
      setAnswers((prev) => {
        const updated = { ...prev };
        switch (questionIndex) {
          case 0:
            updated.persona = value as string;
            break;
          case 1:
            updated.budget = value as string;
            break;
          case 2:
            updated.priorities = value as string[];
            break;
          case 3:
            updated.commute = value as string;
            break;
          case 4:
            updated.timeline = value as string;
            break;
        }
        return updated;
      });
    },
    []
  );

  const goNext = useCallback(() => {
    setDirection(1);
    if (currentQuestion < 4) {
      setCurrentQuestion((q) => q + 1);
    } else {
      setProcessingStage(0);
      setPhase("processing");
    }
  }, [currentQuestion]);

  const goBack = useCallback(() => {
    setDirection(-1);
    if (currentQuestion > 0) {
      setCurrentQuestion((q) => q - 1);
    } else {
      setPhase("welcome");
    }
  }, [currentQuestion]);

  const canProceed = useMemo(() => {
    switch (currentQuestion) {
      case 0:
        return answers.persona !== "";
      case 1:
        return answers.budget !== "";
      case 2:
        return answers.priorities.length > 0;
      case 3:
        return answers.commute !== "";
      case 4:
        return answers.timeline !== "";
      default:
        return false;
    }
  }, [currentQuestion, answers]);

  const resetQuiz = useCallback(() => {
    setPhase("welcome");
    setCurrentQuestion(0);
    setDirection(1);
    setAnswers({
      persona: "",
      budget: "",
      priorities: [],
      commute: "",
      timeline: "",
    });
    setResults([]);
    setProcessingStage(0);
    setRingAnimated(false);
  }, []);

  const shareMessage = useMemo(() => {
    if (results.length === 0) return "";
    return `I just found my perfect neighborhood in Jaipur using 99tolet's CityFit quiz! My top match: ${results[0].area.name} with ${results[0].matchPercent}% fit. Try it: https://99tolet.com/quiz`;
  }, [results]);

  const handleWhatsAppShare = useCallback(() => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareMessage)}`,
      "_blank"
    );
  }, [shareMessage]);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText("https://99tolet.com/quiz");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  // ─── Build NLP search query from quiz answers ─────────────────────────────

  const buildSearchFromQuiz = useCallback(
    (topArea?: ScoredArea): string => {
      const parts: string[] = [];

      // Persona
      const personaDef = personaOptions.find((p) => p.id === answers.persona);
      if (personaDef) {
        if (answers.persona === "family") parts.push("family-friendly");
        if (answers.persona === "professional" || answers.persona === "corporate") parts.push("professional");
        if (answers.persona === "student") parts.push("student");
      }

      // Budget
      const budgetDef = budgetOptions.find((b) => b.id === answers.budget);
      if (budgetDef) {
        if (budgetDef.max < 999999) {
          parts.push(`under ${budgetDef.max / 1000}k`);
        }
      }

      // Priorities
      if (answers.priorities.length > 0) {
        const prioMap: Record<string, string> = {
          schools: "schools nearby",
          hospital: "hospital nearby",
          parks: "parks nearby",
          quiet: "quiet area",
          safety: "safe area",
          ithub: "near IT hub",
          metro: "metro nearby",
          shopping: "shopping nearby",
          food: "restaurants nearby",
          gym: "gym nearby",
        };
        answers.priorities.forEach((p: string) => {
          if (prioMap[p]) parts.push(prioMap[p]);
        });
      }

      // Add the top matched area
      if (topArea) parts.push(topArea.area.name);

      return parts.join(" ");
    },
    [answers]
  );

  // ─── Render Phases ─────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 text-white overflow-hidden relative">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -left-32 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 40, -20, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        {/* ═══ PHASE 1: WELCOME ═══ */}
        {phase === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10"
          >
            {/* Sparkle decoration */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-6"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30"
                >
                  <Brain className="w-10 h-10 text-white" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-6"
            >
              <Zap className="w-3.5 h-3.5" />
              Powered by CityFit AI
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center max-w-3xl leading-tight"
            >
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                Neighborhood
              </span>{" "}
              in 60 Seconds
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-slate-400 text-base sm:text-lg mt-4 text-center max-w-xl"
            >
              Answer 5 questions. Get a personalized area match powered by
              CityFit&trade; AI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-10"
            >
              <motion.button
                onClick={() => {
                  setPhase("questions");
                  setCurrentQuestion(0);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white font-semibold text-lg shadow-2xl shadow-indigo-500/30 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative flex items-center gap-3">
                  Start Quiz
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </span>
                {/* Sparkle effect */}
                <motion.div
                  className="absolute top-1 right-3"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 flex flex-col items-center gap-3"
            >
              <div className="flex -space-x-2">
                {[
                  "bg-indigo-500",
                  "bg-violet-500",
                  "bg-purple-500",
                  "bg-pink-500",
                  "bg-rose-500",
                ].map((color, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className={`w-8 h-8 rounded-full ${color} border-2 border-slate-900 flex items-center justify-center text-xs font-bold`}
                  >
                    {["A", "R", "P", "S", "M"][i]}
                  </motion.div>
                ))}
              </div>
              <p className="text-slate-500 text-sm">
                <span className="text-slate-300 font-semibold">12,400+</span>{" "}
                people found their perfect area
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* ═══ PHASE 2: QUESTIONS ═══ */}
        {phase === "questions" && (
          <motion.div
            key="questions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col relative z-10"
          >
            {/* Progress bar */}
            <div className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
              <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                <motion.button
                  onClick={goBack}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-400" />
                </motion.button>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-slate-400">
                      Question {currentQuestion + 1} of 5
                    </span>
                    <span className="text-xs font-medium text-indigo-400">
                      {Math.round(((currentQuestion + 1) / 5) * 100)}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                      animate={{
                        width: `${((currentQuestion + 1) / 5) * 100}%`,
                      }}
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Question content */}
            <div className="flex-1 flex items-center justify-center px-4 py-8">
              <div className="w-full max-w-2xl">
                <AnimatePresence mode="wait" custom={direction}>
                  {/* Q1: Persona */}
                  {currentQuestion === 0 && (
                    <motion.div
                      key="q0"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
                        Who are you?
                      </h2>
                      <p className="text-slate-400 text-center mb-8">
                        This helps us match your lifestyle
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {personaOptions.map((option) => (
                          <motion.button
                            key={option.id}
                            onClick={() => handleAnswer(0, option.id)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`relative p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                              answers.persona === option.id
                                ? "border-indigo-500 bg-indigo-500/15 shadow-lg shadow-indigo-500/20"
                                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                            }`}
                          >
                            {answers.persona === option.id && (
                              <motion.div
                                layoutId="personaCheck"
                                className="absolute top-2 right-2 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center"
                              >
                                <Check className="w-3 h-3" />
                              </motion.div>
                            )}
                            <span className="text-2xl block mb-2">
                              {option.icon}
                            </span>
                            <span className="text-sm font-medium text-slate-200">
                              {option.label}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Q2: Budget */}
                  {currentQuestion === 1 && (
                    <motion.div
                      key="q1"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
                        What&apos;s your monthly rent budget?
                      </h2>
                      <p className="text-slate-400 text-center mb-8">
                        We will find areas that fit your wallet
                      </p>
                      <div className="flex flex-wrap justify-center gap-3">
                        {budgetOptions.map((option) => (
                          <motion.button
                            key={option.id}
                            onClick={() => handleAnswer(1, option.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-5 py-3 rounded-full border-2 font-medium text-sm transition-all duration-200 ${
                              answers.budget === option.id
                                ? "border-indigo-500 bg-indigo-500/20 text-indigo-300 shadow-lg shadow-indigo-500/20"
                                : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10"
                            }`}
                          >
                            {answers.budget === option.id && (
                              <Check className="w-3.5 h-3.5 inline mr-1.5" />
                            )}
                            {option.label}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Q3: Priorities */}
                  {currentQuestion === 2 && (
                    <motion.div
                      key="q2"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
                        What matters most to you?
                      </h2>
                      <p className="text-slate-400 text-center mb-8">
                        Select up to 3 priorities
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                        {priorityOptions.map((option) => {
                          const isSelected =
                            answers.priorities.includes(option.id);
                          const isDisabled =
                            !isSelected && answers.priorities.length >= 3;
                          return (
                            <motion.button
                              key={option.id}
                              onClick={() => {
                                if (isSelected) {
                                  handleAnswer(
                                    2,
                                    answers.priorities.filter(
                                      (p) => p !== option.id
                                    )
                                  );
                                } else if (!isDisabled) {
                                  handleAnswer(2, [
                                    ...answers.priorities,
                                    option.id,
                                  ]);
                                }
                              }}
                              whileHover={
                                isDisabled ? {} : { scale: 1.05 }
                              }
                              whileTap={
                                isDisabled ? {} : { scale: 0.95 }
                              }
                              className={`relative p-3 rounded-xl border-2 text-center transition-all duration-200 ${
                                isSelected
                                  ? "border-indigo-500 bg-indigo-500/15 shadow-lg shadow-indigo-500/20"
                                  : isDisabled
                                    ? "border-white/5 bg-white/[0.02] opacity-40 cursor-not-allowed"
                                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                              }`}
                            >
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center"
                                >
                                  <Check className="w-3 h-3" />
                                </motion.div>
                              )}
                              <span className="text-xl block mb-1">
                                {option.icon}
                              </span>
                              <span className="text-xs font-medium text-slate-300">
                                {option.label}
                              </span>
                            </motion.button>
                          );
                        })}
                      </div>
                      <p className="text-center text-xs text-slate-500 mt-4">
                        {answers.priorities.length}/3 selected
                      </p>
                    </motion.div>
                  )}

                  {/* Q4: Commute */}
                  {currentQuestion === 3 && (
                    <motion.div
                      key="q3"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
                        How do you commute?
                      </h2>
                      <p className="text-slate-400 text-center mb-8">
                        We will optimize for your daily travel
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
                        {commuteOptions.map((option) => (
                          <motion.button
                            key={option.id}
                            onClick={() => handleAnswer(3, option.id)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`relative p-4 rounded-2xl border-2 text-center transition-all duration-200 ${
                              answers.commute === option.id
                                ? "border-indigo-500 bg-indigo-500/15 shadow-lg shadow-indigo-500/20"
                                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                            }`}
                          >
                            {answers.commute === option.id && (
                              <motion.div
                                layoutId="commuteCheck"
                                className="absolute top-2 right-2 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center"
                              >
                                <Check className="w-3 h-3" />
                              </motion.div>
                            )}
                            <span className="text-2xl block mb-2">
                              {option.icon}
                            </span>
                            <span className="text-sm font-medium text-slate-200">
                              {option.label}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Q5: Timeline */}
                  {currentQuestion === 4 && (
                    <motion.div
                      key="q4"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
                        When are you planning to move?
                      </h2>
                      <p className="text-slate-400 text-center mb-8">
                        So we can prioritize the right listings
                      </p>
                      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                        {timelineOptions.map((option) => (
                          <motion.button
                            key={option.id}
                            onClick={() => handleAnswer(4, option.id)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`relative p-4 rounded-2xl border-2 text-center transition-all duration-200 ${
                              answers.timeline === option.id
                                ? "border-indigo-500 bg-indigo-500/15 shadow-lg shadow-indigo-500/20"
                                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                            }`}
                          >
                            {answers.timeline === option.id && (
                              <motion.div
                                layoutId="timelineCheck"
                                className="absolute top-2 right-2 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center"
                              >
                                <Check className="w-3 h-3" />
                              </motion.div>
                            )}
                            <span className="text-2xl block mb-2">
                              {option.icon}
                            </span>
                            <span className="text-sm font-medium text-slate-200">
                              {option.label}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Next button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-10 flex justify-center"
                >
                  <motion.button
                    onClick={goNext}
                    disabled={!canProceed}
                    whileHover={canProceed ? { scale: 1.05 } : {}}
                    whileTap={canProceed ? { scale: 0.95 } : {}}
                    className={`px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-300 flex items-center gap-2 ${
                      canProceed
                        ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/40"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    {currentQuestion === 4 ? "See My Results" : "Continue"}
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══ PHASE 3: PROCESSING ═══ */}
        {phase === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10"
          >
            {/* Animated brain with pulse */}
            <div className="relative mb-10">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-2xl"
              >
                <Brain className="w-12 h-12 text-white" />
              </motion.div>

              {/* Pulse rings */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-3xl border-2 border-indigo-400/30"
                  animate={{
                    scale: [1, 2.5],
                    opacity: [0.6, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl sm:text-2xl font-bold text-center mb-8"
            >
              CityFit&trade; AI is analyzing your lifestyle...
            </motion.h2>

            <div className="space-y-4 w-full max-w-sm">
              {[
                "Scanning 8 neighborhoods...",
                "Matching lifestyle preferences...",
                "Scoring fit signals...",
                "Generating your report...",
              ].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: processingStage >= i ? 1 : 0.3,
                    x: 0,
                  }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    animate={
                      processingStage === i
                        ? {
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360],
                          }
                        : processingStage > i
                          ? { scale: 1 }
                          : {}
                    }
                    transition={
                      processingStage === i
                        ? { duration: 1, repeat: Infinity }
                        : {}
                    }
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      processingStage > i
                        ? "bg-emerald-500"
                        : processingStage === i
                          ? "bg-indigo-500"
                          : "bg-slate-700"
                    }`}
                  >
                    {processingStage > i ? (
                      <Check className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <div className="w-2 h-2 bg-white/50 rounded-full" />
                    )}
                  </motion.div>
                  <span
                    className={`text-sm ${
                      processingStage >= i
                        ? "text-slate-200"
                        : "text-slate-500"
                    }`}
                  >
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ═══ PHASE 4: RESULTS ═══ */}
        {phase === "results" && results.length > 0 && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen relative z-10"
          >
            <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium mb-4"
                >
                  <Sparkles className="w-4 h-4" />
                  Report Ready
                </motion.div>
                <h1 className="text-3xl sm:text-4xl font-bold">
                  Your CityFit&trade;{" "}
                  <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                    Report
                  </span>
                </h1>
              </motion.div>

              {/* ─── Top Match Card ─── */}
              <motion.div
                variants={cardPop}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                className="relative rounded-3xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 backdrop-blur-xl p-6 sm:p-8 mb-6 overflow-hidden"
              >
                {/* Glow */}
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-500/10 rounded-full blur-2xl" />

                <div className="relative">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                      #1 Top Match
                    </span>
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    </motion.div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold">
                        {results[0].area.name}
                      </h2>
                      <p className="text-slate-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {results[0].area.city}
                      </p>
                    </div>

                    {/* Animated circular match ring */}
                    <div className="flex-shrink-0 flex items-center gap-3 sm:gap-0 sm:flex-col sm:items-center">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                        <svg
                          className="w-full h-full -rotate-90"
                          viewBox="0 0 100 100"
                        >
                          <circle
                            cx="50"
                            cy="50"
                            r="42"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="6"
                            className="text-slate-700"
                          />
                          <motion.circle
                            cx="50"
                            cy="50"
                            r="42"
                            fill="none"
                            stroke="url(#matchGradient)"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 42}`}
                            initial={{
                              strokeDashoffset: 2 * Math.PI * 42,
                            }}
                            animate={{
                              strokeDashoffset: ringAnimated
                                ? 2 *
                                  Math.PI *
                                  42 *
                                  (1 - results[0].matchPercent / 100)
                                : 2 * Math.PI * 42,
                            }}
                            transition={{
                              duration: 1.5,
                              ease: "easeOut",
                            }}
                          />
                          <defs>
                            <linearGradient
                              id="matchGradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop
                                offset="0%"
                                stopColor="#6366f1"
                              />
                              <stop
                                offset="100%"
                                stopColor="#a78bfa"
                              />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-xl sm:text-2xl font-bold text-white"
                          >
                            {results[0].matchPercent}%
                          </motion.span>
                        </div>
                      </div>
                      <span className="text-xs text-indigo-300 font-medium sm:mt-1">
                        Lifestyle Match
                      </span>
                    </div>
                  </div>

                  {/* Personalized reasons */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-slate-300 mb-3">
                      Best for you because:
                    </h3>
                    <div className="space-y-2">
                      {results[0].reasons.map((reason, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + i * 0.15 }}
                          className="flex items-start gap-2"
                        >
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-emerald-400" />
                          </div>
                          <span className="text-sm text-slate-300">
                            {reason}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Rent range */}
                  <div className="mb-6 p-3 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-xs text-slate-400 mb-1">
                      Rent Range
                    </p>
                    <p className="text-lg font-bold text-white">
                      \u20B9{results[0].area.rentRange.min.toLocaleString("en-IN")}{" "}
                      \u2013 \u20B9
                      {results[0].area.rentRange.max.toLocaleString("en-IN")}
                      <span className="text-xs text-slate-400 font-normal ml-1">
                        /month
                      </span>
                    </p>
                  </div>

                  {/* Mini score badges */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
                    {[
                      {
                        label: "Walk",
                        value: results[0].area.walkScore,
                        icon: Footprints,
                      },
                      {
                        label: "Safety",
                        value: results[0].area.safetyScore,
                        icon: Shield,
                      },
                      {
                        label: "Family",
                        value: results[0].area.familyScore,
                        icon: Heart,
                      },
                      {
                        label: "Transit",
                        value: results[0].area.transitScore,
                        icon: Train,
                      },
                      {
                        label: "Student",
                        value: results[0].area.studentScore,
                        icon: GraduationCap,
                      },
                      {
                        label: "Pro",
                        value: results[0].area.professionalScore,
                        icon: Briefcase,
                      },
                    ].map((badge, i) => (
                      <motion.div
                        key={badge.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + i * 0.05 }}
                        className="text-center p-2 rounded-xl bg-white/5 border border-white/5"
                      >
                        <badge.icon className="w-3.5 h-3.5 mx-auto mb-1 text-slate-400" />
                        <p className="text-sm font-bold text-white">
                          {badge.value}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {badge.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTAs — Updated to pass quiz answers as NLP search query */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/area/${results[0].area.slug}`}
                      className="flex-1"
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-center text-sm shadow-lg shadow-indigo-500/25"
                      >
                        Explore {results[0].area.name}
                      </motion.div>
                    </Link>
                    <Link
                      href={`/discover?q=${encodeURIComponent(buildSearchFromQuiz(results[0]))}`}
                      className="flex-1"
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-3 rounded-xl bg-white/10 border border-white/10 text-white font-semibold text-center text-sm hover:bg-white/15 transition-colors"
                      >
                        View Rentals Here
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* ─── Runner-up Cards ─── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {results.slice(1).map((result, idx) => (
                  <motion.div
                    key={result.area.id}
                    variants={cardPop}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.7 + idx * 0.15 }}
                    className="rounded-2xl bg-slate-800/60 border border-white/10 backdrop-blur-xl p-5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                          #{idx + 2} Runner-up
                        </span>
                        <h3 className="text-lg font-bold">
                          {result.area.name}
                        </h3>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {result.area.city}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-indigo-400">
                          {result.matchPercent}%
                        </p>
                        <p className="text-[10px] text-slate-500">
                          match
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1.5 mb-4">
                      {result.reasons.slice(0, 2).map((reason, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-1.5"
                        >
                          <Check className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-slate-400">
                            {reason}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-slate-500 mb-3">
                      \u20B9
                      {result.area.rentRange.min.toLocaleString("en-IN")}{" "}
                      \u2013 \u20B9
                      {result.area.rentRange.max.toLocaleString("en-IN")}
                      /mo
                    </p>

                    <Link href={`/discover?q=${encodeURIComponent(buildSearchFromQuiz(result))}`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white font-medium text-center text-xs hover:bg-white/15 transition-colors"
                      >
                        View Rentals in {result.area.name}
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* ─── Lifestyle Profile Summary ─── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="rounded-2xl bg-slate-800/40 border border-white/10 backdrop-blur-xl p-5 sm:p-6 mb-8"
              >
                <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4 text-indigo-400" />
                  Your Lifestyle Profile
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white/5">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                      Who
                    </p>
                    <p className="text-sm font-medium text-slate-200">
                      {personaOptions.find((p) => p.id === answers.persona)
                        ?.icon}{" "}
                      {personaOptions.find((p) => p.id === answers.persona)
                        ?.label}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                      Budget
                    </p>
                    <p className="text-sm font-medium text-slate-200">
                      {budgetOptions.find((b) => b.id === answers.budget)
                        ?.label}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                      Priorities
                    </p>
                    <p className="text-sm font-medium text-slate-200">
                      {answers.priorities
                        .map(
                          (p) =>
                            priorityOptions.find((o) => o.id === p)?.icon
                        )
                        .join(" ")}{" "}
                      {answers.priorities
                        .map(
                          (p) =>
                            priorityOptions.find((o) => o.id === p)?.label
                        )
                        .join(", ")}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                      Commute
                    </p>
                    <p className="text-sm font-medium text-slate-200">
                      {commuteOptions.find((c) => c.id === answers.commute)
                        ?.icon}{" "}
                      {commuteOptions.find((c) => c.id === answers.commute)
                        ?.label}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* ─── Share Section ─── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="rounded-2xl bg-gradient-to-br from-indigo-900/40 to-violet-900/40 border border-indigo-500/20 backdrop-blur-xl p-5 sm:p-6 mb-8 text-center"
              >
                <Share2 className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold mb-1">
                  Share with friends moving to Jaipur
                </h3>
                <p className="text-sm text-slate-400 mb-5">
                  Help them find their perfect neighborhood too
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.button
                    onClick={handleWhatsAppShare}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Share on WhatsApp
                  </motion.button>

                  <motion.button
                    onClick={handleCopyLink}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 rounded-xl bg-white/10 border border-white/10 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-white/15 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Link
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    onClick={resetQuiz}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Retake Quiz
                  </motion.button>
                </div>
              </motion.div>

              {/* ─── Final CTA ─── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="text-center pb-12"
              >
                <Link href={`/discover?q=${encodeURIComponent(buildSearchFromQuiz(results[0]))}`}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white font-bold text-base shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow"
                  >
                    <Home className="w-5 h-5" />
                    Start Your Rental Journey
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
