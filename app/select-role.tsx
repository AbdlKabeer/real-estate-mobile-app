import React from "react"
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native"
import { useRouter } from "expo-router"
import { Feather } from "@expo/vector-icons"

export default function SelectRoleScreen() {
  const router = useRouter()

  const handleRoleSelection = (role: "customer" | "agent") => {
    if (role === "customer") {
      router.push({
        pathname: "/(auth)/login" as any,
        params: { userType: "customer" },
      })
    } else {
      router.push({
        pathname: "/(auth)/login" as any,
        params: { userType: "agent" },
      })
    }
  }

  return (
    <ScrollView className="flex-1 bg-white" contentContainerClassName="px-6 pt-12 pb-8">
      {/* Header */}
      <View className="mb-12">
        <Text className="text-3xl font-bold text-gray-900 text-center mb-3">
          Welcome to Nexab
        </Text>
        <Text className="text-base text-gray-600 text-center">
          Choose how you want to continue
        </Text>
      </View>

      {/* Role Cards */}
      <View className="space-y-4">
        {/* Customer Card */}
        <TouchableOpacity
          onPress={() => handleRoleSelection("customer")}
          className="bg-white border-2 border-gray-200 rounded-2xl p-6 active:border-red-700"
          activeOpacity={0.7}
        >
          <View className="items-center">
            <View className="w-24 h-24 bg-blue-50 rounded-full items-center justify-center mb-4">
              <Feather name="home" size={48} color="#3B82F6" />
            </View>
            
            <Text className="text-2xl font-bold text-gray-900 mb-2">
              I'm a Customer
            </Text>
            
            <Text className="text-sm text-gray-600 text-center mb-4 px-4">
              Browse properties, book inspections, and find your dream home
            </Text>

            <View className="space-y-2 w-full">
              <View className="flex-row items-center">
                <Feather name="check-circle" size={16} color="#10B981" />
                <Text className="text-sm text-gray-700 ml-2">Browse properties</Text>
              </View>
              <View className="flex-row items-center">
                <Feather name="check-circle" size={16} color="#10B981" />
                <Text className="text-sm text-gray-700 ml-2">Filter & search</Text>
              </View>
              <View className="flex-row items-center">
                <Feather name="check-circle" size={16} color="#10B981" />
                <Text className="text-sm text-gray-700 ml-2">Book inspections</Text>
              </View>
              <View className="flex-row items-center">
                <Feather name="check-circle" size={16} color="#10B981" />
                <Text className="text-sm text-gray-700 ml-2">Chat with agents</Text>
              </View>
            </View>

            <View className="mt-6 bg-blue-700 py-3 px-8 rounded-full">
              <Text className="text-white font-semibold">Continue as Customer</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Agent Card */}
        <TouchableOpacity
          onPress={() => handleRoleSelection("agent")}
          className="bg-white border-2 border-gray-200 rounded-2xl p-6 mt-4 active:border-red-700"
          activeOpacity={0.7}
        >
          <View className="items-center">
            <View className="w-24 h-24 bg-red-50 rounded-full items-center justify-center mb-4">
              <Feather name="briefcase" size={48} color="#DC2626" />
            </View>
            
            <Text className="text-2xl font-bold text-gray-900 mb-2">
              I'm an Agent
            </Text>
            
            <Text className="text-sm text-gray-600 text-center mb-4 px-4">
              Manage properties, connect with customers, and close deals
            </Text>

            <View className="space-y-2 w-full">
              <View className="flex-row items-center">
                <Feather name="check-circle" size={16} color="#10B981" />
                <Text className="text-sm text-gray-700 ml-2">List properties</Text>
              </View>
              <View className="flex-row items-center">
                <Feather name="check-circle" size={16} color="#10B981" />
                <Text className="text-sm text-gray-700 ml-2">Manage bookings</Text>
              </View>
              <View className="flex-row items-center">
                <Feather name="check-circle" size={16} color="#10B981" />
                <Text className="text-sm text-gray-700 ml-2">Client communication</Text>
              </View>
              <View className="flex-row items-center">
                <Feather name="check-circle" size={16} color="#10B981" />
                <Text className="text-sm text-gray-700 ml-2">Analytics dashboard</Text>
              </View>
            </View>

            <View className="mt-6 bg-red-700 py-3 px-8 rounded-full">
              <Text className="text-white font-semibold">Continue as Agent</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View className="mt-8">
        <Text className="text-center text-sm text-gray-500">
          By continuing, you agree to our Terms & Privacy Policy
        </Text>
      </View>
    </ScrollView>
  )
}
