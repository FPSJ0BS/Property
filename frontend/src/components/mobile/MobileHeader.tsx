"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, Share2, MoreHorizontal } from "lucide-react";
import { hapticLight } from "@/lib/haptics";

interface MobileHeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  transparent?: boolean;
  rightAction?: React.ReactNode;
  onShare?: () => void;
}

export default function MobileHeader({
  title,
  subtitle,
  showBack = true,
  transparent = false,
  rightAction,
  onShare,
}: MobileHeaderProps) {
  const router = useRouter();

  return (
    <header
      className={`sticky top-0 z-40 lg:hidden ${
        transparent
          ? "bg-transparent"
          : "bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-b border-slate-200/40 dark:border-slate-800/40"
      }`}
    >
      {/* Safe area top padding for notch */}
      <div className="pt-safe" />

      <div className="flex items-center justify-between h-11 px-1">
        {/* Left: Back button */}
        <div className="w-16 flex justify-start">
          {showBack && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                hapticLight();
                router.back();
              }}
              className="flex items-center gap-0.5 px-2 py-2 -ml-1 text-indigo-600 dark:text-indigo-400 active:opacity-60 min-h-[44px]"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
              <span className="text-[15px] font-medium">Back</span>
            </motion.button>
          )}
        </div>

        {/* Center: Title */}
        <div className="flex-1 flex flex-col items-center justify-center min-w-0">
          {title && (
            <h1 className="text-[15px] font-semibold text-slate-900 dark:text-white truncate max-w-[200px]">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right: Actions */}
        <div className="w-16 flex justify-end gap-1">
          {onShare && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                hapticLight();
                onShare();
              }}
              className="p-2 text-slate-600 dark:text-slate-400 active:opacity-60 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <Share2 className="w-[18px] h-[18px]" />
            </motion.button>
          )}
          {rightAction ?? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-2 text-slate-600 dark:text-slate-400 active:opacity-60 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <MoreHorizontal className="w-[18px] h-[18px]" />
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
}
