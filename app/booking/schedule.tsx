import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import { Feather } from "@expo/vector-icons"
import { usePropertyStore } from "@/lib/store/property-store"
import { useAuthStore } from "@/lib/store/auth-store"
import { useToast } from "@/context/toast-provider"

export default function BookingScheduleScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const { showToast } = useToast()
  const { user } = useAuthStore()
  const { bookInspection, isLoading } = usePropertyStore()

  const propertyId = params.propertyId as string
  const propertyTitle = params.propertyTitle as string
  const agentId = params.agentId as string

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState("10:00 AM")
  const [notes, setNotes] = useState("")

  // Generate next 7 days
  const getNextDays = () => {
    const days = []
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      days.push(date)
    }
    return days
  }

  const availableDates = getNextDays()

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ]

  const handleConfirmBooking = async () => {
    try {
      if (!user) {
        showToast("Please login to book an inspection", "error")
        return
      }

      await bookInspection({
        propertyId,
        customerId: user.userId,
        agentId,
        inspectionDate: selectedDate.toISOString().split("T")[0],
        inspectionTime: selectedTime,
        notes,
        status: "pending",
      })

      showToast("Inspection booked successfully!", "success")
      router.back()
    } catch (error) {
      showToast("Failed to book inspection", "error")
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-white pt-12 pb-4 px-6 border-b border-gray-200">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Feather name="arrow-left" size={24} color="#1F2937" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-xl font-bold text-gray-900">Book Inspection</Text>
            <Text className="text-sm text-gray-600" numberOfLines={1}>
              {propertyTitle}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-6" showsVerticalScrollIndicator={false}>
        {/* Select Date */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-3">
              {availableDates.map((date, index) => {
                const isSelected = date.toDateString() === selectedDate.toDateString()
                const dayName = date.toLocaleDateString("en-US", { weekday: "short" })
                const dayNum = date.getDate()

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedDate(date)}
                    className={`items-center py-3 px-4 rounded-lg border-2 min-w-[70px] ${
                      isSelected
                        ? "bg-red-700 border-red-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <Text
                      className={`text-sm font-medium mb-1 ${
                        isSelected ? "text-white" : "text-gray-600"
                      }`}
                    >
                      {dayName}
                    </Text>
                    <Text
                      className={`text-xl font-bold ${
                        isSelected ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {dayNum}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </ScrollView>
        </View>

        {/* Select Time */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">Select Time</Text>
          <View className="flex-row flex-wrap gap-2">
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                onPress={() => setSelectedTime(time)}
                className={`px-4 py-3 rounded-lg border ${
                  selectedTime === time
                    ? "bg-red-700 border-red-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <Text
                  className={`font-medium ${
                    selectedTime === time ? "text-white" : "text-gray-700"
                  }`}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Additional Notes */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Additional Notes (Optional)
          </Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Any specific requirements or questions..."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-base"
          />
        </View>

        {/* Booking Summary */}
        <View className="bg-red-50 rounded-lg p-4 mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">Booking Summary</Text>
          
          <View className="space-y-2">
            <View className="flex-row items-start">
              <Feather name="home" size={16} color="#6B7280" />
              <View className="ml-3 flex-1">
                <Text className="text-sm text-gray-600">Property</Text>
                <Text className="text-sm font-semibold text-gray-900" numberOfLines={2}>
                  {propertyTitle}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center mt-2">
              <Feather name="calendar" size={16} color="#6B7280" />
              <View className="ml-3">
                <Text className="text-sm text-gray-600">Date</Text>
                <Text className="text-sm font-semibold text-gray-900">
                  {formatDate(selectedDate)}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center mt-2">
              <Feather name="clock" size={16} color="#6B7280" />
              <View className="ml-3">
                <Text className="text-sm text-gray-600">Time</Text>
                <Text className="text-sm font-semibold text-gray-900">{selectedTime}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Important Info */}
        <View className="bg-yellow-50 rounded-lg p-4 mb-6">
          <View className="flex-row items-start">
            <Feather name="info" size={20} color="#F59E0B" />
            <View className="ml-3 flex-1">
              <Text className="text-sm font-semibold text-gray-900 mb-1">
                Important Information
              </Text>
              <Text className="text-sm text-gray-600 leading-5">
                • The agent will confirm your booking within 24 hours{"\n"}
                • Please arrive 5 minutes before the scheduled time{"\n"}
                • Bring a valid ID for verification
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Security Warning */}
        <View className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
          <View className="flex-row items-start">
            <Feather name="shield" size={20} color="#DC2626" />
            <View className="ml-3 flex-1">
              <Text className="text-sm font-bold text-red-900 mb-2">
                🚨 Payment Security Warning
              </Text>
              <Text className="text-xs text-red-800 leading-4 mb-2">
                <Text className="font-bold">NEVER</Text> make payments outside this platform. All payments must be processed through the app for your protection.
              </Text>
              <Text className="text-xs text-red-700 font-semibold">
                Report suspicious payment requests immediately.
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Options */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">Inspection Fee</Text>
          <View className="bg-white border border-gray-200 rounded-lg p-4">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-gray-600">Inspection Fee</Text>
              <Text className="text-xl font-bold text-gray-900">₦5,000</Text>
            </View>
            <Text className="text-xs text-gray-500 mb-3">
              Refundable if you proceed with rental/purchase
            </Text>
            
            <TouchableOpacity className="bg-green-600 py-3 rounded-lg flex-row items-center justify-center mb-2">
              <Feather name="credit-card" size={18} color="white" />
              <Text className="text-white font-semibold ml-2">Pay Now (Secure)</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="border border-gray-300 py-3 rounded-lg flex-row items-center justify-center">
              <Feather name="calendar" size={18} color="#374151" />
              <Text className="text-gray-700 font-semibold ml-2">Pay at Inspection</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirmation Checklist */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">Before Confirming</Text>
          <View className="bg-blue-50 rounded-lg p-4">
            <View className="flex-row items-start mb-2">
              <Feather name="check-square" size={16} color="#2563EB" />
              <Text className="text-sm text-blue-900 ml-2 flex-1">
                Verify property details and location
              </Text>
            </View>
            <View className="flex-row items-start mb-2">
              <Feather name="check-square" size={16} color="#2563EB" />
              <Text className="text-sm text-blue-900 ml-2 flex-1">
                Confirm your availability for selected date & time
              </Text>
            </View>
            <View className="flex-row items-start">
              <Feather name="check-square" size={16} color="#2563EB" />
              <Text className="text-sm text-blue-900 ml-2 flex-1">
                Prepare valid ID and questions for agent
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="bg-white border-t border-gray-200 px-6 py-4">
        <TouchableOpacity
          onPress={handleConfirmBooking}
          disabled={isLoading}
          className="bg-red-700 py-4 rounded-lg items-center"
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-base font-semibold">Confirm Booking</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}
