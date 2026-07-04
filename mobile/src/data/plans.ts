export interface Plan {
  id: string;
  name: string;
  audience: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

export const plans: Plan[] = [
  {
    id: "1",
    name: "Starter",
    audience: "For Tenants",
    price: "Free",
    period: "",
    description: "Essential AI search and discovery for finding your next rental.",
    features: [
      "AI-powered property search",
      "Smart matching with AI Match Score",
      "Basic property details & images",
      "Save up to 10 properties",
      "Email alerts for new listings",
      "Community support",
    ],
    highlighted: false,
    cta: "Start Searching",
  },
  {
    id: "2",
    name: "Tenant Pro",
    audience: "For Serious Renters",
    price: "₹499",
    period: "/month",
    description:
      "Priority access, trust reports, and AI negotiation insights for serious renters.",
    features: [
      "Everything in Starter",
      "Priority access to verified listings",
      "Detailed Trust Score reports",
      "RentIQ™ fair pricing insights",
      "AI-assisted negotiation tips",
      "Unlimited saved properties",
      "WhatsApp alerts",
      "Priority support",
    ],
    highlighted: true,
    cta: "Get Tenant Pro",
  },
  {
    id: "3",
    name: "Landlord Essentials",
    audience: "For Property Owners",
    price: "₹999",
    period: "/month",
    description:
      "List, verify, and manage your rental properties with AI intelligence.",
    features: [
      "Up to 5 property listings",
      "Property verification badge",
      "RentIQ™ AI pricing suggestions",
      "Tenant inquiry management",
      "Basic RentalOS™ dashboard",
      "Rent collection tracking",
      "Agreement reminders",
      "Email support",
    ],
    highlighted: false,
    cta: "Start Listing",
  },
  {
    id: "4",
    name: "Landlord Pro",
    audience: "For Portfolio Owners",
    price: "₹2,499",
    period: "/month",
    description:
      "Full lifecycle management for landlords with multiple properties.",
    features: [
      "Unlimited property listings",
      "Priority verification & badges",
      "Advanced RentIQ™ analytics",
      "Full RentalOS™ dashboard",
      "Automated rent collection",
      "Maintenance management system",
      "Renewal & vacancy alerts",
      "Tenant screening reports",
      "Dedicated account manager",
      "Phone & WhatsApp support",
    ],
    highlighted: true,
    cta: "Get Landlord Pro",
  },
  {
    id: "5",
    name: "Enterprise",
    audience: "For Businesses & Institutions",
    price: "Custom",
    period: "",
    description:
      "Tailored solutions for enterprises, co-living operators, and institutional landlords.",
    features: [
      "Everything in Landlord Pro",
      "Custom SLA & integrations",
      "Bulk property onboarding",
      "API access",
      "Custom trust verification flows",
      "Multi-location management",
      "Advanced analytics & reporting",
      "Dedicated success team",
      "Custom pricing",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
  {
    id: "6",
    name: "Co-Living Resident",
    audience: "For Co-Living Tenants",
    price: "₹299",
    period: "/month",
    description:
      "Smart tools for co-living residents to find the perfect room, community, and lifestyle match.",
    features: [
      "AI-powered room matching",
      "Roommate compatibility scoring",
      "Community access & event calendar",
      "Flexible stay options (3-month minimum)",
      "Maintenance requests included",
      "Move-in coordination support",
      "Noise & lifestyle preference matching",
      "WhatsApp community groups",
    ],
    highlighted: false,
    cta: "Find My Room",
  },
  {
    id: "7",
    name: "Co-Living Operator",
    audience: "For Co-Living Space Operators",
    price: "₹4,999",
    period: "/month",
    description:
      "End-to-end management platform for co-living operators running multiple properties and rooms.",
    features: [
      "Multi-property dashboard",
      "Occupancy optimization AI",
      "Automated rent collection & invoicing",
      "Community management tools",
      "AI-powered tenant screening",
      "Room allocation & transfer management",
      "Maintenance SLA tracking",
      "Revenue analytics & forecasting",
      "Event & amenity scheduling",
      "Dedicated operator success manager",
    ],
    highlighted: true,
    cta: "Get Operator Plan",
  },
  {
    id: "8",
    name: "Co-Working Manager",
    audience: "For Co-Working Space Owners",
    price: "₹3,499",
    period: "/month",
    description:
      "All-in-one management suite for co-working space owners to maximize utilization and member satisfaction.",
    features: [
      "Desk & cabin booking management",
      "Membership & subscription management",
      "Meeting room scheduling system",
      "Real-time utilization analytics",
      "Automated billing & invoicing",
      "Visitor management & access control",
      "Member onboarding workflows",
      "Amenity usage tracking",
      "Occupancy heatmaps & reports",
      "Priority listing on 99tolet search",
    ],
    highlighted: false,
    cta: "Get Manager Plan",
  },
];
