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
import { useAuthStore } from "@/lib/store/auth-store"
import { router } from "expo-router"
import { DrawerSidebar } from "@/components/ui/drawer-sidebar"
import { agentMenuItems } from "@/constants/menu-items"

export default function AgentDashboardScreen() {
  const { user } = useAuthStore()
  const [refreshing, setRefreshing] = React.useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setRefreshing(false)
  }

  const stats = [
    { label: "Active Listings", value: "12", icon: "home", color: "bg-blue-500" },
    { label: "Total Bookings", value: "28", icon: "calendar", color: "bg-green-500" },
    { label: "Pending Reviews", value: "5", icon: "eye", color: "bg-yellow-500" },
    { label: "Total Clients", value: "45", icon: "people", color: "bg-purple-500" },
  ]

  const recentActivities = [
    {
      id: "1",
      type: "booking",
      title: "New inspection booking",
      description: "Chidinma Okafor booked Victoria Island apartment",
      time: "2 hours ago",
      icon: "calendar",
      color: "bg-green-100",
      iconColor: "#16A34A",
      route: "/(agent)/bookings",
    },
    {
      id: "2",
      type: "property",
      title: "Property view increased",
      description: "Luxury Apartment in Lekki got 15 new views",
      time: "5 hours ago",
      icon: "eye",
      iconColor: "#2563EB",
      color: "bg-blue-100",
      route: "/(agent)/properties",
    },
    {
      id: "3",
      type: "message",
      title: "New client message",
      description: "Ibrahim asked about Maitama house",
      time: "1 day ago",
      icon: "chatbubble",
      iconColor: "#9333EA",
      color: "bg-purple-100",
      route: "/(agent)/clients",
    },
    {
      id: "4",
      type: "booking",
      title: "Inspection completed",
      description: "Ngozi Eze completed property viewing",
      time: "2 days ago",
      icon: "checkmark-circle",
      iconColor: "#16A34A",
      color: "bg-green-100",
      route: "/(agent)/bookings",
    },
    {
      id: "5",
      type: "property",
      title: "Property added",
      description: "Ocean View Apartment is now live",
      time: "3 days ago",
      icon: "home",
      iconColor: "#2563EB",
      color: "bg-blue-100",
      route: "/(agent)/properties",
    },
  ]

  const quickActions = [
    {
      label: "Add Property",
      icon: "add-circle",
      color: "bg-red-700",
      onPress: () => router.push("/property/add" as any),
    },
    {
      label: "View Bookings",
      icon: "calendar",
      color: "bg-blue-600",
      onPress: () => router.push("/(agent)/bookings" as any),
    },
    {
      label: "Messages",
      icon: "chatbubbles",
      color: "bg-green-600",
      onPress: () => {},
    },
    {
      label: "Reports",
      icon: "stats-chart",
      color: "bg-purple-600",
      onPress: () => {},
    },
  ]

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-100">
        <View className="flex-row items-center justify-between mb-2">
          <TouchableOpacity
            onPress={() => setIsDrawerOpen(true)}
            className="mr-3"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="menu" size={28} color="#111827" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-sm text-gray-600">Welcome back,</Text>
            <Text className="text-2xl font-bold text-gray-900">
              {user?.fullName || "Agent"}
            </Text>
          </View>
          <TouchableOpacity className="w-10 h-10 bg-red-100 rounded-full items-center justify-center">
            <Ionicons name="notifications-outline" size={22} color="#B91C1C" />
          </TouchableOpacity>
        </View>
        <Text className="text-sm text-gray-500 ml-11">
          Here's what's happening with your properties today
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Stats Grid */}
        <View className="p-4">
          <View className="flex-row flex-wrap gap-3">
            {stats.map((stat, index) => (
              <View
                key={index}
                className="bg-white rounded-2xl p-4 flex-1 min-w-[45%] shadow-sm border border-gray-100"
              >
                <View className={`w-12 h-12 ${stat.color} rounded-full items-center justify-center mb-3`}>
                  <Ionicons name={stat.icon as any} size={24} color="white" />
                </View>
                <Text className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </Text>
                <Text className="text-sm text-gray-600">{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-4 mb-4">
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={action.onPress}
                className={`${action.color} rounded-xl p-4 items-center justify-center flex-1 min-w-[45%]`}
              >
                <Ionicons name={action.icon as any} size={28} color="white" />
                <Text className="text-white font-semibold mt-2 text-center">
                  {action.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View className="px-4 mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-bold text-gray-900">
              Recent Activity
            </Text>
            <TouchableOpacity onPress={() => router.push("/agent/activity" as any)}>
              <Text className="text-sm text-red-700 font-semibold">
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <View className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            {recentActivities.slice(0, 3).map((activity, index) => (
              <TouchableOpacity
                key={activity.id}
                onPress={() => router.push(activity.route as any)}
                className={`p-4 flex-row items-start ${
                  index !== 2
                    ? "border-b border-gray-100"
                    : ""
                }`}
                activeOpacity={0.7}
              >
                <View
                  className={`w-12 h-12 ${activity.color} rounded-full items-center justify-center`}
                >
                  <Ionicons
                    name={activity.icon as any}
                    size={20}
                    color={activity.iconColor}
                  />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-base font-semibold text-gray-900 mb-1">
                    {activity.title}
                  </Text>
                  <Text className="text-sm text-gray-600 mb-1">
                    {activity.description}
                  </Text>
                  <Text className="text-xs text-gray-400">{activity.time}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Performance Chart Placeholder */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">
            This Month's Performance
          </Text>
          <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <View className="items-center justify-center py-8">
              <Ionicons name="trending-up" size={48} color="#D1D5DB" />
              <Text className="text-gray-500 text-center mt-4">
                Performance analytics coming soon
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
