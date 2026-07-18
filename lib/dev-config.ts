// Development credentials and mock data setup
// This file helps you test the app without a backend

// Development Mode Configuration
export const DEV_MODE = {
  // Enable mock authentication (bypasses real API calls)
  MOCK_AUTH: true,
  
  // Enable mock property data
  MOCK_PROPERTIES: true,
}

// Mock user data
export const MOCK_USERS = {
  customer: {
    id: "1",
    userId: "customer123",
    fullName: "John Customer",
    email: "customer@test.com",
    phone: "+1234567890",
    role: "customer" as const,
    isVerified: true,
  },
  agent: {
    id: "2",
    userId: "agent456",
    fullName: "Jane Agent",
    email: "agent@test.com",
    phone: "+0987654321",
    role: "agent" as const,
    isVerified: true,
  },
}

// Mock property data
export const MOCK_PROPERTIES = [
  {
    id: "1",
    title: "Luxury Apartment in Victoria Island",
    description: "Beautiful 2-bedroom apartment in the heart of Victoria Island with stunning views and modern amenities. Features 24-hour power supply, backup generator, and secure gated community.",
    price: 1500000,
    priceType: "monthly" as const,
    type: "apartment" as const,
    status: "available" as const,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    address: "15 Adeola Odeku Street",
    city: "Lagos",
    state: "Lagos",
    zipCode: "101241",
    latitude: 6.4281,
    longitude: 3.4219,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    ],
    amenities: ["Parking", "Gym", "Pool", "24hr Security", "Elevator", "Backup Generator", "Water Supply"],
    agentId: "agent456",
    agentName: "Jane Agent",
    agentPhone: "+0987654321",
    agentEmail: "agent@test.com",
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Spacious Family House in Maitama",
    description: "Elegant 4-bedroom detached house perfect for families in the prestigious Maitama district. Features include BQ, ample parking, garden, and modern kitchen. Fully serviced with 24/7 security.",
    price: 85000000,
    priceType: "sale" as const,
    type: "house" as const,
    status: "available" as const,
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    address: "Plot 42 Aguiyi Ironsi Street",
    city: "Abuja",
    state: "FCT",
    zipCode: "900001",
    latitude: 9.0820,
    longitude: 7.4951,
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
    ],
    amenities: ["Garden", "BQ", "Parking", "Central AC", "Backup Generator", "24hr Security"],
    agentId: "agent456",
    agentName: "Jane Agent",
    agentPhone: "+0987654321",
    agentEmail: "agent@test.com",
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Luxury Apartment with Ocean View in Lekki",
    description: "Stunning 3-bedroom serviced apartment with panoramic Atlantic Ocean views in Lekki Phase 1. Premium finishes, resort-style amenities including pool, gym, and 24-hour concierge service.",
    price: 2800000,
    priceType: "monthly" as const,
    type: "condo" as const,
    status: "available" as const,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    address: "Eko Atlantic Boulevard",
    city: "Lagos",
    state: "Lagos",
    zipCode: "105102",
    latitude: 6.4053,
    longitude: 3.4768,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    ],
    amenities: ["Pool", "Gym", "Concierge", "Beach View", "Parking", "Backup Generator", "Water Supply"],
    agentId: "agent456",
    agentName: "Jane Agent",
    agentPhone: "+0987654321",
    agentEmail: "agent@test.com",
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]
