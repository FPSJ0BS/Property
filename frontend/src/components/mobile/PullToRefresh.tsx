"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { hapticMedium } from "@/lib/haptics";

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh?: () => Promise<void>;
}

export default function PullToRefresh({ children, onRefresh }: PullToRefreshProps) {
  const [refreshing, setRefreshing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const pulling = useRef(false);

  const pullDistance = useMotionValue(0);
  const spinnerOpacity = useTransform(pullDistance, [0, 40, 80], [0, 0.5, 1]);
  const spinnerScale = useTransform(pullDistance, [0, 40, 80], [0.5, 0.8, 1]);
  const spinnerRotate = useTransform(pullDistance, [0, 80], [0, 180]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const scrollTop = containerRef.current?.scrollTop ?? window.scrollY;
    if (scrollTop <= 0 && !refreshing) {
      startY.current = e.touches[0].clientY;
      pulling.current = true;
    }
  }, [refreshing]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!pulling.current) return;
    const delta = Math.max(0, (e.touches[0].clientY - startY.current) * 0.5);
    pullDistance.set(Math.min(delta, 120));
  }, [pullDistance]);

  const handleTouchEnd = useCallback(async () => {
    if (!pulling.current) return;
    pulling.current = false;

    if (pullDistance.get() >= 80) {
      setRefreshing(true);
      await hapticMedium();
      if (onRefresh) {
        await onRefresh();
      } else {
        // Default: reload page data
        await new Promise((r) => setTimeout(r, 1000));
      }
      setRefreshing(false);
    }

    pullDistance.set(0);
  }, [pullDistance, onRefresh]);

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
    >
      {/* Pull indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-center z-40 pointer-events-none"
        style={{ height: pullDistance }}
      >
        <motion.div
          style={{ opacity: spinnerOpacity, scale: spinnerScale }}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200/60 dark:border-slate-700/60"
        >
          <motion.div
            style={{ rotate: refreshing ? undefined : spinnerRotate }}
            animate={refreshing ? { rotate: 360 } : undefined}
            transition={refreshing ? { repeat: Infinity, duration: 0.8, ease: "linear" } : undefined}
          >
            <RefreshCw className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </motion.div>
        </motion.div>
      </motion.div>

      {children}
    </div>
  );
}
