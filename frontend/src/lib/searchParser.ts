export interface ParsedSearch {
  query: string;
  propertyType?: string; // "residential", "commercial", etc
  listingType?: string; // "Rent", "Sale", "Lease"
  bedrooms?: number;
  budgetMin?: number;
  budgetMax?: number;
  locality?: string;
  furnished?: string;
  features: string[]; // "parking", "verified", "pet-friendly", etc
  businessType?: string; // "office", "retail", "warehouse"
  lifestyle?: string[]; // "family-friendly", "student", "professional"
  chips: { label: string; value: string; color: string }[];
}

export function parseSearchQuery(query: string): ParsedSearch {
  const q = query.toLowerCase();
  const result: ParsedSearch = { query, features: [], lifestyle: [], chips: [] };

  // ── Bedrooms ──
  const bhkMatch = q.match(/(\d)\s*bhk/i);
  if (bhkMatch) {
    result.bedrooms = parseInt(bhkMatch[1]);
    result.chips.push({ label: "Type", value: `${result.bedrooms}BHK`, color: "violet" });
  }
  if (q.includes("studio")) {
    result.propertyType = "residential";
    result.chips.push({ label: "Type", value: "Studio", color: "violet" });
  }

  // ── Budget ──
  // Match patterns: "under 25k", "below ₹25,000", "under 25000", "budget 20k-30k", "₹25k"
  const underMatch = q.match(/(?:under|below|upto|max|budget)\s*₹?\s*(\d+)\s*k?/i);
  if (underMatch) {
    let amount = parseInt(underMatch[1]);
    if (amount < 1000) amount *= 1000; // "25k" → 25000
    result.budgetMax = amount;
    result.chips.push({ label: "Budget", value: `≤ ₹${amount.toLocaleString("en-IN")}`, color: "emerald" });
  }
  const rangeMatch = q.match(/(\d+)\s*k?\s*[-–to]+\s*(\d+)\s*k/i);
  if (rangeMatch) {
    let min = parseInt(rangeMatch[1]);
    let max = parseInt(rangeMatch[2]);
    if (min < 1000) min *= 1000;
    if (max < 1000) max *= 1000;
    result.budgetMin = min;
    result.budgetMax = max;
    result.chips.push({ label: "Budget", value: `₹${min.toLocaleString("en-IN")} – ₹${max.toLocaleString("en-IN")}`, color: "emerald" });
  }
  // Sale prices: "under 50 lakh", "under 1 crore"
  const lakhMatch = q.match(/(\d+)\s*(?:lakh|lac)/i);
  if (lakhMatch) {
    result.budgetMax = parseInt(lakhMatch[1]) * 100000;
    result.listingType = "Sale";
    result.chips.push({ label: "Budget", value: `≤ ₹${lakhMatch[1]} Lakh`, color: "emerald" });
  }
  const croreMatch = q.match(/(\d+(?:\.\d+)?)\s*(?:crore|cr)/i);
  if (croreMatch) {
    result.budgetMax = parseFloat(croreMatch[1]) * 10000000;
    result.listingType = "Sale";
    result.chips.push({ label: "Budget", value: `≤ ₹${croreMatch[1]} Cr`, color: "emerald" });
  }

  // ── Locality ──
  const localities = ["vaishali nagar", "malviya nagar", "c-scheme", "mansarovar", "jagatpura", "tonk road", "sitapura", "raja park"];
  for (const loc of localities) {
    if (q.includes(loc)) {
      result.locality = loc.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      result.chips.push({ label: "Area", value: result.locality, color: "indigo" });
      break;
    }
  }
  // Hinglish: "vaishali nagar mein"
  const meinMatch = q.match(/(\w+(?:\s\w+)?)\s+(?:mein|me|mai|main)/i);
  if (meinMatch && !result.locality) {
    const possibleLoc = meinMatch[1].toLowerCase();
    for (const loc of localities) {
      if (loc.includes(possibleLoc) || possibleLoc.includes(loc.split(" ")[0])) {
        result.locality = loc.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        result.chips.push({ label: "Area", value: result.locality, color: "indigo" });
        break;
      }
    }
  }

  // ── Listing Type ──
  if (q.match(/\b(buy|purchase|khareed|sale|invest)\b/i)) {
    result.listingType = "Sale";
    result.chips.push({ label: "Listing", value: "For Sale", color: "amber" });
  }
  if (q.match(/\b(lease|long.?term)\b/i)) {
    result.listingType = "Lease";
    result.chips.push({ label: "Listing", value: "For Lease", color: "cyan" });
  }
  if (q.match(/\b(rent|kiraya|kiray)\b/i) && !result.listingType) {
    result.listingType = "Rent";
  }

  // ── Property / Business Type ──
  if (q.match(/\b(office|cabin|desk)\b/i)) {
    result.propertyType = "commercial";
    result.businessType = "Office";
    result.chips.push({ label: "Type", value: "Office", color: "slate" });
  }
  if (q.match(/\b(shop|showroom|retail|dukan)\b/i)) {
    result.propertyType = "commercial";
    result.businessType = "Retail";
    result.chips.push({ label: "Type", value: "Retail", color: "slate" });
  }
  if (q.match(/\b(warehouse|godown|storage)\b/i)) {
    result.propertyType = "industrial";
    result.businessType = "Warehouse";
    result.chips.push({ label: "Type", value: "Warehouse", color: "slate" });
  }
  if (q.match(/\b(co.?living|coliving|pg|hostel|shared.?room)\b/i)) {
    result.propertyType = "co-living";
    result.chips.push({ label: "Type", value: "Co-Living", color: "violet" });
  }
  if (q.match(/\b(co.?working|coworking|hot.?desk)\b/i)) {
    result.propertyType = "co-working";
    result.chips.push({ label: "Type", value: "Co-Working", color: "violet" });
  }
  if (q.match(/\b(coaching|tuition|institute|class)\b/i)) {
    result.businessType = "Coaching";
    result.chips.push({ label: "Type", value: "Coaching", color: "slate" });
  }
  if (q.match(/\b(clinic|hospital|medical|doctor)\b/i)) {
    result.businessType = "Clinic";
    result.chips.push({ label: "Type", value: "Clinic", color: "slate" });
  }

  // ── Features ──
  if (q.match(/\b(parking|car)\b/i)) result.features.push("parking");
  if (q.match(/\b(verified|satya|trust)\b/i)) result.features.push("verified");
  if (q.match(/\b(pet|dog|cat)\b/i)) result.features.push("pet-friendly");
  if (q.match(/\b(furnished|furnish)\b/i)) {
    result.furnished = "Fully Furnished";
    result.chips.push({ label: "Furnishing", value: "Furnished", color: "slate" });
  }
  if (q.match(/\b(low.?deposit|kam.?deposit|1.?month.?deposit)\b/i)) result.features.push("low-deposit");
  if (q.match(/\b(move.?in.?ready|ready|available.?now|turant|immediately)\b/i)) result.features.push("move-in-ready");
  if (q.match(/\b(rera|registered)\b/i)) result.features.push("rera");

  // ── Lifestyle ──
  if (q.match(/\b(family|parivaar|bachche|kids|children|school)\b/i)) {
    result.lifestyle!.push("family-friendly");
    result.chips.push({ label: "Lifestyle", value: "Family-Friendly", color: "emerald" });
  }
  if (q.match(/\b(student|college|university|campus)\b/i)) {
    result.lifestyle!.push("student");
    result.chips.push({ label: "Lifestyle", value: "Student-Friendly", color: "violet" });
  }
  if (q.match(/\b(professional|working|office.?near|commute)\b/i)) {
    result.lifestyle!.push("professional");
    result.chips.push({ label: "Lifestyle", value: "Professional", color: "indigo" });
  }
  if (q.match(/\b(quiet|shant|peaceful|calm)\b/i)) {
    result.lifestyle!.push("quiet");
    result.chips.push({ label: "Preference", value: "Quiet Area", color: "slate" });
  }
  if (q.match(/\b(safe|surakshit|security)\b/i)) {
    result.lifestyle!.push("safe");
    result.chips.push({ label: "Preference", value: "Safe Area", color: "emerald" });
  }

  // Add feature chips
  if (result.features.includes("parking")) result.chips.push({ label: "Need", value: "Parking", color: "slate" });
  if (result.features.includes("verified")) result.chips.push({ label: "Trust", value: "Verified", color: "emerald" });
  if (result.features.includes("pet-friendly")) result.chips.push({ label: "Need", value: "Pet-Friendly", color: "slate" });
  if (result.features.includes("low-deposit")) result.chips.push({ label: "Budget", value: "Low Deposit", color: "emerald" });

  return result;
}

// Apply parsed search to property list
import { properties, type Property } from "@/data/properties";

export function applyParsedSearch(parsed: ParsedSearch): Property[] {
  let result = [...properties];

  if (parsed.listingType) {
    result = result.filter(p => p.listingType === parsed.listingType);
  }
  if (parsed.propertyType) {
    result = result.filter(p => p.type === parsed.propertyType);
  }
  if (parsed.bedrooms) {
    result = result.filter(p => p.bedrooms === parsed.bedrooms);
  }
  if (parsed.budgetMax) {
    if (parsed.listingType === "Sale") {
      result = result.filter(p => (p.salePrice || 0) <= parsed.budgetMax!);
    } else {
      result = result.filter(p => p.price <= parsed.budgetMax!);
    }
  }
  if (parsed.budgetMin) {
    result = result.filter(p => p.price >= parsed.budgetMin!);
  }
  if (parsed.locality) {
    result = result.filter(p => p.locality.toLowerCase().includes(parsed.locality!.toLowerCase()));
  }
  if (parsed.businessType) {
    result = result.filter(p => p.businessType?.toLowerCase() === parsed.businessType!.toLowerCase());
  }
  if (parsed.furnished) {
    result = result.filter(p => p.furnishing === parsed.furnished);
  }
  if (parsed.features.includes("verified")) {
    result = result.filter(p => p.isVerified);
  }
  if (parsed.features.includes("parking")) {
    result = result.filter(p => p.parking);
  }
  if (parsed.features.includes("pet-friendly")) {
    result = result.filter(p => p.petFriendly);
  }
  if (parsed.features.includes("low-deposit")) {
    result = result.filter(p => p.lowDeposit);
  }
  if (parsed.features.includes("move-in-ready")) {
    result = result.filter(p => p.moveInReady);
  }
  if (parsed.features.includes("rera")) {
    result = result.filter(p => p.reraRegistered);
  }

  // Sort by AI match score by default
  result.sort((a, b) => b.aiMatchScore - a.aiMatchScore);

  return result;
}
