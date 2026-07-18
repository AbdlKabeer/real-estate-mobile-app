import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useAuthStore } from "@/lib/store/auth-store"
import { router } from "expo-router"

export default function ProfileScreen() {
  const { user, logout } = useAuthStore()
  const [pushNotifications, setPushNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [propertyAlerts, setPropertyAlerts] = useState(true)
  const [bookingReminders, setBookingReminders] = useState(true)

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout()
          router.replace("/(auth)/login")
        },
      },
    ])
  }

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure? This action cannot be undone. All your data will be permanently deleted.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            Alert.alert("Success", "Account deletion request submitted")
          },
        },
      ]
    )
  }

  const profileMenuItems = [
    {
      id: "edit-profile",
      title: "Edit Profile",
      icon: "person-outline",
      description: "Update your personal information",
      onPress: () => router.push("/profile/edit"),
    },
    {
      id: "change-password",
      title: "Change Password",
      icon: "lock-closed-outline",
      description: "Update your password",
      onPress: () => router.push("/profile/change-password"),
    },
    {
      id: "notifications",
      title: "Notification Settings",
      icon: "notifications-outline",
      description: "Manage your notification preferences",
      onPress: () => router.push("/profile/notifications"),
    },
    {
      id: "privacy",
      title: "Privacy & Security",
      icon: "shield-checkmark-outline",
      description: "Manage your privacy settings",
      onPress: () => router.push("/profile/privacy"),
    },
  ]

  const supportMenuItems = [
    {
      id: "help",
      title: "Help Center",
      icon: "help-circle-outline",
      onPress: () => Alert.alert("Help Center", "Opening help center..."),
    },
    {
      id: "about",
      title: "About",
      icon: "information-circle-outline",
      onPress: () => Alert.alert("About", "Nexab Real Estate App v1.0.0"),
    },
    {
      id: "terms",
      title: "Terms & Conditions",
      icon: "document-text-outline",
      onPress: () => Alert.alert("Terms", "Opening terms and conditions..."),
    },
    {
      id: "privacy-policy",
      title: "Privacy Policy",
      icon: "eye-outline",
      onPress: () => Alert.alert("Privacy Policy", "Opening privacy policy..."),
    },
  ]

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-4 py-4 bg-white border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900">Profile</Text>
      </View>

      <ScrollView className="flex-1">
        {/* User Info Card */}
        <View className="bg-white m-4 rounded-2xl p-6 shadow-sm border border-gray-100">
          <View className="items-center">
            {/* Profile Picture */}
            <View className="w-24 h-24 bg-gradient-to-br from-red-700 to-red-500 rounded-full items-center justify-center mb-4 shadow-lg">
              <Text className="text-white text-3xl font-bold">
                {user?.fullName ? getInitials(user.fullName) : "U"}
              </Text>
            </View>

            {/* User Details */}
            <Text className="text-xl font-bold text-gray-900 mb-1">
              {user?.fullName || "User"}
            </Text>
            <Text className="text-sm text-gray-500 mb-1">
              {user?.email || "user@example.com"}
            </Text>
            {user?.phone && (
              <Text className="text-sm text-gray-500 mb-3">{user.phone}</Text>
            )}

            {/* Role Badge */}
            <View className="bg-red-50 px-4 py-2 rounded-full">
              <Text className="text-red-700 font-semibold text-sm capitalize">
                {user?.role || "Customer"} Account
              </Text>
            </View>

            {/* Upload Photo Button */}
            <TouchableOpacity className="mt-4 px-6 py-2 bg-gray-100 rounded-full">
              <Text className="text-gray-700 font-medium text-sm">
                Change Photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Settings */}
        <View className="bg-white mx-4 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <View className="px-4 py-3 border-b border-gray-100">
            <Text className="text-sm font-bold text-gray-900 uppercase tracking-wide">
              Account Settings
            </Text>
          </View>
          {profileMenuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              onPress={item.onPress}
              className={`flex-row items-center px-4 py-4 ${
                index !== profileMenuItems.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
                <Ionicons name={item.icon as any} size={20} color="#374151" />
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-base font-semibold text-gray-900">
                  {item.title}
                </Text>
                <Text className="text-xs text-gray-500 mt-1">
                  {item.description}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Notification Settings */}
        <View className="bg-white mx-4 mt-4 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <View className="px-4 py-3 border-b border-gray-100">
            <Text className="text-sm font-bold text-gray-900 uppercase tracking-wide">
              Quick Settings
            </Text>
          </View>
          <View className="px-4 py-3 flex-row items-center justify-between border-b border-gray-100">
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">
                Push Notifications
              </Text>
              <Text className="text-xs text-gray-500 mt-1">
                Receive push notifications
              </Text>
            </View>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: "#D1D5DB", true: "#FCA5A5" }}
              thumbColor={pushNotifications ? "#B91C1C" : "#F3F4F6"}
            />
          </View>
          <View className="px-4 py-3 flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">
                Property Alerts
              </Text>
              <Text className="text-xs text-gray-500 mt-1">
                Get notified about new properties
              </Text>
            </View>
            <Switch
              value={propertyAlerts}
              onValueChange={setPropertyAlerts}
              trackColor={{ false: "#D1D5DB", true: "#FCA5A5" }}
              thumbColor={propertyAlerts ? "#B91C1C" : "#F3F4F6"}
            />
          </View>
        </View>

        {/* Support & Info */}
        <View className="bg-white mx-4 mt-4 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <View className="px-4 py-3 border-b border-gray-100">
            <Text className="text-sm font-bold text-gray-900 uppercase tracking-wide">
              Support & Information
            </Text>
          </View>
          {supportMenuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              onPress={item.onPress}
              className={`flex-row items-center px-4 py-4 ${
                index !== supportMenuItems.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
                <Ionicons name={item.icon as any} size={20} color="#374151" />
              </View>
              <Text className="flex-1 ml-3 text-base font-medium text-gray-900">
                {item.title}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Danger Zone */}
        <View className="mx-4 mt-4 mb-4">
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-white rounded-2xl px-4 py-4 flex-row items-center justify-center shadow-sm border border-gray-100 mb-3"
          >
            <Ionicons name="log-out-outline" size={20} color="#B91C1C" />
            <Text className="text-red-700 font-semibold text-base ml-2">
              Logout
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDeleteAccount}
            className="bg-white rounded-2xl px-4 py-3 flex-row items-center justify-center shadow-sm border border-red-200"
          >
            <Ionicons name="trash-outline" size={18} color="#DC2626" />
            <Text className="text-red-600 font-medium text-sm ml-2">
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View className="items-center pb-6">
          <Text className="text-xs text-gray-400">Nexab Real Estate</Text>
          <Text className="text-xs text-gray-400 mt-1">Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
