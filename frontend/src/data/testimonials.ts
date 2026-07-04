export interface Testimonial {
  id: string;
  name: string;
  role: string;
  type: "tenant" | "landlord" | "enterprise" | "broker";
  quote: string;
  rating: number;
  location: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ananya Mehta",
    role: "Family Tenant",
    type: "tenant",
    quote:
      "We were relocating to Jaipur with two kids and needed a verified, safe home fast. 99tolet's AI matched us to a perfect 3BHK in Vaishali Nagar with a verified landlord. The trust score gave us confidence before we even visited. Moved in within 8 days.",
    rating: 5,
    location: "Vaishali Nagar, Jaipur",
  },
  {
    id: "2",
    name: "Sanjay Khandelwal",
    role: "Property Owner — 12 Units",
    type: "landlord",
    quote:
      "I was losing ₹40,000/month on vacancy across my 12 units. 99tolet's AI pricing helped me set competitive rents, and TrustShield verified tenants before I even met them. My portfolio is now 100% occupied with quality tenants. The RentalOS dashboard is a game-changer for rent tracking.",
    rating: 5,
    location: "Malviya Nagar, Jaipur",
  },
  {
    id: "3",
    name: "Deepak Ventures Pvt Ltd",
    role: "Enterprise — 200+ Employee Office",
    type: "enterprise",
    quote:
      "Finding commercial space for 200 employees with specific infrastructure needs was a nightmare until 99tolet. Their AI understood our requirements — high-speed internet readiness, parking for 50, and proximity to the metro. Closed the lease in under 3 weeks with full verification.",
    rating: 5,
    location: "Tonk Road, Jaipur",
  },
  {
    id: "4",
    name: "Ramesh Gupta",
    role: "Independent Broker",
    type: "broker",
    quote:
      "I've been in the rental business for 15 years. 99tolet doesn't replace brokers — it makes us more efficient. The AI matching helps me find the right properties for my clients instantly, and the verification system means fewer wasted visits. My closings have doubled.",
    rating: 4,
    location: "Jaipur",
  },
  {
    id: "5",
    name: "Arjun Patel",
    role: "Co-Living Resident",
    type: "tenant",
    quote:
      "I moved to Jaipur from Ahmedabad for an IT job and knew nobody in the city. 99tolet's AI matched me to a co-living space in Malviya Nagar with roommates who had similar work schedules and interests. Within a week I had a furnished room, a built-in social circle, and a 10-minute commute. The all-inclusive rent means I never worry about bills. Best decision I made for my move.",
    rating: 5,
    location: "Malviya Nagar, Jaipur",
  },
  {
    id: "6",
    name: "Neha Sharma",
    role: "Co-Working Member — Startup Founder",
    type: "enterprise",
    quote:
      "When I started my EdTech startup, I needed an affordable workspace that could grow with us. 99tolet found us a hot desk at Catalyst Workspace in C-Scheme. As we grew from 2 to 12 people, the platform helped us seamlessly upgrade to a private cabin on Tonk Road — all within our budget. The networking events at the co-working space even helped us find our first investor. 99tolet understands that workspace needs evolve.",
    rating: 5,
    location: "C-Scheme, Jaipur",
  },
  {
    id: "7",
    name: "Urban Nest Properties",
    role: "Co-Living Operator — 50+ Rooms",
    type: "landlord",
    quote:
      "Managing 50+ co-living rooms across 5 properties in Jaipur was chaos before 99tolet. Their operator dashboard gives us real-time occupancy tracking, automated rent collection, and AI-powered pricing that adjusts to demand. Our occupancy went from 72% to 95% in 4 months, and tenant complaints dropped by half thanks to the maintenance SLA system. The tenant screening has also dramatically reduced problem residents.",
    rating: 5,
    location: "Jaipur",
  },
];
