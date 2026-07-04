"use client";

import React, { useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface OTPInputProps {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
  onComplete?: (otp: string) => void;
}

export default function OTPInput({
  length = 6,
  value,
  onChange,
  onComplete,
}: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = useCallback(
    (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (val && !/^\d$/.test(val)) return;

      const newValue = [...value];
      newValue[index] = val;
      onChange(newValue);

      if (val && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      if (val && newValue.every((v) => v !== "")) {
        onComplete?.(newValue.join(""));
      }
    },
    [value, onChange, onComplete, length]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !value[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [value]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
      if (!pasted) return;
      const newValue = [...value];
      for (let i = 0; i < pasted.length; i++) {
        newValue[i] = pasted[i];
      }
      onChange(newValue);
      const nextIndex = Math.min(pasted.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      if (newValue.every((v) => v !== "")) {
        onComplete?.(newValue.join(""));
      }
    },
    [value, onChange, onComplete, length]
  );

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {Array.from({ length }).map((_, i) => (
        <motion.input
          key={i}
          ref={(el) => {
            inputRefs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.25 }}
          className={`h-12 w-10 rounded-xl border-2 bg-white text-center text-lg font-semibold text-slate-900 outline-none transition-all duration-200 sm:h-14 sm:w-12 sm:text-xl dark:bg-slate-800 dark:text-white ${
            value[i]
              ? "border-indigo-500 shadow-sm shadow-indigo-500/20"
              : "border-slate-200 focus:border-indigo-500 dark:border-slate-700 dark:focus:border-indigo-400"
          }`}
        />
      ))}
    </div>
  );
}
