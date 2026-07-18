import { create } from "zustand"
import api from "./api"
import { DEV_MODE, MOCK_PROPERTIES } from "../dev-config"

export type PropertyType = "apartment" | "house" | "condo" | "villa" | "studio" | "duplex"
export type PropertyStatus = "available" | "rented" | "sold"

export type Property = {
  id: string
  title: string
  description: string
  price: number
  priceType: "monthly" | "yearly" | "sale"
  type: PropertyType
  status: PropertyStatus
  bedrooms: number
  bathrooms: number
  area: number // in sq ft
  address: string
  city: string
  state: string
  zipCode: string
  latitude?: number
  longitude?: number
  images: string[]
  amenities: string[]
  agentId: string
  agentName: string
  agentPhone: string
  agentEmail: string
  agentPhoto?: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

export type Booking = {
  id: string
  propertyId: string
  customerId: string
  agentId: string
  inspectionDate: string
  inspectionTime: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  notes?: string
  createdAt: string
}

export type PropertyFilters = {
  type?: PropertyType[]
  priceMin?: number
  priceMax?: number
  bedrooms?: number
  bathrooms?: number
  city?: string
  amenities?: string[]
  priceType?: "monthly" | "yearly" | "sale"
}

interface PropertyState {
  properties: Property[]
  filteredProperties: Property[]
  selectedProperty: Property | null
  isLoading: boolean
  error: string | null
  filters: PropertyFilters
  searchQuery: string
  bookings: Booking[]

  // Actions
  fetchProperties: () => Promise<void>
  fetchPropertyById: (id: string) => Promise<void>
  setFilters: (filters: PropertyFilters) => void
  setSearchQuery: (query: string) => void
  applyFilters: () => void
  clearFilters: () => void
  bookInspection: (bookingData: Partial<Booking>) => Promise<void>
  fetchUserBookings: () => Promise<void>
  cancelBooking: (bookingId: string) => Promise<void>
}

export const usePropertyStore = create<PropertyState>((set, get) => ({
  properties: [],
  filteredProperties: [],
  selectedProperty: null,
  isLoading: false,
  error: null,
  filters: {},
  searchQuery: "",
  bookings: [],

  fetchProperties: async () => {
    try {
      set({ isLoading: true, error: null })
      
      // DEVELOPMENT MODE: Use mock properties
      if (DEV_MODE.MOCK_PROPERTIES) {
        console.log("🔧 DEV MODE: Using mock property data")
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        set({
          properties: MOCK_PROPERTIES,
          filteredProperties: MOCK_PROPERTIES,
          isLoading: false,
        })
        return
      }
      
      // PRODUCTION MODE: Use real API
      const response = await api.get("/properties")
      const properties = response.data.data || response.data
      
      set({
        properties,
        filteredProperties: properties,
        isLoading: false,
      })
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to fetch properties",
      })
    }
  },

  fetchPropertyById: async (id: string) => {
    try {
      set({ isLoading: true, error: null })
      
      // DEVELOPMENT MODE: Use mock properties
      if (DEV_MODE.MOCK_PROPERTIES) {
        console.log("🔧 DEV MODE: Using mock property data for ID:", id)
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const property = MOCK_PROPERTIES.find(p => p.id === id)
        
        if (!property) {
          throw new Error("Property not found")
        }
        
        set({
          selectedProperty: property,
          isLoading: false,
        })
        return
      }
      
      // PRODUCTION MODE: Use real API
      const response = await api.get(`/properties/${id}`)
      const property = response.data.data || response.data
      
      set({
        selectedProperty: property,
        isLoading: false,
      })
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to fetch property",
      })
    }
  },

  setFilters: (filters: PropertyFilters) => {
    set({ filters })
    get().applyFilters()
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query })
    get().applyFilters()
  },

  applyFilters: () => {
    const { properties, filters, searchQuery } = get()
    let filtered = [...properties]

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.address.toLowerCase().includes(query) ||
          p.city.toLowerCase().includes(query)
      )
    }

    // Type filter
    if (filters.type && filters.type.length > 0) {
      filtered = filtered.filter((p) => filters.type!.includes(p.type))
    }

    // Price filter
    if (filters.priceMin !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.priceMin!)
    }
    if (filters.priceMax !== undefined) {
      filtered = filtered.filter((p) => p.price <= filters.priceMax!)
    }

    // Bedrooms filter
    if (filters.bedrooms !== undefined) {
      filtered = filtered.filter((p) => p.bedrooms >= filters.bedrooms!)
    }

    // Bathrooms filter
    if (filters.bathrooms !== undefined) {
      filtered = filtered.filter((p) => p.bathrooms >= filters.bathrooms!)
    }

    // City filter
    if (filters.city) {
      filtered = filtered.filter(
        (p) => p.city.toLowerCase() === filters.city!.toLowerCase()
      )
    }

    // Amenities filter
    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter((p) =>
        filters.amenities!.every((amenity) => p.amenities.includes(amenity))
      )
    }

    // Price type filter
    if (filters.priceType) {
      filtered = filtered.filter((p) => p.priceType === filters.priceType)
    }

    set({ filteredProperties: filtered })
  },

  clearFilters: () => {
    const { properties } = get()
    set({
      filters: {},
      searchQuery: "",
      filteredProperties: properties,
    })
  },

  bookInspection: async (bookingData: Partial<Booking>) => {
    try {
      set({ isLoading: true, error: null })
      const response = await api.post("/bookings", bookingData)
      const booking = response.data.data || response.data

      set((state) => ({
        bookings: [...state.bookings, booking],
        isLoading: false,
      }))

      return booking
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to book inspection",
      })
      throw error
    }
  },

  fetchUserBookings: async () => {
    try {
      set({ isLoading: true, error: null })
      const response = await api.get("/bookings/my-bookings")
      const bookings = response.data.data || response.data

      set({
        bookings,
        isLoading: false,
      })
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to fetch bookings",
      })
    }
  },

  cancelBooking: async (bookingId: string) => {
    try {
      set({ isLoading: true, error: null })
      await api.patch(`/bookings/${bookingId}/cancel`)

      set((state) => ({
        bookings: state.bookings.map((b) =>
          b.id === bookingId ? { ...b, status: "cancelled" as const } : b
        ),
        isLoading: false,
      }))
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to cancel booking",
      })
      throw error
    }
  },
}))
