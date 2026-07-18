import React from "react"
import { View, Text, ScrollView, TouchableOpacity, Linking } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

export default function HelpSupportScreen() {
  const faqCategories = [
    {
      title: "Getting Started",
      questions: [
        "How do I add my first property?",
        "How to verify my agent account?",
        "Setting up payment methods",
      ],
    },
    {
      title: "Property Management",
      questions: [
        "How to edit property details?",
        "Managing property availability",
        "Property pricing strategies",
      ],
    },
    {
      title: "Bookings & Clients",
      questions: [
        "Managing inspection bookings",
        "Communicating with clients",
        "Handling booking cancellations",
      ],
    },
  ]

  const contactOptions = [
    {
      icon: "mail",
      label: "Email Support",
      value: "support@nexab.ng",
      action: () => Linking.openURL("mailto:support@nexab.ng"),
      color: "bg-blue-100",
      iconColor: "#2563EB",
    },
    {
      icon: "call",
      label: "Phone Support",
      value: "+234 800 123 4567",
      action: () => Linking.openURL("tel:+2348001234567"),
      color: "bg-green-100",
      iconColor: "#16A34A",
    },
    {
      icon: "logo-whatsapp",
      label: "WhatsApp",
      value: "+234 803 456 7890",
      action: () => Linking.openURL("https://wa.me/2348034567890"),
      color: "bg-green-100",
      iconColor: "#16A34A",
    },
    {
      icon: "chatbubbles",
      label: "Live Chat",
      value: "Available 9AM - 6PM",
      action: () => {},
      color: "bg-purple-100",
      iconColor: "#9333EA",
    },
  ]

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white px-6 py-4 border-b border-gray-100 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900">
          Help & Support
        </Text>
      </View>

      <ScrollView className="flex-1">
        {/* Contact Options */}
        <View className="p-4">
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Contact Us
          </Text>
          {contactOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={option.action}
              className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100 flex-row items-center"
            >
              <View className={`w-12 h-12 ${option.color} rounded-full items-center justify-center`}>
                <Ionicons
                  name={option.icon as any}
                  size={24}
                  color={option.iconColor}
                />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-base font-semibold text-gray-900 mb-1">
                  {option.label}
                </Text>
                <Text className="text-sm text-gray-600">{option.value}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQ Categories */}
        <View className="px-4 pb-4">
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Frequently Asked Questions
          </Text>
          {faqCategories.map((category, index) => (
            <View
              key={index}
              className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100"
            >
              <View className="flex-row items-center mb-3">
                <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center">
                  <Ionicons name="help-circle" size={20} color="#B91C1C" />
                </View>
                <Text className="text-base font-bold text-gray-900 ml-3">
                  {category.title}
                </Text>
              </View>
              {category.questions.map((question, qIndex) => (
                <TouchableOpacity
                  key={qIndex}
                  className={`py-3 flex-row items-center justify-between ${
                    qIndex !== category.questions.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >
                  <Text className="text-sm text-gray-700 flex-1">
                    {question}
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        {/* Additional Resources */}
        <View className="px-4 pb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Resources
          </Text>
          <View className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <TouchableOpacity className="p-4 flex-row items-center justify-between border-b border-gray-100">
              <View className="flex-row items-center">
                <Ionicons name="book-outline" size={20} color="#6B7280" />
                <Text className="text-base text-gray-900 ml-3">
                  Agent Guide
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity className="p-4 flex-row items-center justify-between border-b border-gray-100">
              <View className="flex-row items-center">
                <Ionicons name="play-circle-outline" size={20} color="#6B7280" />
                <Text className="text-base text-gray-900 ml-3">
                  Video Tutorials
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity className="p-4 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="bulb-outline" size={20} color="#6B7280" />
                <Text className="text-base text-gray-900 ml-3">
                  Best Practices
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
