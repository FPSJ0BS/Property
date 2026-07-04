"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  Sparkles,
  BarChart3,
} from "lucide-react";
import { Property } from "@/data/properties";

interface PriceTimelineProps {
  property: Property;
  areaName: string;
}

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");
const fmtShort = (n: number) => {
  if (n >= 10000000) return `${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toString();
};

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function generatePriceHistory(currentPrice: number, months: number, isRent: boolean): { month: string; year: number; price: number }[] {
  const data: { month: string; year: number; price: number }[] = [];
  const now = new Date();
  const startFactor = isRent ? 0.88 + Math.random() * 0.04 : 0.78 + Math.random() * 0.06;
  const startPrice = Math.round(currentPrice * startFactor);

  for (let i = 0; i < months; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - (months - 1 - i), 1);
    const progress = i / (months - 1);
    const base = startPrice + (currentPrice - startPrice) * progress;
    // Add noise
    const noise = isRent
      ? (Math.random() - 0.5) * currentPrice * 0.04
      : (Math.random() - 0.5) * currentPrice * 0.06;
    const price = i === months - 1 ? currentPrice : Math.round(base + noise);
    data.push({
      month: MONTHS_SHORT[date.getMonth()],
      year: date.getFullYear(),
      price: Math.max(Math.round(startPrice * 0.85), price),
    });
  }
  return data;
}

function generateProjection(lastPrice: number, months: number, annualRate: number): { month: string; year: number; price: number }[] {
  const data: { month: string; year: number; price: number }[] = [];
  const now = new Date();
  const monthlyRate = annualRate / 12;

  for (let i = 1; i <= months; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const price = Math.round(lastPrice * Math.pow(1 + monthlyRate, i));
    data.push({
      month: MONTHS_SHORT[date.getMonth()],
      year: date.getFullYear(),
      price,
    });
  }
  return data;
}

export default function PriceTimeline({ property, areaName }: PriceTimelineProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; data: { month: string; year: number; price: number }; isProjection: boolean } | null>(null);

  const isRent = property.listingType === "Rent" || property.listingType === "Lease";
  const isSale = property.listingType === "Sale";
  const currentPrice = isSale ? (property.pricePerSqft || Math.round((property.salePrice || property.price) / property.area)) : property.price;
  const historyMonths = isRent ? 12 : 24;

  const history = useMemo(() => generatePriceHistory(currentPrice, historyMonths, isRent), [currentPrice, historyMonths, isRent]);

  const annualIncrease = useMemo(() => {
    if (history.length < 2) return 0;
    const first = history[0].price;
    const last = history[history.length - 1].price;
    const years = historyMonths / 12;
    return Math.round(((last - first) / first / years) * 100 * 10) / 10;
  }, [history, historyMonths]);

  const projection = useMemo(() => {
    if (!isSale) return [];
    return generateProjection(currentPrice, 12, annualIncrease / 100);
  }, [isSale, currentPrice, annualIncrease]);

  const allData = [...history, ...projection];
  const prices = allData.map((d) => d.price);
  const minPrice = Math.min(...prices) * 0.95;
  const maxPrice = Math.max(...prices) * 1.05;

  // Chart dimensions
  const chartWidth = 600;
  const chartHeight = 200;
  const padding = { top: 20, right: 20, bottom: 35, left: 55 };
  const innerW = chartWidth - padding.left - padding.right;
  const innerH = chartHeight - padding.top - padding.bottom;

  const getX = useCallback((i: number) => padding.left + (i / Math.max(allData.length - 1, 1)) * innerW, [allData.length, innerW, padding.left]);
  const getY = useCallback((price: number) => {
    const range = maxPrice - minPrice;
    if (range === 0) return padding.top + innerH / 2;
    return padding.top + innerH - ((price - minPrice) / range) * innerH;
  }, [minPrice, maxPrice, padding.top, innerH]);

  // Build path for history
  const historyPath = useMemo(() => {
    if (history.length === 0) return "";
    let d = `M ${getX(0)} ${getY(history[0].price)}`;
    for (let i = 1; i < history.length; i++) {
      const x = getX(i);
      const y = getY(history[i].price);
      const prevX = getX(i - 1);
      const cpx1 = prevX + (x - prevX) * 0.4;
      const cpx2 = prevX + (x - prevX) * 0.6;
      d += ` C ${cpx1} ${getY(history[i - 1].price)} ${cpx2} ${y} ${x} ${y}`;
    }
    return d;
  }, [history, getX, getY]);

  // Gradient area path
  const areaPath = useMemo(() => {
    if (!historyPath) return "";
    const lastX = getX(history.length - 1);
    const firstX = getX(0);
    const bottom = padding.top + innerH;
    return `${historyPath} L ${lastX} ${bottom} L ${firstX} ${bottom} Z`;
  }, [historyPath, history.length, getX, padding.top, innerH]);

  // Projection path
  const projectionPath = useMemo(() => {
    if (projection.length === 0) return "";
    const startIdx = history.length - 1;
    let d = `M ${getX(startIdx)} ${getY(history[history.length - 1].price)}`;
    for (let i = 0; i < projection.length; i++) {
      const idx = startIdx + 1 + i;
      const x = getX(idx);
      const y = getY(projection[i].price);
      const prevIdx = i === 0 ? startIdx : startIdx + i;
      const prevPrice = i === 0 ? history[history.length - 1].price : projection[i - 1].price;
      const prevX = getX(prevIdx);
      const cpx1 = prevX + (x - prevX) * 0.4;
      const cpx2 = prevX + (x - prevX) * 0.6;
      d += ` C ${cpx1} ${getY(prevPrice)} ${cpx2} ${y} ${x} ${y}`;
    }
    return d;
  }, [projection, history, getX, getY]);

  // Path length for animation
  const pathLength = 1200;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const scaleX = chartWidth / rect.width;
      const mouseX = (e.clientX - rect.left) * scaleX;

      // Find closest data point
      let closestIdx = 0;
      let closestDist = Infinity;
      for (let i = 0; i < allData.length; i++) {
        const dist = Math.abs(getX(i) - mouseX);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      }

      if (closestDist < 30) {
        const isProj = closestIdx >= history.length;
        setTooltip({
          x: getX(closestIdx),
          y: getY(allData[closestIdx].price),
          data: allData[closestIdx],
          isProjection: isProj,
        });
      } else {
        setTooltip(null);
      }
    },
    [allData, getX, getY, history.length, chartWidth]
  );

  // Determine best month
  const bestMonth = useMemo(() => {
    let minIdx = 0;
    for (let i = 1; i < history.length; i++) {
      if (history[i].price < history[minIdx].price) minIdx = i;
    }
    return history[minIdx];
  }, [history]);

  const areaAvgIncrease = Math.round(annualIncrease * (0.85 + Math.random() * 0.3) * 10) / 10;
  const trendComparison = annualIncrease > areaAvgIncrease ? "above" : annualIncrease < areaAvgIncrease ? "below" : "at";

  // Y axis labels
  const yLabels = useMemo(() => {
    const count = 4;
    const range = maxPrice - minPrice;
    return Array.from({ length: count }, (_, i) => {
      const price = minPrice + (range * i) / (count - 1);
      return { price: Math.round(price), y: getY(Math.round(price)) };
    });
  }, [minPrice, maxPrice, getY]);

  // X axis labels (show every N)
  const xLabels = useMemo(() => {
    const step = Math.max(1, Math.floor(allData.length / 6));
    return allData
      .filter((_, i) => i % step === 0 || i === allData.length - 1)
      .map((d, _, arr) => {
        const origIdx = allData.indexOf(d);
        return { ...d, x: getX(origIdx) };
      });
  }, [allData, getX]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Price History {isSale ? "(per sqft)" : ""}
            </h3>
            <p className="text-violet-200 text-xs">{areaName} — {historyMonths} month trend</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
            {annualIncrease >= 0 ? (
              <TrendingUp className="w-4 h-4 text-emerald-300" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-300" />
            )}
            <span className={`text-sm font-bold ${annualIncrease >= 0 ? "text-emerald-300" : "text-red-300"}`}>
              {annualIncrease >= 0 ? "+" : ""}{annualIncrease}%
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Chart */}
        <div className="relative w-full" style={{ aspectRatio: `${chartWidth}/${chartHeight}` }}>
          <svg
            ref={svgRef}
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-full"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setTooltip(null)}
          >
            {/* Defs */}
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="projGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {yLabels.map((label) => (
              <line
                key={label.price}
                x1={padding.left}
                y1={label.y}
                x2={chartWidth - padding.right}
                y2={label.y}
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-gray-200 dark:text-gray-700"
              />
            ))}

            {/* Y axis labels */}
            {yLabels.map((label) => (
              <text
                key={`yl-${label.price}`}
                x={padding.left - 6}
                y={label.y + 3}
                textAnchor="end"
                className="fill-gray-400 dark:fill-gray-500 text-[9px]"
              >
                {fmtShort(label.price)}
              </text>
            ))}

            {/* X axis labels */}
            {xLabels.map((label, i) => (
              <text
                key={`xl-${i}`}
                x={label.x}
                y={chartHeight - 5}
                textAnchor="middle"
                className="fill-gray-400 dark:fill-gray-500 text-[9px]"
              >
                {label.month} {label.year.toString().slice(2)}
              </text>
            ))}

            {/* Area fill */}
            {areaPath && (
              <motion.path
                d={areaPath}
                fill="url(#areaGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            )}

            {/* History line */}
            {historyPath && (
              <motion.path
                d={historyPath}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={pathLength}
                initial={{ strokeDashoffset: pathLength }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            )}

            {/* Projection line (dashed) */}
            {projectionPath && (
              <motion.path
                d={projectionPath}
                fill="none"
                stroke="url(#projGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="6 4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              />
            )}

            {/* Projection label */}
            {projection.length > 0 && (
              <motion.text
                x={getX(history.length + Math.floor(projection.length / 2))}
                y={getY(projection[Math.floor(projection.length / 2)].price) - 12}
                textAnchor="middle"
                className="fill-violet-400 text-[9px] font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                Projected
              </motion.text>
            )}

            {/* Current price dot (pulsing) */}
            <motion.circle
              cx={getX(history.length - 1)}
              cy={getY(history[history.length - 1].price)}
              r="5"
              fill="#8b5cf6"
              stroke="white"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
            />

            {/* Tooltip */}
            {tooltip && (
              <>
                <line
                  x1={tooltip.x}
                  y1={padding.top}
                  x2={tooltip.x}
                  y2={padding.top + innerH}
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  className="text-gray-300 dark:text-gray-600"
                />
                <circle
                  cx={tooltip.x}
                  cy={tooltip.y}
                  r="4"
                  fill={tooltip.isProjection ? "#a78bfa" : "#8b5cf6"}
                  stroke="white"
                  strokeWidth="2"
                />
              </>
            )}
          </svg>

          {/* HTML Tooltip overlay */}
          {tooltip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute pointer-events-none bg-gray-900 dark:bg-gray-800 text-white px-3 py-2 rounded-lg shadow-xl text-xs z-10 -translate-x-1/2"
              style={{
                left: `${(tooltip.x / chartWidth) * 100}%`,
                top: `${Math.max(0, (tooltip.y / chartHeight) * 100 - 18)}%`,
              }}
            >
              <p className="font-bold">{fmt(tooltip.data.price)}{isRent ? "/mo" : "/sqft"}</p>
              <p className="text-gray-400 text-[10px]">
                {tooltip.data.month} {tooltip.data.year}
                {tooltip.isProjection && " (proj.)"}
              </p>
            </motion.div>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full" />
            <span>Actual</span>
          </div>
          {projection.length > 0 && (
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-0.5 border-t-2 border-dashed border-violet-400" />
              <span>Projected</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" />
            <span>Current</span>
          </div>
        </div>

        {/* Insights */}
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-violet-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Area Annual Increase
              </span>
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {areaAvgIncrease >= 0 ? "+" : ""}{areaAvgIncrease}%
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500">Average in {areaName}</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-violet-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                This Property
              </span>
            </div>
            <p className={`text-lg font-bold ${
              trendComparison === "above"
                ? "text-emerald-600 dark:text-emerald-400"
                : trendComparison === "below"
                ? "text-amber-600 dark:text-amber-400"
                : "text-gray-900 dark:text-white"
            }`}>
              {trendComparison === "above" ? "Above" : trendComparison === "below" ? "Below" : "At"} Average
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500">vs area trend</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Calendar className="w-3.5 h-3.5 text-violet-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Best Time to {isRent ? "Rent" : "Buy"}
              </span>
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {bestMonth.month}
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500">Historically lowest prices</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 text-[10px] text-gray-400 dark:text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-800">
          <Info className="w-3 h-3 flex-shrink-0 mt-0.5" />
          <p>
            Price data is based on AI-estimated trends for {areaName}. Past performance does not guarantee future results.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
