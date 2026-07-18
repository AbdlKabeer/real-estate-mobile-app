import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { DrawerSidebar } from "./drawer-sidebar"

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap
  label: string
  route: string
  description?: string
}

interface HeaderWithMenuProps {
  title?: string
  subtitle?: string
  menuItems: MenuItem[]
  menuTitle?: string
  rightComponent?: React.ReactNode
}

export function HeaderWithMenu({
  title,
  subtitle,
  menuItems,
  menuTitle = "Menu",
  rightComponent,
}: HeaderWithMenuProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.hamburgerButton}
          onPress={() => setIsDrawerOpen(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="menu" size={28} color="#111827" />
        </TouchableOpacity>

        {title && (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        )}

        <View style={styles.rightContainer}>
          {rightComponent || <View style={styles.placeholder} />}
        </View>
      </View>

      <DrawerSidebar
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        items={menuItems}
        title={menuTitle}
      />
    </>
  )
}

const styles = StyleSheet.create({
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
  titleContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  rightContainer: {
    marginLeft: 16,
  },
  placeholder: {
    width: 44,
  },
})
