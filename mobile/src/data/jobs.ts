export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  experience: string;
  description: string;
  tags: string[];
}

export const jobs: Job[] = [
  {
    id: "1",
    title: "Senior ML Engineer — RentalBrain",
    department: "AI & Data Science",
    location: "Jaipur (Hybrid)",
    type: "Full-time",
    experience: "4–7 years",
    description:
      "Build and optimize the AI matching engine that powers intelligent property recommendations. Work with NLP, collaborative filtering, and real-time ranking systems.",
    tags: ["Python", "PyTorch", "NLP", "Recommendation Systems"],
  },
  {
    id: "2",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Jaipur (Hybrid)",
    type: "Full-time",
    experience: "3–6 years",
    description:
      "Build the next generation of rental UX — from AI-powered search to trust visualization. Work with Next.js, TypeScript, and Framer Motion on a product used by thousands.",
    tags: ["Next.js", "TypeScript", "React", "Tailwind"],
  },
  {
    id: "3",
    title: "Product Manager — Trust & Verification",
    department: "Product",
    location: "Jaipur",
    type: "Full-time",
    experience: "3–5 years",
    description:
      "Own the TrustShield™ product roadmap. Define verification flows, trust scoring algorithms, and user experiences that build confidence for both landlords and tenants.",
    tags: ["Product Strategy", "PropTech", "Trust Systems"],
  },
  {
    id: "4",
    title: "Data Analyst — Market Intelligence",
    department: "AI & Data Science",
    location: "Jaipur",
    type: "Full-time",
    experience: "2–4 years",
    description:
      "Analyze rental pricing data, micro-market trends, and demand patterns to power RentIQ™. Build dashboards and reports that landlords and tenants rely on for decision-making.",
    tags: ["SQL", "Python", "Analytics", "Real Estate Data"],
  },
  {
    id: "5",
    title: "Field Operations Lead",
    department: "Operations",
    location: "Jaipur",
    type: "Full-time",
    experience: "3–5 years",
    description:
      "Lead the on-ground verification team. Ensure every property listed meets 99tolet's quality and trust standards through physical inspections and document verification.",
    tags: ["Operations", "Real Estate", "Quality Assurance"],
  },
  {
    id: "6",
    title: "Content & Brand Strategist",
    department: "Marketing",
    location: "Jaipur (Hybrid)",
    type: "Full-time",
    experience: "2–4 years",
    description:
      "Shape 99tolet's voice and narrative. Create content that positions us as the AI leasing OS — from blog posts and market reports to product storytelling and brand campaigns.",
    tags: ["Content Strategy", "Brand", "PropTech", "Copywriting"],
  },
  {
    id: "7",
    title: "Co-Living Community Manager",
    department: "Operations",
    location: "Jaipur",
    type: "Full-time",
    experience: "2–4 years",
    description:
      "Manage the day-to-day experience of co-living residents across multiple properties. Organize community events, handle resident onboarding and conflict resolution, coordinate with housekeeping and maintenance teams, and ensure high resident satisfaction and retention. You will be the face of the co-living brand on the ground.",
    tags: ["Community Management", "Co-Living", "Hospitality", "Operations"],
  },
  {
    id: "8",
    title: "Co-Working Space Designer",
    department: "Design",
    location: "Jaipur (Hybrid)",
    type: "Full-time",
    experience: "3–5 years",
    description:
      "Design functional, inspiring co-working environments that maximize productivity and collaboration. Work on space planning, furniture selection, acoustic design, lighting, and brand-aligned aesthetics for 99tolet's partner co-working spaces. Collaborate with architects and operators to create spaces that attract and retain members.",
    tags: ["Interior Design", "Space Planning", "Co-Working", "Architecture"],
  },
  {
    id: "9",
    title: "AI Recommendation Engineer",
    department: "AI & Data Science",
    location: "Jaipur (Hybrid)",
    type: "Full-time",
    experience: "3–6 years",
    description:
      "Build cross-category recommendation systems that match users to residential, co-living, co-working, commercial, and industrial properties. Design and implement models for lifestyle-based matching, roommate compatibility scoring, workspace-preference learning, and commute-optimized multi-property suggestions. Work at the intersection of deep learning, graph neural networks, and real-time ranking to power the smartest property discovery engine in India.",
    tags: ["Python", "TensorFlow", "Graph Neural Networks", "Recommendation Systems", "Cross-Category AI"],
  },
];
