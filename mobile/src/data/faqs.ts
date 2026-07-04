export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "How is 99tolet different from NoBroker or 99acres?",
    answer:
      "99tolet is not just a listing platform — it's an AI-native leasing operating system. While traditional portals focus on property discovery, we cover the entire rental lifecycle: AI-powered matching (RentalBrain™), dual-sided verification (TrustShield™), AI rental pricing intelligence (RentIQ™), and post-lease management (RentalOS™). We don't just help you find a rental — we help you make better leasing decisions and manage the entire relationship.",
    category: "General",
  },
  {
    id: "2",
    question: "What does the AI Match Score mean?",
    answer:
      "The AI Match Score (powered by RentalBrain™) is a percentage that indicates how well a property matches your specific requirements, preferences, and lifestyle. Unlike simple filter-based results, our AI considers factors like commute patterns, neighborhood characteristics, lifestyle fit, budget optimization, and even factors you may not have explicitly stated. A score above 85% indicates a strong match.",
    category: "AI & Search",
  },
  {
    id: "3",
    question: "How does property and landlord verification work?",
    answer:
      "TrustShield™ performs dual-sided verification. For landlords: identity verification (Aadhaar/PAN), property ownership document validation, and optional on-ground property inspection. For tenants: identity verification, employment/income verification, and rental history check. Both parties receive a Trust Score visible on the platform. Verified badges are only awarded after successful completion of all verification steps.",
    category: "Trust & Verification",
  },
  {
    id: "4",
    question: "Is 99tolet free for tenants?",
    answer:
      "Basic search, AI matching, and property discovery are free for all tenants. Premium features like priority access to verified listings, detailed trust reports, AI-assisted negotiation insights, and RentalOS™ post-lease tools are available through our affordable subscription plans. We believe core rental search should be accessible to everyone.",
    category: "Pricing",
  },
  {
    id: "5",
    question: "How accurate is RentIQ™ pricing?",
    answer:
      "RentIQ™ analyzes 50+ variables including recent comparable transactions, locality demand trends, property condition, amenity premiums, and seasonal patterns. In our testing across 500+ transactions, RentIQ™ pricing was within 5% of final agreed rent in 78% of cases. Properties priced within RentIQ's fair range leased 40% faster. The system continuously improves as it processes more market data.",
    category: "Pricing",
  },
  {
    id: "6",
    question: "What cities does 99tolet operate in?",
    answer:
      "99tolet currently operates in Jaipur with deep coverage across all major localities including Vaishali Nagar, Malviya Nagar, C-Scheme, Mansarovar, Jagatpura, Tonk Road, and Sitapura. We are actively expanding to Jodhpur, Udaipur, and other Tier-1 and Tier-2 cities across India. Sign up for city launch notifications on our Coming Soon page.",
    category: "General",
  },
  {
    id: "7",
    question: "Can I list my property on 99tolet?",
    answer:
      "Yes. Property owners can list residential, commercial, industrial, co-living, and co-working properties for free. Our AI pricing engine will suggest an optimal rent, and our verification team will validate your property to earn a Verified badge — significantly increasing tenant interest and trust. Premium listing features and RentalOS™ property management tools are available through our landlord subscription plans.",
    category: "For Landlords",
  },
  {
    id: "8",
    question: "What happens after the lease is signed?",
    answer:
      "Unlike other platforms that disappear after deal closure, 99tolet's RentalOS™ manages the entire post-lease lifecycle. This includes automated rent collection and payment tracking, maintenance request management with SLA tracking, agreement timeline with renewal alerts, structured move-out process with deposit reconciliation, and dispute support. Think of it as an operating system for your rental relationship.",
    category: "RentalOS",
  },
  {
    id: "9",
    question: "What co-living options does 99tolet offer?",
    answer:
      "99tolet offers a comprehensive range of co-living options to suit every budget and lifestyle. Choose from Private Rooms with attached bathrooms for full privacy, Shared Rooms for budget-friendly living with a compatible roommate, Entire Apartments where you share a fully furnished 2BHK or 3BHK with AI-matched flatmates, or Pod Living for ultra-affordable micro-living spaces. Every co-living listing includes community features like shared kitchens, lounges, event calendars, and housekeeping. Our AI matches you not just to a room, but to a community — analyzing lifestyle preferences, work schedules, cleanliness habits, and social preferences to find your ideal living situation. Flexible stays starting from 3 months with deposits as low as 1 month's rent make it easy to get started.",
    category: "Co-Living",
  },
  {
    id: "10",
    question: "How does 99tolet help co-working space seekers?",
    answer:
      "99tolet is the first platform to bring AI-powered matching to co-working discovery. Whether you need a Hot Desk for flexible daily use, a Dedicated Desk for a consistent workspace, a Private Cabin for your growing team, a Meeting Room for client presentations, or a Virtual Office for a professional business address — our AI analyzes your work style, team size, budget, location preferences, and growth plans to recommend the perfect workspace. Every co-working listing includes detailed information about amenities, community events, internet speed benchmarks, noise levels, and occupancy rates so you know exactly what you are getting before you visit.",
    category: "Co-Working",
  },
  {
    id: "11",
    question: "How does the AI recommend properties across all categories?",
    answer:
      "RentalBrain™ uses cross-category intelligence to understand your complete living and working needs. If you are a startup founder looking for both a co-living space and a co-working desk, the AI considers both searches together — optimizing for commute between your home and workspace, total monthly budget across both, and neighborhood overlap for convenience. The system analyzes 100+ signals including lifestyle patterns, commute preferences, budget elasticity, amenity priorities, neighborhood safety scores, transit accessibility, and even noise level tolerance to deliver recommendations that go far beyond simple filter matching. The AI continuously learns from your interactions, refining its understanding of what matters most to you.",
    category: "AI & Search",
  },
  {
    id: "12",
    question: "What makes 99tolet's neighborhood intelligence special?",
    answer:
      "Every property on 99tolet comes with rich neighborhood data powered by our proprietary LocalityPulse™ engine. This includes a Walk Score (0-100) measuring walkability to daily essentials like groceries, pharmacies, and restaurants; a Safety Score based on crime data, street lighting, and community feedback; transit proximity showing exact distances to bus stops, metro stations, and railway stations; a Noise Level indicator (Quiet, Moderate, Active) based on time-of-day sound mapping; and amenity density analysis covering schools, hospitals, parks, gyms, and entertainment within a 2km radius. For families, we surface school proximity and playground access. For professionals, we highlight co-working spaces and cafes nearby. This hyperlocal intelligence helps you understand not just the property, but the life you will live around it.",
    category: "Neighborhood",
  },
  {
    id: "13",
    question: "How does CityFit™ help me choose the right neighborhood?",
    answer:
      "CityFit™ is 99tolet's AI-powered neighborhood scoring engine designed to match you with the right area — not just the right property. It generates personalized neighborhood scores based on your profile: families get scored on school quality, park access, healthcare proximity, and evening safety; students are matched by campus distance, affordable dining, and public transport; professionals are evaluated on commute time, co-working access, and lifestyle options. CityFit™ analyzes 8+ area fit signals including school and hospital proximity, daily essentials walkability, commute analysis with real traffic data, lifestyle and community matching, green space access, and safety infrastructure. You can compare multiple neighborhoods side-by-side and get a clear, data-driven picture of where your daily life will work best — before you even visit.",
    category: "CityFit",
  },
  {
    id: "14",
    question: "Does 99tolet help me settle into a new city after renting?",
    answer:
      "Yes. 99tolet goes beyond just finding you a home — we help you settle into your new city with confidence. Our settlement support includes a structured first-30-days checklist covering utility setup (electricity, water, gas, internet), local registrations (police verification, society registration, address updates), and essential service discovery. The platform surfaces nearby essentials like grocery stores, pharmacies, hospitals, banks, and fitness centers based on your new address. You also get guidance on community setup — connecting with resident associations, local groups, and neighborhood communities. For utility connections, we provide step-by-step guides specific to your city and locality. Whether you are moving across the state or across the country, 99tolet ensures you are not just housed but truly settled.",
    category: "Settlement",
  },
];
