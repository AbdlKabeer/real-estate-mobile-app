import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useAuthStore } from "@/lib/store/auth-store"
import { router } from "expo-router"

export default function EditProfileScreen() {
  const { user } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })

  const handleSave = async () => {
    if (!formData.fullName.trim()) {
      Alert.alert("Error", "Full name is required")
      return
    }

    if (!formData.email.trim()) {
      Alert.alert("Error", "Email is required")
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    Alert.alert("Success", "Profile updated successfully", [
      { text: "OK", onPress: () => router.back() },
    ])
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900 flex-1">
          Edit Profile
        </Text>
        <TouchableOpacity
          onPress={handleSave}
          disabled={isLoading}
          className="bg-red-700 px-4 py-2 rounded-lg"
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text className="text-white font-semibold">Save</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Profile Picture Section */}
          <View className="items-center mb-6 pt-4">
            <View className="w-28 h-28 bg-gradient-to-br from-red-700 to-red-500 rounded-full items-center justify-center mb-4 shadow-lg">
              <Text className="text-white text-3xl font-bold">
                {formData.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase() || "U"}
              </Text>
            </View>
            <TouchableOpacity className="flex-row items-center px-4 py-2 bg-gray-100 rounded-full">
              <Ionicons name="camera-outline" size={18} color="#374151" />
              <Text className="text-gray-700 font-medium text-sm ml-2">
                Change Photo
              </Text>
            </TouchableOpacity>
          </View>

          {/* Basic Information */}
          <View className="mb-6">
            <Text className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
              Basic Information
            </Text>

            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </Text>
              <TextInput
                value={formData.fullName}
                onChangeText={(text) =>
                  setFormData({ ...formData, fullName: text })
                }
                placeholder="Enter your full name"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Email *
              </Text>
              <TextInput
                value={formData.email}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </Text>
              <TextInput
                value={formData.phone}
                onChangeText={(text) =>
                  setFormData({ ...formData, phone: text })
                }
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Address Information */}
          <View className="mb-6">
            <Text className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
              Address Information
            </Text>

            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Street Address
              </Text>
              <TextInput
                value={formData.address}
                onChangeText={(text) =>
                  setFormData({ ...formData, address: text })
                }
                placeholder="Enter your street address"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View className="flex-row mb-4">
              <View className="flex-1 mr-2">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  City
                </Text>
                <TextInput
                  value={formData.city}
                  onChangeText={(text) =>
                    setFormData({ ...formData, city: text })
                  }
                  placeholder="City"
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View className="flex-1 ml-2">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  State
                </Text>
                <TextInput
                  value={formData.state}
                  onChangeText={(text) =>
                    setFormData({ ...formData, state: text })
                  }
                  placeholder="State"
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Zip Code
              </Text>
              <TextInput
                value={formData.zipCode}
                onChangeText={(text) =>
                  setFormData({ ...formData, zipCode: text })
                }
                placeholder="Enter zip code"
                keyboardType="numeric"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Info Note */}
          <View className="bg-blue-50 p-4 rounded-xl mb-4">
            <View className="flex-row">
              <Ionicons
                name="information-circle"
                size={20}
                color="#2563EB"
              />
              <Text className="text-xs text-blue-700 ml-2 flex-1">
                Make sure your information is accurate. This will be used for
                all communications and property transactions.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
