"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface PasswordStrengthProps {
  password: string;
}

function getStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4);
}

const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
const colors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-emerald-400",
  "bg-emerald-500",
];

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = useMemo(() => getStrength(password), [password]);

  if (!password) return null;

  return (
    <div className="space-y-1.5">
      <div className="flex gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className={`h-1 flex-1 rounded-full ${
              i < strength
                ? colors[strength]
                : "bg-slate-200 dark:bg-slate-700"
            }`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: i * 0.05, duration: 0.2 }}
          />
        ))}
      </div>
      <p
        className={`text-xs font-medium ${
          strength <= 1
            ? "text-red-500"
            : strength === 2
            ? "text-amber-500"
            : "text-emerald-500"
        }`}
      >
        {labels[strength]}
      </p>
    </div>
  );
}
