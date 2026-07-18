import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native"
import { useRouter } from "expo-router"
import { Feather } from "@expo/vector-icons"
import { useAuthStore } from "@/lib/store/auth-store"
import { usePropertyStore } from "@/lib/store/property-store"
import PropertyCard from "@/components/property/property-card"
import FilterModal from "@/components/property/filter-modal"

type QuickFilter = "all" | "rent" | "sale" | "featured"

export default function CustomerHomeScreen() {
  const router = useRouter()
  const { user } = useAuthStore()
  const {
    filteredProperties,
    fetchProperties,
    setSearchQuery,
    searchQuery,
    isLoading,
    filters,
  } = usePropertyStore()
  
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedQuickFilter, setSelectedQuickFilter] = useState<QuickFilter>("all")

  useEffect(() => {
    fetchProperties()
  }, [])

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchProperties()
    setRefreshing(false)
  }

  const activeFiltersCount = Object.keys(filters).filter(key => {
    const value = filters[key as keyof typeof filters]
    return value !== undefined && value !== null && (Array.isArray(value) ? value.length > 0 : true)
  }).length

  const handleQuickFilter = (filter: QuickFilter) => {
    setSelectedQuickFilter(filter)
  }

  const getFilteredPropertiesByQuickFilter = () => {
    let properties = filteredProperties

    switch (selectedQuickFilter) {
      case "rent":
        return properties.filter((p) => p.priceType === "monthly")
      case "sale":
        return properties.filter((p) => p.priceType === "sale")
      case "featured":
        return properties.filter((p) => p.featured === true)
      default:
        return properties
    }
  }

  const displayProperties = getFilteredPropertiesByQuickFilter()

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white pt-12 pb-4 px-6 border-b border-gray-200">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-sm text-gray-600">Welcome back,</Text>
            <Text className="text-2xl font-bold text-gray-900">
              {user?.fullName || "Guest"}
            </Text>
          </View>
          
          <TouchableOpacity
            onPress={() => router.push("/profile" as any)}
            className="w-10 h-10 bg-red-100 rounded-full items-center justify-center"
          >
            <Feather name="user" size={20} color="#B91C1C" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center gap-3">
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-lg px-4 py-3">
            <Feather name="search" size={20} color="#6B7280" />
            <TextInput
              placeholder="Search properties, location..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 ml-2 text-gray-900"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          
          <TouchableOpacity
            onPress={() => setShowFilterModal(true)}
            className="bg-red-700 p-3 rounded-lg relative"
          >
            <Feather name="sliders" size={20} color="white" />
            {activeFiltersCount > 0 && (
              <View className="absolute -top-1 -right-1 bg-yellow-500 w-5 h-5 rounded-full items-center justify-center">
                <Text className="text-white text-xs font-bold">{activeFiltersCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Quick Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="bg-white border-gray-200 py-3 mt-4"
      >
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => handleQuickFilter("all")}
            className={`px-4 py-2 rounded-full ${
              selectedQuickFilter === "all" ? "bg-red-700" : "bg-gray-100"
            }`}
          >
            <Text
              className={`font-medium ${
                selectedQuickFilter === "all" ? "text-white" : "text-gray-700"
              }`}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleQuickFilter("rent")}
            className={`px-4 py-2 rounded-full ${
              selectedQuickFilter === "rent" ? "bg-red-700" : "bg-gray-100"
            }`}
          >
            <Text
              className={`font-medium ${
                selectedQuickFilter === "rent" ? "text-white" : "text-gray-700"
              }`}
            >
              For Rent
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleQuickFilter("sale")}
            className={`px-4 py-2 rounded-full ${
              selectedQuickFilter === "sale" ? "bg-red-700" : "bg-gray-100"
            }`}
          >
            <Text
              className={`font-medium ${
                selectedQuickFilter === "sale" ? "text-white" : "text-gray-700"
              }`}
            >
              For Sale
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleQuickFilter("featured")}
            className={`px-4 py-2 rounded-full flex-row items-center ${
              selectedQuickFilter === "featured" ? "bg-red-700" : "bg-gray-100"
            }`}
          >
            <Feather
              name="star"
              size={14}
              color={selectedQuickFilter === "featured" ? "white" : "#374151"}
            />
            <Text
              className={`font-medium ml-1 ${
                selectedQuickFilter === "featured" ? "text-white" : "text-gray-700"
              }`}
            >
              Featured
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </View>

      

      {/* Property Listings */}
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 py-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Results Header */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-semibold text-gray-900">
            {displayProperties.length} {selectedQuickFilter !== "all" && selectedQuickFilter.charAt(0).toUpperCase() + selectedQuickFilter.slice(1)} Properties
          </Text>
          
          <TouchableOpacity className="flex-row items-center">
            <Feather name="bar-chart-2" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-600 ml-1">Sort</Text>
          </TouchableOpacity>
        </View>

        {/* Loading State */}
        {isLoading && displayProperties.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" color="#B91C1C" />
            <Text className="text-gray-600 mt-4">Loading properties...</Text>
          </View>
        ) : displayProperties.length === 0 ? (
          /* Empty State */
          <View className="flex-1 items-center justify-center py-20">
            <View className="w-24 h-24 bg-gray-100 rounded-full items-center justify-center mb-4">
              <Feather name="home" size={48} color="#9CA3AF" />
            </View>
            <Text className="text-xl font-semibold text-gray-900 mb-2">
              No Properties Found
            </Text>
            <Text className="text-gray-600 text-center px-8">
              {selectedQuickFilter !== "all"
                ? `No ${selectedQuickFilter} properties available. Try another filter.`
                : "Try adjusting your filters or search terms"}
            </Text>
          </View>
        ) : (
          /* Property Cards */
          <View className="gap-4">
            {displayProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Filter Modal */}
      <FilterModal visible={showFilterModal} onClose={() => setShowFilterModal(false)} />
    </View>
  )
}
