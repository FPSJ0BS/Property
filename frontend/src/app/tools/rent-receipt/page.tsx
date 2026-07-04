"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Receipt,
  ArrowLeft,
  Copy,
  Download,
  Printer,
  CheckCircle2,
  FileText,
  Plus,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const financialYearMonths = [
  "April", "May", "June", "July", "August", "September",
  "October", "November", "December", "January", "February", "March",
];

const paymentModes = ["UPI", "Bank Transfer", "Cheque", "Cash"];

function numberToWords(num: number): string {
  if (num === 0) return "Zero";
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  function convert(n: number): string {
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " and " + convert(n % 100) : "");
    if (n < 100000) return convert(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + convert(n % 1000) : "");
    if (n < 10000000) return convert(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + convert(n % 100000) : "");
    return convert(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 ? " " + convert(n % 10000000) : "");
  }
  return convert(num);
}

interface ReceiptData {
  receiptNo: string;
  date: string;
  month: string;
  year: number;
  tenantName: string;
  landlordName: string;
  landlordPAN: string;
  address: string;
  amount: number;
  amountWords: string;
  paymentMode: string;
}

function ReceiptCard({ receipt, index }: { receipt: ReceiptData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="receipt-printable bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8 print:border-black print:rounded-none print:p-8 print:bg-white print:text-black"
    >
      <div className="text-center mb-6 pb-4 border-b-2 border-dashed border-slate-200 dark:border-slate-700 print:border-black">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white print:text-black tracking-wider uppercase">
          Rent Receipt
        </h3>
      </div>

      <div className="space-y-4 text-sm sm:text-base">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
          <span className="text-slate-500 dark:text-slate-400 print:text-gray-600">Receipt No:</span>
          <span className="font-semibold text-slate-900 dark:text-white print:text-black">{receipt.receiptNo}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
          <span className="text-slate-500 dark:text-slate-400 print:text-gray-600">Date:</span>
          <span className="font-semibold text-slate-900 dark:text-white print:text-black">{receipt.date}</span>
        </div>

        <div className="py-3 border-y border-slate-100 dark:border-slate-800 print:border-gray-300 space-y-3">
          <p className="text-slate-700 dark:text-slate-300 print:text-black">
            Received from: <strong className="text-slate-900 dark:text-white print:text-black">{receipt.tenantName}</strong>
          </p>
          <p className="text-slate-700 dark:text-slate-300 print:text-black">
            Amount: <strong className="text-slate-900 dark:text-white print:text-black text-lg">
              ₹{receipt.amount.toLocaleString("en-IN")}
            </strong>
            <span className="block text-sm text-slate-500 dark:text-slate-400 print:text-gray-600 mt-0.5">
              (Rupees {receipt.amountWords} Only)
            </span>
          </p>
          <p className="text-slate-700 dark:text-slate-300 print:text-black">
            Towards: <strong>Rent for the month of {receipt.month} {receipt.year}</strong>
          </p>
          <p className="text-slate-700 dark:text-slate-300 print:text-black">
            For property at: <strong className="text-slate-900 dark:text-white print:text-black">{receipt.address}</strong>
          </p>
          <p className="text-slate-700 dark:text-slate-300 print:text-black">
            Payment mode: <strong className="text-slate-900 dark:text-white print:text-black">{receipt.paymentMode}</strong>
          </p>
        </div>

        <div className="pt-4 space-y-3">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 print:text-gray-600 mb-1">Received by:</p>
            <p className="font-bold text-slate-900 dark:text-white print:text-black">{receipt.landlordName}</p>
            {receipt.landlordPAN && (
              <p className="text-sm text-slate-500 dark:text-slate-400 print:text-gray-600">PAN: {receipt.landlordPAN}</p>
            )}
          </div>
          <div className="pt-6">
            <div className="w-48 border-b border-slate-300 dark:border-slate-600 print:border-black" />
            <p className="text-xs text-slate-400 dark:text-slate-500 print:text-gray-500 mt-1">
              Signature of Landlord
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function RentReceiptPage() {
  const [tenantName, setTenantName] = useState("");
  const [landlordName, setLandlordName] = useState("");
  const [landlordPAN, setLandlordPAN] = useState("");
  const [address, setAddress] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("UPI");
  const [selectedMonth, setSelectedMonth] = useState(months[new Date().getMonth()]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [receipts, setReceipts] = useState<ReceiptData[]>([]);
  const [copied, setCopied] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  const amount = parseInt(rentAmount) || 0;

  const isValid = tenantName && landlordName && address && amount > 0;

  const generateReceipt = (month: string, year: number, index: number): ReceiptData => {
    const monthIdx = months.indexOf(month);
    const receiptNum = String(index + 1).padStart(3, "0");
    return {
      receiptNo: `RR-${year}-${receiptNum}`,
      date: `${month} 5, ${year}`,
      month,
      year,
      tenantName,
      landlordName,
      landlordPAN,
      address,
      amount,
      amountWords: numberToWords(amount),
      paymentMode,
    };
  };

  const handleGenerateSingle = () => {
    if (!isValid) return;
    setReceipts([generateReceipt(selectedMonth, selectedYear, 0)]);
  };

  const handleGenerateBulk = () => {
    if (!isValid) return;
    const bulk: ReceiptData[] = [];
    financialYearMonths.forEach((month, i) => {
      const year = i < 9 ? selectedYear : selectedYear + 1;
      bulk.push(generateReceipt(month, year, i));
    });
    setReceipts(bulk);
  };

  const getReceiptText = (r: ReceiptData) => {
    return `RENT RECEIPT

Receipt No: ${r.receiptNo}
Date: ${r.date}

Received from: ${r.tenantName}
Amount: ₹${r.amount.toLocaleString("en-IN")} (Rupees ${r.amountWords} Only)
Towards: Rent for the month of ${r.month} ${r.year}
For property at: ${r.address}
Payment mode: ${r.paymentMode}

Received by:
${r.landlordName}${r.landlordPAN ? `\nPAN: ${r.landlordPAN}` : ""}

Signature: ________________________

---`;
  };

  const handleCopy = async () => {
    const text = receipts.map(getReceiptText).join("\n\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = receipts.map(getReceiptText).join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rent-receipts-${selectedYear}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          .receipt-print-area, .receipt-print-area * { visibility: visible; }
          .receipt-print-area { position: absolute; left: 0; top: 0; width: 100%; }
          .receipt-printable { page-break-after: always; margin-bottom: 0; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 no-print-hide">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Header */}
          <div className="mb-8 no-print">
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              All Tools
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                  <Receipt className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    Rent Receipt Generator
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    HRA-compliant receipts for tax savings
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Info Banner */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 p-4 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/50"
            >
              <p className="text-sm text-cyan-800 dark:text-cyan-300">
                <strong>Why you need this:</strong> Salaried employees can claim HRA exemption under Section 10(13A). You need rent receipts as proof. If rent exceeds ₹1,00,000/year, landlord&apos;s PAN is mandatory.
              </p>
            </motion.div>
          </div>

          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm no-print"
          >
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-500" />
              Receipt Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Tenant Name *
                </label>
                <input
                  type="text"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Landlord Name *
                </label>
                <input
                  type="text"
                  value={landlordName}
                  onChange={(e) => setLandlordName(e.target.value)}
                  placeholder="Landlord's full name"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Landlord PAN
                  <span className="text-slate-400 dark:text-slate-500 font-normal"> (if rent &gt; ₹1L/yr)</span>
                </label>
                <input
                  type="text"
                  value={landlordPAN}
                  onChange={(e) => setLandlordPAN(e.target.value.toUpperCase())}
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm uppercase focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Monthly Rent *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">₹</span>
                  <input
                    type="number"
                    value={rentAmount}
                    onChange={(e) => setRentAmount(e.target.value)}
                    placeholder="25000"
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Property Address *
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Flat 101, Sunrise Apartments, HSR Layout, Bangalore - 560102"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Payment Mode
                </label>
                <div className="relative">
                  <select
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    className="w-full appearance-none px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                  >
                    {paymentModes.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Month / Year
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="w-full appearance-none px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-8"
                    >
                      {months.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                  <input
                    type="number"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value) || 2026)}
                    className="w-24 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Generate Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handleGenerateSingle}
                disabled={!isValid}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-indigo-500/25"
              >
                <Plus className="w-4 h-4" />
                Generate Single Receipt
              </button>
              <button
                onClick={handleGenerateBulk}
                disabled={!isValid}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FileText className="w-4 h-4" />
                Generate Full Year (Apr-Mar)
              </button>
            </div>
          </motion.div>

          {/* Receipts */}
          <AnimatePresence>
            {receipts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mb-6 no-print">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy All"}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download as Text
                  </button>
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                  <span className="inline-flex items-center px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
                    {receipts.length} receipt{receipts.length > 1 ? "s" : ""} generated
                  </span>
                </div>

                {/* Receipt List */}
                <div ref={receiptRef} className="receipt-print-area space-y-6">
                  {receipts.map((receipt, i) => (
                    <ReceiptCard key={receipt.receiptNo} receipt={receipt} index={i} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom */}
          {receipts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center py-12 no-print"
            >
              <Receipt className="w-12 h-12 text-slate-200 dark:text-slate-700 mx-auto mb-3" />
              <p className="text-sm text-slate-400 dark:text-slate-500">
                Fill in the details above and generate your rent receipt.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
