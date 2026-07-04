"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  X,
  Sparkles,
  Loader2,
  Volume2,
  Brain,
  CheckCircle2,
  RotateCcw,
  Send,
  Keyboard,
  Globe,
  Home,
  Building2,
  MapPin,
  IndianRupee,
  ShieldCheck,
  TrendingUp,
  Users,
  Laptop,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/* ══════════════════════════════════════════
   Types
   ══════════════════════════════════════════ */
interface VoiceAgentProps {
  onResult: (transcript: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

type Phase = "greeting" | "listening" | "thinking" | "responding" | "followup" | "done";

interface Message {
  id: number;
  role: "user" | "ai";
  text: string;
  chips?: { label: string; value: string; icon: string }[];
  propertyCards?: { name: string; price: string; match: number; slug: string; badge: string }[];
  timestamp: number;
}

interface AIResult {
  reply: string;
  followUp: string | null;
  searchQuery: string | null;
  chips?: { label: string; value: string; icon: string }[];
  propertyCards?: { name: string; price: string; match: number; slug: string; badge: string }[];
}

/* ══════════════════════════════════════════
   AI Response Engine
   ══════════════════════════════════════════ */
function parseIntent(text: string): AIResult {
  const l = text.toLowerCase();

  // ── 2BHK / apartment search ──
  if (l.match(/2\s?bhk|two\s?b/)) {
    const area = l.includes("vaishali") ? "Vaishali Nagar" : l.includes("malviya") ? "Malviya Nagar" : "Jaipur";
    const budget = (l.match(/under\s*₹?\s*(\d+)/i) || l.match(/(\d{4,6})/))?.[ 1];
    return {
      reply: `Found 3 verified 2BHK options in ${area}${budget ? ` under ₹${Number(budget).toLocaleString("en-IN")}` : ""}. Here's the top match:`,
      followUp: "Want me to narrow by budget, amenities, or verified-only?",
      searchQuery: `2BHK ${area}${budget ? ` under ${budget}` : ""}`,
      chips: [
        { label: "Type", value: "2BHK", icon: "home" },
        { label: "Area", value: area, icon: "map" },
        ...(budget ? [{ label: "Budget", value: `≤ ₹${Number(budget).toLocaleString("en-IN")}`, icon: "rupee" }] : []),
      ],
      propertyCards: [
        { name: "Modern 2BHK, Malviya Nagar", price: "₹22,000/mo", match: 89, slug: "modern-2bhk-malviya-nagar", badge: "Below Market" },
      ],
    };
  }

  // ── 3BHK ──
  if (l.match(/3\s?bhk|three\s?b/)) {
    return {
      reply: "Here's our top-rated 3BHK — a premium apartment in Vaishali Nagar with a terrace garden, 94% AI match, and a verified landlord.",
      followUp: "Would you like to see more 3BHK options or filter by furnishing?",
      searchQuery: "3BHK Jaipur",
      chips: [{ label: "Type", value: "3BHK", icon: "home" }],
      propertyCards: [
        { name: "Premium 3BHK, Vaishali Nagar", price: "₹32,000/mo", match: 94, slug: "premium-3bhk-vaishali-nagar", badge: "Verified" },
      ],
    };
  }

  // ── Co-living ──
  if (l.match(/co.?living|coliving|shared\s?(room|living)|hostel|pg/)) {
    return {
      reply: "Great choice! Jaipur has premium co-living from ₹8,500/month. AI-matched roommates, all-inclusive rent, community events, and flexible stays.",
      followUp: "Private room or shared? And near which area?",
      searchQuery: "co-living Jaipur",
      chips: [
        { label: "Category", value: "Co-Living", icon: "users" },
        { label: "From", value: "₹8,500/mo", icon: "rupee" },
      ],
      propertyCards: [
        { name: "The Hive — Private Room, Malviya Nagar", price: "₹15,000/mo", match: 92, slug: "hive-co-living-private-room-malviya-nagar", badge: "All-Inclusive" },
        { name: "NestPod — Shared Room, Jagatpura", price: "₹8,500/mo", match: 84, slug: "nestpod-shared-living-jagatpura", badge: "Budget-Friendly" },
      ],
    };
  }

  // ── Co-working ──
  if (l.match(/co.?working|coworking|office\s?space|workspace|desk|cabin/)) {
    return {
      reply: "I found co-working spaces from ₹6,000/month. Hot desks, dedicated desks, and private cabins — all with high-speed WiFi and meeting rooms.",
      followUp: "Need a personal desk or a team cabin?",
      searchQuery: "co-working Jaipur",
      chips: [
        { label: "Category", value: "Co-Working", icon: "laptop" },
        { label: "From", value: "₹6,000/mo", icon: "rupee" },
      ],
      propertyCards: [
        { name: "Catalyst — Hot Desk, C-Scheme", price: "₹6,000/mo", match: 90, slug: "catalyst-workspace-hot-desk-c-scheme", badge: "24/7 Access" },
        { name: "WorkBridge — 10-Seater Cabin, Tonk Road", price: "₹45,000/mo", match: 88, slug: "workbridge-private-cabin-tonk-road", badge: "For Teams" },
      ],
    };
  }

  // ── Family ──
  if (l.match(/family|families|kids|children|school/)) {
    return {
      reply: "For families, Vaishali Nagar is ideal — top schools, parks, 92% safety score. Also consider Malviya Nagar for hospitals and markets.",
      followUp: "How many bedrooms, and what's your monthly budget?",
      searchQuery: "family home Jaipur verified",
      chips: [
        { label: "Profile", value: "Family", icon: "users" },
        { label: "Safety", value: "92%+", icon: "shield" },
      ],
      propertyCards: [
        { name: "Premium 3BHK, Vaishali Nagar", price: "₹32,000/mo", match: 94, slug: "premium-3bhk-vaishali-nagar", badge: "Family-Friendly" },
      ],
    };
  }

  // ── Budget / affordable ──
  if (l.match(/budget|cheap|affordable|under|below|low/)) {
    const amt = (l.match(/under\s*₹?\s*(\d+)/i) || l.match(/below\s*₹?\s*(\d+)/i) || l.match(/(\d{4,6})/))?.[ 1];
    return {
      reply: `Budget-friendly options${amt ? ` under ₹${Number(amt).toLocaleString("en-IN")}` : ""}: studio apartments from ₹12,000 and co-living from ₹8,500 — fully furnished, verified, and move-in ready.`,
      followUp: "Studio apartment or co-living?",
      searchQuery: `affordable ${amt ? `under ${amt}` : ""}`,
      chips: [
        { label: "Budget", value: amt ? `≤ ₹${Number(amt).toLocaleString("en-IN")}` : "Affordable", icon: "rupee" },
      ],
    };
  }

  // ── Verification / Trust ──
  if (l.match(/verif|trust|safe|genuine|fraud/)) {
    return {
      reply: "Every listing goes through TrustShield™ — Aadhaar identity check, physical inspection, ownership validation. 98% of properties score 85+ Trust Score.",
      followUp: "Shall I show only verified properties with 90+ trust?",
      searchQuery: null,
      chips: [{ label: "Trust", value: "TrustShield™", icon: "shield" }],
    };
  }

  // ── Pricing ──
  if (l.match(/price|pricing|fair|rent.*market|expensive|overpriced/)) {
    return {
      reply: "RentIQ™ analyzes 50+ variables to determine fair rent. Tell me a property or area and I'll check if the pricing is fair.",
      followUp: "Which area or property would you like a pricing check for?",
      searchQuery: null,
      chips: [{ label: "Feature", value: "RentIQ™ Pricing", icon: "trend" }],
    };
  }

  // ── Yes / affirmative ──
  if (l.match(/^(yes|yeah|sure|okay|ok|yep|show|please|definitely)/)) {
    return {
      reply: "Perfect, I've prepared your search. Tap 'Search Properties' to see all AI-matched results with trust scores and fair pricing.",
      followUp: null,
      searchQuery: "verified properties Jaipur",
    };
  }

  // ── No / negative ──
  if (l.match(/^(no|nah|not|nope|nevermind)/)) {
    return {
      reply: "No problem. Tell me your ideal scenario — budget, area, bedrooms, lifestyle — and I'll find the perfect match.",
      followUp: null,
      searchQuery: null,
    };
  }

  // ── Default — intelligent fallback ──
  return {
    reply: `Searching for "${text}" across all categories — residential, co-living, co-working, commercial, and industrial. Let me find AI-matched options for you.`,
    followUp: "Can you share your preferred area and budget range?",
    searchQuery: text,
    chips: [{ label: "Query", value: text.slice(0, 30) + (text.length > 30 ? "..." : ""), icon: "search" }],
  };
}

const CHIP_ICONS: Record<string, typeof Home> = {
  home: Home, map: MapPin, rupee: IndianRupee, shield: ShieldCheck,
  trend: TrendingUp, users: Users, laptop: Laptop, search: Sparkles,
};

/* ══════════════════════════════════════════
   Stable audio bar heights (no Math.random in render)
   ══════════════════════════════════════════ */
const BAR_OFFSETS = [0.3, 0.7, 0.5, 0.9, 0.4, 0.8, 0.6, 1.0, 0.35, 0.75, 0.55, 0.85, 0.45, 0.65, 0.95];

/* ══════════════════════════════════════════
   Component
   ══════════════════════════════════════════ */
export default function VoiceAgent({ onResult, onClose, isOpen }: VoiceAgentProps) {
  const [phase, setPhase] = useState<Phase>("greeting");
  const [messages, setMessages] = useState<Message[]>([]);
  const [audioLevel, setAudioLevel] = useState(0);
  const [error, setError] = useState("");
  const [liveTranscript, setLiveTranscript] = useState("");
  const [liveInterim, setLiveInterim] = useState("");
  const [turn, setTurn] = useState(0);
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);
  const [lang, setLang] = useState<"en-IN" | "hi-IN">("en-IN");
  const [inputMode, setInputMode] = useState<"voice" | "text">("voice");
  const [textInput, setTextInput] = useState("");
  const [msgCounter, setMsgCounter] = useState(0);

  // Refs for stable closures
  const transcriptRef = useRef("");
  const interimRef = useRef("");
  const phaseRef = useRef<Phase>("greeting");
  const turnRef = useRef(0);
  const recRef = useRef<ReturnType<typeof createRec>>(null);
  const frameRef = useRef(0);
  const streamRef = useRef<MediaStream | null>(null);
  const silenceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(true);
  const langRef = useRef(lang);
  const processingRef = useRef(false);

  // Sync refs
  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => { turnRef.current = turn; }, [turn]);
  useEffect(() => { langRef.current = lang; }, [lang]);
  useEffect(() => { mountedRef.current = true; return () => { mountedRef.current = false; }; }, []);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, liveTranscript, liveInterim, phase]);

  const addMsg = useCallback((role: "user" | "ai", text: string, extra?: Partial<Message>) => {
    setMsgCounter((c) => {
      const id = c + 1;
      setMessages((prev) => [...prev, { id, role, text, timestamp: Date.now(), ...extra }]);
      return id;
    });
  }, []);

  /* ═══ Speech Recognition ═══ */
  function createRec() {
    const SR = (window as unknown as Record<string, unknown>).SpeechRecognition ||
               (window as unknown as Record<string, unknown>).webkitSpeechRecognition;
    if (!SR) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r = new (SR as any)();
    r.continuous = true;
    r.interimResults = true;
    r.lang = langRef.current;
    r.maxAlternatives = 1;
    return r;
  }

  /* ═══ Audio Viz ═══ */
  const startViz = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!mountedRef.current) { stream.getTracks().forEach((t) => t.stop()); return; }
      streamRef.current = stream;
      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.85;
      ctx.createMediaStreamSource(stream).connect(analyser);
      const buf = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        if (!mountedRef.current) return;
        analyser.getByteFrequencyData(buf);
        setAudioLevel(Math.min(buf.reduce((a, b) => a + b, 0) / buf.length / 80, 1));
        frameRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch { /* optional */ }
  }, []);

  const stopViz = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setAudioLevel(0);
  }, []);

  /* ═══ TTS — AI speaks with voice loaded check ═══ */
  const speak = useCallback((text: string): Promise<void> => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) { resolve(); return; }
      window.speechSynthesis.cancel();

      const doSpeak = () => {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = langRef.current;
        u.rate = 1.0;
        u.pitch = 1.0;
        const voices = window.speechSynthesis.getVoices();
        const pref = langRef.current === "hi-IN"
          ? voices.find((v) => v.lang.includes("hi"))
          : voices.find((v) => v.lang.startsWith("en") && v.name.toLowerCase().includes("female")) ||
            voices.find((v) => v.lang.startsWith("en-IN")) ||
            voices.find((v) => v.lang.startsWith("en"));
        if (pref) u.voice = pref;
        u.onend = () => { if (mountedRef.current) resolve(); };
        u.onerror = () => { if (mountedRef.current) resolve(); };
        window.speechSynthesis.speak(u);
      };

      // Voices may load async in Chrome
      if (window.speechSynthesis.getVoices().length > 0) {
        doSpeak();
      } else {
        window.speechSynthesis.onvoiceschanged = () => doSpeak();
        // Fallback timeout
        setTimeout(doSpeak, 300);
      }
    });
  }, []);

  /* ═══ Process user input (voice or text) ═══ */
  const processUserInput = useCallback(async (userText: string) => {
    if (!userText.trim() || !mountedRef.current) return;

    addMsg("user", userText.trim());
    setLiveTranscript("");
    setLiveInterim("");

    // Think
    setPhase("thinking");
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 400));
    if (!mountedRef.current) return;

    // AI response
    const result = parseIntent(userText.trim());
    if (result.searchQuery) setPendingQuery(result.searchQuery);

    setPhase("responding");
    addMsg("ai", result.reply, {
      chips: result.chips,
      propertyCards: result.propertyCards,
    });

    if (inputMode === "voice") await speak(result.reply);
    if (!mountedRef.current) return;

    if (result.followUp && turnRef.current < 3) {
      await new Promise((r) => setTimeout(r, 400));
      if (!mountedRef.current) return;
      addMsg("ai", result.followUp);
      if (inputMode === "voice") await speak(result.followUp);
      setTurn((t) => t + 1);
      if (!mountedRef.current) return;

      if (inputMode === "voice") {
        setPhase("followup");
        await new Promise((r) => setTimeout(r, 500));
        if (mountedRef.current) beginListening();
      } else {
        setPhase("followup");
      }
    } else {
      setPhase("done");
    }
    processingRef.current = false;
  }, [addMsg, speak, inputMode]);

  /* ═══ Start Listening ═══ */
  const beginListening = useCallback(() => {
    processingRef.current = false; // Reset guard for new listening round
    setError("");
    transcriptRef.current = "";
    interimRef.current = "";
    setLiveTranscript("");
    setLiveInterim("");

    const rec = createRec();
    if (!rec) {
      setError("Voice not supported in this browser. Try Chrome or use text input.");
      setInputMode("text");
      return;
    }

    rec.onstart = () => {
      if (mountedRef.current) { setPhase("listening"); startViz(); }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      let interim = "";
      let final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript;
        else interim += e.results[i][0].transcript;
      }
      if (final) {
        transcriptRef.current += (transcriptRef.current ? " " : "") + final;
        interimRef.current = "";
        if (mountedRef.current) { setLiveTranscript(transcriptRef.current); setLiveInterim(""); }
      } else {
        interimRef.current = interim;
        if (mountedRef.current) setLiveInterim(interim);
      }
      // Silence auto-stop
      if (silenceRef.current) clearTimeout(silenceRef.current);
      silenceRef.current = setTimeout(() => endListening(), final ? 1800 : 3000);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onerror = (e: any) => {
      if (!mountedRef.current) return;
      if (e.error === "no-speech") setError("No speech detected. Tap mic or type below.");
      else if (e.error === "not-allowed") setError("Microphone blocked. Allow access or switch to text.");
      else if (e.error !== "aborted") setError("Recognition error. Try again or type.");
      setPhase(turnRef.current > 0 ? "followup" : "greeting");
      stopViz();
    };

    rec.onend = () => {
      if (!mountedRef.current) return;
      if (phaseRef.current === "listening") {
        const t = (transcriptRef.current || interimRef.current).trim();
        if (t) endListening();
        else { stopViz(); setPhase(turnRef.current > 0 ? "followup" : "greeting"); }
      }
    };

    recRef.current = rec;
    try { rec.start(); } catch { setError("Could not start mic. Try text input."); setInputMode("text"); }
  }, [startViz, stopViz]);

  /* ═══ End Listening → Process ═══ */
  const endListening = useCallback(() => {
    // Guard: prevent double-fire from silence timer + onend race
    if (processingRef.current) return;
    processingRef.current = true;

    if (silenceRef.current) clearTimeout(silenceRef.current);
    silenceRef.current = null;
    if (recRef.current) { try { recRef.current.stop(); } catch {} recRef.current = null; }
    stopViz();
    const text = (transcriptRef.current || interimRef.current).trim();
    if (text) {
      processUserInput(text);
    } else {
      setPhase(turnRef.current > 0 ? "followup" : "greeting");
      processingRef.current = false;
    }
  }, [stopViz, processUserInput]);

  /* ═══ Text submit ═══ */
  const handleTextSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    if (!textInput.trim()) return;
    const t = textInput.trim();
    setTextInput("");
    processUserInput(t);
  }, [textInput, processUserInput]);

  /* ═══ Close ═══ */
  const handleClose = useCallback(() => {
    if (silenceRef.current) clearTimeout(silenceRef.current);
    if (recRef.current) { try { recRef.current.stop(); } catch {} recRef.current = null; }
    window.speechSynthesis?.cancel();
    stopViz();
    setPhase("greeting");
    setMessages([]);
    setLiveTranscript("");
    setLiveInterim("");
    setError("");
    setTurn(0);
    setPendingQuery(null);
    setTextInput("");
    setInputMode("voice");
    onClose();
  }, [onClose, stopViz]);

  /* ═══ Search ═══ */
  const doSearch = useCallback(() => {
    onResult(pendingQuery || transcriptRef.current || "");
    handleClose();
  }, [pendingQuery, onResult, handleClose]);

  /* ═══ Auto-greet on open ═══ */
  useEffect(() => {
    if (!isOpen) return;
    // Reset
    setPhase("greeting");
    setMessages([]);
    setTurn(0);
    setPendingQuery(null);
    setError("");
    setTextInput("");
    transcriptRef.current = "";
    interimRef.current = "";

    const timer = setTimeout(async () => {
      if (!mountedRef.current) return;
      const g = lang === "hi-IN"
        ? "नमस्ते! मैं आपका AI रेंटल असिस्टेंट हूँ। बताइए आपको कैसा घर, ऑफिस या रूम चाहिए।"
        : "Hi! I'm your AI rental assistant. Describe your ideal home, co-living room, workspace, or tell me your budget and area.";
      addMsg("ai", g);
      setPhase("responding");
      await speak(g);
      if (!mountedRef.current) return;
      setPhase("followup");
      if (inputMode === "voice") {
        await new Promise((r) => setTimeout(r, 400));
        if (mountedRef.current) beginListening();
      }
    }, 500);
    return () => clearTimeout(timer);
    // intentionally only depend on isOpen + lang for reset
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, lang]);

  /* ═══ Cleanup ═══ */
  useEffect(() => () => {
    if (recRef.current) try { recRef.current.stop(); } catch {}
    window.speechSynthesis?.cancel();
    stopViz();
    if (silenceRef.current) clearTimeout(silenceRef.current);
  }, [stopViz]);

  const displayLive = liveTranscript + (liveInterim ? (liveTranscript ? " " : "") + liveInterim : "");

  /* ══════════════════════════════════════════
     Render
     ══════════════════════════════════════════ */
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/60 dark:bg-black/70 backdrop-blur-xl" onClick={handleClose} />

          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
            className="relative w-full sm:max-w-[440px] mx-0 sm:mx-4 bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl shadow-indigo-500/20 dark:shadow-indigo-500/10 overflow-hidden max-h-[92vh] sm:max-h-[85vh] flex flex-col"
          >
            {/* Accent line */}
            <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500" />

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">AI Voice Assistant</h3>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">Powered by RentalBrain™</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {/* Language toggle */}
                <button onClick={() => setLang((l) => l === "en-IN" ? "hi-IN" : "en-IN")} className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" title="Switch language">
                  <Globe className="w-3 h-3" />
                  {lang === "en-IN" ? "EN" : "हि"}
                </button>
                {/* Input mode toggle */}
                <button onClick={() => setInputMode((m) => m === "voice" ? "text" : "voice")} className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" title={inputMode === "voice" ? "Switch to text" : "Switch to voice"}>
                  {inputMode === "voice" ? <Keyboard className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                </button>
                {/* Live indicator */}
                {(phase === "listening" || phase === "responding") && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" /></span>
                    {phase === "listening" ? "Listening" : "Speaking"}
                  </span>
                )}
                <button onClick={handleClose} className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <X className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                </button>
              </div>
            </div>

            {/* ── Chat Area ── */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 min-h-[180px]">
              {messages.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[88%] ${msg.role === "user"
                    ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white rounded-2xl rounded-br-md shadow-md shadow-indigo-500/15"
                    : "bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 rounded-2xl rounded-bl-md border border-slate-200/60 dark:border-slate-700/50"
                  } px-4 py-3`}>
                    {msg.role === "ai" && (
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                          <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">AI</span>
                        </div>
                        {/* Replay button */}
                        <button onClick={() => speak(msg.text)} className="p-1 rounded hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors" title="Replay">
                          <Play className="w-2.5 h-2.5 text-slate-400" />
                        </button>
                      </div>
                    )}
                    <p className="text-[13px] leading-relaxed">{msg.text}</p>

                    {/* Parsed intent chips */}
                    {msg.chips && msg.chips.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {msg.chips.map((c, j) => {
                          const Icon = CHIP_ICONS[c.icon] || Sparkles;
                          return (
                            <span key={j} className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/20 dark:bg-white/10 border border-white/10">
                              <Icon className="w-2.5 h-2.5" />
                              {c.label}: {c.value}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {/* Property cards */}
                    {msg.propertyCards && msg.propertyCards.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {msg.propertyCards.map((pc, j) => (
                          <Link key={j} href={`/property/${pc.slug}`} onClick={handleClose} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/90 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-700/50 hover:shadow-md transition-all group/pc">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/40 dark:to-violet-900/40 flex items-center justify-center shrink-0">
                              <Building2 className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[12px] font-semibold text-slate-900 dark:text-white truncate group-hover/pc:text-indigo-600 dark:group-hover/pc:text-indigo-400 transition-colors">{pc.name}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">{pc.price}</span>
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-semibold">{pc.badge}</span>
                              </div>
                            </div>
                            <div className="text-center shrink-0">
                              <div className="text-[13px] font-bold text-indigo-600 dark:text-indigo-400">{pc.match}%</div>
                              <div className="text-[8px] text-slate-400 uppercase">Match</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Live transcript */}
              {phase === "listening" && displayLive && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
                  <div className="max-w-[88%] rounded-2xl rounded-br-md px-4 py-3 bg-gradient-to-br from-indigo-500/70 to-violet-500/70 text-white text-[13px] leading-relaxed shadow-md">
                    {displayLive}
                    <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="text-indigo-200 ml-0.5">|</motion.span>
                  </div>
                </motion.div>
              )}

              {/* Thinking dots */}
              {phase === "thinking" && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                  <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl rounded-bl-md px-4 py-3 border border-slate-200/60 dark:border-slate-700/50">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[0, 0.15, 0.3].map((d) => (
                          <motion.div key={d} animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: d }} className="w-2 h-2 rounded-full bg-indigo-400" />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">Analyzing...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-2">
                  <p className="text-[13px] text-red-500 dark:text-red-400">{error}</p>
                  <button onClick={() => { setError(""); if (inputMode === "voice") beginListening(); }} className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-1 hover:underline">Try again</button>
                </motion.div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* ── Control Bar ── */}
            <div className="shrink-0 border-t border-slate-100 dark:border-slate-800 px-5 py-3 space-y-3">
              {/* Audio viz bars — stable, no random */}
              {phase === "listening" && (
                <div className="flex items-end justify-center gap-[3px] h-7">
                  {BAR_OFFSETS.map((offset, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: `${Math.max(10, audioLevel * 100 * offset)}%` }}
                      transition={{ duration: 0.1, ease: "easeOut" }}
                      className="w-[3px] bg-gradient-to-t from-indigo-500 to-violet-400 dark:from-indigo-400 dark:to-violet-300 rounded-full"
                      style={{ minHeight: "3px" }}
                    />
                  ))}
                </div>
              )}

              {/* Voice mode controls */}
              {inputMode === "voice" && (
                <div className="flex items-center justify-center gap-3">
                  {phase === "greeting" && (
                    <Button onClick={beginListening} className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/25 h-11 px-6 font-semibold btn-shine">
                      <Mic className="w-4 h-4" /> Start Speaking
                    </Button>
                  )}
                  {phase === "listening" && (
                    <div className="flex items-center gap-3">
                      <motion.button animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }} onClick={endListening} className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-500/40">
                        <Volume2 className="w-6 h-6 text-white" />
                      </motion.button>
                      <Button onClick={endListening} variant="outline" size="sm" className="gap-1.5 dark:border-slate-700 dark:text-slate-300"><MicOff className="w-3.5 h-3.5" /> Done</Button>
                    </div>
                  )}
                  {phase === "thinking" && <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><Loader2 className="w-4 h-4 animate-spin text-indigo-500" /> Analyzing...</div>}
                  {phase === "responding" && (
                    <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
                      <Volume2 className="w-4 h-4" /> Speaking...
                      <button onClick={() => window.speechSynthesis?.cancel()} className="text-xs text-slate-400 hover:text-slate-600 ml-2">Skip</button>
                    </div>
                  )}
                  {phase === "followup" && <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><Mic className="w-4 h-4 text-indigo-500 animate-pulse" /> Waiting for you...</div>}
                  {phase === "done" && (
                    <div className="flex gap-2 w-full">
                      <Button onClick={doSearch} className="flex-1 gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 h-11 font-semibold btn-shine"><Send className="w-4 h-4" /> Search Properties</Button>
                      <Button onClick={() => { setTurn(0); beginListening(); }} variant="outline" size="sm" className="h-11 gap-1.5 dark:border-slate-700 dark:text-slate-300"><RotateCcw className="w-3.5 h-3.5" /></Button>
                    </div>
                  )}
                </div>
              )}

              {/* Text mode input */}
              {inputMode === "text" && (
                <form onSubmit={handleTextSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder={lang === "hi-IN" ? "अपनी ज़रूरत बताइए..." : "Type your requirement..."}
                    className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-300 dark:focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 outline-none"
                    autoFocus
                  />
                  <Button type="submit" disabled={!textInput.trim()} className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 px-4 shrink-0">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              )}

              {/* Done state for text mode */}
              {inputMode === "text" && phase === "done" && (
                <Button onClick={doSearch} className="w-full gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 h-11 font-semibold btn-shine">
                  <Send className="w-4 h-4" /> Search Properties
                </Button>
              )}

              <p className="text-center text-[9px] text-slate-400 dark:text-slate-500">
                {lang === "en-IN" ? "English" : "हिन्दी"} · {inputMode === "voice" ? "Voice" : "Text"} · AI understands natural language
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
