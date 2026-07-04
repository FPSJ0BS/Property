"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  Compass,
  Heart,
  Wallet,
  ShieldCheck,
  CalendarCheck,
  GitCompare,
  FileDown,
  NotebookPen,
  Handshake,
  FileText,
  Sparkles,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useSavedProperties, useRecentlyViewed, usePropertyNotes } from "@/lib/store";

interface SmartNextStepsProps {
  context: "property-detail" | "saved" | "dashboard" | "after-search";
}

interface Step {
  icon: React.ElementType;
  title: string;
  description: string;
  cta: string;
  href?: string;
  iconColor: string;
  iconBg: string;
}

export default function SmartNextSteps({ context }: SmartNextStepsProps) {
  const { isLoggedIn } = useAuth();
  const { count: savedCount } = useSavedProperties();
  const { count: viewedCount } = useRecentlyViewed();
  const { notes } = usePropertyNotes();

  const hasNotes = Object.keys(notes).length > 0;

  const steps = useMemo((): Step[] => {
    // Not logged in
    if (!isLoggedIn) {
      return [
        {
          icon: UserPlus,
          title: "Create an Account",
          description: "Save properties, get AI recommendations, and track your search progress.",
          cta: "Sign Up Free",
          href: "/auth/signup",
          iconColor: "text-blue-600 dark:text-blue-400",
          iconBg: "bg-blue-100 dark:bg-blue-900/40",
        },
        {
          icon: Sparkles,
          title: "Take the CityFit Quiz",
          description: "Answer a few questions and we'll match you with the best neighborhoods.",
          cta: "Start Quiz",
          href: "/cityfit",
          iconColor: "text-violet-600 dark:text-violet-400",
          iconBg: "bg-violet-100 dark:bg-violet-900/40",
        },
        {
          icon: MapPin,
          title: "Explore Areas",
          description: "Browse localities with walkability scores, amenities, and commute times.",
          cta: "Explore",
          href: "/area",
          iconColor: "text-emerald-600 dark:text-emerald-400",
          iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
        },
      ];
    }

    // Logged in but no saves
    if (savedCount === 0) {
      return [
        {
          icon: Heart,
          title: "Save Properties You Like",
          description: "Tap the heart icon on any property to build your shortlist.",
          cta: "Browse Properties",
          href: "/property",
          iconColor: "text-rose-600 dark:text-rose-400",
          iconBg: "bg-rose-100 dark:bg-rose-900/40",
        },
        {
          icon: Wallet,
          title: "Set Your Budget",
          description: "Get affordability badges on every listing to make smarter decisions.",
          cta: "Set Income",
          iconColor: "text-amber-600 dark:text-amber-400",
          iconBg: "bg-amber-100 dark:bg-amber-900/40",
        },
        {
          icon: ShieldCheck,
          title: "Complete Verification",
          description: "Verified profiles get priority responses from landlords.",
          cta: "Verify Now",
          href: "/dashboard/profile",
          iconColor: "text-blue-600 dark:text-blue-400",
          iconBg: "bg-blue-100 dark:bg-blue-900/40",
        },
      ];
    }

    // Logged in with saves but no notes (proxy for "no visits")
    if (!hasNotes) {
      return [
        {
          icon: CalendarCheck,
          title: "Schedule a Visit",
          description: "Book a visit for your saved properties and see them in person.",
          cta: "Schedule Now",
          href: "/dashboard/saved",
          iconColor: "text-emerald-600 dark:text-emerald-400",
          iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
        },
        {
          icon: GitCompare,
          title: "Compare Properties",
          description: "Put your top picks side-by-side to see which one wins.",
          cta: "Compare",
          href: "/dashboard/saved",
          iconColor: "text-indigo-600 dark:text-indigo-400",
          iconBg: "bg-indigo-100 dark:bg-indigo-900/40",
        },
        {
          icon: FileDown,
          title: "Download AI Reports",
          description: "Get detailed property reports with price analysis and neighborhood insights.",
          cta: "View Reports",
          iconColor: "text-cyan-600 dark:text-cyan-400",
          iconBg: "bg-cyan-100 dark:bg-cyan-900/40",
        },
      ];
    }

    // Logged in with visits/notes
    return [
      {
        icon: NotebookPen,
        title: "Review Your Notes",
        description: "Check the notes you made during property visits to compare impressions.",
        cta: "View Notes",
        href: "/dashboard/saved",
        iconColor: "text-violet-600 dark:text-violet-400",
        iconBg: "bg-violet-100 dark:bg-violet-900/40",
      },
      {
        icon: Handshake,
        title: "Negotiation Tips",
        description: "AI-powered tips to help you negotiate the best deal for your chosen property.",
        cta: "Get Tips",
        iconColor: "text-amber-600 dark:text-amber-400",
        iconBg: "bg-amber-100 dark:bg-amber-900/40",
      },
      {
        icon: FileText,
        title: "Generate Agreement",
        description: "Ready to finalize? Generate a rental agreement draft in minutes.",
        cta: "Create Agreement",
        href: "/dashboard/agreements",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
      },
    ];
  }, [isLoggedIn, savedCount, hasNotes]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Section header */}
      <div className="flex items-center gap-2">
        <Compass className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Suggested Next Steps
        </h3>
      </div>

      {/* Step cards */}
      <div className="grid gap-3 sm:grid-cols-3">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative flex flex-col p-4 bg-white dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-md transition-all"
            >
              <div className={`w-9 h-9 rounded-lg ${step.iconBg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${step.iconColor}`} />
              </div>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                {step.title}
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1 mb-3">
                {step.description}
              </p>
              {step.href ? (
                <a
                  href={step.href}
                  className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  {step.cta}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </a>
              ) : (
                <button className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-left">
                  {step.cta}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
