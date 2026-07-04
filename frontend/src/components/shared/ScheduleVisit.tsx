"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CalendarCheck,
  Clock,
  User,
  Phone,
  MessageSquare,
  CheckCircle2,
  Loader2,
  Sun,
  Sunrise,
  Sunset,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserPrefs } from "@/lib/store";

interface ScheduleVisitProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle: string;
}

/* ─── Time Slot Categories ─── */
const timeCategories = [
  {
    label: "Morning",
    icon: Sunrise,
    slots: ["9:00 AM", "10:00 AM", "11:00 AM"],
  },
  {
    label: "Afternoon",
    icon: Sun,
    slots: ["12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM"],
  },
  {
    label: "Evening",
    icon: Sunset,
    slots: ["4:00 PM", "5:00 PM", "6:00 PM"],
  },
];

/* ─── Generate next 14 days ─── */
function generateDates(): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }
  return dates;
}

/* ─── Mock unavailable slots (seeded by date) ─── */
function getUnavailableSlots(date: Date): Set<string> {
  const seed = date.getDate() + date.getMonth() * 31;
  const unavailable = new Set<string>();
  const allSlots = timeCategories.flatMap((c) => c.slots);
  // Make 2-3 slots unavailable based on date
  for (let i = 0; i < allSlots.length; i++) {
    if ((seed * (i + 3) * 7) % 5 === 0) {
      unavailable.add(allSlots[i]);
    }
  }
  return unavailable;
}

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function ScheduleVisit({ isOpen, onClose, propertyTitle }: ScheduleVisitProps) {
  const { prefs } = useUserPrefs();

  const dates = useMemo(() => generateDates(), []);
  const [selectedDate, setSelectedDate] = useState<Date>(dates[0]);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [name, setName] = useState(prefs.name || "");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const unavailableSlots = useMemo(() => getUnavailableSlots(selectedDate), [selectedDate]);

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTime) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSuccess(false);
      setIsSubmitting(false);
      setSelectedTime("");
    }, 300);
  };

  const formattedDate = `${dayNames[selectedDate.getDay()]}, ${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]}`;

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
                    <CalendarCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display mb-2">
                    Visit Scheduled!
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                    Visit scheduled for{" "}
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {formattedDate}
                    </span>{" "}
                    at{" "}
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {selectedTime}
                    </span>
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                    You will receive a confirmation on WhatsApp
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
                  <div className="p-6 pb-4">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
                      <CalendarCheck className="w-5 h-5 text-indigo-500" />
                      Schedule a Visit
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Choose a date and time to visit{" "}
                      <span className="font-medium text-slate-700 dark:text-slate-300">{propertyTitle}</span>
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-5">
                    {/* ─── Date Picker ─── */}
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2.5 block">
                        Select Date
                      </label>
                      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
                        {dates.map((date) => {
                          const selected = date.toDateString() === selectedDate.toDateString();
                          const weekend = isWeekend(date);
                          const today = isToday(date);

                          return (
                            <button
                              key={date.toISOString()}
                              type="button"
                              onClick={() => {
                                setSelectedDate(date);
                                setSelectedTime("");
                              }}
                              className={`shrink-0 flex flex-col items-center px-3 py-2.5 rounded-xl border transition-all duration-200 min-w-[60px] ${
                                selected
                                  ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/25"
                                  : weekend
                                    ? "bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-slate-200/60 dark:border-slate-700/50 hover:border-indigo-300 dark:hover:border-indigo-700"
                                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                              }`}
                            >
                              <span className={`text-[10px] font-medium uppercase tracking-wide ${selected ? "text-indigo-200" : "text-slate-400 dark:text-slate-500"}`}>
                                {dayNames[date.getDay()]}
                              </span>
                              <span className={`text-lg font-bold leading-tight ${selected ? "text-white" : ""}`}>
                                {date.getDate()}
                              </span>
                              <span className={`text-[10px] font-medium ${selected ? "text-indigo-200" : "text-slate-400 dark:text-slate-500"}`}>
                                {monthNames[date.getMonth()]}
                              </span>
                              {today && (
                                <span className={`text-[8px] font-bold uppercase mt-0.5 ${selected ? "text-indigo-200" : "text-indigo-500 dark:text-indigo-400"}`}>
                                  Today
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* ─── Time Slots ─── */}
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2.5 block">
                        Select Time
                      </label>
                      <div className="space-y-3">
                        {timeCategories.map((category) => {
                          const CategoryIcon = category.icon;
                          return (
                            <div key={category.label}>
                              <div className="flex items-center gap-1.5 mb-2">
                                <CategoryIcon className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                  {category.label}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {category.slots.map((slot) => {
                                  const isUnavailable = unavailableSlots.has(slot);
                                  const isSelected = selectedTime === slot;

                                  return (
                                    <button
                                      key={slot}
                                      type="button"
                                      disabled={isUnavailable}
                                      onClick={() => setSelectedTime(slot)}
                                      className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all duration-200 ${
                                        isUnavailable
                                          ? "bg-slate-50 dark:bg-slate-800/30 text-slate-300 dark:text-slate-600 border-slate-100 dark:border-slate-800 cursor-not-allowed line-through"
                                          : isSelected
                                            ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm"
                                      }`}
                                    >
                                      {slot}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* ─── Contact Info ─── */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                          <User className="w-3 h-3 text-slate-400" />
                          Name
                        </label>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          required
                          className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-indigo-400 dark:focus:border-indigo-600 rounded-xl text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          Phone
                        </label>
                        <Input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          type="tel"
                          required
                          className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-indigo-400 dark:focus:border-indigo-600 rounded-xl text-sm"
                        />
                      </div>
                    </div>

                    {/* ─── Notes ─── */}
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                        Notes{" "}
                        <span className="text-slate-400 dark:text-slate-500 font-normal">(optional)</span>
                      </label>
                      <Textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any special requests?"
                        rows={2}
                        className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-indigo-400 dark:focus:border-indigo-600 rounded-xl resize-none text-sm"
                      />
                    </div>

                    {/* ─── Submit ─── */}
                    <Button
                      type="submit"
                      disabled={isSubmitting || !selectedTime}
                      className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white border-0 shadow-lg shadow-indigo-500/20 h-12 text-sm font-semibold rounded-xl disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Confirming...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <CalendarCheck className="w-4 h-4" />
                          Confirm Visit
                          {selectedTime && (
                            <span className="text-indigo-200 text-xs font-normal ml-1">
                              {formattedDate}, {selectedTime}
                            </span>
                          )}
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
