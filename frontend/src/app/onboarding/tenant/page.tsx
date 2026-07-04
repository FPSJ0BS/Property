"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  MapPin,
  Heart,
  ShieldCheck,
  User,
  PartyPopper,
  ArrowLeft,
  ArrowRight,
  Search,
  BadgeCheck,
  Home,
} from "lucide-react";
import OnboardingStepper from "@/components/auth/OnboardingStepper";
import BenefitPanel from "@/components/auth/BenefitPanel";
import TrustProgress from "@/components/auth/TrustProgress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STEPS = [
  { label: "Welcome", icon: Sparkles },
  { label: "Rental Needs", icon: MapPin },
  { label: "Lifestyle", icon: Heart },
  { label: "Trust", icon: ShieldCheck },
  { label: "Profile", icon: User },
  { label: "Complete", icon: PartyPopper },
];

const AREAS = [
  "Vaishali Nagar",
  "Malviya Nagar",
  "C-Scheme",
  "Mansarovar",
  "Jagatpura",
  "Tonk Road",
];
const BUDGET_RANGES = [
  "Under ₹10k",
  "₹10-20k",
  "₹20-35k",
  "₹35-50k",
  "₹50k+",
];
const PROPERTY_TYPES = ["Apartment", "Villa", "Studio", "Co-Living", "PG"];
const TIMELINES = ["Immediately", "This month", "Next month", "Flexible"];
const HOUSEHOLD_TYPES = [
  "Family",
  "Bachelor",
  "Working Professional",
  "Student",
  "Couple",
];
const FURNISHING = ["Fully Furnished", "Semi", "Unfurnished", "Any"];
const PROXIMITY = ["Office", "School", "Metro", "Hospital", "Market"];

const BENEFIT_DATA = [
  {
    title: "Personalized Experience",
    description:
      "We tailor your entire rental journey based on your preferences.",
    benefits: [
      "AI-powered property matching",
      "Smart notification filters",
      "Personalized price insights",
    ],
    icon: Sparkles,
  },
  {
    title: "Smarter Search",
    description:
      "Your rental needs help our AI find the perfect match faster.",
    benefits: [
      "Location-aware recommendations",
      "Budget-optimized results",
      "Instant availability alerts",
    ],
    icon: MapPin,
  },
  {
    title: "Better Matches",
    description:
      "Lifestyle details help us match you with the right property and neighbors.",
    benefits: [
      "Community compatibility scoring",
      "Amenity-based filtering",
      "Lifestyle-matched listings",
    ],
    icon: Heart,
  },
  {
    title: "Trusted Rentals",
    description:
      "Your trust preferences ensure you only see verified, safe options.",
    benefits: [
      "Verified landlord badges",
      "Fair rent guarantee",
      "Low deposit options",
    ],
    icon: ShieldCheck,
  },
  {
    title: "Stronger Profile",
    description:
      "A complete profile gets you faster responses and better deals.",
    benefits: [
      "Priority listing access",
      "Faster landlord responses",
      "Higher trust score",
    ],
    icon: User,
  },
  {
    title: "You're All Set!",
    description: "Your personalized rental experience is ready.",
    benefits: [
      "AI search activated",
      "Trust verification ready",
      "Smart alerts configured",
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

function Toggle({
  label,
  enabled,
  onToggle,
}: {
  label: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3.5 transition-colors hover:border-indigo-200 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-indigo-700"
    >
      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </span>
      <div
        className={`relative h-6 w-11 rounded-full transition-colors ${
          enabled
            ? "bg-indigo-600"
            : "bg-slate-200 dark:bg-slate-700"
        }`}
      >
        <motion.div
          animate={{ x: enabled ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm"
        />
      </div>
    </button>
  );
}

export default function TenantOnboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  // Step 1: Rental Needs
  const [city, setCity] = useState("Jaipur");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [timeline, setTimeline] = useState("");

  // Step 2: Lifestyle
  const [householdType, setHouseholdType] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [parking, setParking] = useState(false);
  const [petFriendly, setPetFriendly] = useState(false);
  const [proximity, setProximity] = useState<string[]>([]);

  // Step 3: Trust
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [lowDeposit, setLowDeposit] = useState(false);
  const [fairRent, setFairRent] = useState(true);
  const [managedOnly, setManagedOnly] = useState(false);

  // Step 4: Profile
  const [occupation, setOccupation] = useState("");
  const [company, setCompany] = useState("");
  const [householdSize, setHouseholdSize] = useState("2");

  const toggleArea = (area: string) =>
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );

  const toggleProximity = (p: string) =>
    setProximity((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
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
        {/* Stepper */}
        <div className="mb-8">
          <OnboardingStepper
            steps={STEPS}
            currentStep={currentStep}
            onStepClick={(s) => s <= currentStep && setCurrentStep(s)}
          />
        </div>

        {/* Content */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form — 3 cols */}
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
                        <Home className="h-6 w-6 text-white" />
                      </div>
                      <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                        Tenant
                      </span>
                    </div>
                    <h1 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
                      Let&apos;s personalize your rental search
                    </h1>
                    <p className="text-base leading-relaxed text-slate-500 dark:text-slate-400">
                      Answer a few questions so our AI can find you the perfect
                      home. This takes about 2 minutes and you can skip any
                      step.
                    </p>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 dark:border-indigo-900 dark:bg-indigo-950/20"
                    >
                      <p className="text-sm text-indigo-700 dark:text-indigo-300">
                        <Sparkles className="mr-2 inline-block h-4 w-4" />
                        Tenants who complete onboarding get{" "}
                        <strong>5x better</strong> AI matching results
                      </p>
                    </motion.div>
                  </div>
                )}

                {/* Step 1: Rental Needs */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                      Your Rental Needs
                    </h2>

                    {/* City */}
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

                    {/* Preferred Areas */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Preferred Areas
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {AREAS.map((a) => (
                          <Pill
                            key={a}
                            label={a}
                            selected={selectedAreas.includes(a)}
                            onClick={() => toggleArea(a)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Budget Range
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {BUDGET_RANGES.map((b) => (
                          <Pill
                            key={b}
                            label={b}
                            selected={budget === b}
                            onClick={() => setBudget(b)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Property Type */}
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

                    {/* Timeline */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Move-in Timeline
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {TIMELINES.map((t) => (
                          <Pill
                            key={t}
                            label={t}
                            selected={timeline === t}
                            onClick={() => setTimeline(t)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Lifestyle */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                      Lifestyle Preferences
                    </h2>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Household Type
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {HOUSEHOLD_TYPES.map((h) => (
                          <Pill
                            key={h}
                            label={h}
                            selected={householdType === h}
                            onClick={() => setHouseholdType(h)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Furnishing Preference
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {FURNISHING.map((f) => (
                          <Pill
                            key={f}
                            label={f}
                            selected={furnishing === f}
                            onClick={() => setFurnishing(f)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Toggle
                        label="Parking Needed"
                        enabled={parking}
                        onToggle={() => setParking(!parking)}
                      />
                      <Toggle
                        label="Pet Friendly"
                        enabled={petFriendly}
                        onToggle={() => setPetFriendly(!petFriendly)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Proximity Priority
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {PROXIMITY.map((p) => (
                          <Pill
                            key={p}
                            label={p}
                            selected={proximity.includes(p)}
                            onClick={() => toggleProximity(p)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Trust */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                      Trust Preferences
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Set your comfort level for the kind of listings you see.
                    </p>
                    <div className="space-y-3">
                      <Toggle
                        label="Verified landlords only"
                        enabled={verifiedOnly}
                        onToggle={() => setVerifiedOnly(!verifiedOnly)}
                      />
                      <Toggle
                        label="Low deposit preference"
                        enabled={lowDeposit}
                        onToggle={() => setLowDeposit(!lowDeposit)}
                      />
                      <Toggle
                        label="Fair-rent verified only"
                        enabled={fairRent}
                        onToggle={() => setFairRent(!fairRent)}
                      />
                      <Toggle
                        label="Managed listings only"
                        enabled={managedOnly}
                        onToggle={() => setManagedOnly(!managedOnly)}
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Profile */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                      Complete Your Profile
                    </h2>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Occupation
                      </label>
                      <Input
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        placeholder="e.g. Software Engineer"
                        className="h-10"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Company / Institution
                      </label>
                      <Input
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Infosys, IIT Jaipur"
                        className="h-10"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Household Size
                      </label>
                      <select
                        value={householdSize}
                        onChange={(e) => setHouseholdSize(e.target.value)}
                        className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm text-slate-900 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-slate-800 dark:text-white"
                      >
                        {["1", "2", "3", "4", "5", "6+"].map((s) => (
                          <option key={s} value={s}>
                            {s} {s === "1" ? "person" : "people"}
                          </option>
                        ))}
                      </select>
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
                      Your rental profile is ready!
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                      Our AI is already finding matches based on your
                      preferences. Here&apos;s what you can do next.
                    </p>

                    <TrustProgress
                      completedSteps={4}
                      totalSteps={6}
                      items={[
                        { label: "Role selected", done: true },
                        { label: "Rental needs defined", done: true },
                        { label: "Lifestyle set", done: true },
                        { label: "Trust preferences saved", done: true },
                        { label: "Identity verification", done: false },
                        { label: "Document upload", done: false },
                      ]}
                    />

                    <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                      <Button
                        onClick={() => router.push("/discover")}
                        className="h-11 flex-1 gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-700 hover:to-violet-700"
                      >
                        <Search className="h-4 w-4" />
                        Start AI Search
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
                        onClick={() => router.push("/discover")}
                        className="h-11 flex-1 gap-2 rounded-xl text-sm font-semibold"
                      >
                        <Home className="h-4 w-4" />
                        Explore Verified Rentals
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

          {/* Benefit Panel — 2 cols (desktop) */}
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
