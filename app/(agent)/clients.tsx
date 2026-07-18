import React from "react"
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

const MOCK_CLIENTS = [
  {
    id: "1",
    name: "Chidinma Okafor",
    phone: "+234 803 456 7890",
    email: "chidinma.okafor@email.com",
    bookings: 3,
    lastContact: "2 hours ago",
    status: "active",
  },
  {
    id: "2",
    name: "Ibrahim Musa",
    phone: "+234 806 123 4567",
    email: "ibrahim.musa@email.com",
    bookings: 1,
    lastContact: "1 day ago",
    status: "active",
  },
  {
    id: "3",
    name: "Ngozi Eze",
    phone: "+234 807 890 1234",
    email: "ngozi.eze@email.com",
    bookings: 2,
    lastContact: "3 days ago",
    status: "inactive",
  },
]

export default function AgentClientsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          My Clients
        </Text>
        <Text className="text-sm text-gray-600">
          {MOCK_CLIENTS.length} total clients
        </Text>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          {MOCK_CLIENTS.map((client) => (
            <TouchableOpacity
              key={client.id}
              className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100"
            >
              <View className="flex-row items-start">
                {/* Avatar */}
                <View className="w-16 h-16 bg-red-100 rounded-full items-center justify-center">
                  <Text className="text-red-700 text-xl font-bold">
                    {client.name.charAt(0)}
                  </Text>
                </View>

                {/* Client Info */}
                <View className="ml-4 flex-1">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-lg font-bold text-gray-900">
                      {client.name}
                    </Text>
                    <View
                      className={`px-2 py-1 rounded-full ${
                        client.status === "active"
                          ? "bg-green-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <Text
                        className={`text-xs font-semibold ${
                          client.status === "active"
                            ? "text-green-700"
                            : "text-gray-600"
                        }`}
                      >
                        {client.status}
                      </Text>
                    </View>
                  </View>

                  <View className="mb-1">
                    <View className="flex-row items-center mb-1">
                      <Ionicons name="call" size={14} color="#6B7280" />
                      <Text className="text-sm text-gray-600 ml-2">
                        {client.phone}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons name="mail" size={14} color="#6B7280" />
                      <Text className="text-sm text-gray-600 ml-2">
                        {client.email}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center justify-between pt-2 border-t border-gray-100 mt-2">
                    <Text className="text-xs text-gray-500">
                      {client.bookings} bookings • Last contact {client.lastContact}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              <View className="flex-row gap-2 mt-3">
                <TouchableOpacity className="flex-1 bg-blue-600 rounded-lg py-2 flex-row items-center justify-center">
                  <Ionicons name="call" size={16} color="white" />
                  <Text className="text-white font-semibold text-sm ml-1">
                    Call
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-green-600 rounded-lg py-2 flex-row items-center justify-center">
                  <Ionicons name="chatbubble" size={16} color="white" />
                  <Text className="text-white font-semibold text-sm ml-1">
                    Message
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
