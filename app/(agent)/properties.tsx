import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  RefreshControl,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

const MOCK_AGENT_PROPERTIES = [
  {
    id: "1",
    title: "Luxury Apartment in Victoria Island",
    address: "15 Adeola Odeku Street, Lagos",
    price: 1500000,
    priceType: "monthly",
    status: "available",
    bedrooms: 2,
    bathrooms: 2,
    views: 124,
    bookings: 8,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
  },
  {
    id: "2",
    title: "Spacious House in Maitama",
    address: "Plot 42 Aguiyi Ironsi Street, Abuja",
    price: 85000000,
    priceType: "sale",
    status: "available",
    bedrooms: 4,
    bathrooms: 3,
    views: 89,
    bookings: 5,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
  },
  {
    id: "3",
    title: "Ocean View Apartment",
    address: "Eko Atlantic Boulevard, Lagos",
    price: 2800000,
    priceType: "monthly",
    status: "rented",
    bedrooms: 3,
    bathrooms: 2,
    views: 156,
    bookings: 12,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
  },
]

type FilterType = "all" | "available" | "rented" | "sold"

export default function AgentPropertiesScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all")
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setRefreshing(false)
  }

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "available", label: "Available" },
    { key: "rented", label: "Rented" },
    { key: "sold", label: "Sold" },
  ]

  const filteredProperties =
    selectedFilter === "all"
      ? MOCK_AGENT_PROPERTIES
      : MOCK_AGENT_PROPERTIES.filter((p) => p.status === selectedFilter)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          My Properties
        </Text>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3 mb-3">
          <Ionicons name="search-outline" size={20} color="#6B7280" />
          <TextInput
            placeholder="Search properties..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-2 text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                onPress={() => setSelectedFilter(filter.key)}
                className={`px-4 py-2 rounded-full ${
                  selectedFilter === filter.key
                    ? "bg-red-700"
                    : "bg-gray-100"
                }`}
              >
                <Text
                  className={`font-medium ${
                    selectedFilter === filter.key
                      ? "text-white"
                      : "text-gray-700"
                  }`}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="p-4">
          {/* Add Property Button */}
          <TouchableOpacity
            onPress={() => router.push("/property/add" as any)}
            className="bg-red-700 rounded-xl p-4 mb-4 flex-row items-center justify-center shadow-sm"
          >
            <Ionicons name="add-circle-outline" size={24} color="white" />
            <Text className="text-white font-bold text-base ml-2">
              Add New Property
            </Text>
          </TouchableOpacity>

          {/* Properties List */}
          {filteredProperties.length === 0 ? (
            <View className="items-center justify-center py-20">
              <Ionicons name="home-outline" size={64} color="#D1D5DB" />
              <Text className="text-gray-500 text-lg font-medium mt-4">
                No properties found
              </Text>
            </View>
          ) : (
            filteredProperties.map((property) => (
              <TouchableOpacity
                key={property.id}
                onPress={() => router.push(`/property/${property.id}`)}
                className="bg-white rounded-2xl overflow-hidden mb-4 shadow-sm border border-gray-100"
              >
                {/* Image */}
                <View className="relative">
                  <Image
                    source={{ uri: property.image }}
                    className="w-full h-48"
                  />
                  <View
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full ${
                      property.status === "available"
                        ? "bg-green-500"
                        : property.status === "rented"
                        ? "bg-orange-500"
                        : "bg-red-500"
                    }`}
                  >
                    <Text className="text-white text-xs font-semibold capitalize">
                      {property.status}
                    </Text>
                  </View>
                </View>

                {/* Content */}
                <View className="p-4">
                  <Text className="text-xl font-bold text-red-700 mb-2">
                    {formatPrice(property.price)}
                    <Text className="text-sm text-gray-600">
                      {property.priceType === "monthly" ? "/mo" : ""}
                    </Text>
                  </Text>

                  <Text
                    className="text-lg font-semibold text-gray-900 mb-2"
                    numberOfLines={1}
                  >
                    {property.title}
                  </Text>

                  <View className="flex-row items-center mb-3">
                    <Ionicons name="location-outline" size={14} color="#6B7280" />
                    <Text className="text-sm text-gray-600 ml-1" numberOfLines={1}>
                      {property.address}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-4 mb-3">
                    <View className="flex-row items-center">
                      <Ionicons name="bed-outline" size={16} color="#6B7280" />
                      <Text className="text-sm text-gray-600 ml-1">
                        {property.bedrooms} Beds
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons name="water-outline" size={16} color="#6B7280" />
                      <Text className="text-sm text-gray-600 ml-1">
                        {property.bathrooms} Baths
                      </Text>
                    </View>
                  </View>

                  {/* Stats */}
                  <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
                    <View className="flex-row items-center">
                      <Ionicons name="eye-outline" size={16} color="#6B7280" />
                      <Text className="text-sm text-gray-600 ml-1">
                        {property.views} views
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons name="calendar-outline" size={16} color="#6B7280" />
                      <Text className="text-sm text-gray-600 ml-1">
                        {property.bookings} bookings
                      </Text>
                    </View>
                    <TouchableOpacity className="bg-red-700 px-4 py-2 rounded-lg">
                      <Text className="text-white text-xs font-semibold">
                        Manage
                      </Text>
                    </TouchableOpacity>
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
