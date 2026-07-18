import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Linking,
  Platform,
} from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import { Feather } from "@expo/vector-icons"
import { usePropertyStore } from "@/lib/store/property-store"
import { useAuthStore } from "@/lib/store/auth-store"
import { useToast } from "@/context/toast-provider"

// Conditionally import MapView to avoid errors when not configured
let MapView: any = null
let Marker: any = null
let PROVIDER_GOOGLE: any = null

try {
  const maps = require("react-native-maps")
  MapView = maps.default
  Marker = maps.Marker
  PROVIDER_GOOGLE = maps.PROVIDER_GOOGLE
} catch (e) {
  console.log("MapView not available - using fallback")
}

const { width } = Dimensions.get("window")

export default function PropertyDetailsScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const { showToast } = useToast()
  const { user } = useAuthStore()
  const { selectedProperty, fetchPropertyById, isLoading } = usePropertyStore()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const propertyId = params.id as string

  useEffect(() => {
    if (propertyId) {
      fetchPropertyById(propertyId)
    }
  }, [propertyId])

  if (isLoading || !selectedProperty) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#B91C1C" />
      </View>
    )
  }

  const property = selectedProperty

  const formatPrice = (price: number, type: string) => {
    const formatted = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price)
    return `${formatted}${type === "monthly" ? "/month" : type === "yearly" ? "/year" : ""}`
  }

  const handleContactAgent = () => {
    Linking.openURL(`tel:${property.agentPhone}`)
  }

  const handleEmailAgent = () => {
    Linking.openURL(`mailto:${property.agentEmail}`)
  }

  const handleChatAgent = () => {
    router.push({
      pathname: "/chat/[agentId]" as any,
      params: {
        agentId: property.agentId,
        agentName: property.agentName,
      },
    })
  }

  const handleBookInspection = () => {
    router.push({
      pathname: "/booking/schedule" as any,
      params: {
        propertyId: property.id,
        propertyTitle: property.title,
        agentId: property.agentId,
      },
    })
  }

  const handleOpenMaps = () => {
    const address = `${property.address}, ${property.city}, ${property.state} ${property.zipCode}`
    const url = Platform.select({
      ios: `maps:0,0?q=${encodeURIComponent(address)}`,
      android: `geo:0,0?q=${encodeURIComponent(address)}`,
    })
    
    if (url) {
      Linking.openURL(url)
    }
  }

  const handleGetDirections = () => {
    const address = `${property.address}, ${property.city}, ${property.state} ${property.zipCode}`
    const url = Platform.select({
      ios: `maps:?daddr=${encodeURIComponent(address)}`,
      android: `google.navigation:q=${encodeURIComponent(address)}`,
    })
    
    if (url) {
      Linking.openURL(url).catch(() => {
        // Fallback to Google Maps web
        Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`)
      })
    }
  }

  // Default coordinates (New York) or use property coordinates if available
  const mapRegion = {
    latitude: property.latitude || 40.7128,
    longitude: property.longitude || -74.0060,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View className="relative">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width)
              setCurrentImageIndex(index)
            }}
            scrollEventThrottle={16}
          >
            {property.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={{ width, height: 300 }}
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          {/* Header Buttons */}
          <View className="absolute top-12 left-0 right-0 flex-row items-center justify-between px-6">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-lg"
            >
              <Feather name="arrow-left" size={20} color="#1F2937" />
            </TouchableOpacity>

            <View className="flex-row gap-2">
              <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-lg">
                <Feather name="share-2" size={20} color="#1F2937" />
              </TouchableOpacity>
              <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-lg">
                <Feather name="heart" size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Image Indicators */}
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-2">
            {property.images.map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </View>
        </View>

        {/* Content */}
        <View className="px-6 py-6">
          {/* Price & Status */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-3xl font-bold text-red-700">
              {formatPrice(property.price, property.priceType)}
            </Text>
            <View
              className={`px-3 py-1 rounded-full ${
                property.status === "available"
                  ? "bg-green-100"
                  : property.status === "rented"
                  ? "bg-orange-100"
                  : "bg-red-100"
              }`}
            >
              <Text
                className={`text-sm font-semibold capitalize ${
                  property.status === "available"
                    ? "text-green-700"
                    : property.status === "rented"
                    ? "text-orange-700"
                    : "text-red-700"
                }`}
              >
                {property.status}
              </Text>
            </View>
          </View>

          {/* Title */}
          <Text className="text-2xl font-bold text-gray-900 mb-2">{property.title}</Text>

          {/* Location */}
          <View className="flex-row items-center mb-6">
            <Feather name="map-pin" size={18} color="#6B7280" />
            <Text className="text-base text-gray-600 ml-2">
              {property.address}, {property.city}, {property.state}
            </Text>
          </View>

          {/* Features */}
          <View className="flex-row items-center gap-6 mb-6 pb-6 border-b border-gray-200">
            <View className="items-center">
              <View className="w-12 h-12 bg-red-50 rounded-full items-center justify-center mb-2">
                <Feather name="home" size={20} color="#B91C1C" />
              </View>
              <Text className="text-sm font-semibold text-gray-900 capitalize">
                {property.type}
              </Text>
            </View>

            <View className="items-center">
              <View className="w-12 h-12 bg-red-50 rounded-full items-center justify-center mb-2">
                <Feather name="maximize" size={20} color="#B91C1C" />
              </View>
              <Text className="text-sm font-semibold text-gray-900">
                {property.bedrooms} Beds
              </Text>
            </View>

            <View className="items-center">
              <View className="w-12 h-12 bg-red-50 rounded-full items-center justify-center mb-2">
                <Feather name="droplet" size={20} color="#B91C1C" />
              </View>
              <Text className="text-sm font-semibold text-gray-900">
                {property.bathrooms} Baths
              </Text>
            </View>

            <View className="items-center">
              <View className="w-12 h-12 bg-red-50 rounded-full items-center justify-center mb-2">
                <Feather name="square" size={20} color="#B91C1C" />
              </View>
              <Text className="text-sm font-semibold text-gray-900">
                {property.area} sqft
              </Text>
            </View>
          </View>

          {/* Description */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-900 mb-3">Description</Text>
            <Text className="text-base text-gray-600 leading-6">{property.description}</Text>
          </View>

          {/* Amenities */}
          {property.amenities.length > 0 && (
            <View className="mb-6">
              <Text className="text-lg font-bold text-gray-900 mb-3">Amenities</Text>
              <View className="flex-row flex-wrap gap-2">
                {property.amenities.map((amenity, index) => (
                  <View
                    key={index}
                    className="flex-row items-center bg-gray-100 px-3 py-2 rounded-lg"
                  >
                    <Feather name="check-circle" size={16} color="#10B981" />
                    <Text className="text-sm text-gray-700 ml-2">{amenity}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Location & Map */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-900 mb-3">Location</Text>
            
            {/* Address Card */}
            <View className="bg-gray-50 rounded-xl p-4 mb-3">
              <View className="flex-row items-start mb-3">
                <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center">
                  <Feather name="map-pin" size={20} color="#B91C1C" />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-base font-semibold text-gray-900 mb-1">
                    {property.address}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {property.city}, {property.state} {property.zipCode}
                  </Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={handleGetDirections}
                  className="flex-1 bg-red-700 py-3 rounded-lg flex-row items-center justify-center"
                >
                  <Feather name="navigation" size={18} color="white" />
                  <Text className="text-white font-semibold ml-2">Get Directions</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleOpenMaps}
                  className="px-4 py-3 border border-red-700 rounded-lg items-center justify-center"
                >
                  <Feather name="external-link" size={18} color="#B91C1C" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Map View */}
            <View className="rounded-xl overflow-hidden border border-gray-200" style={{ height: 250 }}>
              {MapView ? (
                <>
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{ flex: 1 }}
                    initialRegion={mapRegion}
                    scrollEnabled={false}
                    zoomEnabled={false}
                    pitchEnabled={false}
                    rotateEnabled={false}
                  >
                    <Marker
                      coordinate={{
                        latitude: mapRegion.latitude,
                        longitude: mapRegion.longitude,
                      }}
                      title={property.title}
                      description={property.address}
                    >
                      <View className="bg-red-700 px-3 py-2 rounded-full shadow-lg">
                        <Feather name="home" size={20} color="white" />
                      </View>
                    </Marker>
                  </MapView>
                  
                  {/* Tap to expand overlay */}
                  <TouchableOpacity
                    onPress={handleOpenMaps}
                    className="absolute inset-0 bg-transparent"
                    activeOpacity={1}
                  />
                </>
              ) : (
                /* Fallback when MapView is not available */
                <TouchableOpacity
                  onPress={handleOpenMaps}
                  className="flex-1 bg-gray-100 items-center justify-center"
                  activeOpacity={0.8}
                >
                  <View className="items-center">
                    <View className="w-16 h-16 bg-red-700 rounded-full items-center justify-center mb-3">
                      <Feather name="map-pin" size={28} color="white" />
                    </View>
                    <Text className="text-base font-semibold text-gray-900 mb-1">
                      View on Map
                    </Text>
                    <Text className="text-sm text-gray-600 text-center px-8">
                      Tap to open location in maps app
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>

            {/* Nearby Info */}
            <View className="mt-3 flex-row flex-wrap gap-2">
              <View className="bg-blue-50 px-3 py-2 rounded-lg flex-row items-center">
                <Feather name="shopping-cart" size={14} color="#3B82F6" />
                <Text className="text-xs text-blue-700 ml-1 font-medium">
                  Shopping nearby
                </Text>
              </View>
              <View className="bg-green-50 px-3 py-2 rounded-lg flex-row items-center">
                <Feather name="coffee" size={14} color="#10B981" />
                <Text className="text-xs text-green-700 ml-1 font-medium">
                  Restaurants
                </Text>
              </View>
              <View className="bg-purple-50 px-3 py-2 rounded-lg flex-row items-center">
                <Feather name="book" size={14} color="#8B5CF6" />
                <Text className="text-xs text-purple-700 ml-1 font-medium">
                  Schools nearby
                </Text>
              </View>
            </View>
          </View>

          {/* Payment Security Disclaimer */}
          <View className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-6">
            <View className="flex-row items-start">
              <View className="w-10 h-10 bg-amber-100 rounded-full items-center justify-center">
                <Feather name="alert-triangle" size={20} color="#D97706" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-base font-bold text-amber-900 mb-2">
                  Payment Security Notice
                </Text>
                <Text className="text-sm text-amber-800 leading-5 mb-2">
                  <Text className="font-semibold">NEVER</Text> send money directly to agents or landlords outside this platform.
                </Text>
                <View className="bg-white rounded-lg p-3 mt-2">
                  <Text className="text-xs font-semibold text-gray-900 mb-2">
                    ✓ All payments should be made within the app
                  </Text>
                  <Text className="text-xs font-semibold text-gray-900 mb-2">
                    ✓ Payment protection is only valid for in-app transactions
                  </Text>
                  <Text className="text-xs font-semibold text-gray-900">
                    ✓ Report any requests for external payment immediately
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Agent Info */}
          <View className="bg-gray-50 rounded-2xl p-4 mb-6">
            <Text className="text-lg font-bold text-gray-900 mb-4">Listed By</Text>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <View className="w-14 h-14 bg-red-100 rounded-full items-center justify-center">
                  <Feather name="user" size={24} color="#B91C1C" />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-lg font-semibold text-gray-900">
                    {property.agentName}
                  </Text>
                  <Text className="text-sm text-gray-600">Property Agent</Text>
                </View>
              </View>

              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={handleContactAgent}
                  className="w-10 h-10 bg-red-700 rounded-full items-center justify-center"
                >
                  <Feather name="phone" size={18} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleChatAgent}
                  className="w-10 h-10 bg-red-700 rounded-full items-center justify-center"
                >
                  <Feather name="message-circle" size={18} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="bg-white border-t border-gray-200 px-6 py-4 flex-row items-center gap-3">
        <TouchableOpacity
          onPress={handleChatAgent}
          className="w-12 h-12 border border-red-700 rounded-lg items-center justify-center"
        >
          <Feather name="message-circle" size={20} color="#B91C1C" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleBookInspection}
          className="flex-1 bg-red-700 py-4 rounded-lg items-center"
          activeOpacity={0.8}
        >
          <Text className="text-white text-base font-semibold">Book Inspection</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
