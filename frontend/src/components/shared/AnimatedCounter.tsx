"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function parseValue(value: string): {
  prefix: string;
  number: number;
  suffix: string;
} {
  const trimmed = value.trim();

  // Extract prefix (currency symbols like ₹, $, etc.)
  let prefix = "";
  let rest = trimmed;
  const prefixMatch = trimmed.match(/^([₹$€£¥]+)/);
  if (prefixMatch) {
    prefix = prefixMatch[1];
    rest = trimmed.slice(prefix.length).trim();
  }

  // Extract the numeric part (digits, commas, dots) and suffix
  const numMatch = rest.match(/^([0-9.,]+)\s*(.*)/);
  if (numMatch) {
    const rawNum = numMatch[1].replace(/,/g, "");
    const number = parseFloat(rawNum);
    const suffix = numMatch[2] || "";
    return { prefix, number: isNaN(number) ? 0 : number, suffix };
  }

  return { prefix: "", number: 0, suffix: value };
}

export default function AnimatedCounter({
  value,
  duration = 2000,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number | null>(null);

  const animate = useCallback(() => {
    const { prefix, number, suffix } = parseValue(value);

    if (number === 0) {
      setDisplayValue(value);
      setHasAnimated(true);
      return;
    }

    const isInteger = Number.isInteger(number);
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const current = easedProgress * number;

      if (progress < 1) {
        const formatted = isInteger
          ? Math.round(current).toLocaleString("en-IN")
          : current.toLocaleString("en-IN", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            });
        setDisplayValue(`${prefix}${formatted}${suffix}`);
        animationRef.current = requestAnimationFrame(tick);
      } else {
        // Animation complete — show original value exactly
        setDisplayValue(value);
        setHasAnimated(true);
      }
    };

    animationRef.current = requestAnimationFrame(tick);
  }, [value, duration]);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animate();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, hasAnimated]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {displayValue}
    </span>
  );
}
