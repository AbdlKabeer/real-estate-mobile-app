import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import { useToast } from "@/context/toast-provider"
import { useAuthStore } from "@/lib/store/auth-store"
import OTPModal from "@/components/auth/otp-modal"

export default function VerifyEmailScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const { showToast } = useToast()
  const { verify } = useAuthStore()
  const [isModalVisible, setIsModalVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const userId = params.userId as string
  const email = params.email as string

  const handleVerifyOTP = async (otp: string) => {
    try {
      setIsLoading(true)

      await verify({
        userId,
        verificationCode: otp,
      })

      showToast("Email verified successfully!", "success")

      // Get user from store to check role
      const { user } = useAuthStore.getState()
      
      if (user?.role === "customer") {
        router.replace("/(customer)" as any)
      } else if (user?.role === "agent") {
        router.replace("/(tabs)" as any)
      } else {
        router.replace("/" as any)
      }
    } catch (error: any) {
      showToast(
        error.response?.data?.message || "Invalid verification code",
        "error"
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setIsModalVisible(false)
    if (router.canGoBack()) {
      router.back()
    } else {
      router.replace("/(auth)/login" as any)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pt-12"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-600 text-center">
            Verifying your email...
          </Text>
        </View>
      </ScrollView>

      <OTPModal
        visible={isModalVisible}
        onClose={handleClose}
        onVerify={handleVerifyOTP}
        title="Verify Your Email"
        description={`We've sent a 6-digit code to ${email}`}
        length={6}
        isLoading={isLoading}
      />
    </KeyboardAvoidingView>
  )
}
