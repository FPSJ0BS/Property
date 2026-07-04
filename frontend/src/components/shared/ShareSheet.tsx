"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Link2,
  Check,
  Mail,
  Share2,
  QrCode,
  Download,
  MessageCircle,
} from "lucide-react";

interface ShareSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

function QRPlaceholder() {
  // Generate a deterministic QR-like grid pattern
  const size = 11;
  const pattern: boolean[][] = [];
  for (let r = 0; r < size; r++) {
    pattern[r] = [];
    for (let c = 0; c < size; c++) {
      // Corner finder patterns (3x3 solid squares in corners)
      const inTopLeft = r < 3 && c < 3;
      const inTopRight = r < 3 && c >= size - 3;
      const inBottomLeft = r >= size - 3 && c < 3;
      if (inTopLeft || inTopRight || inBottomLeft) {
        pattern[r][c] = true;
      } else {
        // Pseudo-random fill for the data area
        pattern[r][c] = ((r * 7 + c * 13 + r * c) % 3) !== 0;
      }
    }
  }

  const cellSize = 8;
  const totalSize = size * cellSize;

  return (
    <svg
      width={totalSize}
      height={totalSize}
      viewBox={`0 0 ${totalSize} ${totalSize}`}
      className="mx-auto"
    >
      {pattern.map((row, r) =>
        row.map((filled, c) =>
          filled ? (
            <rect
              key={`${r}-${c}`}
              x={c * cellSize}
              y={r * cellSize}
              width={cellSize}
              height={cellSize}
              className="fill-slate-900 dark:fill-white"
              rx={1}
            />
          ) : null
        )
      )}
    </svg>
  );
}

const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface ShareOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  action: () => void;
}

export default function ShareSheet({
  isOpen,
  onClose,
  title,
  url,
}: ShareSheetProps) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [url]);

  const shareOptions: ShareOption[] = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: <MessageCircle className="w-5 h-5" />,
      color: "bg-green-500 hover:bg-green-600 text-white",
      action: () => {
        const text = encodeURIComponent(`Check out ${title} on 99tolet: ${url}`);
        window.open(`https://wa.me/?text=${text}`, "_blank");
      },
    },
    {
      id: "twitter",
      label: "X / Twitter",
      icon: <XLogo className="w-4 h-4" />,
      color: "bg-black dark:bg-white dark:text-black text-white hover:opacity-90",
      action: () => {
        const text = encodeURIComponent(`Check out ${title} on 99tolet`);
        window.open(
          `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`,
          "_blank"
        );
      },
    },
    {
      id: "email",
      label: "Email",
      icon: <Mail className="w-5 h-5" />,
      color: "bg-blue-500 hover:bg-blue-600 text-white",
      action: () => {
        const subject = encodeURIComponent(`Check out: ${title}`);
        const body = encodeURIComponent(
          `Hi,\n\nI found this property on 99tolet and thought you might be interested:\n\n${title}\n${url}\n\nTake a look!`
        );
        window.open(`mailto:?subject=${subject}&body=${body}`);
      },
    },
    {
      id: "qr",
      label: "QR Code",
      icon: <QrCode className="w-5 h-5" />,
      color: "bg-slate-600 hover:bg-slate-700 dark:bg-slate-500 dark:hover:bg-slate-400 text-white",
      action: () => setShowQR((prev) => !prev),
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="share-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9998] flex items-end sm:items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Sheet / Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-md bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            {/* Drag handle (mobile) */}
            <div className="flex justify-center pt-3 sm:hidden">
              <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10">
                  <Share2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Share Property
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Property title */}
            <div className="px-6 pb-4">
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                {title}
              </p>
            </div>

            {/* Share buttons row */}
            <div className="px-6 pb-5">
              <div className="grid grid-cols-4 gap-3">
                {shareOptions.map((option, i) => (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={option.action}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${option.color} group-hover:scale-105 group-active:scale-95`}
                    >
                      {option.icon}
                    </div>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      {option.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* QR Code section */}
            <AnimatePresence>
              {showQR && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5">
                    <div className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center gap-3">
                      <div className="p-4 bg-white rounded-lg">
                        <QRPlaceholder />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Scan to view property
                      </p>
                      <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors">
                        <Download className="w-4 h-4" />
                        Download QR
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Copy link bar */}
            <div className="px-6 pb-6">
              <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex-1 flex items-center gap-2 px-2 min-w-0">
                  <Link2 className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-sm text-slate-500 dark:text-slate-400 truncate">
                    {url}
                  </span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={copyToClipboard}
                  className={`shrink-0 flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    "Copy"
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
