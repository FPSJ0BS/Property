"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Brain,
  X,
  Send,
  Mic,
  Bot,
  User,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
}

const QUICK_CHIPS = [
  "Find me a 2BHK under \u20b920k",
  "Is \u20b925,000 fair for Vaishali Nagar?",
  "Best areas for families in Jaipur",
  "How does verification work?",
  "Co-living options near IT park",
];

const INITIAL_AI_MESSAGE =
  "Hi! I'm your AI rental assistant. I can help you with: finding properties, understanding pricing, checking neighborhoods, or answering any rental questions. What would you like to know?";

function getAIResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("2bhk") || q.includes("under"))
    return "Based on current market data, I found 3 verified 2BHK apartments under \u20b920,000 in Jaipur. The best match is a fully furnished 2BHK in Malviya Nagar at \u20b922,000 with a 89% AI match score. Would you like to see the details?";
  if (q.includes("fair") || q.includes("pricing") || q.includes("vaishali"))
    return "According to RentIQ\u2122 analysis, the average rent for a 2BHK in Vaishali Nagar is \u20b918,500/month. \u20b925,000 is 35% above market average. I'd recommend negotiating or looking at premium 3BHK options in this range instead.";
  if (q.includes("family") || q.includes("families"))
    return "For families, I recommend Vaishali Nagar (top schools, parks), Malviya Nagar (hospitals, markets), or Mansarovar (affordable, well-connected). All have verified family-friendly properties with TrustShield\u2122 scores above 90%.";
  if (q.includes("verification") || q.includes("trust"))
    return "TrustShield\u2122 verifies both landlords and tenants through: Aadhaar/PAN identity check, property ownership validation, physical on-ground inspection, and background screening. Verified properties show a Trust Score (0-100) visible on every listing.";
  if (q.includes("co-living") || q.includes("coliving"))
    return "We have 3 co-living options in Jaipur: Private Rooms from \u20b915,000/mo in Malviya Nagar, Shared Rooms from \u20b98,500/mo in Jagatpura, and premium shared apartments from \u20b922,000/mo in Vaishali Nagar. All include WiFi, housekeeping, and community features. Roommates are AI-matched for lifestyle compatibility.";
  return "That's a great question! While I'm still learning, I can help you search properties, check pricing fairness, explore neighborhoods, or understand our verification process. Try asking about a specific area or budget.";
}

let msgIdCounter = 0;
function makeId() {
  msgIdCounter += 1;
  return `msg-${Date.now()}-${msgIdCounter}`;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: makeId(), role: "ai", text: INITIAL_AI_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const handleSend = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      const userMsg: Message = { id: makeId(), role: "user", text: text.trim() };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setShowChips(false);
      setIsTyping(true);

      setTimeout(() => {
        const aiMsg: Message = {
          id: makeId(),
          role: "ai",
          text: getAIResponse(text),
        };
        setIsTyping(false);
        setMessages((prev) => [...prev, aiMsg]);
      }, 1500);
    },
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => setIsOpen(true)}
            className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-shadow cursor-pointer"
            aria-label="Open AI Chat"
          >
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 animate-ping opacity-25" />
            <Sparkles className="h-6 w-6 relative z-10" />
            {/* AI Badge */}
            <span className="absolute -top-1 -right-1 flex h-5 w-8 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 shadow-md">
              AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed right-4 bottom-4 z-50 flex flex-col w-[calc(100vw-2rem)] sm:w-[380px] h-[85vh] sm:h-[500px] rounded-2xl shadow-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-900 overflow-hidden"
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white shrink-0">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
                <Brain className="h-5 w-5" />
              </div>
              <div className="relative flex-1 min-w-0">
                <h3 className="text-sm font-semibold leading-tight">
                  99tolet AI Assistant
                </h3>
                <p className="text-[10px] text-indigo-200 leading-tight">
                  Powered by RentalBrain&trade;
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="relative flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth bg-slate-50 dark:bg-slate-950">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-2 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "ai" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white mt-0.5">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-br-md"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-bl-md border border-slate-100 dark:border-slate-700"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.role === "user" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 mt-0.5">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Quick Chips */}
              {showChips && messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2 pl-9"
                >
                  {QUICK_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleSend(chip)}
                      className="rounded-full border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-800 px-3 py-1.5 text-[11px] font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 items-start"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-4 py-3 shadow-sm">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="block h-2 w-2 rounded-full bg-indigo-400"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-3 py-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about rentals..."
                className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
              />
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors cursor-pointer"
                aria-label="Voice input"
              >
                <Mic className="h-4 w-4" />
              </button>
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
