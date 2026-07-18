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

export default function NotificationSettingsScreen() {
  // Push Notifications
  const [pushNotifications, setPushNotifications] = useState(true)
  const [newPropertyAlerts, setNewPropertyAlerts] = useState(true)
  const [priceChanges, setPriceChanges] = useState(true)
  const [bookingReminders, setBookingReminders] = useState(true)
  const [bookingUpdates, setBookingUpdates] = useState(true)
  const [messageNotifications, setMessageNotifications] = useState(true)

  // Email Notifications
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [weeklyNewsletter, setWeeklyNewsletter] = useState(false)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [propertyRecommendations, setPropertyRecommendations] = useState(true)

  // SMS Notifications
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [smsBookingReminders, setSmsBookingReminders] = useState(false)

  const handleSaveSettings = () => {
    Alert.alert(
      "Success",
      "Your notification preferences have been saved",
      [{ text: "OK", onPress: () => router.back() }]
    )
  }

  const NotificationSection = ({
    title,
    description,
    children,
  }: {
    title: string
    description?: string
    children: React.ReactNode
  }) => (
    <View className="mb-6">
      <View className="mb-3">
        <Text className="text-sm font-bold text-gray-900 uppercase tracking-wide">
          {title}
        </Text>
        {description && (
          <Text className="text-xs text-gray-500 mt-1">{description}</Text>
        )}
      </View>
      <View className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {children}
      </View>
    </View>
  )

  const NotificationItem = ({
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

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900 flex-1">
          Notifications
        </Text>
        <TouchableOpacity
          onPress={handleSaveSettings}
          className="bg-red-700 px-4 py-2 rounded-lg"
        >
          <Text className="text-white font-semibold">Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Push Notifications */}
          <NotificationSection
            title="Push Notifications"
            description="Receive notifications on your device"
          >
            <NotificationItem
              title="Enable Push Notifications"
              description="Master switch for all push notifications"
              value={pushNotifications}
              onValueChange={setPushNotifications}
            />
            <NotificationItem
              title="New Property Alerts"
              description="Get notified when new properties match your preferences"
              value={newPropertyAlerts}
              onValueChange={setNewPropertyAlerts}
            />
            <NotificationItem
              title="Price Changes"
              description="Alert when prices change on your saved properties"
              value={priceChanges}
              onValueChange={setPriceChanges}
            />
            <NotificationItem
              title="Booking Reminders"
              description="Reminders before your scheduled inspections"
              value={bookingReminders}
              onValueChange={setBookingReminders}
            />
            <NotificationItem
              title="Booking Updates"
              description="Updates on your booking status"
              value={bookingUpdates}
              onValueChange={setBookingUpdates}
            />
            <NotificationItem
              title="Messages"
              description="New messages from agents"
              value={messageNotifications}
              onValueChange={setMessageNotifications}
              isLast
            />
          </NotificationSection>

          {/* Email Notifications */}
          <NotificationSection
            title="Email Notifications"
            description="Manage what emails you receive"
          >
            <NotificationItem
              title="Enable Email Notifications"
              description="Master switch for all email notifications"
              value={emailNotifications}
              onValueChange={setEmailNotifications}
            />
            <NotificationItem
              title="Property Recommendations"
              description="Personalized property suggestions via email"
              value={propertyRecommendations}
              onValueChange={setPropertyRecommendations}
            />
            <NotificationItem
              title="Weekly Newsletter"
              description="Weekly roundup of new properties and market insights"
              value={weeklyNewsletter}
              onValueChange={setWeeklyNewsletter}
            />
            <NotificationItem
              title="Marketing Emails"
              description="Special offers and promotional content"
              value={marketingEmails}
              onValueChange={setMarketingEmails}
              isLast
            />
          </NotificationSection>

          {/* SMS Notifications */}
          <NotificationSection
            title="SMS Notifications"
            description="Text message notifications (standard rates apply)"
          >
            <NotificationItem
              title="Enable SMS Notifications"
              description="Receive important updates via text message"
              value={smsNotifications}
              onValueChange={setSmsNotifications}
            />
            <NotificationItem
              title="Booking Reminders"
              description="SMS reminders for upcoming inspections"
              value={smsBookingReminders}
              onValueChange={setSmsBookingReminders}
              isLast
            />
          </NotificationSection>

          {/* Quiet Hours */}
          <View className="mb-6">
            <Text className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
              Quiet Hours
            </Text>
            <TouchableOpacity className="bg-white rounded-xl border border-gray-100 px-4 py-4 flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-base font-medium text-gray-900">
                  Set Quiet Hours
                </Text>
                <Text className="text-xs text-gray-500 mt-1">
                  Disable notifications during specific hours
                </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-sm text-gray-600 mr-2">
                  Not Set
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
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
                You can manage device notification settings in your phone's
                Settings app. Critical security notifications cannot be
                disabled.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
