"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench,
  ArrowLeft,
  Copy,
  CheckCircle2,
  MessageSquare,
  Mail,
  Droplets,
  Zap,
  Snowflake,
  BrickWall,
  Bug,
  DoorOpen,
  Wifi,
  HelpCircle,
  AlertTriangle,
  AlertCircle,
  Clock,
  ArrowDown,
  Send,
} from "lucide-react";
import Link from "next/link";

interface IssueType {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  subIssues: string[];
}

const issueTypes: IssueType[] = [
  {
    id: "plumbing",
    label: "Plumbing",
    icon: <Droplets className="w-5 h-5" />,
    color: "from-blue-500 to-cyan-500",
    subIssues: ["Water leak", "Drain blockage", "Low water pressure", "Tap dripping", "Toilet flush issue", "Geyser not heating"],
  },
  {
    id: "electrical",
    label: "Electrical",
    icon: <Zap className="w-5 h-5" />,
    color: "from-yellow-500 to-amber-500",
    subIssues: ["Power failure", "Socket not working", "Wiring issue", "MCB tripping", "Fan/light not working", "Switchboard damage"],
  },
  {
    id: "appliances",
    label: "Appliances",
    icon: <Snowflake className="w-5 h-5" />,
    color: "from-indigo-500 to-blue-500",
    subIssues: ["AC not cooling", "AC leaking water", "Geyser issue", "Washing machine", "Refrigerator", "Chimney/exhaust"],
  },
  {
    id: "structural",
    label: "Structural",
    icon: <BrickWall className="w-5 h-5" />,
    color: "from-orange-500 to-red-500",
    subIssues: ["Wall crack", "Water seepage", "Dampness/mold", "Paint peeling", "Ceiling damage", "Floor tile broken"],
  },
  {
    id: "pest",
    label: "Pest Control",
    icon: <Bug className="w-5 h-5" />,
    color: "from-green-500 to-emerald-500",
    subIssues: ["Cockroaches", "Termites", "Mosquitoes", "Ants", "Rats/mice", "Bed bugs"],
  },
  {
    id: "door-window",
    label: "Door/Window",
    icon: <DoorOpen className="w-5 h-5" />,
    color: "from-violet-500 to-purple-500",
    subIssues: ["Lock issue", "Broken glass", "Hinge problem", "Door not closing", "Window stuck", "Mosquito mesh torn"],
  },
  {
    id: "internet",
    label: "Internet/Cable",
    icon: <Wifi className="w-5 h-5" />,
    color: "from-teal-500 to-cyan-500",
    subIssues: ["No internet", "Slow speed", "Router issue", "Cable TV issue", "DTH dish alignment"],
  },
  {
    id: "other",
    label: "Other",
    icon: <HelpCircle className="w-5 h-5" />,
    color: "from-slate-500 to-gray-500",
    subIssues: ["Intercom issue", "Parking issue", "Lift/elevator", "Water tank", "Generator", "Other"],
  },
];

const locations = ["Kitchen", "Bathroom", "Bedroom", "Living Room", "Balcony", "Common Area", "Entire Flat", "Other"];

const urgencyLevels = [
  { id: "emergency", label: "Emergency", desc: "Safety hazard / no water / no power", color: "bg-red-500", icon: <AlertTriangle className="w-4 h-4" /> },
  { id: "high", label: "High", desc: "Major inconvenience, needs quick fix", color: "bg-orange-500", icon: <AlertCircle className="w-4 h-4" /> },
  { id: "medium", label: "Medium", desc: "Bothersome but manageable", color: "bg-yellow-500", icon: <Clock className="w-4 h-4" /> },
  { id: "low", label: "Low", desc: "Minor issue, no rush", color: "bg-green-500", icon: <ArrowDown className="w-4 h-4" /> },
];

const visitTimes = ["Morning (9AM-12PM)", "Afternoon (12PM-4PM)", "Evening (4PM-7PM)", "Anytime"];

export default function MaintenancePage() {
  const [selectedIssue, setSelectedIssue] = useState<string>("");
  const [subIssue, setSubIssue] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState("");
  const [description, setDescription] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [tenantPhone, setTenantPhone] = useState("");
  const [landlordName, setLandlordName] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentIssue = issueTypes.find((i) => i.id === selectedIssue);

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const issueLabel = currentIssue ? `${currentIssue.label}${subIssue ? ` - ${subIssue}` : ""}` : "";

  const message = `Dear ${landlordName || "[Landlord]"},

I am writing to report a maintenance issue at ${propertyAddress || "[Property Address]"}.

Issue: ${issueLabel || "[Issue Type]"}${description ? `\nDetails: ${description}` : ""}
Location: ${location || "[Room/Area]"}
Urgency: ${urgencyLevels.find((u) => u.id === urgency)?.label || "[Level]"}
Preferred Visit Time: ${visitTime || "[Time]"}

I would appreciate if this could be looked into at the earliest. Please let me know if you need any additional details or access to the property.

Thank you,
${tenantName || "[Your Name]"}
${tenantPhone || "[Phone Number]"}
${today}`;

  const isValid = selectedIssue && location && urgency && tenantName;

  const handleGenerate = () => {
    if (!isValid) return;
    setGenerated(true);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Maintenance Request - ${issueLabel} - ${today}`);
    const body = encodeURIComponent(message);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
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
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/25">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Maintenance Request
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Generate a professional maintenance request in seconds
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Issue Selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">
            What&apos;s the issue?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {issueTypes.map((issue) => (
              <motion.button
                key={issue.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setSelectedIssue(issue.id);
                  setSubIssue("");
                  setGenerated(false);
                }}
                className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                  selectedIssue === issue.id
                    ? "border-indigo-500 dark:border-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${issue.color} flex items-center justify-center mb-2 text-white`}>
                  {issue.icon}
                </div>
                <span className={`text-sm font-semibold ${selectedIssue === issue.id ? "text-indigo-700 dark:text-indigo-300" : "text-slate-700 dark:text-slate-300"}`}>
                  {issue.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Sub-issues */}
        <AnimatePresence>
          {currentIssue && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
                Specific issue
              </h2>
              <div className="flex flex-wrap gap-2">
                {currentIssue.subIssues.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => {
                      setSubIssue(sub);
                      setGenerated(false);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                      subIssue === sub
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                        : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Details Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Location in Property *
              </label>
              <div className="flex flex-wrap gap-1.5">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setLocation(loc)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      location === loc
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-750"
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Urgency *
              </label>
              <div className="space-y-1.5">
                {urgencyLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setUrgency(level.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all ${
                      urgency === level.id
                        ? "bg-indigo-50 dark:bg-indigo-950/30 border-2 border-indigo-500"
                        : "bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full ${level.color} flex items-center justify-center text-white`}>
                      {level.icon}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">{level.label}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 ml-1.5">{level.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Description <span className="text-slate-400 font-normal">(optional but helpful)</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setGenerated(false);
                }}
                placeholder="e.g., The kitchen sink has been leaking slowly for 2 days. Water is collecting under the cabinet."
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Preferred Visit Time
              </label>
              <div className="flex flex-wrap gap-1.5">
                {visitTimes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setVisitTime(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      visitTime === t
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-750"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Your Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">Your Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Your Name *</label>
              <input
                type="text"
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Your Phone</label>
              <input
                type="tel"
                value={tenantPhone}
                onChange={(e) => setTenantPhone(e.target.value)}
                placeholder="9876543210"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Landlord&apos;s Name</label>
              <input
                type="text"
                value={landlordName}
                onChange={(e) => setLandlordName(e.target.value)}
                placeholder="Landlord's name"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Property Address</label>
              <input
                type="text"
                value={propertyAddress}
                onChange={(e) => setPropertyAddress(e.target.value)}
                placeholder="Your rental address"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </motion.div>

        {/* Generate Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-8"
        >
          <button
            onClick={handleGenerate}
            disabled={!isValid}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-teal-500/25"
          >
            <Send className="w-5 h-5" />
            Generate Maintenance Request
          </button>
        </motion.div>

        {/* Generated Message */}
        <AnimatePresence>
          {generated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              {/* Message Preview */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-4">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Generated Message</h3>
                </div>
                <pre className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 sm:p-5">
                  {message}
                </pre>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy Message"}
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-green-600 text-white hover:bg-green-700 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  Send via WhatsApp
                </button>
                <button
                  onClick={handleEmail}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-indigo-600 text-white hover:bg-indigo-700 transition-all"
                >
                  <Mail className="w-4 h-4" />
                  Send via Email
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
