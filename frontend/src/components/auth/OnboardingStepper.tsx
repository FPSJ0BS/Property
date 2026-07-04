"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, type LucideIcon } from "lucide-react";

interface Step {
  label: string;
  icon?: LucideIcon;
}

interface OnboardingStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export default function OnboardingStepper({
  steps,
  currentStep,
  onStepClick,
}: OnboardingStepperProps) {
  return (
    <>
      {/* Desktop — Horizontal */}
      <div className="hidden sm:flex items-center gap-0">
        {steps.map((step, i) => {
          const completed = i < currentStep;
          const current = i === currentStep;
          const StepIcon = step.icon;

          return (
            <React.Fragment key={i}>
              <button
                type="button"
                onClick={() => onStepClick?.(i)}
                disabled={!onStepClick}
                className="group flex items-center gap-2.5 disabled:cursor-default"
              >
                {/* Circle */}
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: completed
                      ? "rgb(99 102 241)"
                      : current
                        ? "rgb(255 255 255)"
                        : "rgb(241 245 249)",
                  }}
                  className={`
                    relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold
                    transition-shadow duration-200
                    ${completed ? "text-white" : ""}
                    ${current ? "ring-2 ring-indigo-500 text-indigo-600 dark:ring-indigo-400 dark:text-indigo-400 dark:bg-slate-800" : ""}
                    ${!completed && !current ? "text-slate-400 dark:bg-slate-800 dark:text-slate-500" : ""}
                  `}
                >
                  {completed ? (
                    <Check className="h-4 w-4" />
                  ) : StepIcon ? (
                    <StepIcon className="h-4 w-4" />
                  ) : (
                    i + 1
                  )}
                </motion.div>

                {/* Label */}
                <span
                  className={`text-sm font-medium whitespace-nowrap ${
                    completed || current
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {step.label}
                </span>
              </button>

              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="mx-3 h-px flex-1 min-w-[32px]">
                  <motion.div
                    initial={false}
                    animate={{
                      scaleX: i < currentStep ? 1 : 0,
                    }}
                    transition={{ duration: 0.35 }}
                    className="h-full origin-left bg-indigo-500"
                    style={{ position: "relative" }}
                  />
                  <div
                    className={`h-px -mt-px ${
                      i < currentStep
                        ? "bg-indigo-500"
                        : "bg-slate-200 dark:bg-slate-700"
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile — Vertical */}
      <div className="flex sm:hidden flex-col">
        {steps.map((step, i) => {
          const completed = i < currentStep;
          const current = i === currentStep;
          const StepIcon = step.icon;

          return (
            <div key={i} className="flex gap-3">
              {/* Left rail: circle + connector */}
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => onStepClick?.(i)}
                  disabled={!onStepClick}
                  className="disabled:cursor-default"
                >
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: completed
                        ? "rgb(99 102 241)"
                        : current
                          ? "rgb(255 255 255)"
                          : "rgb(241 245 249)",
                    }}
                    className={`
                      flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold
                      ${completed ? "text-white" : ""}
                      ${current ? "ring-2 ring-indigo-500 text-indigo-600 dark:ring-indigo-400 dark:text-indigo-400 dark:bg-slate-800" : ""}
                      ${!completed && !current ? "text-slate-400 dark:bg-slate-800 dark:text-slate-500" : ""}
                    `}
                  >
                    {completed ? (
                      <Check className="h-4 w-4" />
                    ) : StepIcon ? (
                      <StepIcon className="h-4 w-4" />
                    ) : (
                      i + 1
                    )}
                  </motion.div>
                </button>

                {i < steps.length - 1 && (
                  <div
                    className={`w-px flex-1 min-h-[24px] my-1 ${
                      i < currentStep
                        ? "bg-indigo-500"
                        : "bg-slate-200 dark:bg-slate-700"
                    }`}
                  />
                )}
              </div>

              {/* Right: label */}
              <div className="pb-6 pt-1.5">
                <span
                  className={`text-sm font-medium ${
                    completed || current
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
