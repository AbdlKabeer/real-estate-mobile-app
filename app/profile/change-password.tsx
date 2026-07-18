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
import { router } from "expo-router"

export default function ChangePasswordScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const validateForm = () => {
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required"
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required"
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error !== "")
  }

  const handleChangePassword = async () => {
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    Alert.alert(
      "Success",
      "Your password has been changed successfully",
      [{ text: "OK", onPress: () => router.back() }]
    )
  }

  const passwordRequirements = [
    { text: "At least 8 characters", met: formData.newPassword.length >= 8 },
    {
      text: "Contains uppercase letter",
      met: /[A-Z]/.test(formData.newPassword),
    },
    {
      text: "Contains lowercase letter",
      met: /[a-z]/.test(formData.newPassword),
    },
    { text: "Contains a number", met: /\d/.test(formData.newPassword) },
    {
      text: "Contains special character",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword),
    },
  ]

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900 flex-1">
          Change Password
        </Text>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Current Password */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Current Password
            </Text>
            <View className="relative">
              <TextInput
                value={formData.currentPassword}
                onChangeText={(text) =>
                  setFormData({ ...formData, currentPassword: text })
                }
                placeholder="Enter current password"
                secureTextEntry={!showCurrentPassword}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-12 text-base text-gray-900"
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-4 top-3"
              >
                <Ionicons
                  name={showCurrentPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
            {errors.currentPassword ? (
              <Text className="text-red-600 text-xs mt-1">
                {errors.currentPassword}
              </Text>
            ) : null}
          </View>

          {/* New Password */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              New Password
            </Text>
            <View className="relative">
              <TextInput
                value={formData.newPassword}
                onChangeText={(text) =>
                  setFormData({ ...formData, newPassword: text })
                }
                placeholder="Enter new password"
                secureTextEntry={!showNewPassword}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-12 text-base text-gray-900"
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity
                onPress={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-3"
              >
                <Ionicons
                  name={showNewPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
            {errors.newPassword ? (
              <Text className="text-red-600 text-xs mt-1">
                {errors.newPassword}
              </Text>
            ) : null}
          </View>

          {/* Password Requirements */}
          {formData.newPassword.length > 0 && (
            <View className="bg-gray-50 p-4 rounded-xl mb-4">
              <Text className="text-sm font-semibold text-gray-900 mb-3">
                Password Requirements
              </Text>
              {passwordRequirements.map((req, index) => (
                <View key={index} className="flex-row items-center mb-2">
                  <Ionicons
                    name={req.met ? "checkmark-circle" : "ellipse-outline"}
                    size={18}
                    color={req.met ? "#10B981" : "#D1D5DB"}
                  />
                  <Text
                    className={`text-sm ml-2 ${
                      req.met ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {req.text}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Confirm Password */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </Text>
            <View className="relative">
              <TextInput
                value={formData.confirmPassword}
                onChangeText={(text) =>
                  setFormData({ ...formData, confirmPassword: text })
                }
                placeholder="Confirm new password"
                secureTextEntry={!showConfirmPassword}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-12 text-base text-gray-900"
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-3"
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword ? (
              <Text className="text-red-600 text-xs mt-1">
                {errors.confirmPassword}
              </Text>
            ) : null}
          </View>

          {/* Security Tips */}
          <View className="bg-yellow-50 p-4 rounded-xl mb-6">
            <View className="flex-row items-start">
              <Ionicons name="shield-checkmark" size={20} color="#F59E0B" />
              <View className="ml-2 flex-1">
                <Text className="text-sm font-semibold text-yellow-900 mb-2">
                  Security Tips
                </Text>
                <Text className="text-xs text-yellow-700">
                  • Use a unique password for this account{"\n"}
                  • Don't share your password with anyone{"\n"}
                  • Change your password regularly{"\n"}
                  • Use a password manager for better security
                </Text>
              </View>
            </View>
          </View>

          {/* Change Password Button */}
          <TouchableOpacity
            onPress={handleChangePassword}
            disabled={isLoading}
            className="bg-red-700 py-4 rounded-xl items-center shadow-sm"
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white font-bold text-base">
                Change Password
              </Text>
            )}
          </TouchableOpacity>

          {/* Forgot Password Link */}
          <TouchableOpacity
            onPress={() => router.push("/(auth)/forgot-password")}
            className="items-center mt-4"
          >
            <Text className="text-red-700 font-medium text-sm">
              Forgot your current password?
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
