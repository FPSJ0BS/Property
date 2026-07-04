"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Briefcase,
  Settings,
  PartyPopper,
  ArrowLeft,
  ArrowRight,
  Zap,
  Plus,
  BadgeCheck,
} from "lucide-react";
import OnboardingStepper from "@/components/auth/OnboardingStepper";
import BenefitPanel from "@/components/auth/BenefitPanel";
import TrustProgress from "@/components/auth/TrustProgress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STEPS = [
  { label: "Welcome", icon: Sparkles },
  { label: "Business", icon: Briefcase },
  { label: "Workflow", icon: Settings },
  { label: "Complete", icon: PartyPopper },
];

const OPERATING_AREAS = [
  "Vaishali Nagar",
  "Malviya Nagar",
  "C-Scheme",
  "Mansarovar",
  "Jagatpura",
  "Tonk Road",
  "Sodala",
  "Pratap Nagar",
  "Ajmer Road",
  "Sitapura",
];
const FOCUS_OPTIONS = [
  "Residential",
  "Commercial",
  "Industrial",
  "Co-Living",
  "All",
];
const EXPERIENCE_OPTIONS = [
  "Less than 1 year",
  "1-3 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
];
const LEAD_PREF = ["Verified only", "All leads"];
const COMMISSION_TRACKING = ["Yes", "No"];
const LISTING_MGMT = ["Self", "Assisted"];

const BENEFIT_DATA = [
  {
    title: "Partner Advantage",
    description:
      "Join India's most trusted rental platform as a verified partner.",
    benefits: [
      "Access to verified lead pipeline",
      "Commission tracking tools",
      "Partner network benefits",
    ],
    icon: Sparkles,
  },
  {
    title: "Business Growth",
    description: "Your business profile helps us send you the right leads.",
    benefits: [
      "Location-matched leads",
      "Specialization-based routing",
      "RERA verified badge",
    ],
    icon: Briefcase,
  },
  {
    title: "Optimized Workflow",
    description: "Configure your preferred way of working on the platform.",
    benefits: [
      "Lead quality control",
      "Automated commission logs",
      "Listing management support",
    ],
    icon: Settings,
  },
  {
    title: "You're Ready!",
    description: "Your partner profile is set up and ready for leads.",
    benefits: [
      "Lead tools activated",
      "Listings dashboard ready",
      "Professional badge pending",
    ],
    icon: PartyPopper,
  },
];

function Pill({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
        selected
          ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-950/40 dark:text-indigo-300"
          : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-indigo-700"
      }`}
    >
      {label}
    </button>
  );
}

export default function BrokerOnboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  // Step 1
  const [city, setCity] = useState("Jaipur");
  const [operatingAreas, setOperatingAreas] = useState<string[]>([]);
  const [focus, setFocus] = useState("");
  const [experience, setExperience] = useState("");
  const [rera, setRera] = useState("");

  // Step 2
  const [leadPref, setLeadPref] = useState("");
  const [commissionTracking, setCommissionTracking] = useState("");
  const [listingMgmt, setListingMgmt] = useState("");

  const toggleArea = (a: string) =>
    setOperatingAreas((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );

  const next = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const slideVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-8">
          <OnboardingStepper
            steps={STEPS}
            currentStep={currentStep}
            onStepClick={(s) => s <= currentStep && setCurrentStep(s)}
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {/* Step 0: Welcome */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600">
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                      <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                        Broker / Agent
                      </span>
                    </div>
                    <h1 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
                      Welcome to the 99tolet Partner Network
                    </h1>
                    <p className="text-base leading-relaxed text-slate-500 dark:text-slate-400">
                      Set up your professional profile to access verified leads,
                      track commissions, and grow your rental business with AI
                      tools.
                    </p>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="rounded-xl border border-violet-100 bg-violet-50/50 p-4 dark:border-violet-900 dark:bg-violet-950/20"
                    >
                      <p className="text-sm text-violet-700 dark:text-violet-300">
                        <Zap className="mr-2 inline-block h-4 w-4" />
                        Verified partners close deals{" "}
                        <strong>40% faster</strong> with AI-matched leads
                      </p>
                    </motion.div>
                  </div>
                )}

                {/* Step 1: Business Profile */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                      Business Profile
                    </h2>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        City
                      </label>
                      <Input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city"
                        className="h-10"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Operating Areas
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {OPERATING_AREAS.map((a) => (
                          <Pill
                            key={a}
                            label={a}
                            selected={operatingAreas.includes(a)}
                            onClick={() => toggleArea(a)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Focus
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {FOCUS_OPTIONS.map((f) => (
                          <Pill
                            key={f}
                            label={f}
                            selected={focus === f}
                            onClick={() => setFocus(f)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Years of Experience
                      </label>
                      <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm text-slate-900 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-slate-800 dark:text-white"
                      >
                        <option value="">Select experience</option>
                        {EXPERIENCE_OPTIONS.map((e) => (
                          <option key={e} value={e}>
                            {e}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        RERA Registration{" "}
                        <span className="text-slate-400">(Optional)</span>
                      </label>
                      <Input
                        value={rera}
                        onChange={(e) => setRera(e.target.value)}
                        placeholder="e.g. RERA/RAJ/2024/XXXXX"
                        className="h-10"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Workflow Preferences */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                      Workflow Preferences
                    </h2>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Lead Preference
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {LEAD_PREF.map((l) => (
                          <Pill
                            key={l}
                            label={l}
                            selected={leadPref === l}
                            onClick={() => setLeadPref(l)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Commission Tracking
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {COMMISSION_TRACKING.map((c) => (
                          <Pill
                            key={c}
                            label={c}
                            selected={commissionTracking === c}
                            onClick={() => setCommissionTracking(c)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Listing Management
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {LISTING_MGMT.map((l) => (
                          <Pill
                            key={l}
                            label={l}
                            selected={listingMgmt === l}
                            onClick={() => setListingMgmt(l)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Complete */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600"
                    >
                      <PartyPopper className="h-8 w-8 text-white" />
                    </motion.div>

                    <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                      Your partner profile is ready!
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                      Start exploring leads and managing your listings with
                      powerful AI tools.
                    </p>

                    <TrustProgress
                      completedSteps={3}
                      totalSteps={5}
                      items={[
                        { label: "Role selected", done: true },
                        { label: "Business profile set", done: true },
                        { label: "Workflow configured", done: true },
                        { label: "Professional verification", done: false },
                        { label: "First listing added", done: false },
                      ]}
                    />

                    <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                      <Button
                        onClick={() => router.push("/discover")}
                        className="h-11 flex-1 gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-700 hover:to-violet-700"
                      >
                        <Zap className="h-4 w-4" />
                        Explore Lead Tools
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => router.push("/property")}
                        className="h-11 flex-1 gap-2 rounded-xl text-sm font-semibold"
                      >
                        <Plus className="h-4 w-4" />
                        Add Listings
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => router.push("/verification-pending")}
                        className="h-11 flex-1 gap-2 rounded-xl text-sm font-semibold"
                      >
                        <BadgeCheck className="h-4 w-4" />
                        Complete Verification
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {currentStep < 3 && (
              <div className="mt-8 flex items-center justify-between">
                <div>
                  {currentStep > 0 && (
                    <Button
                      variant="ghost"
                      onClick={back}
                      className="gap-1.5 text-sm"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {currentStep > 0 && (
                    <button
                      type="button"
                      onClick={next}
                      className="text-sm text-slate-400 underline-offset-2 hover:text-slate-600 hover:underline dark:text-slate-500 dark:hover:text-slate-300"
                    >
                      Skip
                    </button>
                  )}
                  <Button
                    onClick={next}
                    className="h-10 gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-700 hover:to-violet-700"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Benefit Panel */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <BenefitPanel
                    title={BENEFIT_DATA[currentStep].title}
                    description={BENEFIT_DATA[currentStep].description}
                    benefits={BENEFIT_DATA[currentStep].benefits}
                    icon={BENEFIT_DATA[currentStep].icon}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
