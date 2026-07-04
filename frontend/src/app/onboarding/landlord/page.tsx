"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Building2,
  Target,
  ShieldCheck,
  Settings,
  PartyPopper,
  ArrowLeft,
  ArrowRight,
  Plus,
  BadgeCheck,
  LayoutDashboard,
  Upload,
} from "lucide-react";
import OnboardingStepper from "@/components/auth/OnboardingStepper";
import BenefitPanel from "@/components/auth/BenefitPanel";
import TrustProgress from "@/components/auth/TrustProgress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STEPS = [
  { label: "Welcome", icon: Sparkles },
  { label: "Property", icon: Building2 },
  { label: "Goals", icon: Target },
  { label: "Trust", icon: ShieldCheck },
  { label: "Operations", icon: Settings },
  { label: "Complete", icon: PartyPopper },
];

const PROPERTY_TYPES = [
  "Apartment",
  "Villa",
  "Commercial",
  "Industrial",
  "Co-Living",
];
const PROPERTY_COUNTS = ["1", "2-5", "5-10", "10+"];
const GOALS = [
  "Faster occupancy",
  "Better tenant quality",
  "Fair AI pricing",
  "Lower vacancy",
  "Managed operations",
];
const DEPOSIT_OPTIONS = ["1 month", "2 months", "3+ months"];
const MAINTENANCE_OPTIONS = ["Self", "Managed by 99tolet", "Hybrid"];
const RENT_COLLECTION = ["Manual", "Automated", "Partial"];

const BENEFIT_DATA = [
  {
    title: "Landlord Advantage",
    description: "Set up your profile to attract verified tenants faster.",
    benefits: [
      "3x more qualified inquiries",
      "AI-powered tenant matching",
      "Instant rent pricing insights",
    ],
    icon: Sparkles,
  },
  {
    title: "Property Intelligence",
    description: "Help us understand your portfolio for better management.",
    benefits: [
      "Market-rate benchmarking",
      "Vacancy prediction alerts",
      "Portfolio analytics dashboard",
    ],
    icon: Building2,
  },
  {
    title: "Goal-Driven Results",
    description: "We optimize your experience based on what matters most.",
    benefits: [
      "Custom marketing strategies",
      "Targeted tenant outreach",
      "Pricing optimization AI",
    ],
    icon: Target,
  },
  {
    title: "Trust = Tenants",
    description:
      "Verified landlords get significantly more inquiries and better tenants.",
    benefits: [
      "Verified badge on listings",
      "Priority in search results",
      "Tenant confidence boost",
    ],
    icon: ShieldCheck,
  },
  {
    title: "Effortless Operations",
    description:
      "Automate the tedious parts of property management.",
    benefits: [
      "Automated rent reminders",
      "Maintenance request tracking",
      "Financial reporting",
    ],
    icon: Settings,
  },
  {
    title: "You're All Set!",
    description: "Your landlord profile is ready to attract great tenants.",
    benefits: [
      "Listings go live faster",
      "AI matching activated",
      "Dashboard ready",
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

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-left transition-colors hover:border-indigo-200 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-indigo-700"
    >
      <div
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
          checked
            ? "border-indigo-500 bg-indigo-500"
            : "border-slate-300 dark:border-slate-600"
        }`}
      >
        {checked && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="h-3 w-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </motion.svg>
        )}
      </div>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </span>
    </button>
  );
}

export default function LandlordOnboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  // Step 1
  const [city, setCity] = useState("Jaipur");
  const [propertyType, setPropertyType] = useState("");
  const [propertyCount, setPropertyCount] = useState("");

  // Step 2
  const [goals, setGoals] = useState<string[]>([]);

  // Step 4
  const [deposit, setDeposit] = useState("");
  const [maintenance, setMaintenance] = useState("");
  const [rentCollection, setRentCollection] = useState("");

  const toggleGoal = (g: string) =>
    setGoals((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
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
                        <Building2 className="h-6 w-6 text-white" />
                      </div>
                      <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                        Landlord
                      </span>
                    </div>
                    <h1 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
                      Let&apos;s set up your landlord profile
                    </h1>
                    <p className="text-base leading-relaxed text-slate-500 dark:text-slate-400">
                      A complete profile helps you attract verified tenants,
                      price your property right, and manage everything
                      effortlessly.
                    </p>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 dark:border-emerald-900 dark:bg-emerald-950/20"
                    >
                      <p className="text-sm text-emerald-700 dark:text-emerald-300">
                        <ShieldCheck className="mr-2 inline-block h-4 w-4" />
                        Verified landlords get <strong>3x more inquiries</strong>{" "}
                        than unverified ones
                      </p>
                    </motion.div>
                  </div>
                )}

                {/* Step 1: Property Overview */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                      Property Overview
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
                        Property Type
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {PROPERTY_TYPES.map((t) => (
                          <Pill
                            key={t}
                            label={t}
                            selected={propertyType === t}
                            onClick={() => setPropertyType(t)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Number of Properties
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {PROPERTY_COUNTS.map((c) => (
                          <Pill
                            key={c}
                            label={c}
                            selected={propertyCount === c}
                            onClick={() => setPropertyCount(c)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Rental Goals */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                      What are your rental goals?
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Select all that apply. We&apos;ll optimize your
                      experience accordingly.
                    </p>
                    <div className="space-y-3">
                      {GOALS.map((g) => (
                        <Checkbox
                          key={g}
                          label={g}
                          checked={goals.includes(g)}
                          onChange={() => toggleGoal(g)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Trust Setup */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                      Trust & Verification
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Ownership verification unlocks premium features and boosts
                      your listing visibility.
                    </p>

                    {/* Mock Upload Area */}
                    <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-600 dark:bg-slate-800/30">
                      <Upload className="mx-auto h-10 w-10 text-slate-400 dark:text-slate-500" />
                      <p className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                        Upload ownership documents
                      </p>
                      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                        Property papers, sale deed, or registry (PDF, JPG up to
                        10MB)
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4 rounded-lg text-sm"
                      >
                        Choose Files
                      </Button>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 dark:border-indigo-900 dark:bg-indigo-950/20"
                    >
                      <p className="text-sm text-indigo-700 dark:text-indigo-300">
                        <ShieldCheck className="mr-2 inline-block h-4 w-4" />
                        Verified landlords get <strong>3x more inquiries</strong>{" "}
                        and priority placement in search results
                      </p>
                    </motion.div>
                  </div>
                )}

                {/* Step 4: Operations */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                      Operational Preferences
                    </h2>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Deposit Expectation
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {DEPOSIT_OPTIONS.map((d) => (
                          <Pill
                            key={d}
                            label={d}
                            selected={deposit === d}
                            onClick={() => setDeposit(d)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Maintenance Preference
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {MAINTENANCE_OPTIONS.map((m) => (
                          <Pill
                            key={m}
                            label={m}
                            selected={maintenance === m}
                            onClick={() => setMaintenance(m)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Rent Collection Preference
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {RENT_COLLECTION.map((r) => (
                          <Pill
                            key={r}
                            label={r}
                            selected={rentCollection === r}
                            onClick={() => setRentCollection(r)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Complete */}
                {currentStep === 5 && (
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
                      Your landlord profile is ready!
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                      Start adding properties and connecting with verified
                      tenants.
                    </p>

                    <TrustProgress
                      completedSteps={4}
                      totalSteps={6}
                      items={[
                        { label: "Role selected", done: true },
                        { label: "Property overview added", done: true },
                        { label: "Goals defined", done: true },
                        { label: "Operations configured", done: true },
                        { label: "Ownership verification", done: false },
                        { label: "First property listing", done: false },
                      ]}
                    />

                    <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                      <Button
                        onClick={() => router.push("/property")}
                        className="h-11 flex-1 gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-700 hover:to-violet-700"
                      >
                        <Plus className="h-4 w-4" />
                        Add Your First Property
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => router.push("/verification-pending")}
                        className="h-11 flex-1 gap-2 rounded-xl text-sm font-semibold"
                      >
                        <BadgeCheck className="h-4 w-4" />
                        Complete Verification
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => router.push("/setup-complete")}
                        className="h-11 flex-1 gap-2 rounded-xl text-sm font-semibold"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Explore Dashboard
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {currentStep < 5 && (
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
                  {currentStep > 0 && currentStep < 5 && (
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
