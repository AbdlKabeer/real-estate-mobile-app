import React, { useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from "react-native-reanimated"
import { Gesture, GestureDetector } from "react-native-gesture-handler"

const { width } = Dimensions.get("window")
const DRAWER_WIDTH = width * 0.75

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap
  label: string
  route: string
  description?: string
}

interface DrawerSidebarProps {
  isOpen: boolean
  onClose: () => void
  items: MenuItem[]
  title?: string
}

export function DrawerSidebar({
  isOpen,
  onClose,
  items,
  title = "Menu",
}: DrawerSidebarProps) {
  const router = useRouter()
  const translateX = useSharedValue(-DRAWER_WIDTH)
  const opacity = useSharedValue(0)

  useEffect(() => {
    if (isOpen) {
      translateX.value = withSpring(0, {
        damping: 20,
        stiffness: 90,
      })
      opacity.value = withTiming(1, { duration: 300 })
    } else {
      translateX.value = withTiming(-DRAWER_WIDTH, { duration: 250 })
      opacity.value = withTiming(0, { duration: 250 })
    }
  }, [isOpen])

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  const handleMenuPress = (route: string) => {
    onClose()
    setTimeout(() => {
      router.push(route as any)
    }, 300)
  }

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX < 0) {
        translateX.value = Math.max(-DRAWER_WIDTH, event.translationX)
      }
    })
    .onEnd((event) => {
      if (event.translationX < -DRAWER_WIDTH / 3 || event.velocityX < -500) {
        translateX.value = withTiming(-DRAWER_WIDTH, { duration: 250 })
        opacity.value = withTiming(0, { duration: 250 })
        runOnJS(onClose)()
      } else {
        translateX.value = withSpring(0, {
          damping: 20,
          stiffness: 90,
        })
      }
    })

  if (!isOpen && opacity.value === 0) {
    return null
  }

  return (
    <View style={styles.container} pointerEvents={isOpen ? "auto" : "none"}>
      {/* Overlay */}
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose}>
        <Animated.View style={[styles.overlay, overlayStyle]} />
      </Pressable>

      {/* Drawer */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.drawer, drawerStyle]}>
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>{title}</Text>
              <Text style={styles.headerSubtitle}>Quick access menu</Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.menuList}
            showsVerticalScrollIndicator={false}
          >
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => handleMenuPress(item.route)}
                activeOpacity={0.7}
              >
                <View style={styles.iconContainer}>
                  <Ionicons name={item.icon} size={22} color="#B91C1C" />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  {item.description && (
                    <Text style={styles.menuDescription}>{item.description}</Text>
                  )}
                </View>
                <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Version 1.0.0</Text>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  closeButton: {
    padding: 4,
  },
  menuList: {
    flex: 1,
    padding: 12,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 12,
    color: "#6B7280",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#9CA3AF",
  },
})
