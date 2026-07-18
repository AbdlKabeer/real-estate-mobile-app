import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

export default function PrivacySecurityScreen() {
  const [profileVisibility, setProfileVisibility] = useState(true)
  const [showEmail, setShowEmail] = useState(false)
  const [showPhone, setShowPhone] = useState(false)
  const [searchHistory, setSearchHistory] = useState(true)
  const [activityTracking, setActivityTracking] = useState(true)
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [biometricAuth, setBiometricAuth] = useState(false)

  const handleClearSearchHistory = () => {
    Alert.alert(
      "Clear Search History",
      "Are you sure you want to clear all your search history?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => {
            Alert.alert("Success", "Search history cleared")
          },
        },
      ]
    )
  }

  const handleClearCache = () => {
    Alert.alert(
      "Clear Cache",
      "This will clear app cache and temporary files. You'll remain logged in.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          onPress: () => {
            Alert.alert("Success", "Cache cleared successfully")
          },
        },
      ]
    )
  }

  const handleDownloadData = () => {
    Alert.alert(
      "Download My Data",
      "We'll prepare a copy of your data and email it to you within 24 hours.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Request",
          onPress: () => {
            Alert.alert("Success", "Data download request submitted")
          },
        },
      ]
    )
  }

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action cannot be undone. All your data will be permanently deleted.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            router.push("/profile/delete-account" as any)
          },
        },
      ]
    )
  }

  const PrivacyItem = ({
    title,
    description,
    value,
    onValueChange,
    isLast = false,
  }: {
    title: string
    description: string
    value: boolean
    onValueChange: (value: boolean) => void
    isLast?: boolean
  }) => (
    <View
      className={`px-4 py-4 flex-row items-center justify-between ${
        !isLast ? "border-b border-gray-100" : ""
      }`}
    >
      <View className="flex-1 mr-3">
        <Text className="text-base font-medium text-gray-900">{title}</Text>
        <Text className="text-xs text-gray-500 mt-1">{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#D1D5DB", true: "#FCA5A5" }}
        thumbColor={value ? "#B91C1C" : "#F3F4F6"}
      />
    </View>
  )

  const ActionItem = ({
    title,
    description,
    icon,
    onPress,
    isLast = false,
    isDanger = false,
  }: {
    title: string
    description: string
    icon: string
    onPress: () => void
    isLast?: boolean
    isDanger?: boolean
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className={`px-4 py-4 flex-row items-center ${
        !isLast ? "border-b border-gray-100" : ""
      }`}
    >
      <View
        className={`w-10 h-10 rounded-full items-center justify-center ${
          isDanger ? "bg-red-50" : "bg-gray-100"
        }`}
      >
        <Ionicons
          name={icon as any}
          size={20}
          color={isDanger ? "#DC2626" : "#374151"}
        />
      </View>
      <View className="flex-1 ml-3">
        <Text
          className={`text-base font-medium ${
            isDanger ? "text-red-600" : "text-gray-900"
          }`}
        >
          {title}
        </Text>
        <Text className="text-xs text-gray-500 mt-1">{description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  )

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900 flex-1">
          Privacy & Security
        </Text>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Profile Privacy */}
          <View className="mb-6">
            <Text className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
              Profile Privacy
            </Text>
            <View className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <PrivacyItem
                title="Profile Visibility"
                description="Make your profile visible to agents"
                value={profileVisibility}
                onValueChange={setProfileVisibility}
              />
              <PrivacyItem
                title="Show Email"
                description="Display your email on your profile"
                value={showEmail}
                onValueChange={setShowEmail}
              />
              <PrivacyItem
                title="Show Phone"
                description="Display your phone number on your profile"
                value={showPhone}
                onValueChange={setShowPhone}
                isLast
              />
            </View>
          </View>

          {/* Data & Privacy */}
          <View className="mb-6">
            <Text className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
              Data & Privacy
            </Text>
            <View className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <PrivacyItem
                title="Search History"
                description="Save your property searches"
                value={searchHistory}
                onValueChange={setSearchHistory}
              />
              <PrivacyItem
                title="Activity Tracking"
                description="Help us improve your experience with usage data"
                value={activityTracking}
                onValueChange={setActivityTracking}
                isLast
              />
            </View>
          </View>

          {/* Security */}
          <View className="mb-6">
            <Text className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
              Security
            </Text>
            <View className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <PrivacyItem
                title="Two-Factor Authentication"
                description="Add an extra layer of security to your account"
                value={twoFactorAuth}
                onValueChange={setTwoFactorAuth}
              />
              <PrivacyItem
                title="Biometric Login"
                description="Use Face ID or fingerprint to login"
                value={biometricAuth}
                onValueChange={setBiometricAuth}
                isLast
              />
            </View>
          </View>

          {/* Data Management */}
          <View className="mb-6">
            <Text className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
              Data Management
            </Text>
            <View className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <ActionItem
                title="Clear Search History"
                description="Remove all saved searches"
                icon="time-outline"
                onPress={handleClearSearchHistory}
              />
              <ActionItem
                title="Clear Cache"
                description="Free up storage space"
                icon="trash-outline"
                onPress={handleClearCache}
              />
              <ActionItem
                title="Download My Data"
                description="Get a copy of your data"
                icon="download-outline"
                onPress={handleDownloadData}
                isLast
              />
            </View>
          </View>

          {/* Connected Accounts */}
          <View className="mb-6">
            <Text className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
              Connected Accounts
            </Text>
            <View className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <TouchableOpacity className="px-4 py-4 flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <View className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center">
                    <Ionicons name="logo-google" size={20} color="#4285F4" />
                  </View>
                  <View className="ml-3 flex-1">
                    <Text className="text-base font-medium text-gray-900">
                      Google
                    </Text>
                    <Text className="text-xs text-gray-500 mt-1">
                      Not connected
                    </Text>
                  </View>
                </View>
                <Text className="text-sm text-red-700 font-medium">
                  Connect
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Activity */}
          <View className="mb-6">
            <Text className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
              Recent Activity
            </Text>
            <TouchableOpacity className="bg-white rounded-xl border border-gray-100 px-4 py-4 flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
                  <Ionicons name="time-outline" size={20} color="#374151" />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-base font-medium text-gray-900">
                    Login History
                  </Text>
                  <Text className="text-xs text-gray-500 mt-1">
                    View your recent login activity
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Danger Zone */}
          <View className="mb-6">
            <Text className="text-sm font-bold text-red-600 uppercase tracking-wide mb-3">
              Danger Zone
            </Text>
            <View className="bg-white rounded-xl border border-red-200 overflow-hidden">
              <ActionItem
                title="Delete Account"
                description="Permanently delete your account and all data"
                icon="trash-outline"
                onPress={handleDeleteAccount}
                isDanger
                isLast
              />
            </View>
          </View>

          {/* Info */}
          <View className="bg-blue-50 p-4 rounded-xl mb-4">
            <View className="flex-row">
              <Ionicons
                name="information-circle"
                size={20}
                color="#2563EB"
              />
              <Text className="text-xs text-blue-700 ml-2 flex-1">
                We take your privacy seriously. Learn more about how we protect
                your data in our Privacy Policy.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
