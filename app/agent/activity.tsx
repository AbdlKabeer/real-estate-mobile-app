import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

type ActivityFilter = "all" | "bookings" | "properties" | "clients" | "messages"

const ALL_ACTIVITIES = [
  {
    id: "1",
    type: "booking",
    title: "New inspection booking",
    description: "Chidinma Okafor booked Victoria Island apartment",
    time: "2 hours ago",
    date: "Today, 2:30 PM",
    icon: "calendar",
    color: "bg-green-100",
    iconColor: "#16A34A",
    route: "/(agent)/bookings",
  },
  {
    id: "2",
    type: "property",
    title: "Property view increased",
    description: "Luxury Apartment in Lekki got 15 new views today",
    time: "5 hours ago",
    date: "Today, 11:00 AM",
    icon: "eye",
    iconColor: "#2563EB",
    color: "bg-blue-100",
    route: "/(agent)/properties",
  },
  {
    id: "3",
    type: "message",
    title: "New client message",
    description: "Ibrahim asked about Maitama house price and availability",
    time: "1 day ago",
    date: "Yesterday, 4:15 PM",
    icon: "chatbubble",
    iconColor: "#9333EA",
    color: "bg-purple-100",
    route: "/(agent)/clients",
  },
  {
    id: "4",
    type: "booking",
    title: "Inspection completed",
    description: "Ngozi Eze completed property viewing - awaiting feedback",
    time: "2 days ago",
    date: "Nov 14, 10:00 AM",
    icon: "checkmark-circle",
    iconColor: "#16A34A",
    color: "bg-green-100",
    route: "/(agent)/bookings",
  },
  {
    id: "5",
    type: "property",
    title: "Property added",
    description: "Ocean View Apartment is now live and visible to clients",
    time: "3 days ago",
    date: "Nov 13, 3:45 PM",
    icon: "home",
    iconColor: "#2563EB",
    color: "bg-blue-100",
    route: "/(agent)/properties",
  },
  {
    id: "6",
    type: "booking",
    title: "Booking cancelled",
    description: "Adebayo cancelled inspection for Ikoyi duplex",
    time: "4 days ago",
    date: "Nov 12, 9:20 AM",
    icon: "close-circle",
    iconColor: "#DC2626",
    color: "bg-red-100",
    route: "/(agent)/bookings",
  },
  {
    id: "7",
    type: "client",
    title: "New client registered",
    description: "Fatima joined and favorited 3 of your properties",
    time: "5 days ago",
    date: "Nov 11, 2:30 PM",
    icon: "person-add",
    iconColor: "#9333EA",
    color: "bg-purple-100",
    route: "/(agent)/clients",
  },
  {
    id: "8",
    type: "property",
    title: "Property updated",
    description: "Price reduced for Maitama house to attract buyers",
    time: "6 days ago",
    date: "Nov 10, 11:15 AM",
    icon: "create",
    iconColor: "#2563EB",
    color: "bg-blue-100",
    route: "/(agent)/properties",
  },
  {
    id: "9",
    type: "booking",
    title: "Inspection request",
    description: "Tunde requested viewing for Victoria Island apartment",
    time: "1 week ago",
    date: "Nov 9, 5:00 PM",
    icon: "calendar",
    iconColor: "#16A34A",
    color: "bg-green-100",
    route: "/(agent)/bookings",
  },
  {
    id: "10",
    type: "message",
    title: "Client inquiry",
    description: "Sarah asked about payment plans for Lekki property",
    time: "1 week ago",
    date: "Nov 8, 1:45 PM",
    icon: "chatbubble",
    iconColor: "#9333EA",
    color: "bg-purple-100",
    route: "/(agent)/clients",
  },
]

export default function ActivityHistoryScreen() {
  const [selectedFilter, setSelectedFilter] = useState<ActivityFilter>("all")
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setRefreshing(false)
  }

  const filters: { key: ActivityFilter; label: string; icon: string }[] = [
    { key: "all", label: "All", icon: "grid" },
    { key: "bookings", label: "Bookings", icon: "calendar" },
    { key: "properties", label: "Properties", icon: "home" },
    { key: "clients", label: "Clients", icon: "people" },
    { key: "messages", label: "Messages", icon: "chatbubble" },
  ]

  const getFilteredActivities = () => {
    if (selectedFilter === "all") return ALL_ACTIVITIES

    const typeMap: { [key in ActivityFilter]: string[] } = {
      all: [],
      bookings: ["booking"],
      properties: ["property"],
      clients: ["client"],
      messages: ["message"],
    }

    return ALL_ACTIVITIES.filter((activity) =>
      typeMap[selectedFilter].includes(activity.type)
    )
  }

  const filteredActivities = getFilteredActivities()

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-100">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900 flex-1">
            Activity History
          </Text>
        </View>

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
                <Ionicons
                  name={filter.icon as any}
                  size={16}
                  color={selectedFilter === filter.key ? "white" : "#374151"}
                />
                <Text
                  className={`font-medium ml-1.5 ${
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
          {filteredActivities.length === 0 ? (
            <View className="items-center justify-center py-20">
              <Ionicons name="time-outline" size={64} color="#D1D5DB" />
              <Text className="text-gray-500 text-lg font-medium mt-4">
                No activities found
              </Text>
            </View>
          ) : (
            filteredActivities.map((activity, index) => (
              <TouchableOpacity
                key={activity.id}
                onPress={() => router.push(activity.route as any)}
                className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100 flex-row items-start"
                activeOpacity={0.7}
              >
                <View
                  className={`w-14 h-14 ${activity.color} rounded-full items-center justify-center`}
                >
                  <Ionicons
                    name={activity.icon as any}
                    size={24}
                    color={activity.iconColor}
                  />
                </View>
                <View className="ml-4 flex-1">
                  <View className="flex-row items-start justify-between mb-1">
                    <Text className="text-base font-bold text-gray-900 flex-1">
                      {activity.title}
                    </Text>
                    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                  </View>
                  <Text className="text-sm text-gray-600 mb-2">
                    {activity.description}
                  </Text>
                  <View className="flex-row items-center">
                    <Ionicons name="time-outline" size={14} color="#9CA3AF" />
                    <Text className="text-xs text-gray-400 ml-1">
                      {activity.date}
                    </Text>
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
