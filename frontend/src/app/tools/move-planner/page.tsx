"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  Package,
  Truck,
  Home,
  Utensils,
  Wifi,
  Camera,
  ShoppingCart,
  Users,
  Sparkles,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

interface Task {
  id: string;
  time?: string;
  title: string;
  category: string;
  duration: string;
  tip: string;
  color: string;
}

const beforeMoveTasks: Task[] = [
  {
    id: "b1",
    title: "Pack room by room, label every box",
    category: "Packing",
    duration: "2-3 days",
    tip: "Use color-coded labels: red for kitchen, blue for bedroom, green for bathroom. Number each box and keep a master list on your phone. Pack heavy items in small boxes, light items in big boxes.",
    color: "bg-amber-500",
  },
  {
    id: "b2",
    title: "Arrange movers/transport",
    category: "Logistics",
    duration: "1-2 hours",
    tip: "Local move (same city): ₹2,000-4,000. Intercity: ₹5,000-8,000+. Get quotes from 3 movers. Check Google reviews. Confirm a day before. Take photos of valuables before packing.",
    color: "bg-blue-500",
  },
  {
    id: "b3",
    title: "Disconnect previous utilities",
    category: "Admin",
    duration: "1-2 hours",
    tip: "Visit your electricity board office or use their app. Note final meter reading. Get clearance certificate. Same for gas connection if piped. Cancel or transfer broadband.",
    color: "bg-violet-500",
  },
  {
    id: "b4",
    title: "Inform previous landlord and collect deposit",
    category: "Finance",
    duration: "30 mins",
    tip: "Give written notice (WhatsApp is fine). Take photos of the property's condition. Settle any pending bills. Get deposit refund timeline in writing. Keep all receipts.",
    color: "bg-emerald-500",
  },
  {
    id: "b5",
    title: "Arrange cleaning of new property",
    category: "Prep",
    duration: "3-4 hours",
    tip: "Book professional deep cleaning (₹1,500-3,000 for 2BHK). Or DIY: focus on kitchen, bathrooms, and wardrobes first. Check for pest issues. Run all taps and flush toilets.",
    color: "bg-pink-500",
  },
];

const moveDayTasks: Task[] = [
  {
    id: "m1",
    time: "7:00 AM",
    title: "Final check of old property, take photos",
    category: "Documentation",
    duration: "30 mins",
    tip: "Photograph every room, especially walls, floors, and fixtures. Check all cabinets are empty. Collect keys. Note electricity and water meter readings. This protects your deposit.",
    color: "bg-rose-500",
  },
  {
    id: "m2",
    time: "8:00 AM",
    title: "Movers arrive — supervise loading",
    category: "Moving",
    duration: "1.5 hours",
    tip: "Be present for loading. Fragile items go last (come out first). Keep a bag with essentials (documents, chargers, medications, snacks, water) with you — not in the truck.",
    color: "bg-orange-500",
  },
  {
    id: "m3",
    time: "10:00 AM",
    title: "Transit to new property",
    category: "Moving",
    duration: "1-2 hours",
    tip: "Reach before the truck if possible. Keep new landlord's number handy. Have cash ready for any tolls. Track the moving vehicle if the company offers GPS.",
    color: "bg-amber-500",
  },
  {
    id: "m4",
    time: "11:00 AM",
    title: "Unloading and placement, check condition",
    category: "Moving",
    duration: "1.5 hours",
    tip: "Direct movers to place boxes in correct rooms (your color labels help here). Check furniture for damage immediately. Note any issues before signing delivery receipt.",
    color: "bg-yellow-500",
  },
  {
    id: "m5",
    time: "12:00 PM",
    title: "Lunch break + explore nearby food options",
    category: "Break",
    duration: "1 hour",
    tip: "You won't have a kitchen set up yet. Use Swiggy/Zomato to discover nearby restaurants. Save 3-4 favourites. Check for nearby grocery stores and medical shops on Google Maps.",
    color: "bg-green-500",
  },
  {
    id: "m6",
    time: "2:00 PM",
    title: "Unpack essentials — bedding, kitchen, bathroom",
    category: "Unpacking",
    duration: "2 hours",
    tip: "Priority order: (1) Bedding so you can sleep tonight, (2) Bathroom essentials — towels, soap, toilet paper, (3) Kitchen basics — kettle, cups, plates, water filter. Everything else can wait.",
    color: "bg-teal-500",
  },
  {
    id: "m7",
    time: "4:00 PM",
    title: "Electricity/water meter reading with landlord",
    category: "Admin",
    duration: "30 mins",
    tip: "Take photos of meter readings with landlord present. Note both in writing. This is your baseline — you only pay for consumption after this. Check all switches and taps work.",
    color: "bg-blue-500",
  },
  {
    id: "m8",
    time: "5:00 PM",
    title: "Internet/WiFi setup appointment",
    category: "Setup",
    duration: "1 hour",
    tip: "Book installation 2-3 days before move. Popular ISPs: Airtel Xstream, JioFiber, ACT Fibernet, BSNL. Compare plans on broadbandcompare.in. Minimum 100 Mbps recommended for WFH.",
    color: "bg-indigo-500",
  },
  {
    id: "m9",
    time: "7:00 PM",
    title: "First dinner in new home!",
    category: "Celebration",
    duration: "1 hour",
    tip: "You made it! Order something special or cook a simple meal. Take a moment to appreciate the new space. Set up a small pooja/housewarming if that's your tradition.",
    color: "bg-purple-500",
  },
];

const dayAfterTasks: Task[] = [
  {
    id: "a1",
    title: "Full unpacking and organizing",
    category: "Setup",
    duration: "4-6 hours",
    tip: "Start with the room you use most. Install hooks, hangers. Set up your workspace if WFH. Don't rush — take a few days to figure out the best arrangement.",
    color: "bg-cyan-500",
  },
  {
    id: "a2",
    title: "Grocery shopping at nearest store",
    category: "Essentials",
    duration: "1 hour",
    tip: "First trip essentials: cooking oil, salt, sugar, tea/coffee, rice/atta, dal, milk, eggs, bread, water bottles, cleaning supplies, dustbin bags. Download BigBasket/Blinkit for future orders.",
    color: "bg-lime-500",
  },
  {
    id: "a3",
    title: "Meet neighbors / society registration",
    category: "Community",
    duration: "1 hour",
    tip: "Introduce yourself to immediate neighbors. Visit society office for registration. Get society rules, maintenance payment details, parking allotment, and emergency contacts.",
    color: "bg-fuchsia-500",
  },
  {
    id: "a4",
    title: "Set up daily routine — routes, transport, gym",
    category: "Routine",
    duration: "30 mins",
    tip: "Map your office commute on Google Maps at rush hour. Find nearest metro/bus stop. Locate medical store, ATM, and hospital. Update address on Amazon, Flipkart, and bank accounts.",
    color: "bg-sky-500",
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  Packing: <Package className="w-4 h-4" />,
  Logistics: <Truck className="w-4 h-4" />,
  Admin: <CalendarCheck className="w-4 h-4" />,
  Finance: <Sparkles className="w-4 h-4" />,
  Prep: <Home className="w-4 h-4" />,
  Documentation: <Camera className="w-4 h-4" />,
  Moving: <Truck className="w-4 h-4" />,
  Break: <Utensils className="w-4 h-4" />,
  Unpacking: <Package className="w-4 h-4" />,
  Setup: <Wifi className="w-4 h-4" />,
  Celebration: <Sparkles className="w-4 h-4" />,
  Essentials: <ShoppingCart className="w-4 h-4" />,
  Community: <Users className="w-4 h-4" />,
  Routine: <Clock className="w-4 h-4" />,
};

function TaskCard({ task, checked, onToggle }: { task: Task; checked: boolean; onToggle: () => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative rounded-2xl border transition-all duration-300 ${
        checked
          ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50"
          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
      }`}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Checkbox */}
          <button onClick={onToggle} className="mt-0.5 shrink-0">
            <motion.div whileTap={{ scale: 0.85 }}>
              {checked ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              ) : (
                <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600 hover:text-indigo-400 transition-colors" />
              )}
            </motion.div>
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              {task.time && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300">
                  <Clock className="w-3 h-3" />
                  {task.time}
                </span>
              )}
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-white ${task.color}`}>
                {categoryIcons[task.category]}
                {task.category}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">~{task.duration}</span>
            </div>

            <h3 className={`text-sm sm:text-base font-semibold transition-all ${checked ? "line-through text-slate-400 dark:text-slate-500" : "text-slate-800 dark:text-white"}`}>
              {task.title}
            </h3>

            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
            >
              {expanded ? "Hide" : "Show"} tips
              {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                    {task.tip}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function MovePlannerPage() {
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});
  const [moveDate, setMoveDate] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("movePlannerTasks");
    if (saved) setCheckedTasks(JSON.parse(saved));
    const savedDate = localStorage.getItem("movePlannerDate");
    if (savedDate) setMoveDate(savedDate);
  }, []);

  const toggleTask = (id: string) => {
    const updated = { ...checkedTasks, [id]: !checkedTasks[id] };
    setCheckedTasks(updated);
    localStorage.setItem("movePlannerTasks", JSON.stringify(updated));
  };

  const handleDateChange = (val: string) => {
    setMoveDate(val);
    localStorage.setItem("movePlannerDate", val);
  };

  const resetAll = () => {
    setCheckedTasks({});
    localStorage.removeItem("movePlannerTasks");
  };

  const allTasks = [...beforeMoveTasks, ...moveDayTasks, ...dayAfterTasks];
  const completedCount = allTasks.filter((t) => checkedTasks[t.id]).length;
  const totalTasks = allTasks.length;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  const getDateLabel = (offsetDays: number) => {
    if (!moveDate) return "";
    const d = new Date(moveDate);
    d.setDate(d.getDate() + offsetDays);
    return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            All Tools
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
                <CalendarCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Move-in Day Planner
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Hour-by-hour moving plan with smart tips
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Move Date Picker + Progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                My Move Date
              </label>
              <input
                type="date"
                value={moveDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={resetAll}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All
            </button>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {completedCount} of {totalTasks} tasks done
              </span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{progressPercent}%</span>
            </div>
            <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Before Move Day */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center">
              <Package className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Before Move Day</h2>
              {moveDate && (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  1 week prior — {getDateLabel(-7)}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-3">
            {beforeMoveTasks.map((task) => (
              <TaskCard key={task.id} task={task} checked={!!checkedTasks[task.id]} onToggle={() => toggleTask(task.id)} />
            ))}
          </div>
        </section>

        {/* Move Day Timeline */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center">
              <Truck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Move Day</h2>
              {moveDate && (
                <p className="text-xs text-slate-500 dark:text-slate-400">{getDateLabel(0)}</p>
              )}
            </div>
          </div>

          {/* Visual Timeline */}
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-300 via-violet-300 to-purple-300 dark:from-indigo-700 dark:via-violet-700 dark:to-purple-700" />
            <div className="space-y-3">
              {moveDayTasks.map((task) => (
                <div key={task.id} className="relative pl-10">
                  <div className={`absolute left-[14px] top-5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${checkedTasks[task.id] ? "bg-emerald-500" : "bg-indigo-400"}`} />
                  <TaskCard task={task} checked={!!checkedTasks[task.id]} onToggle={() => toggleTask(task.id)} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Day After */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center">
              <Home className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Day After</h2>
              {moveDate && (
                <p className="text-xs text-slate-500 dark:text-slate-400">{getDateLabel(1)}</p>
              )}
            </div>
          </div>
          <div className="space-y-3">
            {dayAfterTasks.map((task) => (
              <TaskCard key={task.id} task={task} checked={!!checkedTasks[task.id]} onToggle={() => toggleTask(task.id)} />
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-8 border-t border-slate-200 dark:border-slate-800"
        >
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
            Your progress is saved automatically in your browser.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            Explore more rental tools
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
