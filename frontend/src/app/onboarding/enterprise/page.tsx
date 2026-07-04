"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Building,
  Users,
  PartyPopper,
  ArrowLeft,
  ArrowRight,
  Phone,
  ClipboardList,
  LayoutDashboard,
} from "lucide-react";
import OnboardingStepper from "@/components/auth/OnboardingStepper";
import BenefitPanel from "@/components/auth/BenefitPanel";
import TrustProgress from "@/components/auth/TrustProgress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STEPS = [
  { label: "Welcome", icon: Sparkles },
  { label: "Company", icon: Building },
  { label: "Housing", icon: Users },
  { label: "Complete", icon: PartyPopper },
];

const INDUSTRIES = [
  "IT",
  "Manufacturing",
  "Consulting",
  "Healthcare",
  "Education",
  "Other",
];
const EMPLOYEE_COUNTS = ["10-50", "50-200", "200-500", "500+"];
const USE_CASES = [
  "Employee relocation",
  "Guest housing",
  "Bulk leasing",
  "Corporate stays",
];
const CITIES = [
  "Jaipur",
  "Delhi NCR",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Kolkata",
];

const BENEFIT_DATA = [
  {
    title: "Enterprise Solutions",
    description: "Streamlined rental operations for large organizations.",
    benefits: [
      "Dedicated account management",
      "Bulk lease negotiation",
      "Compliance-ready documentation",
    ],
    icon: Sparkles,
  },
  {
    title: "Tailored Matching",
    description: "We match housing solutions to your company profile.",
    benefits: [
      "Industry-specific recommendations",
      "Scale-appropriate options",
      "Budget optimization",
    ],
    icon: Building,
  },
  {
    title: "Smart Operations",
    description: "AI-powered housing management at enterprise scale.",
    benefits: [
      "Multi-city coordination",
      "Volume-based pricing",
      "Automated reporting",
    ],
    icon: Users,
  },
  {
    title: "All Set!",
    description: "Your enterprise account is configured and ready.",
    benefits: [
      "Solutions team notified",
      "Requirements dashboard ready",
      "Priority onboarding",
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

export default function EnterpriseOnboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  // Step 1
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");

  // Step 2
  const [useCases, setUseCases] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [monthlyVolume, setMonthlyVolume] = useState("");

  const toggleUseCase = (u: string) =>
    setUseCases((prev) =>
      prev.includes(u) ? prev.filter((x) => x !== u) : [...prev, u]
    );

  const toggleCity = (c: string) =>
    setCities((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
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
                        <Building className="h-6 w-6 text-white" />
                      </div>
                      <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                        Enterprise
                      </span>
                    </div>
                    <h1 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
                      Enterprise Rental Solutions
                    </h1>
                    <p className="text-base leading-relaxed text-slate-500 dark:text-slate-400">
                      Streamline your corporate housing, employee relocation,
                      and bulk leasing needs with AI-powered solutions and
                      dedicated support.
                    </p>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-900 dark:bg-blue-950/20"
                    >
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        <Building className="mr-2 inline-block h-4 w-4" />
                        Enterprise clients save up to{" "}
                        <strong>30% on housing costs</strong> with our
                        volume-based solutions
                      </p>
                    </motion.div>
                  </div>
                )}

                {/* Step 1: Company Info */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                      Company Information
                    </h2>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Company Name
                      </label>
                      <Input
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Enter company name"
                        className="h-10"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Industry
                      </label>
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm text-slate-900 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-slate-800 dark:text-white"
                      >
                        <option value="">Select industry</option>
                        {INDUSTRIES.map((i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Employee Count
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {EMPLOYEE_COUNTS.map((c) => (
                          <Pill
                            key={c}
                            label={c}
                            selected={employeeCount === c}
                            onClick={() => setEmployeeCount(c)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Housing Needs */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                      Housing Needs
                    </h2>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Use Case
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {USE_CASES.map((u) => (
                          <Pill
                            key={u}
                            label={u}
                            selected={useCases.includes(u)}
                            onClick={() => toggleUseCase(u)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Cities Needed
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {CITIES.map((c) => (
                          <Pill
                            key={c}
                            label={c}
                            selected={cities.includes(c)}
                            onClick={() => toggleCity(c)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Monthly Volume Estimate
                      </label>
                      <Input
                        value={monthlyVolume}
                        onChange={(e) => setMonthlyVolume(e.target.value)}
                        placeholder="e.g. 20-50 units"
                        className="h-10"
                      />
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
                      Your enterprise account is ready!
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                      Our solutions team has been notified and will reach out
                      within 24 hours.
                    </p>

                    <TrustProgress
                      completedSteps={3}
                      totalSteps={5}
                      items={[
                        { label: "Company info provided", done: true },
                        { label: "Housing needs defined", done: true },
                        { label: "Account created", done: true },
                        { label: "Solutions consultation", done: false },
                        { label: "First requirement posted", done: false },
                      ]}
                    />

                    <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                      <Button
                        onClick={() => router.push("/contact")}
                        className="h-11 flex-1 gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-700 hover:to-violet-700"
                      >
                        <Phone className="h-4 w-4" />
                        Talk to Solutions Team
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => router.push("/next-step")}
                        className="h-11 flex-1 gap-2 rounded-xl text-sm font-semibold"
                      >
                        <ClipboardList className="h-4 w-4" />
                        Define Requirements
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => router.push("/setup-complete")}
                        className="h-11 flex-1 gap-2 rounded-xl text-sm font-semibold"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        View Dashboard
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
