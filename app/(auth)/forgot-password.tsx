import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native"
import { useRouter } from "expo-router"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Feather } from "@expo/vector-icons"
import { useToast } from "@/context/toast-provider"
import api from "@/lib/store/api"

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordScreen() {
  const router = useRouter()
  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setIsLoading(true)
      
      // Call your API to send reset password email/OTP
      await api.post("/auth/forgot-password", { email: data.email })

      showToast("Reset code sent to your email", "success")
      
      // Navigate to OTP verification screen
      router.push({
        pathname: "/(auth)/verify-reset-otp" as any,
        params: { email: data.email },
      })
    } catch (error: any) {
      showToast(
        error.response?.data?.message || "Failed to send reset code",
        "error"
      )
    } finally {
      setIsLoading(false)
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
        {/* Header */}
        <View className="mb-8">
          {router.canGoBack() && (
            <TouchableOpacity
              onPress={() => router.back()}
              className="mb-6 w-10 h-10 items-center justify-center"
            >
              <Feather name="arrow-left" size={24} color="#1F2937" />
            </TouchableOpacity>
          )}
          
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Forgot Password?
          </Text>
          <Text className="text-base text-gray-600">
            Enter your email address and we'll send you a code to reset your password
          </Text>
        </View>

        {/* Illustration */}
        <View className="items-center justify-center py-8 mb-8">
          <View className="w-32 h-32 bg-red-50 rounded-full items-center justify-center">
            <Feather name="lock" size={64} color="#B91C1C" />
          </View>
        </View>

        {/* Form */}
        <View className="space-y-4">
          {/* Email */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="w-full px-4 py-3.5 border border-gray-300 rounded-lg text-base"
                  placeholder="john.doe@example.com"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
            />
            {errors.email && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </Text>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
            className="w-full bg-red-700 py-4 rounded-lg mt-6 items-center"
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-base font-semibold">
                Send Reset Code
              </Text>
            )}
          </TouchableOpacity>

          {/* Back to Login */}
          <View className="flex-row justify-center items-center mt-8 mb-8">
            <Text className="text-gray-600 text-sm">
              Remember your password?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/login" as any)}>
              <Text className="text-red-700 text-sm font-semibold">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
