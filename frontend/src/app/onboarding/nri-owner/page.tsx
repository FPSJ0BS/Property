"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Globe,
  Home,
  Settings,
  PartyPopper,
  ArrowLeft,
  ArrowRight,
  Plus,
  BadgeCheck,
  LayoutDashboard,
} from "lucide-react";
import OnboardingStepper from "@/components/auth/OnboardingStepper";
import BenefitPanel from "@/components/auth/BenefitPanel";
import TrustProgress from "@/components/auth/TrustProgress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STEPS = [
  { label: "Welcome", icon: Sparkles },
  { label: "Property", icon: Home },
  { label: "Management", icon: Settings },
  { label: "Complete", icon: PartyPopper },
];

const PROPERTY_TYPES = ["Apartment", "Villa", "Commercial", "Plot", "Co-Living"];
const PROPERTY_STATUS = ["Vacant", "Occupied", "Under renovation"];
const PROPERTY_COUNTS = ["1", "2-3", "4-5", "5+"];
const MGMT_STYLES = ["Full managed", "Partial", "Self with oversight"];
const RENT_COLLECTION = [
  "Automated to NRE/NRO account",
  "Bank transfer",
  "Cheque collection",
];
const MAINTENANCE = ["Managed by 99tolet", "Self-arranged"];

const BENEFIT_DATA = [
  {
    title: "NRI Peace of Mind",
    description:
      "Manage your India properties remotely with full transparency.",
    benefits: [
      "24/7 remote property dashboard",
      "Verified tenant placement",
      "Automated rent to NRE/NRO",
    ],
    icon: Globe,
  },
  {
    title: "Property Intelligence",
    description: "We keep track of your property status and market value.",
    benefits: [
      "Real-time occupancy tracking",
      "Market rent benchmarking",
      "Maintenance history logs",
    ],
    icon: Home,
  },
  {
    title: "Hands-Off Management",
    description: "Choose your level of involvement in property operations.",
    benefits: [
      "Professional property managers",
      "Automated rent collection",
      "Regular photo/video updates",
    ],
    icon: Settings,
  },
  {
    title: "All Set!",
    description: "Your NRI owner dashboard is ready for remote management.",
    benefits: [
      "Remote dashboard activated",
      "Ownership verification queued",
      "Support team assigned",
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

export default function NriOwnerOnboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  // Step 1
  const [propertyCity, setPropertyCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("");
  const [propertyCount, setPropertyCount] = useState("");

  // Step 2
  const [mgmtStyle, setMgmtStyle] = useState("");
  const [rentCollection, setRentCollection] = useState("");
  const [maintenance, setMaintenance] = useState("");

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
                        <Globe className="h-6 w-6 text-white" />
                      </div>
                      <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                        NRI Owner
                      </span>
                    </div>
                    <h1 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
                      Manage your India properties with confidence
                    </h1>
                    <p className="text-base leading-relaxed text-slate-500 dark:text-slate-400">
                      Whether you&apos;re in the US, UK, Middle East, or
                      anywhere else, manage your Indian properties with full
                      transparency and trusted operations.
                    </p>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 dark:border-emerald-900 dark:bg-emerald-950/20"
                    >
                      <p className="text-sm text-emerald-700 dark:text-emerald-300">
                        <Globe className="mr-2 inline-block h-4 w-4" />
                        NRI owners using 99tolet report{" "}
                        <strong>zero vacancy gaps</strong> with managed
                        operations
                      </p>
                    </motion.div>
                  </div>
                )}

                {/* Step 1: Property Details */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                      Property Details
                    </h2>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Property City
                      </label>
                      <Input
                        value={propertyCity}
                        onChange={(e) => setPropertyCity(e.target.value)}
                        placeholder="e.g. Jaipur, Delhi, Mumbai"
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
                        Current Status
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {PROPERTY_STATUS.map((s) => (
                          <Pill
                            key={s}
                            label={s}
                            selected={propertyStatus === s}
                            onClick={() => setPropertyStatus(s)}
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

                {/* Step 2: Management Preferences */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                      Management Preferences
                    </h2>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Remote Management Style
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {MGMT_STYLES.map((m) => (
                          <Pill
                            key={m}
                            label={m}
                            selected={mgmtStyle === m}
                            onClick={() => setMgmtStyle(m)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Rent Collection
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

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Maintenance
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {MAINTENANCE.map((m) => (
                          <Pill
                            key={m}
                            label={m}
                            selected={maintenance === m}
                            onClick={() => setMaintenance(m)}
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
                      Your NRI owner profile is ready!
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                      Start managing your Indian properties remotely with full
                      visibility and professional support.
                    </p>

                    <TrustProgress
                      completedSteps={3}
                      totalSteps={5}
                      items={[
                        { label: "Profile created", done: true },
                        { label: "Property details added", done: true },
                        { label: "Management preferences set", done: true },
                        { label: "Ownership verification", done: false },
                        { label: "Remote dashboard setup", done: false },
                      ]}
                    />

                    <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                      <Button
                        onClick={() => router.push("/property")}
                        className="h-11 flex-1 gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-700 hover:to-violet-700"
                      >
                        <Plus className="h-4 w-4" />
                        Add Property Details
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
                        Activate Remote Dashboard
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
