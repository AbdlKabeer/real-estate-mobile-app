import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

const MOCK_INSPECTION_REQUESTS = [
  {
    id: "1",
    clientName: "Chidinma Okafor",
    clientPhone: "+234 803 456 7890",
    propertyTitle: "Luxury Apartment in Victoria Island",
    propertyAddress: "15 Adeola Odeku Street, Lagos",
    date: "2024-02-25",
    time: "10:00 AM",
    status: "pending",
    inspectionFee: 5000,
    message: "I'm interested in viewing this property for my family.",
    requestedAt: "2 hours ago",
  },
  {
    id: "2",
    clientName: "Ibrahim Musa",
    clientPhone: "+234 806 123 4567",
    propertyTitle: "Spacious House in Maitama",
    propertyAddress: "Plot 42 Aguiyi Ironsi Street, Abuja",
    date: "2024-02-26",
    time: "2:00 PM",
    status: "confirmed",
    inspectionFee: 5000,
    message: "Looking to purchase for investment. Will bring architect.",
    requestedAt: "1 day ago",
  },
  {
    id: "3",
    clientName: "Ngozi Eze",
    clientPhone: "+234 807 890 1234",
    propertyTitle: "Ocean View Apartment",
    propertyAddress: "Eko Atlantic Boulevard, Lagos",
    date: "2024-02-24",
    time: "11:00 AM",
    status: "completed",
    inspectionFee: 5000,
    message: "",
    requestedAt: "3 days ago",
  },
]

type FilterType = "all" | "pending" | "confirmed" | "completed" | "cancelled"

export default function AgentBookingsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all")
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setRefreshing(false)
  }

  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: "all", label: "All", count: 3 },
    { key: "pending", label: "Pending", count: 1 },
    { key: "confirmed", label: "Confirmed", count: 1 },
    { key: "completed", label: "Completed", count: 1 },
    { key: "cancelled", label: "Cancelled", count: 0 },
  ]

  const filteredBookings =
    selectedFilter === "all"
      ? MOCK_INSPECTION_REQUESTS
      : MOCK_INSPECTION_REQUESTS.filter((b) => b.status === selectedFilter)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "confirmed":
        return "bg-green-100 text-green-700"
      case "completed":
        return "bg-blue-100 text-blue-700"
      case "cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const handleAcceptBooking = (bookingId: string) => {
    console.log("Accept booking:", bookingId)
    // In real app: update booking status to confirmed
  }

  const handleRejectBooking = (bookingId: string) => {
    console.log("Reject booking:", bookingId)
    // In real app: update booking status to cancelled
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          Inspection Bookings
        </Text>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                onPress={() => setSelectedFilter(filter.key)}
                className={`px-4 py-2 rounded-full flex-row items-center ${
                  selectedFilter === filter.key ? "bg-red-700" : "bg-gray-100"
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
                {filter.count > 0 && (
                  <View
                    className={`ml-2 px-2 py-0.5 rounded-full ${
                      selectedFilter === filter.key
                        ? "bg-white"
                        : "bg-red-700"
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        selectedFilter === filter.key
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
            </View>
          ) : (
            filteredBookings.map((booking) => (
              <View
                key={booking.id}
                className="bg-white rounded-2xl overflow-hidden mb-4 shadow-sm border border-gray-100"
              >
                {/* Status Badge */}
                <View className="px-4 pt-4 pb-2 border-b border-gray-100">
                  <View className="flex-row items-center justify-between">
                    <View
                      className={`px-3 py-1 rounded-full ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      <Text
                        className={`text-xs font-semibold capitalize ${getStatusColor(
                          booking.status
                        ).split(" ")[1]}`}
                      >
                        {booking.status}
                      </Text>
                    </View>
                    <Text className="text-xs text-gray-500">
                      {booking.requestedAt}
                    </Text>
                  </View>
                </View>

                {/* Property Info */}
                <View className="p-4 border-b border-gray-100">
                  <Text className="text-lg font-bold text-gray-900 mb-1">
                    {booking.propertyTitle}
                  </Text>
                  <View className="flex-row items-center">
                    <Ionicons
                      name="location-outline"
                      size={14}
                      color="#6B7280"
                    />
                    <Text className="text-sm text-gray-600 ml-1">
                      {booking.propertyAddress}
                    </Text>
                  </View>
                </View>

                {/* Client Info */}
                <View className="p-4 border-b border-gray-100">
                  <Text className="text-sm font-semibold text-gray-700 mb-2">
                    Client Information
                  </Text>
                  <View className="flex-row items-center mb-2">
                    <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center">
                      <Ionicons name="person" size={20} color="#B91C1C" />
                    </View>
                    <View className="ml-3">
                      <Text className="text-base font-semibold text-gray-900">
                        {booking.clientName}
                      </Text>
                      <Text className="text-sm text-gray-600">
                        {booking.clientPhone}
                      </Text>
                    </View>
                  </View>
                  {booking.message && (
                    <View className="bg-gray-50 rounded-lg p-3 mt-2">
                      <Text className="text-sm text-gray-700">
                        "{booking.message}"
                      </Text>
                    </View>
                  )}
                </View>

                {/* Appointment Details */}
                <View className="p-4 border-b border-gray-100">
                  <Text className="text-sm font-semibold text-gray-700 mb-2">
                    Appointment Details
                  </Text>
                  <View className="flex-row items-center mb-2">
                    <Ionicons name="calendar" size={18} color="#6B7280" />
                    <Text className="text-base text-gray-900 ml-2">
                      {new Date(booking.date).toLocaleDateString("en-NG", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </Text>
                  </View>
                  <View className="flex-row items-center mb-2">
                    <Ionicons name="time" size={18} color="#6B7280" />
                    <Text className="text-base text-gray-900 ml-2">
                      {booking.time}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="cash" size={18} color="#6B7280" />
                    <Text className="text-base text-gray-900 ml-2">
                      Inspection Fee: {formatPrice(booking.inspectionFee)}
                    </Text>
                  </View>
                </View>

                {/* Actions */}
                {booking.status === "pending" && (
                  <View className="p-4 flex-row gap-3">
                    <TouchableOpacity
                      onPress={() => handleRejectBooking(booking.id)}
                      className="flex-1 bg-gray-100 rounded-xl py-3 items-center"
                    >
                      <Text className="text-gray-700 font-semibold">
                        Decline
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleAcceptBooking(booking.id)}
                      className="flex-1 bg-red-700 rounded-xl py-3 items-center"
                    >
                      <Text className="text-white font-semibold">
                        Accept Booking
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {booking.status === "confirmed" && (
                  <View className="p-4">
                    <TouchableOpacity className="bg-blue-600 rounded-xl py-3 items-center flex-row justify-center">
                      <Ionicons name="call" size={18} color="white" />
                      <Text className="text-white font-semibold ml-2">
                        Call Client
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
