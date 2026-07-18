import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { DrawerSidebar } from "@/components/ui/drawer-sidebar"

const agentMenuItems = [
  {
    icon: "person-outline" as const,
    label: "Profile",
    route: "/profile/edit",
    description: "Edit your profile",
  },
  {
    icon: "business-outline" as const,
    label: "Agency Info",
    route: "/profile/agency-info",
    description: "Manage agency details",
  },
  {
    icon: "stats-chart-outline" as const,
    label: "Analytics",
    route: "/profile/business-analytics",
    description: "View business insights",
  },
  {
    icon: "cash-outline" as const,
    label: "Commission",
    route: "/profile/commission-settings",
    description: "Configure commissions",
  },
  {
    icon: "card-outline" as const,
    label: "Payments",
    route: "/profile/payment-methods",
    description: "Manage payment methods",
  },
  {
    icon: "people-outline" as const,
    label: "Clients",
    route: "/(agent)/clients",
    description: "Manage your clients",
  },
  {
    icon: "checkmark-done-outline" as const,
    label: "Verification",
    route: "/profile/verification-docs",
    description: "Submit documents",
  },
  {
    icon: "notifications-outline" as const,
    label: "Notifications",
    route: "/profile/notifications",
    description: "Notification settings",
  },
  {
    icon: "lock-closed-outline" as const,
    label: "Change Password",
    route: "/profile/change-password",
    description: "Update password",
  },
  {
    icon: "shield-outline" as const,
    label: "Privacy",
    route: "/profile/privacy",
    description: "Privacy settings",
  },
  {
    icon: "help-circle-outline" as const,
    label: "Help & Support",
    route: "/profile/help-support",
    description: "Get assistance",
  },
]

export default function AgentMoreScreen() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <View style={styles.container}>
      {/* Header with hamburger button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.hamburgerButton}
          onPress={() => setIsDrawerOpen(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="menu" size={28} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>More Options</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.card}>
          <Ionicons name="list-outline" size={48} color="#B91C1C" />
          <Text style={styles.cardTitle}>Quick Access Menu</Text>
          <Text style={styles.cardDescription}>
            Tap the menu icon above to access all your settings, profile options, and more
          </Text>
        </View>
      </View>

      {/* Drawer Sidebar */}
      <DrawerSidebar
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        items={agentMenuItems}
        title="Agent Menu"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  hamburgerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  placeholder: {
    width: 44,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginTop: 16,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
})
