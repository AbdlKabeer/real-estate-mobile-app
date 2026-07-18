import { Ionicons } from "@expo/vector-icons"

export interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap
  label: string
  route: string
  description?: string
}

export const agentMenuItems: MenuItem[] = [
  {
    icon: "person-outline",
    label: "Profile",
    route: "/profile/edit",
    description: "Edit your profile",
  },
  {
    icon: "business-outline",
    label: "Agency Info",
    route: "/profile/agency-info",
    description: "Manage agency details",
  },
  {
    icon: "stats-chart-outline",
    label: "Analytics",
    route: "/profile/business-analytics",
    description: "View business insights",
  },
  {
    icon: "cash-outline",
    label: "Commission",
    route: "/profile/commission-settings",
    description: "Configure commissions",
  },
  {
    icon: "card-outline",
    label: "Payments",
    route: "/profile/payment-methods",
    description: "Manage payment methods",
  },
  {
    icon: "checkmark-done-outline",
    label: "Verification",
    route: "/profile/verification-docs",
    description: "Submit documents",
  },
  {
    icon: "notifications-outline",
    label: "Notifications",
    route: "/profile/notifications",
    description: "Notification settings",
  },
  {
    icon: "lock-closed-outline",
    label: "Change Password",
    route: "/profile/change-password",
    description: "Update password",
  },
  {
    icon: "shield-outline",
    label: "Privacy",
    route: "/profile/privacy",
    description: "Privacy settings",
  },
  {
    icon: "help-circle-outline",
    label: "Help & Support",
    route: "/profile/help-support",
    description: "Get assistance",
  },
]

export const customerMenuItems: MenuItem[] = [
  {
    icon: "person-outline",
    label: "Profile",
    route: "/profile/edit",
    description: "Edit your profile",
  },
  {
    icon: "notifications-outline",
    label: "Notifications",
    route: "/profile/notifications",
    description: "Notification settings",
  },
  {
    icon: "lock-closed-outline",
    label: "Change Password",
    route: "/profile/change-password",
    description: "Update password",
  },
  {
    icon: "card-outline",
    label: "Payments",
    route: "/profile/payment-methods",
    description: "Payment methods",
  },
  {
    icon: "shield-outline",
    label: "Privacy",
    route: "/profile/privacy",
    description: "Privacy settings",
  },
  {
    icon: "help-circle-outline",
    label: "Help & Support",
    route: "/profile/help-support",
    description: "Get assistance",
  },
]
