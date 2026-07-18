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
import { usePropertyStore } from "@/lib/store/property-store"
import { router } from "expo-router"

// Mock bookings data
const MOCK_BOOKINGS = [
  {
    id: "booking-1",
    propertyId: "1",
    customerId: "customer-1",
    agentId: "agent-1",
    inspectionDate: "2025-11-20",
    inspectionTime: "10:00 AM",
    status: "confirmed" as const,
    notes: "Looking forward to viewing this property",
    createdAt: "2025-11-15T10:30:00Z",
    property: {
      id: "1",
      title: "Luxury Apartment in Victoria Island",
      address: "15 Adeola Odeku Street",
      city: "Lagos",
      price: 1500000,
      priceType: "monthly" as const,
      images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"],
      bedrooms: 2,
      bathrooms: 2,
      type: "apartment" as const,
    },
  },
  {
    id: "booking-2",
    propertyId: "2",
    customerId: "customer-1",
    agentId: "agent-1",
    inspectionDate: "2025-11-22",
    inspectionTime: "2:00 PM",
    status: "pending" as const,
    notes: "Interested in the BQ and garden space",
    createdAt: "2025-11-16T14:20:00Z",
    property: {
      id: "2",
      title: "Spacious Family House in Maitama",
      address: "Plot 42 Aguiyi Ironsi Street",
      city: "Abuja",
      price: 3200000,
      priceType: "monthly" as const,
      images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80"],
      bedrooms: 4,
      bathrooms: 3,
      type: "house" as const,
    },
  },
  {
    id: "booking-3",
    propertyId: "3",
    customerId: "customer-1",
    agentId: "agent-2",
    inspectionDate: "2025-11-18",
    inspectionTime: "11:30 AM",
    status: "completed" as const,
    notes: "",
    createdAt: "2025-11-10T09:15:00Z",
    property: {
      id: "3",
      title: "Luxury Apartment with Ocean View",
      address: "Eko Atlantic Boulevard",
      city: "Lagos",
      price: 2800000,
      priceType: "monthly" as const,
      images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"],
      bedrooms: 3,
      bathrooms: 2,
      type: "condo" as const,
    },
  },
  {
    id: "booking-4",
    propertyId: "1",
    customerId: "customer-1",
    agentId: "agent-1",
    inspectionDate: "2025-11-12",
    inspectionTime: "3:00 PM",
    status: "cancelled" as const,
    notes: "Change of schedule",
    createdAt: "2025-11-08T16:45:00Z",
    property: {
      id: "1",
      title: "Luxury Apartment in Victoria Island",
      address: "15 Adeola Odeku Street",
      city: "Lagos",
      price: 1500000,
      priceType: "monthly" as const,
      images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"],
      bedrooms: 2,
      bathrooms: 2,
      type: "apartment" as const,
    },
  },
]

type BookingStatus = "all" | "pending" | "confirmed" | "completed" | "cancelled"

export default function BookingsScreen() {
  const [selectedTab, setSelectedTab] = useState<BookingStatus>("all")
  const [refreshing, setRefreshing] = useState(false)
  const [bookings] = useState(MOCK_BOOKINGS)

  const onRefresh = async () => {
    setRefreshing(true)
    // Simulate refresh
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setRefreshing(false)
  }

  const filteredBookings =
    selectedTab === "all"
      ? bookings
      : bookings.filter((b) => b.status === selectedTab)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "completed":
        return "bg-blue-100 text-blue-700"
      case "cancelled":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return "checkmark-circle"
      case "pending":
        return "time"
      case "completed":
        return "checkmark-done-circle"
      case "cancelled":
        return "close-circle"
      default:
        return "help-circle"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const handleCancelBooking = (bookingId: string) => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this inspection?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            // Handle cancellation
            Alert.alert("Success", "Booking cancelled successfully")
          },
        },
      ]
    )
  }

  const tabs: { key: BookingStatus; label: string; count: number }[] = [
    { key: "all", label: "All", count: bookings.length },
    {
      key: "pending",
      label: "Pending",
      count: bookings.filter((b) => b.status === "pending").length,
    },
    {
      key: "confirmed",
      label: "Confirmed",
      count: bookings.filter((b) => b.status === "confirmed").length,
    },
    {
      key: "completed",
      label: "Completed",
      count: bookings.filter((b) => b.status === "completed").length,
    },
  ]

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900">My Bookings</Text>
        <Text className="text-sm text-gray-500 mt-1">
          Track your property inspections
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
            <View className="flex-row gap-2">
            {tabs.map((filter) => (
                <TouchableOpacity
                key={filter.key}
                onPress={() => setSelectedTab(filter.key)}
                className={`px-4 py-2 rounded-full flex-row items-center ${
                    selectedTab === filter.key ? "bg-red-700" : "bg-gray-100"
                }`}
                >
                <Text
                    className={`font-medium ${
                    selectedTab === filter.key
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                >
                    {filter.label}
                </Text>
                {filter.count > 0 && (
                    <View
                    className={`ml-2 px-2 py-0.5 rounded-full ${
                        selectedTab === filter.key
                        ? "bg-white"
                        : "bg-red-700"
                    }`}
                    >
                    <Text
                        className={`text-xs font-bold ${
                        selectedTab === filter.key
                            ? "text-red-700"
                            : "text-white"
                        }`}
                    >
                        {filter.count}
                    </Text>
                    </View>
                )}
                </TouchableOpacity>
            ))}
            </View>
        </ScrollView>
      </View>

      {/* Bookings List */}
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="p-4">
          {filteredBookings.length === 0 ? (
            <View className="items-center justify-center py-20">
              <Ionicons name="calendar-outline" size={64} color="#D1D5DB" />
              <Text className="text-gray-500 text-lg font-medium mt-4">
                No bookings found
              </Text>
              <Text className="text-gray-400 text-sm mt-2 text-center px-8">
                You don't have any{" "}
                {selectedTab !== "all" ? selectedTab : ""} bookings yet
              </Text>
            </View>
          ) : (
            filteredBookings.map((booking) => (
              <TouchableOpacity
                key={booking.id}
                onPress={() => router.push(`/property/${booking.propertyId}`)}
                className="mb-4 bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <View className="flex-row">
                  {/* Property Image */}
                  <Image
                    source={{ uri: booking.property.images[0] }}
                    className="w-28 h-full"
                  />

                  {/* Booking Details */}
                  <View className="flex-1 p-3">
                    {/* Status Badge */}
                    <View className="flex-row items-center justify-between mb-2">
                      <View
                        className={`flex-row items-center px-2 py-1 rounded-full ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        <Ionicons
                          name={getStatusIcon(booking.status) as any}
                          size={14}
                          color="currentColor"
                        />
                        <Text className="text-xs font-medium ml-1 capitalize">
                          {booking.status}
                        </Text>
                      </View>

                      {/* Cancel button for pending/confirmed */}
                      {(booking.status === "pending" ||
                        booking.status === "confirmed") && (
                        <TouchableOpacity
                          onPress={(e) => {
                            e.stopPropagation()
                            handleCancelBooking(booking.id)
                          }}
                          className="p-1"
                        >
                          <Ionicons name="close" size={20} color="#6B7280" />
                        </TouchableOpacity>
                      )}
                    </View>

                    {/* Property Title */}
                    <Text
                      className="text-base font-semibold text-gray-900 mb-1"
                      numberOfLines={1}
                    >
                      {booking.property.title}
                    </Text>

                    {/* Property Info */}
                    <View className="flex-row items-center mb-2">
                      <Ionicons
                        name="location-outline"
                        size={14}
                        color="#6B7280"
                      />
                      <Text className="text-xs text-gray-600 ml-1">
                        {booking.property.city}
                      </Text>
                      <Text className="text-gray-300 mx-2">•</Text>
                      <Text className="text-xs text-gray-600">
                        {booking.property.bedrooms} beds
                      </Text>
                    </View>

                    {/* Inspection Date & Time */}
                    <View className="flex-row items-center mt-2 pt-2 border-t border-gray-100">
                      <Ionicons
                        name="calendar-outline"
                        size={14}
                        color="#B91C1C"
                      />
                      <Text className="text-xs text-gray-700 ml-1 font-medium">
                        {formatDate(booking.inspectionDate)}
                      </Text>
                      <Text className="text-gray-300 mx-2">•</Text>
                      <Ionicons name="time-outline" size={14} color="#B91C1C" />
                      <Text className="text-xs text-gray-700 ml-1 font-medium">
                        {booking.inspectionTime}
                      </Text>
                    </View>

                    {/* Notes */}
                    {booking.notes && (
                      <Text
                        className="text-xs text-gray-500 mt-2"
                        numberOfLines={1}
                      >
                        Note: {booking.notes}
                      </Text>
                    )}
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
