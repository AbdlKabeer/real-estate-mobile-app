import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  Alert,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

// Mock favorites data
const MOCK_FAVORITES = [
  {
    id: "1",
    title: "Luxury Apartment in Victoria Island",
    description: "Beautiful 2-bedroom apartment in Victoria Island",
    price: 1500000,
    priceType: "monthly" as const,
    type: "apartment" as const,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    address: "15 Adeola Odeku Street",
    city: "Lagos",
    state: "Lagos",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    ],
    amenities: ["Parking", "Gym", "Pool", "Backup Generator"],
    agentName: "Chidinma Okafor",
    agentPhone: "+2348012345678",
    featured: true,
    savedAt: "2025-11-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Spacious Family House in Maitama",
    description: "Perfect family home in prestigious Maitama",
    price: 3200000,
    priceType: "monthly" as const,
    type: "house" as const,
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    address: "Plot 42 Aguiyi Ironsi Street",
    city: "Abuja",
    state: "FCT",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    ],
    amenities: ["Garden", "BQ", "24hr Security", "Central AC"],
    agentName: "Oluwaseun Adebayo",
    agentPhone: "+2348023456789",
    featured: false,
    savedAt: "2025-11-14T14:20:00Z",
  },
  {
    id: "3",
    title: "Luxury Apartment with Ocean View",
    description: "High-rise apartment with stunning Atlantic views",
    price: 2800000,
    priceType: "monthly" as const,
    type: "condo" as const,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    address: "Eko Atlantic Boulevard",
    city: "Lagos",
    state: "Lagos",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    ],
    amenities: ["Gym", "Pool", "Concierge", "Beach View", "Backup Generator"],
    agentName: "Ibrahim Musa",
    agentPhone: "+2348034567890",
    featured: true,
    savedAt: "2025-11-13T09:15:00Z",
  },
  {
    id: "4",
    title: "Cozy Studio in Lekki",
    description: "Modern studio perfect for young professionals",
    price: 850000,
    priceType: "monthly" as const,
    type: "studio" as const,
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    address: "Admiralty Way",
    city: "Lagos",
    state: "Lagos",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    ],
    amenities: ["WiFi", "Parking", "24hr Security"],
    agentName: "Aisha Bello",
    agentPhone: "+2348045678901",
    featured: false,
    savedAt: "2025-11-12T16:45:00Z",
  },
  {
    id: "5",
    title: "Elegant Duplex in Ikoyi",
    description: "Elegant duplex in quiet neighborhood",
    price: 120000000,
    priceType: "sale" as const,
    type: "villa" as const,
    bedrooms: 5,
    bathrooms: 4,
    area: 3500,
    address: "Banana Island Road",
    city: "Lagos",
    state: "Lagos",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    ],
    amenities: ["Pool", "Garden", "BQ", "Home Theater", "24hr Security"],
    agentName: "Chukwuma Nwosu",
    agentPhone: "+2348056789012",
    featured: true,
    savedAt: "2025-11-10T11:00:00Z",
  },
]

type SortOption = "recent" | "price-low" | "price-high" | "bedrooms"

export default function FavoritesScreen() {
  const [refreshing, setRefreshing] = useState(false)
  const [favorites, setFavorites] = useState(MOCK_FAVORITES)
  const [sortBy, setSortBy] = useState<SortOption>("recent")

  const onRefresh = async () => {
    setRefreshing(true)
    // Simulate refresh
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setRefreshing(false)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleRemoveFavorite = (propertyId: string, title: string) => {
    Alert.alert(
      "Remove from Favorites",
      `Remove "${title}" from your favorites?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            setFavorites(favorites.filter((f) => f.id !== propertyId))
            Alert.alert("Removed", "Property removed from favorites")
          },
        },
      ]
    )
  }

  const sortedFavorites = [...favorites].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "bedrooms":
        return b.bedrooms - a.bedrooms
      default:
        return 0
    }
  })

  const sortOptions = [
    { key: "recent" as SortOption, label: "Recent", icon: "time-outline" },
    {
      key: "price-low" as SortOption,
      label: "Price: Low to High",
      icon: "arrow-up-outline",
    },
    {
      key: "price-high" as SortOption,
      label: "Price: High to Low",
      icon: "arrow-down-outline",
    },
    { key: "bedrooms" as SortOption, label: "Bedrooms", icon: "bed-outline" },
  ]

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-4 border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-gray-900">Favorites</Text>
            <Text className="text-sm text-gray-500 mt-1">
              {favorites.length} saved properties
            </Text>
          </View>

          {/* Sort Dropdown Button */}
          <TouchableOpacity className="flex-row items-center px-3 py-2 bg-gray-100 rounded-lg">
            <Ionicons name="funnel-outline" size={18} color="#374151" />
            <Text className="text-sm text-gray-700 ml-2 font-medium">Sort</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="border-b border-gray-100 mt-4"
      >
        <View className="flex-row ">
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              onPress={() => setSortBy(option.key)}
              className={`mr-3 px-4 py-2 rounded-full flex-row items-center ${
                sortBy === option.key ? "bg-red-700" : "bg-gray-100"
              }`}
            >
              <Ionicons
                name={option.icon as any}
                size={16}
                color={sortBy === option.key ? "#FFFFFF" : "#374151"}
              />
              <Text
                className={`font-medium ml-2 ${
                  sortBy === option.key ? "text-white" : "text-gray-700"
                }`}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      </View>

      {/* Favorites List */}
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="p-4">
          {sortedFavorites.length === 0 ? (
            <View className="items-center justify-center py-20">
              <Ionicons name="heart-outline" size={64} color="#D1D5DB" />
              <Text className="text-gray-500 text-lg font-medium mt-4">
                No favorites yet
              </Text>
              <Text className="text-gray-400 text-sm mt-2 text-center px-8">
                Start exploring properties and save your favorites here
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/(customer)/" as any)}
                className="mt-6 px-6 py-3 bg-red-700 rounded-lg"
              >
                <Text className="text-white font-semibold">
                  Browse Properties
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            sortedFavorites.map((property) => (
              <TouchableOpacity
                key={property.id}
                onPress={() => router.push(`/property/${property.id}`)}
                className="mb-4 bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                {/* Property Image */}
                <View className="relative">
                  <Image
                    source={{ uri: property.images[0] }}
                    className="w-full h-48"
                  />

                  {/* Featured Badge */}
                  {property.featured && (
                    <View className="absolute top-3 left-3 bg-red-700 px-3 py-1 rounded-full">
                      <Text className="text-white text-xs font-semibold">
                        Featured
                      </Text>
                    </View>
                  )}

                  {/* Remove Favorite Button */}
                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation()
                      handleRemoveFavorite(property.id, property.title)
                    }}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg"
                  >
                    <Ionicons name="heart" size={20} color="#B91C1C" />
                  </TouchableOpacity>

                  {/* Price Tag */}
                  <View className="absolute bottom-3 right-3 bg-white/95 px-3 py-2 rounded-lg">
                    <Text className="text-red-700 text-lg font-bold">
                      {formatPrice(property.price)}
                      <Text className="text-xs text-gray-600">
                        /{property.priceType === "monthly" ? "mo" : "yr"}
                      </Text>
                    </Text>
                  </View>
                </View>

                {/* Property Details */}
                <View className="p-4">
                  {/* Title & Type */}
                  <View className="flex-row items-start justify-between mb-2">
                    <Text
                      className="text-lg font-bold text-gray-900 flex-1"
                      numberOfLines={1}
                    >
                      {property.title}
                    </Text>
                    <View className="bg-gray-100 px-2 py-1 rounded ml-2">
                      <Text className="text-xs text-gray-700 capitalize">
                        {property.type}
                      </Text>
                    </View>
                  </View>

                  {/* Location */}
                  <View className="flex-row items-center mb-3">
                    <Ionicons
                      name="location-outline"
                      size={16}
                      color="#6B7280"
                    />
                    <Text className="text-sm text-gray-600 ml-1">
                      {property.city}, {property.state}
                    </Text>
                  </View>

                  {/* Features */}
                  <View className="flex-row items-center mb-3">
                    <View className="flex-row items-center mr-4">
                      <Ionicons name="bed-outline" size={18} color="#6B7280" />
                      <Text className="text-sm text-gray-700 ml-1 font-medium">
                        {property.bedrooms} Beds
                      </Text>
                    </View>
                    <View className="flex-row items-center mr-4">
                      <Ionicons
                        name="water-outline"
                        size={18}
                        color="#6B7280"
                      />
                      <Text className="text-sm text-gray-700 ml-1 font-medium">
                        {property.bathrooms} Baths
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons
                        name="resize-outline"
                        size={18}
                        color="#6B7280"
                      />
                      <Text className="text-sm text-gray-700 ml-1 font-medium">
                        {property.area} sqft
                      </Text>
                    </View>
                  </View>

                  {/* Amenities */}
                  <View className="flex-row flex-wrap mb-3">
                    {property.amenities.slice(0, 3).map((amenity, index) => (
                      <View
                        key={index}
                        className="bg-gray-50 px-2 py-1 rounded mr-2 mb-1"
                      >
                        <Text className="text-xs text-gray-600">{amenity}</Text>
                      </View>
                    ))}
                    {property.amenities.length > 3 && (
                      <View className="bg-gray-50 px-2 py-1 rounded mb-1">
                        <Text className="text-xs text-gray-600">
                          +{property.amenities.length - 3} more
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Agent Info & Actions */}
                  <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
                    <View className="flex-row items-center flex-1">
                      <View className="w-8 h-8 bg-red-100 rounded-full items-center justify-center">
                        <Text className="text-red-700 font-semibold text-xs">
                          {property.agentName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </Text>
                      </View>
                      <View className="ml-2 flex-1">
                        <Text
                          className="text-sm font-medium text-gray-900"
                          numberOfLines={1}
                        >
                          {property.agentName}
                        </Text>
                        <Text className="text-xs text-gray-500">Agent</Text>
                      </View>
                    </View>

                    {/* Quick Actions */}
                    <View className="flex-row">
                      <TouchableOpacity
                        onPress={(e) => {
                          e.stopPropagation()
                          router.push(`/chat/${property.id}`)
                        }}
                        className="w-9 h-9 bg-gray-100 rounded-full items-center justify-center mr-2"
                      >
                        <Ionicons
                          name="chatbubble-outline"
                          size={18}
                          color="#374151"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={(e) => {
                          e.stopPropagation()
                          router.push(`/booking/schedule?propertyId=${property.id}`)
                        }}
                        className="px-4 py-2 bg-red-700 rounded-full"
                      >
                        <Text className="text-white text-xs font-semibold">
                          Book
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
