"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  User,
  Calendar,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserPrefs } from "@/lib/store";

interface InquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle: string;
  propertyId: string;
  landlordName: string;
}

const moveInOptions = [
  "Immediately",
  "This month",
  "Next month",
  "2-3 months",
  "Flexible",
];

const inquiryTypes = [
  "Schedule Visit",
  "Request Callback",
  "Get Details",
  "Negotiate Rent",
];

export default function InquiryForm({
  isOpen,
  onClose,
  propertyTitle,
  propertyId,
  landlordName,
}: InquiryFormProps) {
  const { prefs } = useUserPrefs();

  const [name, setName] = useState(prefs.name || "");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [moveIn, setMoveIn] = useState("Flexible");
  const [message, setMessage] = useState(
    "Hi, I'm interested in this property. Please share more details."
  );
  const [inquiryType, setInquiryType] = useState("Get Details");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setIsSuccess(false);
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 shadow-2xl shadow-black/20"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
            >
              <X className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            </button>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                /* ─── Success State ─── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="p-8 sm:p-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                    className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/40 rounded-full flex items-center justify-center mx-auto mb-5"
                  >
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display mb-2">
                    Your inquiry has been sent!
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                    {landlordName} typically responds within{" "}
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">2 hours</span>. You will
                    receive a notification when they reply.
                  </p>
                  <Button
                    onClick={handleClose}
                    className="mt-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white border-0"
                  >
                    Done
                  </Button>
                </motion.div>
              ) : (
                /* ─── Form State ─── */
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Header */}
                  <div className="p-6 pb-0">
                    <div className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/20 rounded-xl p-4 mb-6 border border-indigo-100/60 dark:border-indigo-800/30">
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                        Interested in {propertyTitle}?
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Send an inquiry to {landlordName}
                      </p>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-4">
                    {/* Name */}
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        Your Name
                      </label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                        className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-indigo-400 dark:focus:border-indigo-600 rounded-xl"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        Phone Number
                      </label>
                      <div className="flex gap-2">
                        <div className="flex items-center px-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 shrink-0">
                          +91
                        </div>
                        <Input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="98765 43210"
                          type="tel"
                          required
                          className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-indigo-400 dark:focus:border-indigo-600 rounded-xl"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        Email
                      </label>
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@email.com"
                        type="email"
                        required
                        className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-indigo-400 dark:focus:border-indigo-600 rounded-xl"
                      />
                    </div>

                    {/* Move-in Date */}
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        Preferred Move-in
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {moveInOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setMoveIn(option)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 ${
                              moveIn === option
                                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20"
                                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                        Message
                      </label>
                      <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={3}
                        className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-indigo-400 dark:focus:border-indigo-600 rounded-xl resize-none"
                      />
                    </div>

                    {/* Inquiry Type Pills */}
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
                        Inquiry Type
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {inquiryTypes.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setInquiryType(type)}
                            className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all duration-200 ${
                              inquiryType === type
                                ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-transparent shadow-lg shadow-indigo-500/20"
                                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white border-0 shadow-lg shadow-indigo-500/20 h-12 text-sm font-semibold rounded-xl"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Send Inquiry
                        </span>
                      )}
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
