"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  User,
  Building2,
  IndianRupee,
  ScrollText,
  Eye,
  ChevronRight,
  ChevronLeft,
  Copy,
  Download,
  Printer,
  Check,
  Shield,
  Phone,
  MapPin,
  Home,
  Calendar,
  CreditCard,
  Clock,
  Users,
  PawPrint,
  Lock,
  AlertCircle,
} from "lucide-react";

/* ─── Types ─── */
interface FormData {
  // Step 1: Parties
  landlordName: string;
  landlordAddress: string;
  landlordAadhaar: string;
  landlordPhone: string;
  tenantName: string;
  tenantAddress: string;
  tenantAadhaar: string;
  tenantPhone: string;
  // Step 2: Property
  propertyAddress: string;
  propertyCity: string;
  propertyType: string;
  carpetArea: string;
  floorNumber: string;
  furnishing: string;
  parking: boolean;
  rooms: string;
  // Step 3: Financial
  monthlyRent: string;
  securityDeposit: string;
  depositMode: string;
  rentDueDate: string;
  paymentMethod: string;
  annualIncrease: string;
  latePenalty: string;
  // Step 4: Terms
  startDate: string;
  duration: string;
  lockIn: string;
  noticePeriod: string;
  maintenance: string;
  subletting: boolean;
  pets: boolean;
  maxOccupants: string;
}

const initialFormData: FormData = {
  landlordName: "",
  landlordAddress: "",
  landlordAadhaar: "",
  landlordPhone: "",
  tenantName: "",
  tenantAddress: "",
  tenantAadhaar: "",
  tenantPhone: "",
  propertyAddress: "",
  propertyCity: "",
  propertyType: "Apartment",
  carpetArea: "",
  floorNumber: "",
  furnishing: "Semi-Furnished",
  parking: false,
  rooms: "2",
  monthlyRent: "",
  securityDeposit: "",
  depositMode: "Full upfront",
  rentDueDate: "5",
  paymentMethod: "UPI",
  annualIncrease: "5",
  latePenalty: "50",
  startDate: "",
  duration: "11",
  lockIn: "None",
  noticePeriod: "1",
  maintenance: "Tenant",
  subletting: false,
  pets: false,
  maxOccupants: "4",
};

const steps = [
  { id: 1, label: "Parties", icon: User },
  { id: 2, label: "Property", icon: Building2 },
  { id: 3, label: "Financial", icon: IndianRupee },
  { id: 4, label: "Terms", icon: ScrollText },
  { id: 5, label: "Preview", icon: Eye },
];

/* ─── Reusable components ─── */
function Input({
  label,
  icon: Icon,
  ...props
}: {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
        )}
        <input
          {...props}
          className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all ${Icon ? "pl-10" : ""} ${props.className || ""}`}
        />
      </div>
    </div>
  );
}

function Select({
  label,
  options,
  icon: Icon,
  ...props
}: {
  label: string;
  options: { value: string; label: string }[];
  icon?: React.ComponentType<{ className?: string }>;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
        )}
        <select
          {...props}
          className={`w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all appearance-none ${Icon ? "pl-10" : ""}`}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
  description,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</p>
        {description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${
          checked ? "bg-indigo-600" : "bg-slate-200 dark:bg-slate-700"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

/* ─── Agreement Text Generator ─── */
function generateAgreement(d: FormData): string {
  const startFormatted = d.startDate
    ? new Date(d.startDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "[Start Date]";

  const endDate = d.startDate
    ? new Date(
        new Date(d.startDate).setMonth(
          new Date(d.startDate).getMonth() + parseInt(d.duration)
        )
      ).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "[End Date]";

  const city = d.propertyCity || "[City]";
  const rent = d.monthlyRent
    ? `₹${parseInt(d.monthlyRent).toLocaleString("en-IN")}`
    : "₹[Amount]";
  const deposit = d.securityDeposit
    ? `₹${parseInt(d.securityDeposit).toLocaleString("en-IN")}`
    : "₹[Amount]";
  const penalty = d.latePenalty
    ? `₹${parseInt(d.latePenalty).toLocaleString("en-IN")}`
    : "₹50";

  return `RESIDENTIAL RENTAL AGREEMENT

This Rental Agreement is made and executed on ${startFormatted} at ${city}.

BETWEEN

${d.landlordName || "[Landlord Name]"}, residing at ${d.landlordAddress || "[Landlord Address]"}, hereinafter referred to as the "LANDLORD" (Aadhaar: XXXX-XXXX-${d.landlordAadhaar || "XXXX"})
Contact: ${d.landlordPhone || "[Phone]"}

AND

${d.tenantName || "[Tenant Name]"}, residing at ${d.tenantAddress || "[Tenant Address]"}, hereinafter referred to as the "TENANT" (Aadhaar: XXXX-XXXX-${d.tenantAadhaar || "XXXX"})
Contact: ${d.tenantPhone || "[Phone]"}


PROPERTY DETAILS

The Landlord hereby agrees to let and the Tenant agrees to take on rent the premises situated at:
${d.propertyAddress || "[Property Address]"}

Property Type: ${d.propertyType} | Area: ${d.carpetArea || "[--]"} sq ft | Floor: ${d.floorNumber || "[--]"} | Rooms: ${d.rooms || "[--]"}
Furnishing: ${d.furnishing} | Parking: ${d.parking ? "Included" : "Not Included"}


FINANCIAL TERMS

1. Monthly Rent: ${rent} (${numberToWords(parseInt(d.monthlyRent) || 0)} Rupees only) payable on or before the ${d.rentDueDate}th of each calendar month.

2. Security Deposit: ${deposit} (${numberToWords(parseInt(d.securityDeposit) || 0)} Rupees only) paid via ${d.depositMode}.
   The deposit shall be refunded within 30 days of vacating the premises, after deducting any outstanding dues or damages.

3. Payment Method: ${d.paymentMethod}

4. Annual Rent Revision: ${d.annualIncrease}% increase applicable after each 12-month period from the date of commencement.

5. Late Payment: A penalty of ${penalty}/day shall be levied for rent delayed beyond 7 days from the due date.


DURATION AND TERMINATION

1. This agreement shall be valid for a period of ${d.duration} months commencing from ${startFormatted} and ending on ${endDate}, unless renewed by mutual consent.

2. Lock-in Period: ${d.lockIn === "None" ? "No lock-in period" : `${d.lockIn} months — Neither party may terminate during this period without forfeiting the equivalent of ${d.lockIn} months' rent`}.

3. Notice Period: ${d.noticePeriod} month(s) written notice required by either party for vacating or termination of this agreement.

4. The Tenant shall hand over the premises in the same condition as received, normal wear and tear excepted.

5. Upon expiry, if the Tenant continues to occupy without renewal, the tenancy shall be deemed month-to-month and terminable by either party with ${d.noticePeriod} month(s) notice.


GENERAL TERMS AND CONDITIONS

1. Maintenance: ${d.maintenance === "Shared" ? "Shared equally between Landlord and Tenant" : `${d.maintenance}'s responsibility`}.

2. Subletting: ${d.subletting ? "Allowed with prior written consent of the Landlord" : "Strictly not allowed. The Tenant shall not sublet, assign, or part with the possession of the premises or any part thereof"}.

3. Pets: ${d.pets ? "Allowed, subject to society/building rules and with the condition that no damage is caused to the property" : "Not allowed on the premises"}.

4. Maximum Occupants: ${d.maxOccupants} persons.

5. The Tenant shall not make any structural alterations, additions, or modifications to the premises without the prior written consent of the Landlord.

6. The Landlord hereby declares and warrants that the premises is free from all encumbrances, liens, and disputes, and that the Landlord has clear title and authority to lease the premises.

7. Electricity, water, gas, internet, and other utility charges shall be borne by the Tenant as per actual usage and meter readings.

8. Society maintenance charges of the building/complex shall be borne by the ${d.maintenance === "Landlord" ? "Landlord" : "Tenant"}.

9. The Tenant shall use the premises solely for residential purposes and shall not conduct any commercial activity therein.

10. The Landlord or authorized representative shall have the right to inspect the premises with prior notice of at least 24 hours, at reasonable hours.

11. In the event of any damage to the property beyond normal wear and tear, the cost of repair shall be borne by the Tenant or deducted from the security deposit.

12. The Tenant shall comply with all rules and regulations of the housing society/building association.


DISPUTE RESOLUTION

Any disputes arising out of or in connection with this agreement shall first be attempted to be resolved through mutual discussion and mediation. If the dispute remains unresolved for a period of 30 days, it shall be subject to the exclusive jurisdiction of the courts in ${city}.


This agreement is executed in duplicate, with each party retaining one original copy. Both copies are equally valid.


IN WITNESS WHEREOF, the parties have set their hands on this agreement on the date first mentioned above.



________________________                    ________________________
LANDLORD                                    TENANT
${d.landlordName || "[Landlord Name]"}${" ".repeat(Math.max(2, 40 - (d.landlordName?.length || 15)))}${d.tenantName || "[Tenant Name]"}
Date: ${startFormatted}                     Date: ${startFormatted}



WITNESS 1: ________________________         WITNESS 2: ________________________
Name:                                       Name:
Address:                                    Address:`;
}

function numberToWords(n: number): string {
  if (n === 0) return "Zero";
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
    "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  function convert(num: number): string {
    if (num < 20) return ones[num];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "");
    if (num < 1000) return ones[Math.floor(num / 100)] + " Hundred" + (num % 100 ? " and " + convert(num % 100) : "");
    if (num < 100000) return convert(Math.floor(num / 1000)) + " Thousand" + (num % 1000 ? " " + convert(num % 1000) : "");
    if (num < 10000000) return convert(Math.floor(num / 100000)) + " Lakh" + (num % 100000 ? " " + convert(num % 100000) : "");
    return convert(Math.floor(num / 10000000)) + " Crore" + (num % 10000000 ? " " + convert(num % 10000000) : "");
  }
  return convert(n);
}

/* ─── Validation ─── */
function validateStep(step: number, d: FormData): string[] {
  const errors: string[] = [];
  if (step === 1) {
    if (!d.landlordName.trim()) errors.push("Landlord name is required");
    if (!d.tenantName.trim()) errors.push("Tenant name is required");
    if (d.landlordAadhaar && !/^\d{4}$/.test(d.landlordAadhaar))
      errors.push("Aadhaar must be exactly 4 digits");
    if (d.tenantAadhaar && !/^\d{4}$/.test(d.tenantAadhaar))
      errors.push("Aadhaar must be exactly 4 digits");
    if (d.landlordPhone && !/^\d{10}$/.test(d.landlordPhone))
      errors.push("Phone must be 10 digits");
    if (d.tenantPhone && !/^\d{10}$/.test(d.tenantPhone))
      errors.push("Phone must be 10 digits");
  }
  if (step === 2) {
    if (!d.propertyAddress.trim()) errors.push("Property address is required");
    if (!d.propertyCity.trim()) errors.push("City is required");
  }
  if (step === 3) {
    if (!d.monthlyRent || parseInt(d.monthlyRent) <= 0) errors.push("Monthly rent is required");
    if (!d.securityDeposit || parseInt(d.securityDeposit) <= 0) errors.push("Security deposit is required");
  }
  if (step === 4) {
    if (!d.startDate) errors.push("Start date is required");
  }
  return errors;
}

/* ─── Main Component ─── */
export default function AgreementGenerator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const update = useCallback(
    (field: keyof FormData, value: string | boolean) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors([]);
    },
    []
  );

  function next() {
    const errs = validateStep(currentStep, form);
    if (errs.length > 0) {
      setErrors(errs);
      return;
    }
    setErrors([]);
    setCurrentStep((s) => Math.min(s + 1, 5));
  }

  function prev() {
    setErrors([]);
    setCurrentStep((s) => Math.max(s - 1, 1));
  }

  const agreementText = generateAgreement(form);

  function copyToClipboard() {
    navigator.clipboard.writeText(agreementText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function downloadAsText() {
    const blob = new Blob([agreementText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Rental_Agreement_${form.tenantName || "draft"}_${form.startDate || "undated"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function printAgreement() {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`<!DOCTYPE html><html><head><title>Rental Agreement</title>
      <style>
        body{font-family:'Times New Roman',serif;padding:60px 80px;line-height:1.8;color:#000;font-size:13pt}
        pre{white-space:pre-wrap;word-wrap:break-word;font-family:'Times New Roman',serif;font-size:13pt;line-height:1.8}
        @media print{body{padding:40px 60px}@page{margin:2cm}}
      </style></head><body><pre>${agreementText}</pre></body></html>`);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 300);
  }

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-8 sm:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 mb-4">
            <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 tracking-wide uppercase">
              Free Legal Tool
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white font-display">
            Rental Agreement Generator
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Generate a legally formatted rental agreement in minutes. No lawyer needed.
            Save ₹500–₹2,000 on every agreement.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    if (step.id < currentStep) {
                      setCurrentStep(step.id);
                      setErrors([]);
                    }
                  }}
                  className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? "text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50"
                      : isCompleted
                      ? "text-emerald-700 dark:text-emerald-400 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                      : "text-slate-400 dark:text-slate-600"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 hidden sm:block" />
                  <span className="hidden sm:inline">{step.label}</span>
                  <span className="sm:hidden">{step.id}</span>
                  {isCompleted && <Check className="w-3 h-3" />}
                </button>
              );
            })}
          </div>
          <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Error Display */}
        <AnimatePresence>
          {errors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50"
            >
              <div className="flex gap-2 items-start">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  {errors.map((err, i) => (
                    <p key={i} className="text-sm text-red-700 dark:text-red-300">
                      {err}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Card */}
        <motion.div
          className="card-premium rounded-2xl p-6 sm:p-8"
          layout
        >
          <AnimatePresence mode="wait">
            {/* Step 1: Parties */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-500" />
                  Party Details
                </h2>

                {/* Landlord */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-4">
                    Landlord / Owner
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Full Name *" icon={User} placeholder="e.g. Ramesh Kumar" value={form.landlordName} onChange={(e) => update("landlordName", e.currentTarget.value)} />
                    <Input label="Phone Number" icon={Phone} placeholder="10-digit mobile" value={form.landlordPhone} onChange={(e) => update("landlordPhone", e.currentTarget.value.replace(/\D/g, "").slice(0, 10))} />
                    <Input label="Current Address" icon={MapPin} placeholder="Full residential address" value={form.landlordAddress} onChange={(e) => update("landlordAddress", e.currentTarget.value)} className="sm:col-span-2" />
                    <Input label="Aadhaar (last 4 digits)" icon={Shield} placeholder="e.g. 7890" value={form.landlordAadhaar} onChange={(e) => update("landlordAadhaar", e.currentTarget.value.replace(/\D/g, "").slice(0, 4))} maxLength={4} />
                  </div>
                </div>

                {/* Tenant */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-4">
                    Tenant / Renter
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Full Name *" icon={User} placeholder="e.g. Priya Sharma" value={form.tenantName} onChange={(e) => update("tenantName", e.currentTarget.value)} />
                    <Input label="Phone Number" icon={Phone} placeholder="10-digit mobile" value={form.tenantPhone} onChange={(e) => update("tenantPhone", e.currentTarget.value.replace(/\D/g, "").slice(0, 10))} />
                    <Input label="Current Address" icon={MapPin} placeholder="Full residential address" value={form.tenantAddress} onChange={(e) => update("tenantAddress", e.currentTarget.value)} className="sm:col-span-2" />
                    <Input label="Aadhaar (last 4 digits)" icon={Shield} placeholder="e.g. 1234" value={form.tenantAadhaar} onChange={(e) => update("tenantAadhaar", e.currentTarget.value.replace(/\D/g, "").slice(0, 4))} maxLength={4} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Property */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-indigo-500" />
                  Property Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Full Property Address *" icon={MapPin} placeholder="Flat/Floor/Building/Street" value={form.propertyAddress} onChange={(e) => update("propertyAddress", e.currentTarget.value)} className="sm:col-span-2" />
                  <Input label="City *" icon={MapPin} placeholder="e.g. Bengaluru" value={form.propertyCity} onChange={(e) => update("propertyCity", e.currentTarget.value)} />
                  <Select label="Property Type" icon={Home} value={form.propertyType} onChange={(e) => update("propertyType", e.currentTarget.value)} options={[
                    { value: "Apartment", label: "Apartment" },
                    { value: "Independent House", label: "Independent House" },
                    { value: "Villa", label: "Villa" },
                    { value: "Commercial Space", label: "Commercial Space" },
                    { value: "Co-Living Room", label: "Co-Living Room" },
                  ]} />
                  <Input label="Carpet Area (sq ft)" placeholder="e.g. 850" value={form.carpetArea} onChange={(e) => update("carpetArea", e.currentTarget.value.replace(/\D/g, ""))} />
                  <Input label="Floor Number" placeholder="e.g. 3" value={form.floorNumber} onChange={(e) => update("floorNumber", e.currentTarget.value)} />
                  <Select label="Furnishing Status" value={form.furnishing} onChange={(e) => update("furnishing", e.currentTarget.value)} options={[
                    { value: "Fully Furnished", label: "Fully Furnished" },
                    { value: "Semi-Furnished", label: "Semi-Furnished" },
                    { value: "Unfurnished", label: "Unfurnished" },
                  ]} />
                  <Input label="Number of Rooms" placeholder="e.g. 2" value={form.rooms} onChange={(e) => update("rooms", e.currentTarget.value.replace(/\D/g, ""))} />
                  <div className="sm:col-span-2">
                    <Toggle label="Parking Included" checked={form.parking} onChange={(v) => update("parking", v)} description="Dedicated parking space with the rental" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Financial */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-indigo-500" />
                  Financial Terms
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Monthly Rent (₹) *" icon={IndianRupee} placeholder="e.g. 25000" value={form.monthlyRent} onChange={(e) => update("monthlyRent", e.currentTarget.value.replace(/\D/g, ""))} />
                  <Input label="Security Deposit (₹) *" icon={IndianRupee} placeholder="e.g. 50000" value={form.securityDeposit} onChange={(e) => update("securityDeposit", e.currentTarget.value.replace(/\D/g, ""))} />
                  <Select label="Deposit Payment Mode" icon={CreditCard} value={form.depositMode} onChange={(e) => update("depositMode", e.currentTarget.value)} options={[
                    { value: "Full upfront", label: "Full upfront" },
                    { value: "2 installments", label: "2 installments" },
                    { value: "3 installments", label: "3 installments" },
                  ]} />
                  <Select label="Rent Due Date" icon={Calendar} value={form.rentDueDate} onChange={(e) => update("rentDueDate", e.currentTarget.value)} options={[
                    { value: "1", label: "1st of month" },
                    { value: "5", label: "5th of month" },
                    { value: "7", label: "7th of month" },
                    { value: "10", label: "10th of month" },
                  ]} />
                  <Select label="Payment Method" icon={CreditCard} value={form.paymentMethod} onChange={(e) => update("paymentMethod", e.currentTarget.value)} options={[
                    { value: "UPI", label: "UPI" },
                    { value: "Bank Transfer (NEFT/IMPS)", label: "Bank Transfer (NEFT/IMPS)" },
                    { value: "Cheque", label: "Cheque" },
                    { value: "Cash", label: "Cash" },
                  ]} />
                  <Select label="Annual Rent Increase" value={form.annualIncrease} onChange={(e) => update("annualIncrease", e.currentTarget.value)} options={[
                    { value: "0", label: "0% — No increase" },
                    { value: "5", label: "5% — Standard" },
                    { value: "8", label: "8% — Above average" },
                    { value: "10", label: "10% — High" },
                  ]} />
                  <Input label="Late Payment Penalty (₹/day)" placeholder="e.g. 50" value={form.latePenalty} onChange={(e) => update("latePenalty", e.currentTarget.value.replace(/\D/g, ""))} />
                </div>

                {/* Quick summary */}
                {form.monthlyRent && form.securityDeposit && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40"
                  >
                    <p className="text-sm text-indigo-800 dark:text-indigo-300 font-medium">
                      Quick Summary: ₹{parseInt(form.monthlyRent).toLocaleString("en-IN")}/month rent
                      {" + "}₹{parseInt(form.securityDeposit).toLocaleString("en-IN")} deposit
                      {" = "}
                      <span className="font-bold">
                        ₹{(parseInt(form.monthlyRent) + parseInt(form.securityDeposit)).toLocaleString("en-IN")}
                      </span>{" "}
                      total initial payment
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 4: Terms */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <ScrollText className="w-5 h-5 text-indigo-500" />
                  Agreement Terms
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Agreement Start Date *" type="date" icon={Calendar} value={form.startDate} onChange={(e) => update("startDate", e.currentTarget.value)} />
                  <Select label="Duration" icon={Clock} value={form.duration} onChange={(e) => update("duration", e.currentTarget.value)} options={[
                    { value: "6", label: "6 months" },
                    { value: "11", label: "11 months (standard)" },
                    { value: "12", label: "12 months" },
                    { value: "24", label: "24 months" },
                  ]} />
                  <Select label="Lock-in Period" icon={Lock} value={form.lockIn} onChange={(e) => update("lockIn", e.currentTarget.value)} options={[
                    { value: "None", label: "None" },
                    { value: "3", label: "3 months" },
                    { value: "6", label: "6 months" },
                  ]} />
                  <Select label="Notice Period for Vacating" icon={Clock} value={form.noticePeriod} onChange={(e) => update("noticePeriod", e.currentTarget.value)} options={[
                    { value: "1", label: "1 month" },
                    { value: "2", label: "2 months" },
                    { value: "3", label: "3 months" },
                  ]} />
                  <Select label="Maintenance Responsibility" value={form.maintenance} onChange={(e) => update("maintenance", e.currentTarget.value)} options={[
                    { value: "Landlord", label: "Landlord" },
                    { value: "Tenant", label: "Tenant" },
                    { value: "Shared", label: "Shared" },
                  ]} />
                  <Input label="Maximum Occupants" icon={Users} placeholder="e.g. 4" value={form.maxOccupants} onChange={(e) => update("maxOccupants", e.currentTarget.value.replace(/\D/g, ""))} />
                </div>

                <div className="mt-4 space-y-1 border-t border-slate-200 dark:border-slate-700/50 pt-4">
                  <Toggle label="Subletting Allowed" checked={form.subletting} onChange={(v) => update("subletting", v)} description="Allow tenant to sublease to others" />
                  <Toggle label="Pets Allowed" checked={form.pets} onChange={(v) => update("pets", v)} description="Allow keeping pets on premises" />
                </div>

                {/* Duration info */}
                {form.startDate && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-sm text-slate-600 dark:text-slate-400"
                  >
                    Agreement period:{" "}
                    {new Date(form.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    {" → "}
                    {new Date(
                      new Date(form.startDate).setMonth(
                        new Date(form.startDate).getMonth() + parseInt(form.duration)
                      )
                    ).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    {" "}({form.duration} months)
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 5: Preview */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-500" />
                    Agreement Preview
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                    <button
                      onClick={downloadAsText}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={printAgreement}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-sm font-medium text-white transition-colors"
                    >
                      <Printer className="w-4 h-4" />
                      Print
                    </button>
                  </div>
                </div>

                {/* Agreement Preview */}
                <div
                  ref={previewRef}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-10 shadow-sm max-h-[70vh] overflow-y-auto"
                >
                  <pre className="whitespace-pre-wrap font-serif text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200 break-words">
                    {agreementText}
                  </pre>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40">
                  <p className="text-xs text-amber-800 dark:text-amber-300">
                    <strong>Disclaimer:</strong> This agreement is a standard format template
                    generated for reference purposes. For agreements exceeding 11 months,
                    registration under the Registration Act, 1908 is mandatory. Consult a legal
                    professional for jurisdiction-specific requirements. Stamp duty and
                    e-stamping may apply per your state&apos;s rules.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200 dark:border-slate-700/50">
            <button
              onClick={prev}
              disabled={currentStep === 1}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            {currentStep < 5 ? (
              <button
                onClick={next}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md shadow-indigo-500/20 transition-all"
              >
                {currentStep === 4 ? "Generate Agreement" : "Continue"}
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setForm(initialFormData);
                  setCurrentStep(1);
                  setErrors([]);
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Start New Agreement
              </button>
            )}
          </div>
        </motion.div>

        {/* Trust footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-slate-400 dark:text-slate-600 mt-8"
        >
          Your data stays in your browser. Nothing is sent to any server.
        </motion.p>
      </div>
    </div>
  );
}
