"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Home,
  Building2,
  Briefcase,
  Building,
  Globe,
  ArrowRight,
} from "lucide-react";
import RoleCard from "@/components/auth/RoleCard";
import { Button } from "@/components/ui/button";

const roles = [
  {
    role: "tenant",
    icon: Home,
    title: "Tenant",
    description: "Find verified rentals with AI-powered matching",
    benefits: [
      "AI-matched properties",
      "Verified landlords",
      "Fair rent pricing",
    ],
  },
  {
    role: "landlord",
    icon: Building2,
    title: "Landlord",
    description: "List properties and find quality tenants faster",
    benefits: [
      "3x more inquiries",
      "Verified tenants",
      "Automated rent collection",
    ],
  },
  {
    role: "broker",
    icon: Briefcase,
    title: "Broker / Agent",
    description: "Access premium leads and manage listings",
    benefits: [
      "Verified lead pipeline",
      "Commission tracking",
      "Partner network tools",
    ],
  },
  {
    role: "enterprise",
    icon: Building,
    title: "Enterprise",
    description: "Corporate housing and bulk leasing solutions",
    benefits: [
      "Employee relocation",
      "Bulk lease management",
      "Dedicated account manager",
    ],
  },
  {
    role: "nri-owner",
    icon: Globe,
    title: "NRI Owner",
    description: "Manage your India properties remotely with confidence",
    benefits: [
      "Remote property management",
      "Automated NRE/NRO collection",
      "Verified maintenance ops",
    ],
  },
];

export default function OnboardingPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selectedRole) {
      router.push(`/onboarding/${selectedRole}`);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            How will you use 99tolet?
          </h1>
          <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
            Select your role to get a personalized onboarding experience
          </p>
        </motion.div>

        {/* Role Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="wait">
            {roles.map((r, i) => (
              <motion.div
                key={r.role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <RoleCard
                  icon={r.icon}
                  title={r.title}
                  description={r.description}
                  benefits={r.benefits}
                  selected={selectedRole === r.role}
                  onSelect={() => setSelectedRole(r.role)}
                  index={i}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Continue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: selectedRole ? 1 : 0.5 }}
          className="mt-10 flex justify-center"
        >
          <Button
            size="lg"
            disabled={!selectedRole}
            onClick={handleContinue}
            className="h-12 gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-40"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>

        <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
          You can change your role later from settings
        </p>
      </div>
    </section>
  );
}
