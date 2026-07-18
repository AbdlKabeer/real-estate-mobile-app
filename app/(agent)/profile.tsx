import React from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useAuthStore } from "@/lib/store/auth-store"
import { router } from "expo-router"

export default function AgentProfileScreen() {
  const { user, logout } = useAuthStore()

  const handleLogout = async () => {
    await logout()
    router.replace("/(auth)/login")
  }

  const accountSettings = [
    {
      icon: "person-outline",
      label: "Edit Profile",
      route: "/profile/edit",
    },
    {
      icon: "lock-closed-outline",
      label: "Change Password",
      route: "/profile/change-password",
    },
    {
      icon: "card-outline",
      label: "Payment Methods",
      route: "/profile/payment-methods",
    },
    {
      icon: "stats-chart-outline",
      label: "Business Analytics",
      route: "/profile/business-analytics",
    },
  ]

  const agentSettings = [
    {
      icon: "briefcase-outline",
      label: "Agency Information",
      route: "/profile/agency-info",
    },
    {
      icon: "document-text-outline",
      label: "Verification Documents",
      route: "/profile/verification-docs",
    },
    {
      icon: "pricetag-outline",
      label: "Commission Settings",
      route: "/profile/commission-settings",
    },
  ]

  const supportOptions = [
    {
      icon: "notifications-outline",
      label: "Notifications",
      route: "/profile/notifications",
    },
    {
      icon: "shield-checkmark-outline",
      label: "Privacy & Security",
      route: "/profile/privacy",
    },
    {
      icon: "help-circle-outline",
      label: "Help & Support",
      route: "/profile/help-support",
    },
    {
      icon: "document-outline",
      label: "Terms & Conditions",
      route: null,
    },
  ]

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="bg-white px-6 py-6 border-b border-gray-100">
          <View className="items-center">
            <View className="w-24 h-24 bg-red-700 rounded-full items-center justify-center mb-3">
              <Text className="text-white text-4xl font-bold">
                {user?.fullName?.charAt(0) || "A"}
              </Text>
            </View>
            <Text className="text-2xl font-bold text-gray-900 mb-1">
              {user?.fullName || "Agent Name"}
            </Text>
            <Text className="text-sm text-gray-600 mb-1">{user?.email}</Text>
            <View className="bg-red-100 px-3 py-1 rounded-full mt-2">
              <Text className="text-red-700 text-xs font-semibold">
                Verified Agent
              </Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View className="bg-white m-4 rounded-2xl p-4 shadow-sm border border-gray-100">
          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-900">12</Text>
              <Text className="text-sm text-gray-600 mt-1">Properties</Text>
            </View>
            <View className="w-px bg-gray-200" />
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-900">28</Text>
              <Text className="text-sm text-gray-600 mt-1">Bookings</Text>
            </View>
            <View className="w-px bg-gray-200" />
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-900">45</Text>
              <Text className="text-sm text-gray-600 mt-1">Clients</Text>
            </View>
          </View>
        </View>

        {/* Account Settings */}
        <View className="px-4 mb-4">
          <Text className="text-sm font-semibold text-gray-500 mb-2 px-2">
            ACCOUNT SETTINGS
          </Text>
          <View className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            {accountSettings.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => item.route && router.push(item.route as any)}
                className={`flex-row items-center justify-between p-4 ${
                  index !== accountSettings.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center">
                    <Ionicons name={item.icon as any} size={20} color="#B91C1C" />
                  </View>
                  <Text className="text-base text-gray-900 ml-3">
                    {item.label}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Agent Settings */}
        <View className="px-4 mb-4">
          <Text className="text-sm font-semibold text-gray-500 mb-2 px-2">
            AGENT SETTINGS
          </Text>
          <View className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            {agentSettings.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => item.route && router.push(item.route as any)}
                className={`flex-row items-center justify-between p-4 ${
                  index !== agentSettings.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
                    <Ionicons name={item.icon as any} size={20} color="#2563EB" />
                  </View>
                  <Text className="text-base text-gray-900 ml-3">
                    {item.label}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Support */}
        <View className="px-4 mb-4">
          <Text className="text-sm font-semibold text-gray-500 mb-2 px-2">
            SUPPORT
          </Text>
          <View className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            {supportOptions.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => item.route && router.push(item.route as any)}
                className={`flex-row items-center justify-between p-4 ${
                  index !== supportOptions.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
                    <Ionicons name={item.icon as any} size={20} color="#6B7280" />
                  </View>
                  <Text className="text-base text-gray-900 ml-3">
                    {item.label}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout */}
        <View className="px-4 mb-6">
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-white rounded-2xl p-4 flex-row items-center justify-center shadow-sm border border-red-200"
          >
            <Ionicons name="log-out-outline" size={20} color="#B91C1C" />
            <Text className="text-red-700 font-semibold ml-2">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
