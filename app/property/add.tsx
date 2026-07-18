import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

type PropertyType = "apartment" | "house" | "duplex" | "land"
type ListingType = "sale" | "rent"

const NIGERIAN_STATES = [
  "Lagos", "Abuja", "Kano", "Rivers", "Oyo", "Delta", "Edo", "Kaduna",
  "Enugu", "Anambra", "Imo", "Ogun", "Plateau", "Kwara", "Benue",
]

const AMENITIES = [
  "24hr Security",
  "Parking Space",
  "Swimming Pool",
  "Gym",
  "Garden",
  "Backup Generator",
  "Air Conditioning",
  "Wi-Fi",
  "Elevator",
  "CCTV",
  "Water Supply",
  "Boys Quarter (BQ)",
  "Balcony",
  "Play Area",
  "Storage Room",
]

export default function AddPropertyScreen() {
  const [propertyType, setPropertyType] = useState<PropertyType>("apartment")
  const [listingType, setListingType] = useState<ListingType>("rent")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [bedrooms, setBedrooms] = useState("")
  const [bathrooms, setBathrooms] = useState("")
  const [area, setArea] = useState("")
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])

  const propertyTypes: { key: PropertyType; label: string; icon: string }[] = [
    { key: "apartment", label: "Apartment", icon: "business" },
    { key: "house", label: "House", icon: "home" },
    { key: "duplex", label: "Duplex", icon: "layers" },
    { key: "land", label: "Land", icon: "map" },
  ]

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
    } else {
      setSelectedAmenities([...selectedAmenities, amenity])
    }
  }

  const handleAddImages = () => {
    // In real app: use expo-image-picker
    Alert.alert("Add Images", "Image picker will be implemented here")
  }

  const handleSubmit = () => {
    if (!title || !price || !address || !city || !state) {
      Alert.alert("Error", "Please fill in all required fields")
      return
    }

    // In real app: submit to backend
    Alert.alert(
      "Success",
      "Property added successfully!",
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-100 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900 flex-1">
          Add New Property
        </Text>
        <TouchableOpacity onPress={handleSubmit}>
          <Text className="text-red-700 font-semibold text-base">Publish</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Property Type */}
          <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
            <Text className="text-base font-bold text-gray-900 mb-3">
              Property Type *
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {propertyTypes.map((type) => (
                <TouchableOpacity
                  key={type.key}
                  onPress={() => setPropertyType(type.key)}
                  className={`flex-1 min-w-[45%] rounded-xl p-4 items-center ${
                    propertyType === type.key ? "bg-red-700" : "bg-gray-100"
                  }`}
                >
                  <Ionicons
                    name={type.icon as any}
                    size={28}
                    color={propertyType === type.key ? "white" : "#6B7280"}
                  />
                  <Text
                    className={`mt-2 font-semibold ${
                      propertyType === type.key ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Listing Type */}
          <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
            <Text className="text-base font-bold text-gray-900 mb-3">
              Listing Type *
            </Text>
            <View className="flex-row gap-2">
              <TouchableOpacity
                onPress={() => setListingType("rent")}
                className={`flex-1 rounded-xl p-3 items-center ${
                  listingType === "rent" ? "bg-red-700" : "bg-gray-100"
                }`}
              >
                <Text
                  className={`font-semibold ${
                    listingType === "rent" ? "text-white" : "text-gray-700"
                  }`}
                >
                  For Rent
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setListingType("sale")}
                className={`flex-1 rounded-xl p-3 items-center ${
                  listingType === "sale" ? "bg-red-700" : "bg-gray-100"
                }`}
              >
                <Text
                  className={`font-semibold ${
                    listingType === "sale" ? "text-white" : "text-gray-700"
                  }`}
                >
                  For Sale
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Basic Information */}
          <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
            <Text className="text-base font-bold text-gray-900 mb-3">
              Basic Information
            </Text>

            <Text className="text-sm text-gray-700 mb-2">Property Title *</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="e.g., Luxury 3 Bedroom Apartment"
              className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900 mb-4"
              placeholderTextColor="#9CA3AF"
            />

            <Text className="text-sm text-gray-700 mb-2">Description</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Describe your property..."
              multiline
              numberOfLines={4}
              className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900 mb-4"
              placeholderTextColor="#9CA3AF"
              textAlignVertical="top"
            />

            <Text className="text-sm text-gray-700 mb-2">
              Price (₦) *
            </Text>
            <TextInput
              value={price}
              onChangeText={setPrice}
              placeholder={listingType === "rent" ? "e.g., 1500000" : "e.g., 85000000"}
              keyboardType="numeric"
              className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900 mb-2"
              placeholderTextColor="#9CA3AF"
            />
            {listingType === "rent" && (
              <Text className="text-xs text-gray-500 mb-4">
                Monthly rental price
              </Text>
            )}
          </View>

          {/* Location */}
          <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
            <Text className="text-base font-bold text-gray-900 mb-3">
              Location
            </Text>

            <Text className="text-sm text-gray-700 mb-2">Street Address *</Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              placeholder="e.g., 15 Adeola Odeku Street"
              className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900 mb-4"
              placeholderTextColor="#9CA3AF"
            />

            <Text className="text-sm text-gray-700 mb-2">City *</Text>
            <TextInput
              value={city}
              onChangeText={setCity}
              placeholder="e.g., Lekki"
              className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900 mb-4"
              placeholderTextColor="#9CA3AF"
            />

            <Text className="text-sm text-gray-700 mb-2">State *</Text>
            <View className="bg-gray-50 rounded-lg mb-4">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="p-2"
              >
                {NIGERIAN_STATES.map((s) => (
                  <TouchableOpacity
                    key={s}
                    onPress={() => setState(s)}
                    className={`px-4 py-2 rounded-lg mr-2 ${
                      state === s ? "bg-red-700" : "bg-white"
                    }`}
                  >
                    <Text
                      className={`font-medium ${
                        state === s ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {s}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          {/* Property Details */}
          {propertyType !== "land" && (
            <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
              <Text className="text-base font-bold text-gray-900 mb-3">
                Property Details
              </Text>

              <View className="flex-row gap-3 mb-4">
                <View className="flex-1">
                  <Text className="text-sm text-gray-700 mb-2">Bedrooms</Text>
                  <TextInput
                    value={bedrooms}
                    onChangeText={setBedrooms}
                    placeholder="0"
                    keyboardType="numeric"
                    className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-sm text-gray-700 mb-2">Bathrooms</Text>
                  <TextInput
                    value={bathrooms}
                    onChangeText={setBathrooms}
                    placeholder="0"
                    keyboardType="numeric"
                    className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              <Text className="text-sm text-gray-700 mb-2">Area (sqm)</Text>
              <TextInput
                value={area}
                onChangeText={setArea}
                placeholder="e.g., 150"
                keyboardType="numeric"
                className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          )}

          {/* Amenities */}
          <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
            <Text className="text-base font-bold text-gray-900 mb-3">
              Amenities
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {AMENITIES.map((amenity) => (
                <TouchableOpacity
                  key={amenity}
                  onPress={() => toggleAmenity(amenity)}
                  className={`px-4 py-2 rounded-full ${
                    selectedAmenities.includes(amenity)
                      ? "bg-red-700"
                      : "bg-gray-100"
                  }`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      selectedAmenities.includes(amenity)
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

          {/* Images */}
          <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
            <Text className="text-base font-bold text-gray-900 mb-3">
              Property Images
            </Text>
            <TouchableOpacity
              onPress={handleAddImages}
              className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 items-center"
            >
              <Ionicons name="cloud-upload-outline" size={48} color="#9CA3AF" />
              <Text className="text-gray-600 font-medium mt-2">
                Upload Images
              </Text>
              <Text className="text-gray-400 text-sm mt-1">
                JPG, PNG up to 10MB
              </Text>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-red-700 rounded-xl p-4 items-center mb-6 shadow-sm"
          >
            <Text className="text-white font-bold text-base">
              Publish Property
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
