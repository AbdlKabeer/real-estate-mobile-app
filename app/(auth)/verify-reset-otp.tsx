import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import { useToast } from "@/context/toast-provider"
import OTPModal from "@/components/auth/otp-modal"
import api from "@/lib/store/api"

export default function VerifyResetOTPScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const { showToast } = useToast()
  const [isModalVisible, setIsModalVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const email = params.email as string

  const handleVerifyOTP = async (otp: string) => {
    try {
      setIsLoading(true)

      // Verify the OTP with your backend
      const response = await api.post("/auth/verify-reset-otp", {
        email,
        otp,
      })

      showToast("Code verified successfully", "success")

      // Navigate to set new password screen
      router.replace({
        pathname: "/(auth)/set-new-password" as any,
        params: {
          email,
          resetToken: response.data.data.resetToken, // Or whatever your API returns
        },
      })
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
            Verifying your reset code...
          </Text>
        </View>
      </ScrollView>

      <OTPModal
        visible={isModalVisible}
        onClose={handleClose}
        onVerify={handleVerifyOTP}
        title="Enter Reset Code"
        description={`We've sent a 6-digit code to ${email}`}
        length={6}
        isLoading={isLoading}
      />
    </KeyboardAvoidingView>
  )
}
