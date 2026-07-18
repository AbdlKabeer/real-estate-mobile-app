import React from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

export default function BusinessAnalyticsScreen() {
  const analyticsData = {
    thisMonth: {
      revenue: 4500000,
      bookings: 28,
      newClients: 12,
      propertyViews: 1245,
    },
    lastMonth: {
      revenue: 3800000,
      bookings: 24,
      newClients: 8,
      propertyViews: 980,
    },
  }

  const calculateGrowth = (current: number, previous: number) => {
    const growth = ((current - previous) / previous) * 100
    return growth.toFixed(1)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const metrics = [
    {
      label: "Total Revenue",
      current: analyticsData.thisMonth.revenue,
      previous: analyticsData.lastMonth.revenue,
      icon: "cash",
      color: "bg-green-500",
      format: "currency",
    },
    {
      label: "Bookings",
      current: analyticsData.thisMonth.bookings,
      previous: analyticsData.lastMonth.bookings,
      icon: "calendar",
      color: "bg-blue-500",
      format: "number",
    },
    {
      label: "New Clients",
      current: analyticsData.thisMonth.newClients,
      previous: analyticsData.lastMonth.newClients,
      icon: "people",
      color: "bg-purple-500",
      format: "number",
    },
    {
      label: "Property Views",
      current: analyticsData.thisMonth.propertyViews,
      previous: analyticsData.lastMonth.propertyViews,
      icon: "eye",
      color: "bg-orange-500",
      format: "number",
    },
  ]

  const topProperties = [
    {
      name: "Luxury Apartment - Victoria Island",
      views: 342,
      bookings: 12,
      revenue: 1800000,
    },
    {
      name: "Spacious House - Maitama",
      views: 289,
      bookings: 8,
      revenue: 1500000,
    },
    {
      name: "Ocean View - Eko Atlantic",
      views: 214,
      bookings: 5,
      revenue: 1200000,
    },
  ]

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white px-6 py-4 border-b border-gray-100 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900">
          Business Analytics
        </Text>
      </View>

      <ScrollView className="flex-1">
        {/* Period Selector */}
        <View className="p-4">
          <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <Text className="text-sm text-gray-600 mb-2">Viewing period</Text>
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-bold text-gray-900">This Month</Text>
              <TouchableOpacity className="flex-row items-center">
                <Text className="text-sm text-red-700 font-semibold mr-1">
                  Change Period
                </Text>
                <Ionicons name="chevron-down" size={16} color="#B91C1C" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Key Metrics */}
        <View className="px-4 mb-4">
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Key Metrics
          </Text>
          {metrics.map((metric, index) => {
            const growth = calculateGrowth(metric.current, metric.previous)
            const isPositive = parseFloat(growth) >= 0

            return (
              <View
                key={index}
                className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100"
              >
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center">
                    <View
                      className={`w-12 h-12 ${metric.color} rounded-full items-center justify-center`}
                    >
                      <Ionicons
                        name={metric.icon as any}
                        size={24}
                        color="white"
                      />
                    </View>
                    <Text className="text-base text-gray-600 ml-3">
                      {metric.label}
                    </Text>
                  </View>
                  <View
                    className={`px-2 py-1 rounded-full ${
                      isPositive ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        isPositive ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {growth}%
                    </Text>
                  </View>
                </View>

                <Text className="text-2xl font-bold text-gray-900">
                  {metric.format === "currency"
                    ? formatPrice(metric.current)
                    : metric.current.toLocaleString()}
                </Text>
                <Text className="text-sm text-gray-500 mt-1">
                  vs {metric.format === "currency"
                    ? formatPrice(metric.previous)
                    : metric.previous.toLocaleString()}{" "}
                  last month
                </Text>
              </View>
            )
          })}
        </View>

        {/* Top Performing Properties */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Top Performing Properties
          </Text>
          <View className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            {topProperties.map((property, index) => (
              <View
                key={index}
                className={`p-4 ${
                  index !== topProperties.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <View className="flex-row items-center mb-2">
                  <View className="w-8 h-8 bg-red-700 rounded-full items-center justify-center">
                    <Text className="text-white font-bold">{index + 1}</Text>
                  </View>
                  <Text className="text-base font-semibold text-gray-900 ml-3 flex-1">
                    {property.name}
                  </Text>
                </View>

                <View className="flex-row justify-between mt-2">
                  <View>
                    <Text className="text-xs text-gray-500">Views</Text>
                    <Text className="text-sm font-semibold text-gray-900">
                      {property.views}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-xs text-gray-500">Bookings</Text>
                    <Text className="text-sm font-semibold text-gray-900">
                      {property.bookings}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-xs text-gray-500">Revenue</Text>
                    <Text className="text-sm font-semibold text-gray-900">
                      {formatPrice(property.revenue)}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
