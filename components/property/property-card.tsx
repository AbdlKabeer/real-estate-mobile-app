import React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { Feather } from "@expo/vector-icons"
import type { Property } from "@/lib/store/property-store"

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const router = useRouter()

    const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <TouchableOpacity
      onPress={() => router.push({ pathname: "/property/[id]" as any, params: { id: property.id } })}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-4"
      activeOpacity={0.8}
    >
      {/* Image */}
      <View className="relative">
        <Image
          source={{ uri: property.images[0] || "https://via.placeholder.com/400x250" }}
          className="w-full h-48"
          resizeMode="cover"
        />
        
        {/* Status Badge */}
        <View className={`absolute top-3 left-3 px-3 py-1 rounded-full ${
          property.status === "available" ? "bg-green-500" : 
          property.status === "rented" ? "bg-orange-500" : "bg-red-500"
        }`}>
          <Text className="text-white text-xs font-semibold capitalize">
            {property.status}
          </Text>
        </View>

        {/* Featured Badge */}
        {property.featured && (
          <View className="absolute top-3 right-3 bg-yellow-500 px-3 py-1 rounded-full flex-row items-center">
            <Feather name="star" size={12} color="white" />
            <Text className="text-white text-xs font-semibold ml-1">Featured</Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View className="p-4">
        {/* Price */}
        <Text className="text-2xl font-bold text-red-700 mb-2">
          {formatPrice(property.price)}
          <Text className="text-sm text-gray-600">
            {property.priceType === "monthly" ? "/mo" : property.priceType === "yearly" ? "/yr" : ""}
          </Text>
        </Text>

        {/* Title */}
        <Text className="text-lg font-semibold text-gray-900 mb-2" numberOfLines={1}>
          {property.title}
        </Text>

        {/* Location */}
        <View className="flex-row items-center mb-3">
          <Feather name="map-pin" size={14} color="#6B7280" />
          <Text className="text-sm text-gray-600 ml-1" numberOfLines={1}>
            {property.address}, {property.city}
          </Text>
        </View>

        {/* Features */}
        <View className="flex-row items-center gap-4 mb-3">
          <View className="flex-row items-center">
            <Feather name="home" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-600 ml-1 capitalize">{property.type}</Text>
          </View>
          
          <View className="flex-row items-center">
            <Feather name="maximize" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-600 ml-1">{property.bedrooms} Beds</Text>
          </View>
          
          <View className="flex-row items-center">
            <Feather name="droplet" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-600 ml-1">{property.bathrooms} Baths</Text>
          </View>
        </View>

        {/* Agent Info */}
        <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
          <View className="flex-row items-center flex-1">
            <View className="w-8 h-8 bg-red-100 rounded-full items-center justify-center">
              <Feather name="user" size={16} color="#B91C1C" />
            </View>
            <Text className="text-sm text-gray-700 ml-2" numberOfLines={1}>
              {property.agentName}
            </Text>
          </View>
          
          <TouchableOpacity className="bg-red-700 px-4 py-2 rounded-lg">
            <Text className="text-white text-xs font-semibold">View</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}
