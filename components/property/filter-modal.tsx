import React, { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput } from "react-native"
import { Feather } from "@expo/vector-icons"
import { usePropertyStore, PropertyFilters, PropertyType } from "@/lib/store/property-store"

interface FilterModalProps {
  visible: boolean
  onClose: () => void
}

const propertyTypes: { value: PropertyType; label: string }[] = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "condo", label: "Condo" },
  { value: "villa", label: "Villa" },
  { value: "studio", label: "Studio" },
  { value: "duplex", label: "Duplex" },
]

const bedroomOptions = [1, 2, 3, 4, 5]
const bathroomOptions = [1, 2, 3, 4]

const nigerianCities = [
  "Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano", "Benin City",
  "Enugu", "Kaduna", "Ilorin", "Calabar", "Aba", "Jos",
]

const commonAmenities = [
  "Parking", "Gym", "Pool", "24hr Security", "Elevator",
  "Backup Generator", "Water Supply", "Air Conditioning",
  "Wi-Fi", "CCTV", "Boys Quarter (BQ)", "Garden",
]

const listingTypes = [
  { value: "monthly", label: "For Rent" },
  { value: "sale", label: "For Sale" },
] as const

export default function FilterModal({ visible, onClose }: FilterModalProps) {
  const { filters, setFilters, clearFilters } = usePropertyStore()
  const [localFilters, setLocalFilters] = useState<PropertyFilters>(filters)

  const handleApply = () => {
    setFilters(localFilters)
    onClose()
  }

  const handleClear = () => {
    setLocalFilters({})
    clearFilters()
  }

  const toggleType = (type: PropertyType) => {
    const currentTypes = localFilters.type || []
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter((t) => t !== type)
      : [...currentTypes, type]
    
    setLocalFilters({ ...localFilters, type: newTypes.length > 0 ? newTypes : undefined })
  }

  const toggleAmenity = (amenity: string) => {
    const currentAmenities = localFilters.amenities || []
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter((a) => a !== amenity)
      : [...currentAmenities, amenity]
    
    setLocalFilters({ ...localFilters, amenities: newAmenities.length > 0 ? newAmenities : undefined })
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 pt-12 pb-4 border-b border-gray-200">
          <TouchableOpacity onPress={onClose}>
            <Feather name="x" size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">Filters</Text>
          <TouchableOpacity onPress={handleClear}>
            <Text className="text-red-700 font-semibold">Clear</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-6 py-6">
          {/* Listing Type */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-3">Listing Type</Text>
            <View className="flex-row gap-3">
              {listingTypes.map((type) => (
                <TouchableOpacity
                  key={type.value}
                  onPress={() =>
                    setLocalFilters({
                      ...localFilters,
                      priceType: localFilters.priceType === type.value ? undefined : type.value,
                    })
                  }
                  className={`flex-1 py-3 rounded-lg border ${
                    localFilters.priceType === type.value
                      ? "bg-red-700 border-red-700"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <Text
                    className={`text-center font-medium ${
                      localFilters.priceType === type.value ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Location */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-3">Location</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2">
                {nigerianCities.map((city) => (
                  <TouchableOpacity
                    key={city}
                    onPress={() =>
                      setLocalFilters({
                        ...localFilters,
                        city: localFilters.city === city ? undefined : city,
                      })
                    }
                    className={`px-4 py-2 rounded-full border ${
                      localFilters.city === city
                        ? "bg-red-700 border-red-700"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <Text
                      className={`font-medium ${
                        localFilters.city === city ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {city}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Property Type */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-3">Property Type</Text>
            <View className="flex-row flex-wrap gap-2">
              {propertyTypes.map((type) => (
                <TouchableOpacity
                  key={type.value}
                  onPress={() => toggleType(type.value)}
                  className={`px-4 py-2 rounded-full border ${
                    localFilters.type?.includes(type.value)
                      ? "bg-red-700 border-red-700"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <Text
                    className={`font-medium ${
                      localFilters.type?.includes(type.value)
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Price Range */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-3">
              Price Range (₦)
            </Text>
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Text className="text-sm text-gray-600 mb-2">Min Price</Text>
                <TextInput
                  value={localFilters.priceMin?.toString() || ""}
                  onChangeText={(text) =>
                    setLocalFilters({
                      ...localFilters,
                      priceMin: text ? parseInt(text.replace(/[^0-9]/g, "")) : undefined,
                    })
                  }
                  keyboardType="numeric"
                  placeholder="₦0"
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <View className="flex-1">
                <Text className="text-sm text-gray-600 mb-2">Max Price</Text>
                <TextInput
                  value={localFilters.priceMax?.toString() || ""}
                  onChangeText={(text) =>
                    setLocalFilters({
                      ...localFilters,
                      priceMax: text ? parseInt(text.replace(/[^0-9]/g, "")) : undefined,
                    })
                  }
                  keyboardType="numeric"
                  placeholder="Any"
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
            {localFilters.priceType === "monthly" && (
              <Text className="text-xs text-gray-500 mt-2">
                Monthly rental prices
              </Text>
            )}
          </View>

          {/* Bedrooms */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-3">Bedrooms</Text>
            <View className="flex-row gap-2">
              {bedroomOptions.map((num) => (
                <TouchableOpacity
                  key={num}
                  onPress={() =>
                    setLocalFilters({
                      ...localFilters,
                      bedrooms: localFilters.bedrooms === num ? undefined : num,
                    })
                  }
                  className={`flex-1 py-3 rounded-lg border ${
                    localFilters.bedrooms === num
                      ? "bg-red-700 border-red-700"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <Text
                    className={`text-center font-medium ${
                      localFilters.bedrooms === num ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {num}+
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Bathrooms */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-3">Bathrooms</Text>
            <View className="flex-row gap-2">
              {bathroomOptions.map((num) => (
                <TouchableOpacity
                  key={num}
                  onPress={() =>
                    setLocalFilters({
                      ...localFilters,
                      bathrooms: localFilters.bathrooms === num ? undefined : num,
                    })
                  }
                  className={`flex-1 py-3 rounded-lg border ${
                    localFilters.bathrooms === num
                      ? "bg-red-700 border-red-700"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <Text
                    className={`text-center font-medium ${
                      localFilters.bathrooms === num ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {num}+
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Amenities */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-3">Amenities</Text>
            <View className="flex-row flex-wrap gap-2">
              {commonAmenities.map((amenity) => (
                <TouchableOpacity
                  key={amenity}
                  onPress={() => toggleAmenity(amenity)}
                  className={`px-4 py-2 rounded-full border ${
                    localFilters.amenities?.includes(amenity)
                      ? "bg-red-700 border-red-700"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <Text
                    className={`font-medium text-sm ${
                      localFilters.amenities?.includes(amenity)
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {amenity}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Apply Button */}
        <View className="px-6 py-4 border-t border-gray-200">
          <TouchableOpacity
            onPress={handleApply}
            className="bg-red-700 py-4 rounded-lg items-center"
          >
            <Text className="text-white text-base font-semibold">Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
