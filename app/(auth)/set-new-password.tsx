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
import { useRouter, useLocalSearchParams } from "expo-router"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Feather } from "@expo/vector-icons"
import { useToast } from "@/context/toast-provider"
import api from "@/lib/store/api"

const setPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type SetPasswordFormData = z.infer<typeof setPasswordSchema>

export default function SetNewPasswordScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const email = params.email as string
  const resetToken = params.resetToken as string

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SetPasswordFormData>({
    resolver: zodResolver(setPasswordSchema),
  })

  const onSubmit = async (data: SetPasswordFormData) => {
    try {
      setIsLoading(true)

      // Call your API to reset password
      await api.post("/auth/reset-password", {
        email,
        resetToken,
        newPassword: data.password,
      })

      showToast("Password reset successful", "success")

      // Navigate to login screen
      router.replace("/(auth)/login" as any)
    } catch (error: any) {
      showToast(
        error.response?.data?.message || "Failed to reset password",
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
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Set New Password
          </Text>
          <Text className="text-base text-gray-600">
            Create a strong password for your account
          </Text>
        </View>

        {/* Illustration */}
        <View className="items-center justify-center py-8 mb-8">
          <View className="w-32 h-32 bg-green-50 rounded-full items-center justify-center">
            <Feather name="check-circle" size={64} color="#059669" />
          </View>
        </View>

        {/* Form */}
        <View className="space-y-4">
          {/* Password */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">
              New Password
            </Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="relative">
                  <TextInput
                    className="w-full px-4 py-3.5 border border-gray-300 rounded-lg text-base pr-12"
                    placeholder="••••••••"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5"
                  >
                    <Feather
                      name={showPassword ? "eye-off" : "eye"}
                      size={20}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.password && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </Text>
            )}
          </View>

          {/* Confirm Password */}
          <View className="mt-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </Text>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="relative">
                  <TextInput
                    className="w-full px-4 py-3.5 border border-gray-300 rounded-lg text-base pr-12"
                    placeholder="••••••••"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-3.5"
                  >
                    <Feather
                      name={showConfirmPassword ? "eye-off" : "eye"}
                      size={20}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.confirmPassword && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>

          {/* Password Requirements */}
          <View className="mt-4 p-4 bg-gray-50 rounded-lg">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Password must contain:
            </Text>
            <View className="space-y-1">
              <Text className="text-xs text-gray-600">• At least 8 characters</Text>
              <Text className="text-xs text-gray-600">
                • Mix of uppercase and lowercase letters
              </Text>
              <Text className="text-xs text-gray-600">• At least one number</Text>
              <Text className="text-xs text-gray-600">
                • At least one special character
              </Text>
            </View>
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
                Reset Password
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
