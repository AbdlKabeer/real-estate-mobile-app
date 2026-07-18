import type React from "react";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter, useSegments } from "expo-router";
import { useAuthStore } from "@/lib/store/auth-store";
import { useOnboardingStore } from "@/lib/store/onboarding-store";
import Constants from 'expo-constants';

interface AuthGuardProps {
  children: React.ReactNode
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated, isLoading, user } = useAuthStore()
  const { hasCompletedOnboarding } = useOnboardingStore()

  const segments = useSegments()
  const router = useRouter()

  // Check if we're in development mode with debug enabled
  // const isDevelopmentDebug = 
  //   Constants.expoConfig?.extra?.environment === 'DEVELOPMENT' && 
  //   Constants.expoConfig?.extra?.debug === 'true'
  const isDevelopmentDebug = true // Temporarily disable debug bypass

  useEffect(() => {
    // Skip authentication checks in development debug mode
    if (isDevelopmentDebug) {
      console.log('🚧 Auth Guard: Bypassing authentication checks (Development + Debug mode)')
      return
    }

    if (isLoading) return

    const inOnboarding = segments[0] === "onboarding"
    const inRoleSelection = segments[0] === "select-role"
    const inAuthScreen = segments[0] === "(auth)"
    const inCustomerArea = segments[0] === "(customer)"
    const inAgentArea = segments[0] === "(agent)"
    const inPropertyDetails = segments[0] === "property"
    const inBooking = segments[0] === "booking"
    const inChat = segments[0] === "chat"
    const inProtectedRoute = inCustomerArea || inAgentArea || inPropertyDetails || inBooking || inChat

    // First-time users should see onboarding
    if (!hasCompletedOnboarding && !inOnboarding && !inRoleSelection && !inAuthScreen) {
      router.replace("/onboarding" as any)
      return
    }

    // After onboarding but before auth, redirect to login
    if (hasCompletedOnboarding && !isAuthenticated && !user && !inAuthScreen && inProtectedRoute) {
      router.replace("/(auth)/login" as any)
      return
    }

    // Redirect authenticated users away from auth screens to their dashboard
    if (isAuthenticated && user && !isLoading) {
      if (inAuthScreen) {
        // User is authenticated but on auth screen - redirect to dashboard
        if (user.role === "customer") {
          router.replace("/(customer)" as any)
        } else if (user.role === "agent") {
          router.replace("/(agent)" as any)
        } else {
          router.replace("/" as any)
        }
      }
    }
   
  }, [isAuthenticated, user, segments, isLoading, router, isDevelopmentDebug, hasCompletedOnboarding])

  if (isLoading && !isDevelopmentDebug) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#B91C1C" />
      </View>
    )
  }

  return <>{children}</>
}

export default AuthGuard
