export interface NearbyPlace {
  name: string;
  type:
    | "school"
    | "hospital"
    | "park"
    | "shopping"
    | "college"
    | "gym"
    | "restaurant"
    | "metro"
    | "bus";
  distance: string;
  rating?: number;
}

export interface Area {
  id: string;
  slug: string;
  name: string;
  city: string;
  tagline: string;
  description: string;
  image: string;
  rentRange: { min: number; max: number };
  walkScore: number;
  safetyScore: number;
  transitScore: number;
  familyScore: number;
  studentScore: number;
  professionalScore: number;
  noiseLevel: "Quiet" | "Moderate" | "Active";
  bestFor: string[];
  watchOut: string[];
  dailyLifeHighlights: string[];
  nearbyPlaces: NearbyPlace[];
  commuteToCenter: string;
  avgRentTrend: string;
  demand: "Very High" | "High" | "Moderate" | "Emerging";
  propertyTypes: string[];
  lifestyleTags: string[];
  pros: string[];
  cons: string[];
}

export const areas: Area[] = [
  // ─── 1. Vaishali Nagar ──────────────────────────────────────────────
  {
    id: "area-001",
    slug: "vaishali-nagar",
    name: "Vaishali Nagar",
    city: "Jaipur",
    tagline: "Jaipur's most sought-after family neighborhood",
    description:
      "Vaishali Nagar is the gold standard for family living in Jaipur. Tree-lined roads, reputed schools within walking distance, and a strong sense of community make it the first choice for families relocating to the Pink City. Weekend mornings see families at the numerous parks while evenings come alive at GT Central Mall.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    rentRange: { min: 15000, max: 45000 },
    walkScore: 82,
    safetyScore: 92,
    transitScore: 74,
    familyScore: 95,
    studentScore: 60,
    professionalScore: 78,
    noiseLevel: "Moderate",
    bestFor: [
      "Families with children",
      "Retired professionals",
      "Mid-to-senior professionals",
    ],
    watchOut: [
      "Peak-hour traffic on main road",
      "Parking crunch near markets",
      "Higher rents compared to outer areas",
    ],
    dailyLifeHighlights: [
      "Morning walks at Vaishali Park or Vyas Park",
      "Kids walk to DPS or Seedling School in under 10 minutes",
      "Evening grocery runs at Vaishali Market or GT Central",
      "Weekend dining at the numerous family restaurants on main road",
    ],
    nearbyPlaces: [
      { name: "DPS Jaipur", type: "school", distance: "0.8 km", rating: 4.5 },
      {
        name: "Seedling Modern School",
        type: "school",
        distance: "1.2 km",
        rating: 4.3,
      },
      {
        name: "St Xavier's School",
        type: "school",
        distance: "1.5 km",
        rating: 4.4,
      },
      {
        name: "Fortis Escorts Hospital",
        type: "hospital",
        distance: "2.0 km",
        rating: 4.6,
      },
      {
        name: "Narayana Multispeciality",
        type: "hospital",
        distance: "3.5 km",
        rating: 4.4,
      },
      {
        name: "Vaishali Central Park",
        type: "park",
        distance: "0.5 km",
        rating: 4.2,
      },
      {
        name: "Vyas Park",
        type: "park",
        distance: "0.9 km",
        rating: 4.0,
      },
      {
        name: "GT Central Mall",
        type: "shopping",
        distance: "1.0 km",
        rating: 4.3,
      },
      {
        name: "Vaishali Market",
        type: "shopping",
        distance: "0.4 km",
        rating: 4.1,
      },
      {
        name: "Vaishali Nagar Metro Station",
        type: "metro",
        distance: "1.8 km",
        rating: 4.0,
      },
      {
        name: "Annapurna Restaurant",
        type: "restaurant",
        distance: "0.6 km",
        rating: 4.4,
      },
      {
        name: "Gold's Gym Vaishali",
        type: "gym",
        distance: "1.1 km",
        rating: 4.2,
      },
    ],
    commuteToCenter: "25 min by car, 35 min by metro",
    avgRentTrend: "+8% year-over-year",
    demand: "Very High",
    propertyTypes: ["2BHK Apartment", "3BHK Apartment", "4BHK Villa", "Independent Floor"],
    lifestyleTags: ["Family-Friendly", "Parks Nearby", "School Hub", "Well-Connected", "Safe Neighborhood"],
    pros: [
      "Top-rated schools within walking distance",
      "Excellent safety record with active RWA",
      "Green spaces and parks throughout the area",
      "Strong community with regular social events",
    ],
    cons: [
      "Rush-hour congestion on the main arterial road",
      "Higher rental premiums versus comparable areas",
      "Limited nightlife and late-night dining options",
    ],
  },

  // ─── 2. Malviya Nagar ───────────────────────────────────────────────
  {
    id: "area-002",
    slug: "malviya-nagar",
    name: "Malviya Nagar",
    city: "Jaipur",
    tagline: "The medical and education powerhouse of Jaipur",
    description:
      "Malviya Nagar sits at the intersection of healthcare and education in Jaipur. With SMS Hospital, Manipal Hospital, and several coaching institutes nearby, the area draws medical students, working couples, and families who value proximity to top-tier healthcare. Central Park is the crown jewel — a sprawling green oasis perfect for morning jogs.",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    rentRange: { min: 12000, max: 35000 },
    walkScore: 85,
    safetyScore: 90,
    transitScore: 80,
    familyScore: 88,
    studentScore: 75,
    professionalScore: 82,
    noiseLevel: "Active",
    bestFor: [
      "Families near hospitals",
      "Medical students",
      "Working couples",
    ],
    watchOut: [
      "Ambulance noise near hospital zones",
      "Heavy traffic on Tonk Road intersection",
      "Parking scarce near coaching hubs",
    ],
    dailyLifeHighlights: [
      "Morning jogs at Jaipur Central Park — one of the largest in Rajasthan",
      "Quick access to SMS Hospital and Manipal for any health needs",
      "Coaching institutes and libraries within a short commute",
      "Vibrant street food scene along the inner lanes",
    ],
    nearbyPlaces: [
      {
        name: "SMS Hospital",
        type: "hospital",
        distance: "2.5 km",
        rating: 4.2,
      },
      {
        name: "Manipal Hospital",
        type: "hospital",
        distance: "1.8 km",
        rating: 4.5,
      },
      {
        name: "MNIT Jaipur",
        type: "college",
        distance: "1.0 km",
        rating: 4.6,
      },
      {
        name: "St. Angela Sophia School",
        type: "school",
        distance: "1.5 km",
        rating: 4.3,
      },
      {
        name: "Central Park Jaipur",
        type: "park",
        distance: "0.8 km",
        rating: 4.7,
      },
      {
        name: "Gaurav Tower Mall",
        type: "shopping",
        distance: "2.0 km",
        rating: 4.1,
      },
      {
        name: "Malviya Nagar Bus Stand",
        type: "bus",
        distance: "0.5 km",
        rating: 3.8,
      },
      {
        name: "Jaipur Central Metro",
        type: "metro",
        distance: "2.2 km",
        rating: 4.0,
      },
      {
        name: "Rawat Mishthan Bhandar",
        type: "restaurant",
        distance: "1.0 km",
        rating: 4.6,
      },
      {
        name: "Maheshwari Park",
        type: "park",
        distance: "1.2 km",
        rating: 4.0,
      },
    ],
    commuteToCenter: "15 min by car, 25 min by bus",
    avgRentTrend: "+6% year-over-year",
    demand: "High",
    propertyTypes: ["1BHK Apartment", "2BHK Apartment", "3BHK Apartment", "PG/Hostel"],
    lifestyleTags: ["Medical Hub", "Central Park Access", "Education Zone", "Well-Connected", "Foodie Haven"],
    pros: [
      "Proximity to premier hospitals and medical infrastructure",
      "Central Park is ideal for fitness enthusiasts",
      "Excellent public transport connectivity",
      "Balanced mix of affordability and amenities",
    ],
    cons: [
      "Noise levels higher near hospital zones",
      "Traffic bottlenecks during morning and evening rush",
      "Older buildings in some inner pockets",
    ],
  },

  // ─── 3. C-Scheme ───────────────────────────────────────────────────
  {
    id: "area-003",
    slug: "c-scheme",
    name: "C-Scheme",
    city: "Jaipur",
    tagline: "Premium address for Jaipur's elite professionals",
    description:
      "C-Scheme is the most prestigious residential and commercial address in Jaipur. Broad boulevards, heritage bungalows, upscale restaurants, and boutique offices define this area. It is where business meets lifestyle — think weekend brunches, art galleries, and a five-minute drive to the best of everything.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    rentRange: { min: 25000, max: 80000 },
    walkScore: 91,
    safetyScore: 96,
    transitScore: 85,
    familyScore: 70,
    studentScore: 50,
    professionalScore: 95,
    noiseLevel: "Moderate",
    bestFor: [
      "Senior executives",
      "Business owners",
      "Premium lifestyle seekers",
    ],
    watchOut: [
      "High rental costs across all property types",
      "Limited budget-friendly dining",
      "Parking charges at premium venues",
    ],
    dailyLifeHighlights: [
      "Morning coffee at artisan cafes on Ashok Marg",
      "Walking-distance access to top corporate offices",
      "Evening wind-down at Rajmandir or rooftop restaurants",
      "Weekend art walks and gallery hops",
    ],
    nearbyPlaces: [
      {
        name: "Rajmandir Cinema",
        type: "restaurant",
        distance: "0.5 km",
        rating: 4.7,
      },
      {
        name: "Niros Restaurant",
        type: "restaurant",
        distance: "0.8 km",
        rating: 4.6,
      },
      {
        name: "Birla Auditorium Garden",
        type: "park",
        distance: "1.2 km",
        rating: 4.5,
      },
      {
        name: "Crystal Palm Mall",
        type: "shopping",
        distance: "1.5 km",
        rating: 4.2,
      },
      {
        name: "Fortis Hospital C-Scheme",
        type: "hospital",
        distance: "2.0 km",
        rating: 4.5,
      },
      {
        name: "Maharaja Sawai Man Singh School",
        type: "school",
        distance: "1.8 km",
        rating: 4.4,
      },
      {
        name: "Gym One Premium",
        type: "gym",
        distance: "0.6 km",
        rating: 4.3,
      },
      {
        name: "Civil Lines Metro",
        type: "metro",
        distance: "1.0 km",
        rating: 4.1,
      },
      {
        name: "Bapu Bazar",
        type: "shopping",
        distance: "2.5 km",
        rating: 4.3,
      },
      {
        name: "Central Park (Statue Circle)",
        type: "park",
        distance: "1.0 km",
        rating: 4.6,
      },
    ],
    commuteToCenter: "5 min by car — it IS the center",
    avgRentTrend: "+10% year-over-year",
    demand: "Very High",
    propertyTypes: ["3BHK Apartment", "4BHK Penthouse", "Independent Bungalow", "Commercial Office"],
    lifestyleTags: ["Premium Living", "Walkable", "Café Culture", "Business District", "Heritage Vibe"],
    pros: [
      "Most walkable neighborhood in Jaipur",
      "Unmatched dining, shopping, and nightlife",
      "Top-tier safety with round-the-clock policing",
      "Prestigious address for businesses and professionals",
    ],
    cons: [
      "Highest rental prices in the city",
      "Limited availability — demand far exceeds supply",
    ],
  },

  // ─── 4. Mansarovar ─────────────────────────────────────────────────
  {
    id: "area-004",
    slug: "mansarovar",
    name: "Mansarovar",
    city: "Jaipur",
    tagline: "Affordable living with metro-powered connectivity",
    description:
      "Mansarovar strikes the perfect balance between affordability and access. One of Jaipur's largest planned residential sectors, it offers metro connectivity, budget-friendly rents, and all the essentials within reach. Ideal for students, first-time renters, and families watching their budget without compromising on convenience.",
    image:
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80",
    rentRange: { min: 8000, max: 22000 },
    walkScore: 78,
    safetyScore: 85,
    transitScore: 88,
    familyScore: 82,
    studentScore: 80,
    professionalScore: 75,
    noiseLevel: "Moderate",
    bestFor: [
      "Budget-conscious families",
      "Students",
      "First-time renters",
    ],
    watchOut: [
      "Some areas lack proper streetlighting",
      "Water supply inconsistent in outer sectors",
      "Rush hour metro gets crowded",
    ],
    dailyLifeHighlights: [
      "Metro ride to the city center in under 20 minutes",
      "Affordable street food and local dhabas everywhere",
      "Weekly vegetable markets with fresh produce",
      "Evening walks along the sector parks",
    ],
    nearbyPlaces: [
      {
        name: "Mansarovar Metro Station",
        type: "metro",
        distance: "0.5 km",
        rating: 4.2,
      },
      {
        name: "New Mansarovar Metro",
        type: "metro",
        distance: "1.5 km",
        rating: 4.0,
      },
      {
        name: "Kendriya Vidyalaya",
        type: "school",
        distance: "1.0 km",
        rating: 4.1,
      },
      {
        name: "Subodh Public School",
        type: "school",
        distance: "1.8 km",
        rating: 4.3,
      },
      {
        name: "Jaipur Hospital Mansarovar",
        type: "hospital",
        distance: "1.2 km",
        rating: 3.9,
      },
      {
        name: "Sahara Mall",
        type: "shopping",
        distance: "2.0 km",
        rating: 3.8,
      },
      {
        name: "Sector 4 Park",
        type: "park",
        distance: "0.3 km",
        rating: 4.0,
      },
      {
        name: "Mansarovar Plaza",
        type: "shopping",
        distance: "0.8 km",
        rating: 4.0,
      },
      {
        name: "Rajasthan University",
        type: "college",
        distance: "3.0 km",
        rating: 4.4,
      },
      {
        name: "Snap Fitness",
        type: "gym",
        distance: "1.0 km",
        rating: 4.1,
      },
      {
        name: "Sharma Dhaba",
        type: "restaurant",
        distance: "0.4 km",
        rating: 4.3,
      },
    ],
    commuteToCenter: "20 min by metro, 30 min by car",
    avgRentTrend: "+5% year-over-year",
    demand: "High",
    propertyTypes: ["1BHK Apartment", "2BHK Apartment", "1RK Studio", "PG/Hostel"],
    lifestyleTags: ["Budget-Friendly", "Metro Connected", "Student Zone", "Planned Township", "Local Markets"],
    pros: [
      "Most affordable rents among well-connected areas",
      "Metro connectivity cuts commute times drastically",
      "Planned layout with wide roads and green sectors",
      "Thriving local market with daily essentials",
    ],
    cons: [
      "Infrastructure aging in older sectors",
      "Water supply can be erratic in peak summer",
      "Fewer premium dining and entertainment options",
    ],
  },

  // ─── 5. Jagatpura ──────────────────────────────────────────────────
  {
    id: "area-005",
    slug: "jagatpura",
    name: "Jagatpura",
    city: "Jaipur",
    tagline: "Jaipur's booming IT corridor and co-living capital",
    description:
      "Jagatpura has rapidly transformed into Jaipur's tech hub, anchored by the Mahindra World City SEZ and proximity to Infosys, Genpact, and other IT majors. Co-living spaces, modern apartments, and a young population give it the energy of a startup ecosystem. It is where Jaipur's future workforce lives.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    rentRange: { min: 8000, max: 25000 },
    walkScore: 72,
    safetyScore: 85,
    transitScore: 68,
    familyScore: 60,
    studentScore: 88,
    professionalScore: 90,
    noiseLevel: "Quiet",
    bestFor: [
      "IT professionals",
      "Tech workers",
      "Young professionals",
      "Co-living seekers",
    ],
    watchOut: [
      "Still developing — some stretches lack footpaths",
      "Limited public transport options",
      "Fewer entertainment options than central areas",
    ],
    dailyLifeHighlights: [
      "10-minute commute to Mahindra World City SEZ",
      "Co-working cafes and startup meetups on weekends",
      "Evening runs along the new township roads",
      "Quick access to Sitapura Industrial Area for tech events",
    ],
    nearbyPlaces: [
      {
        name: "Mahindra World City",
        type: "bus",
        distance: "3.0 km",
        rating: 4.5,
      },
      {
        name: "Infosys Jaipur Campus",
        type: "bus",
        distance: "4.5 km",
        rating: 4.6,
      },
      {
        name: "JECRC University",
        type: "college",
        distance: "2.0 km",
        rating: 4.2,
      },
      {
        name: "Manipal University Jaipur",
        type: "college",
        distance: "5.0 km",
        rating: 4.4,
      },
      {
        name: "Jagatpura Government Hospital",
        type: "hospital",
        distance: "1.5 km",
        rating: 3.7,
      },
      {
        name: "D-Mart Jagatpura",
        type: "shopping",
        distance: "1.0 km",
        rating: 4.2,
      },
      {
        name: "Jagatpura Greens Park",
        type: "park",
        distance: "0.8 km",
        rating: 4.0,
      },
      {
        name: "Crossfit Arena",
        type: "gym",
        distance: "1.5 km",
        rating: 4.3,
      },
      {
        name: "Café Jeera",
        type: "restaurant",
        distance: "0.6 km",
        rating: 4.1,
      },
      {
        name: "IIIS Jaipur",
        type: "college",
        distance: "3.5 km",
        rating: 4.0,
      },
    ],
    commuteToCenter: "30 min by car, 45 min by bus",
    avgRentTrend: "+12% year-over-year",
    demand: "Emerging",
    propertyTypes: ["1BHK Apartment", "2BHK Apartment", "Co-living Pod", "Studio Apartment"],
    lifestyleTags: ["IT Hub", "Co-living Friendly", "Young Crowd", "Startup Vibes", "Affordable Modern"],
    pros: [
      "Shortest commute to IT parks and SEZ campuses",
      "Modern apartments at affordable price points",
      "Rapidly growing infrastructure and amenities",
      "Vibrant co-living ecosystem for young professionals",
    ],
    cons: [
      "Public transport still catching up with growth",
      "Limited nightlife and premium dining",
      "Some roads and footpaths under construction",
    ],
  },

  // ─── 6. Tonk Road ──────────────────────────────────────────────────
  {
    id: "area-006",
    slug: "tonk-road",
    name: "Tonk Road",
    city: "Jaipur",
    tagline: "Jaipur's commercial spine connecting north and south",
    description:
      "Tonk Road is the lifeline of commercial Jaipur — a stretch that connects the old city to the southern suburbs. Lined with corporate offices, showrooms, and hospitals, it is the logical choice for business professionals who need to be in the thick of the action. Side lanes offer surprisingly peaceful residential pockets.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    rentRange: { min: 12000, max: 45000 },
    walkScore: 75,
    safetyScore: 82,
    transitScore: 82,
    familyScore: 65,
    studentScore: 55,
    professionalScore: 88,
    noiseLevel: "Active",
    bestFor: [
      "Office workers",
      "Business professionals",
      "Commercial tenants",
    ],
    watchOut: [
      "Constant traffic on the main road",
      "Air quality dips during peak hours",
      "Noise from commercial activity during the day",
    ],
    dailyLifeHighlights: [
      "Walk to your office from side-lane residences",
      "Lunch options range from local thalis to chain restaurants",
      "World Trade Park for weekend shopping sprees",
      "Quick detour to Jawahar Circle garden in the evening",
    ],
    nearbyPlaces: [
      {
        name: "World Trade Park",
        type: "shopping",
        distance: "1.0 km",
        rating: 4.5,
      },
      {
        name: "Jawahar Circle Garden",
        type: "park",
        distance: "2.0 km",
        rating: 4.6,
      },
      {
        name: "Eternal Hospital",
        type: "hospital",
        distance: "1.5 km",
        rating: 4.3,
      },
      {
        name: "Apex Hospital",
        type: "hospital",
        distance: "2.5 km",
        rating: 4.1,
      },
      {
        name: "Ryan International School",
        type: "school",
        distance: "2.0 km",
        rating: 4.2,
      },
      {
        name: "Tonk Road Bus Stop",
        type: "bus",
        distance: "0.2 km",
        rating: 3.9,
      },
      {
        name: "McDonald's Tonk Road",
        type: "restaurant",
        distance: "0.5 km",
        rating: 4.0,
      },
      {
        name: "Pink Square Mall",
        type: "shopping",
        distance: "3.0 km",
        rating: 4.1,
      },
      {
        name: "Anytime Fitness",
        type: "gym",
        distance: "0.8 km",
        rating: 4.2,
      },
      {
        name: "Pratap Nagar Metro",
        type: "metro",
        distance: "2.5 km",
        rating: 4.0,
      },
    ],
    commuteToCenter: "15 min by car, 20 min by bus",
    avgRentTrend: "+7% year-over-year",
    demand: "High",
    propertyTypes: ["2BHK Apartment", "3BHK Apartment", "Commercial Office", "Showroom"],
    lifestyleTags: ["Commercial Hub", "Well-Connected", "Office Proximity", "Shopping Access", "Urban Pulse"],
    pros: [
      "Walking-distance access to major corporate offices",
      "Best shopping and entertainment options along the strip",
      "Excellent bus and auto connectivity",
      "Side lanes offer quiet residential pockets",
    ],
    cons: [
      "Main road is perpetually noisy and congested",
      "Air quality affected by heavy traffic",
      "Not ideal for families with small children",
    ],
  },

  // ─── 7. Sitapura ───────────────────────────────────────────────────
  {
    id: "area-007",
    slug: "sitapura",
    name: "Sitapura",
    city: "Jaipur",
    tagline: "Industrial backbone with the lowest rents in Jaipur",
    description:
      "Sitapura is Jaipur's industrial powerhouse — home to RIICO Industrial Area, countless factories, and warehousing facilities. Residential options are basic but extremely affordable. Ideal for blue-collar workers, industrial staff, and anyone who prioritizes proximity to work in the industrial belt over urban amenities.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    rentRange: { min: 6000, max: 18000 },
    walkScore: 55,
    safetyScore: 78,
    transitScore: 55,
    familyScore: 50,
    studentScore: 45,
    professionalScore: 70,
    noiseLevel: "Active",
    bestFor: [
      "Industrial workers",
      "Warehouse operators",
      "Budget seekers",
    ],
    watchOut: [
      "Industrial noise during working hours",
      "Limited healthcare facilities",
      "Poor public transport frequency",
    ],
    dailyLifeHighlights: [
      "Walk or cycle to the industrial area — zero commute cost",
      "Affordable roadside dhabas for every meal",
      "Weekend trips to Sanganer for markets and sightseeing",
      "Community cricket matches in open grounds",
    ],
    nearbyPlaces: [
      {
        name: "RIICO Industrial Area",
        type: "bus",
        distance: "0.5 km",
        rating: 3.8,
      },
      {
        name: "Sanganer Airport",
        type: "bus",
        distance: "5.0 km",
        rating: 4.0,
      },
      {
        name: "Sitapura Government Dispensary",
        type: "hospital",
        distance: "1.0 km",
        rating: 3.2,
      },
      {
        name: "Krishna Public School",
        type: "school",
        distance: "2.0 km",
        rating: 3.5,
      },
      {
        name: "Sitapura Bus Stand",
        type: "bus",
        distance: "0.8 km",
        rating: 3.4,
      },
      {
        name: "Local Sabzi Mandi",
        type: "shopping",
        distance: "0.5 km",
        rating: 3.8,
      },
      {
        name: "Balaji Dhaba",
        type: "restaurant",
        distance: "0.3 km",
        rating: 4.0,
      },
      {
        name: "Sitapura Community Park",
        type: "park",
        distance: "1.5 km",
        rating: 3.5,
      },
    ],
    commuteToCenter: "40 min by car, 60 min by bus",
    avgRentTrend: "+3% year-over-year",
    demand: "Moderate",
    propertyTypes: ["1RK Studio", "1BHK Apartment", "Warehouse", "Industrial Plot"],
    lifestyleTags: ["Industrial Zone", "Ultra-Affordable", "Worker Housing", "No-Frills Living"],
    pros: [
      "Lowest rents anywhere in metro Jaipur",
      "Zero commute for industrial area employees",
      "Proximity to Sanganer airport",
    ],
    cons: [
      "Very limited social and entertainment infrastructure",
      "Healthcare options are basic and sparse",
      "Not suitable for families seeking quality schools",
    ],
  },

  // ─── 8. Raja Park ──────────────────────────────────────────────────
  {
    id: "area-008",
    slug: "raja-park",
    name: "Raja Park",
    city: "Jaipur",
    tagline: "Central, vibrant, and endlessly alive",
    description:
      "Raja Park is the heartbeat of everyday Jaipur. Centrally located, it pulses with energy — from chaotic morning markets to legendary street food lanes to late-night chai stalls. It is the quintessential Jaipur neighborhood for anyone who thrives on activity, social life, and having everything at their doorstep.",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    rentRange: { min: 10000, max: 28000 },
    walkScore: 88,
    safetyScore: 84,
    transitScore: 85,
    familyScore: 72,
    studentScore: 82,
    professionalScore: 80,
    noiseLevel: "Active",
    bestFor: [
      "Young professionals",
      "Students",
      "Foodies",
      "Social life seekers",
    ],
    watchOut: [
      "Constant noise and activity — not for quiet seekers",
      "Narrow lanes with limited parking",
      "Crowded on weekends and festival seasons",
    ],
    dailyLifeHighlights: [
      "Breakfast at iconic street food stalls — kachori, chai, samosa",
      "Walk to Central Spine for shopping and errands",
      "Evening hangouts at cafes and rooftop restaurants",
      "Night chai runs to the famous Raja Park tea stalls",
    ],
    nearbyPlaces: [
      {
        name: "Raja Park Main Market",
        type: "shopping",
        distance: "0.2 km",
        rating: 4.3,
      },
      {
        name: "Gaurav Tower",
        type: "shopping",
        distance: "1.5 km",
        rating: 4.1,
      },
      {
        name: "Santokba Durlabhji Hospital",
        type: "hospital",
        distance: "2.0 km",
        rating: 4.4,
      },
      {
        name: "MGD Girls School",
        type: "school",
        distance: "1.8 km",
        rating: 4.2,
      },
      {
        name: "Raja Park Kachori Wala",
        type: "restaurant",
        distance: "0.1 km",
        rating: 4.7,
      },
      {
        name: "Tapri Central",
        type: "restaurant",
        distance: "1.0 km",
        rating: 4.5,
      },
      {
        name: "Ram Niwas Bagh",
        type: "park",
        distance: "2.5 km",
        rating: 4.4,
      },
      {
        name: "Raja Park Bus Circle",
        type: "bus",
        distance: "0.3 km",
        rating: 3.9,
      },
      {
        name: "Sindhi Camp Metro",
        type: "metro",
        distance: "3.0 km",
        rating: 4.1,
      },
      {
        name: "Gold's Gym Raja Park",
        type: "gym",
        distance: "0.5 km",
        rating: 4.2,
      },
      {
        name: "The Hive Cafe",
        type: "restaurant",
        distance: "0.8 km",
        rating: 4.3,
      },
    ],
    commuteToCenter: "10 min by car, 15 min by auto",
    avgRentTrend: "+9% year-over-year",
    demand: "High",
    propertyTypes: ["1BHK Apartment", "2BHK Apartment", "Independent Floor", "PG/Hostel"],
    lifestyleTags: ["Street Food Capital", "Central Location", "Nightlife", "Social Hub", "Walkable"],
    pros: [
      "Unbeatable central location — everything is close",
      "Legendary street food and café culture",
      "Excellent auto and bus connectivity",
      "Vibrant social scene with constant activity",
    ],
    cons: [
      "Very noisy — not suited for peace-seekers",
      "Parking is a daily struggle",
      "Lanes can get waterlogged during heavy rains",
    ],
  },
];

// ─── Helper Functions ─────────────────────────────────────────────────

export function getAreaBySlug(slug: string): Area | undefined {
  return areas.find((area) => area.slug === slug);
}

export function getAreasByBestFor(tag: string): Area[] {
  return areas.filter((area) =>
    area.bestFor.some((b) => b.toLowerCase().includes(tag.toLowerCase()))
  );
}

export function compareAreas(slugs: string[]): Area[] {
  return slugs
    .map((slug) => getAreaBySlug(slug))
    .filter((area): area is Area => area !== undefined);
}
