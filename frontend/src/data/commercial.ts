export interface BusinessFit {
  officeFit: number; // 0-100
  retailFit: number;
  warehouseFit: number;
  coachingFit: number; // coaching/institute
  clinicFit: number; // clinic/service business
  employeeAccess: number;
  customerAccess: number;
  visibility: number;
  parking: number;
  logisticsReadiness: number;
  businessEcosystem: number;
}

export interface CommercialAreaProfile {
  areaSlug: string;
  areaName: string;
  businessFit: BusinessFit;
  bestForBusiness: string[];
  notIdealForBusiness: string[];
  businessTradeoffs: { strength: string; weakness: string }[];
  nearbyBusinessInfra: { name: string; type: string; distance: string }[];
  commercialRentRange: { min: number; max: number };
  footfallLevel: "Very High" | "High" | "Moderate" | "Low";
  businessMoveReadiness: number; // 0-100
}

export const commercialAreaProfiles: CommercialAreaProfile[] = [
  {
    areaSlug: "vaishali-nagar",
    areaName: "Vaishali Nagar",
    businessFit: {
      officeFit: 65,
      retailFit: 78,
      warehouseFit: 20,
      coachingFit: 82,
      clinicFit: 85,
      employeeAccess: 75,
      customerAccess: 82,
      visibility: 70,
      parking: 72,
      logisticsReadiness: 30,
      businessEcosystem: 65,
    },
    bestForBusiness: [
      "Clinics & healthcare",
      "Coaching centers",
      "Retail showrooms",
      "Salon & wellness",
    ],
    notIdealForBusiness: [
      "Large warehouses",
      "Heavy logistics",
      "Manufacturing",
    ],
    businessTradeoffs: [
      {
        strength: "Dense residential catchment ensures steady footfall",
        weakness: "Limited industrial zoning restricts warehouse use",
      },
      {
        strength: "Strong healthcare and wellness demand from families",
        weakness: "Narrow internal roads make logistics difficult",
      },
      {
        strength: "Well-connected via metro and arterial roads",
        weakness: "Commercial rents rising faster than peripheral areas",
      },
      {
        strength: "Established neighborhood trust drives walk-in traffic",
        weakness: "Parking congestion during peak hours",
      },
    ],
    nearbyBusinessInfra: [
      { name: "Vaishali Nagar Metro Station", type: "Transit", distance: "0.5 km" },
      { name: "Triton Mall", type: "Shopping Complex", distance: "1.2 km" },
      { name: "SBI Branch Vaishali Nagar", type: "Bank", distance: "0.3 km" },
      { name: "Vaishali Circle Market", type: "Commercial Hub", distance: "0.8 km" },
      { name: "Manipal Hospital", type: "Hospital", distance: "1.5 km" },
    ],
    commercialRentRange: { min: 25000, max: 80000 },
    footfallLevel: "High",
    businessMoveReadiness: 78,
  },
  {
    areaSlug: "malviya-nagar",
    areaName: "Malviya Nagar",
    businessFit: {
      officeFit: 72,
      retailFit: 80,
      warehouseFit: 15,
      coachingFit: 78,
      clinicFit: 90,
      employeeAccess: 80,
      customerAccess: 85,
      visibility: 75,
      parking: 65,
      logisticsReadiness: 20,
      businessEcosystem: 72,
    },
    bestForBusiness: [
      "Medical clinics",
      "Diagnostic labs",
      "Pharmacy retail",
      "Professional services",
    ],
    notIdealForBusiness: [
      "Warehousing",
      "Manufacturing",
      "Logistics",
    ],
    businessTradeoffs: [
      {
        strength: "Proximity to SMS Hospital creates strong medical referral traffic",
        weakness: "Parking is limited and often congested near main road",
      },
      {
        strength: "Affluent residential base supports premium service businesses",
        weakness: "High competition in medical and retail segments",
      },
      {
        strength: "Excellent connectivity via Tonk Road and JLN Marg",
        weakness: "No industrial zoning — unsuitable for manufacturing",
      },
      {
        strength: "Established reputation as a medical and professional services corridor",
        weakness: "Rising rents are squeezing margins for small businesses",
      },
    ],
    nearbyBusinessInfra: [
      { name: "SMS Hospital", type: "Hospital", distance: "1.0 km" },
      { name: "Malviya Nagar Railway Station", type: "Transit", distance: "0.8 km" },
      { name: "Axis Bank Branch", type: "Bank", distance: "0.2 km" },
      { name: "Central Park", type: "Landmark", distance: "0.5 km" },
      { name: "Gaurav Tower", type: "Commercial Hub", distance: "2.0 km" },
      { name: "ICICI Bank ATM Cluster", type: "Bank", distance: "0.4 km" },
    ],
    commercialRentRange: { min: 20000, max: 65000 },
    footfallLevel: "High",
    businessMoveReadiness: 82,
  },
  {
    areaSlug: "c-scheme",
    areaName: "C-Scheme",
    businessFit: {
      officeFit: 95,
      retailFit: 92,
      warehouseFit: 5,
      coachingFit: 60,
      clinicFit: 70,
      employeeAccess: 90,
      customerAccess: 95,
      visibility: 98,
      parking: 60,
      logisticsReadiness: 10,
      businessEcosystem: 95,
    },
    bestForBusiness: [
      "Corporate offices",
      "Premium retail",
      "Consulting firms",
      "Financial services",
      "Brand showrooms",
    ],
    notIdealForBusiness: [
      "Budget businesses",
      "Warehousing",
      "Manufacturing",
    ],
    businessTradeoffs: [
      {
        strength: "Jaipur's most prestigious business address — instant credibility",
        weakness: "Premium rents are among the highest in the city",
      },
      {
        strength: "Maximum visibility and walk-in traffic from affluent clientele",
        weakness: "Severe parking crunch during business hours",
      },
      {
        strength: "Dense ecosystem of banks, law firms, and corporate neighbors",
        weakness: "Not viable for cost-sensitive or bootstrapped businesses",
      },
      {
        strength: "Excellent metro and bus connectivity for employees and clients",
        weakness: "Limited floor plate sizes in older buildings",
      },
    ],
    nearbyBusinessInfra: [
      { name: "Gaurav Tower", type: "Commercial Complex", distance: "0.3 km" },
      { name: "Prithviraj Road", type: "Premium Office Corridor", distance: "0.2 km" },
      { name: "HDFC Bank Regional Office", type: "Bank", distance: "0.4 km" },
      { name: "Rajasthan High Court", type: "Government", distance: "1.0 km" },
      { name: "Metro Station Secretariat", type: "Transit", distance: "0.8 km" },
      { name: "World Trade Park", type: "Shopping Mall", distance: "1.5 km" },
    ],
    commercialRentRange: { min: 50000, max: 200000 },
    footfallLevel: "Very High",
    businessMoveReadiness: 90,
  },
  {
    areaSlug: "mansarovar",
    areaName: "Mansarovar",
    businessFit: {
      officeFit: 68,
      retailFit: 72,
      warehouseFit: 35,
      coachingFit: 80,
      clinicFit: 75,
      employeeAccess: 78,
      customerAccess: 75,
      visibility: 65,
      parking: 80,
      logisticsReadiness: 45,
      businessEcosystem: 60,
    },
    bestForBusiness: [
      "Coaching institutes",
      "Tuition centers",
      "Budget retail",
      "Small offices",
      "Service businesses",
    ],
    notIdealForBusiness: [
      "Premium retail",
      "Brand showrooms",
      "Corporate headquarters",
    ],
    businessTradeoffs: [
      {
        strength: "Massive student population creates strong demand for coaching and education",
        weakness: "Lacks the premium image needed for high-end clients",
      },
      {
        strength: "Affordable rents allow higher margins for budget-conscious businesses",
        weakness: "Commercial infrastructure is less developed than central areas",
      },
      {
        strength: "Metro connectivity and wide roads make commuting easy",
        weakness: "Footfall is moderate — not ideal for impulse-buy retail",
      },
      {
        strength: "Ample parking space compared to congested city-center areas",
        weakness: "Brand visibility is lower due to residential-heavy landscape",
      },
    ],
    nearbyBusinessInfra: [
      { name: "Mansarovar Metro Station", type: "Transit", distance: "0.3 km" },
      { name: "Mansarovar Plaza", type: "Shopping Complex", distance: "0.6 km" },
      { name: "Bank of Baroda Branch", type: "Bank", distance: "0.4 km" },
      { name: "Kota Coaching Hub (Local)", type: "Education Cluster", distance: "1.0 km" },
      { name: "Durgapura Railway Station", type: "Transit", distance: "2.0 km" },
    ],
    commercialRentRange: { min: 12000, max: 40000 },
    footfallLevel: "Moderate",
    businessMoveReadiness: 72,
  },
  {
    areaSlug: "jagatpura",
    areaName: "Jagatpura",
    businessFit: {
      officeFit: 85,
      retailFit: 50,
      warehouseFit: 55,
      coachingFit: 45,
      clinicFit: 55,
      employeeAccess: 82,
      customerAccess: 55,
      visibility: 50,
      parking: 85,
      logisticsReadiness: 60,
      businessEcosystem: 78,
    },
    bestForBusiness: [
      "IT offices",
      "Tech startups",
      "Back-office operations",
      "Data centers",
      "Small warehousing",
    ],
    notIdealForBusiness: [
      "Customer-facing retail",
      "Walk-in clinics",
      "Coaching centers",
    ],
    businessTradeoffs: [
      {
        strength: "Proximity to Mahindra SEZ and Infosys attracts tech talent",
        weakness: "Low walk-in customer traffic limits retail viability",
      },
      {
        strength: "Affordable rents with large floor plates available",
        weakness: "Area is still developing — limited social infrastructure",
      },
      {
        strength: "Excellent parking and wide roads for employee commuting",
        weakness: "Public transport options are still catching up",
      },
      {
        strength: "Growing IT ecosystem creates B2B networking opportunities",
        weakness: "Brand visibility is minimal for consumer-facing businesses",
      },
    ],
    nearbyBusinessInfra: [
      { name: "Mahindra World City SEZ", type: "IT Park", distance: "2.0 km" },
      { name: "Infosys Jaipur Campus", type: "IT Park", distance: "3.0 km" },
      { name: "Jagatpura Railway Station", type: "Transit", distance: "1.5 km" },
      { name: "HDFC Bank ATM", type: "Bank", distance: "0.5 km" },
      { name: "Jagatpura Flyover Junction", type: "Transport Hub", distance: "1.0 km" },
      { name: "Sitapura Link Road", type: "Logistics Corridor", distance: "2.5 km" },
    ],
    commercialRentRange: { min: 15000, max: 55000 },
    footfallLevel: "Moderate",
    businessMoveReadiness: 75,
  },
  {
    areaSlug: "tonk-road",
    areaName: "Tonk Road",
    businessFit: {
      officeFit: 88,
      retailFit: 85,
      warehouseFit: 40,
      coachingFit: 65,
      clinicFit: 70,
      employeeAccess: 85,
      customerAccess: 88,
      visibility: 92,
      parking: 70,
      logisticsReadiness: 50,
      businessEcosystem: 85,
    },
    bestForBusiness: [
      "Corporate offices",
      "Showrooms",
      "Banks & financial services",
      "Consulting",
      "IT companies",
    ],
    notIdealForBusiness: [
      "Budget operations",
      "Heavy logistics",
      "Manufacturing",
    ],
    businessTradeoffs: [
      {
        strength: "Prime arterial road with maximum vehicular visibility",
        weakness: "Road-facing rents carry a significant premium",
      },
      {
        strength: "Strong commercial ecosystem with banks, offices, and showrooms",
        weakness: "Parking can be challenging during peak business hours",
      },
      {
        strength: "Excellent employee accessibility via bus routes and road network",
        weakness: "Traffic congestion can slow client visits during rush hours",
      },
    ],
    nearbyBusinessInfra: [
      { name: "Lalkothi Business District", type: "Commercial Hub", distance: "0.5 km" },
      { name: "SBI Regional Office", type: "Bank", distance: "0.3 km" },
      { name: "ICICI Prudential Office", type: "Financial Services", distance: "0.8 km" },
      { name: "Tonk Road Bus Terminal", type: "Transit", distance: "0.4 km" },
      { name: "Jawahar Circle", type: "Landmark", distance: "2.0 km" },
      { name: "South City Mall", type: "Shopping Mall", distance: "3.0 km" },
    ],
    commercialRentRange: { min: 30000, max: 120000 },
    footfallLevel: "High",
    businessMoveReadiness: 85,
  },
  {
    areaSlug: "sitapura",
    areaName: "Sitapura",
    businessFit: {
      officeFit: 40,
      retailFit: 20,
      warehouseFit: 95,
      coachingFit: 15,
      clinicFit: 20,
      employeeAccess: 50,
      customerAccess: 25,
      visibility: 30,
      parking: 95,
      logisticsReadiness: 98,
      businessEcosystem: 55,
    },
    bestForBusiness: [
      "Warehouses",
      "Manufacturing",
      "Distribution centers",
      "E-commerce fulfillment",
      "Cold storage",
    ],
    notIdealForBusiness: [
      "Customer-facing",
      "Retail",
      "Professional services",
      "Healthcare",
    ],
    businessTradeoffs: [
      {
        strength: "Purpose-built industrial zone with logistics-ready infrastructure",
        weakness: "Extremely low footfall — no walk-in customer potential",
      },
      {
        strength: "Lowest commercial rents in Jaipur with massive floor plates",
        weakness: "Limited public transport makes employee commuting difficult",
      },
      {
        strength: "Direct NH-12 access and wide roads for heavy vehicle movement",
        weakness: "No retail or services ecosystem — workers rely on outside areas",
      },
      {
        strength: "3-phase industrial power and zoning permits for manufacturing",
        weakness: "Perception as an industrial zone limits professional service appeal",
      },
    ],
    nearbyBusinessInfra: [
      { name: "RIICO Industrial Area Phase I-III", type: "Industrial Zone", distance: "0.5 km" },
      { name: "NH-12 Highway Access", type: "Logistics Corridor", distance: "1.0 km" },
      { name: "Sitapura RIICO Office", type: "Government", distance: "0.8 km" },
      { name: "Indian Oil Depot", type: "Industrial", distance: "2.0 km" },
      { name: "Sanganer Airport Cargo Terminal", type: "Logistics", distance: "5.0 km" },
      { name: "PNB Industrial Branch", type: "Bank", distance: "1.2 km" },
    ],
    commercialRentRange: { min: 8000, max: 35000 },
    footfallLevel: "Low",
    businessMoveReadiness: 70,
  },
  {
    areaSlug: "raja-park",
    areaName: "Raja Park",
    businessFit: {
      officeFit: 60,
      retailFit: 88,
      warehouseFit: 10,
      coachingFit: 75,
      clinicFit: 72,
      employeeAccess: 78,
      customerAccess: 90,
      visibility: 85,
      parking: 45,
      logisticsReadiness: 15,
      businessEcosystem: 70,
    },
    bestForBusiness: [
      "Retail shops",
      "Food businesses",
      "Coaching centers",
      "Salons & wellness",
      "Service businesses",
    ],
    notIdealForBusiness: [
      "Large offices",
      "Warehousing",
      "Logistics",
      "Manufacturing",
    ],
    businessTradeoffs: [
      {
        strength: "One of Jaipur's highest footfall areas — excellent for retail",
        weakness: "Severe parking shortage frustrates car-driving customers",
      },
      {
        strength: "Vibrant street-level commercial activity drives impulse purchases",
        weakness: "Narrow lanes restrict delivery vehicle access",
      },
      {
        strength: "Central location with strong bus connectivity",
        weakness: "Crowded market area creates noise and congestion",
      },
      {
        strength: "Affordable rents compared to C-Scheme with similar customer access",
        weakness: "Limited options for large office or floor plate requirements",
      },
    ],
    nearbyBusinessInfra: [
      { name: "Raja Park Main Market", type: "Commercial Hub", distance: "0.1 km" },
      { name: "Chomu House Circle", type: "Transport Hub", distance: "0.5 km" },
      { name: "Punjab National Bank Branch", type: "Bank", distance: "0.2 km" },
      { name: "Ganpati Plaza", type: "Commercial Complex", distance: "1.5 km" },
      { name: "SMS Stadium", type: "Landmark", distance: "1.0 km" },
    ],
    commercialRentRange: { min: 18000, max: 60000 },
    footfallLevel: "Very High",
    businessMoveReadiness: 76,
  },
];

export function getCommercialProfile(
  areaSlug: string
): CommercialAreaProfile | undefined {
  return commercialAreaProfiles.find((p) => p.areaSlug === areaSlug);
}
