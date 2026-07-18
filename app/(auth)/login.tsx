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
import { useAuthStore } from "@/lib/store/auth-store"
import { useToast } from "@/context/toast-provider"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const { login, isLoading } = useAuthStore()
  const { showToast } = useToast()
  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      })

      showToast("Login successful!", "success")
      
      // Small delay to allow auth store to update
      setTimeout(() => {
        const { user } = useAuthStore.getState()
        
        if (user?.role === "customer") {
          router.replace("/(customer)" as any)
        } else if (user?.role === "agent") {
          router.replace("/(agent)" as any)
        } else {
          router.replace("/" as any)
        }
      }, 100)
    } catch (error: any) {
      showToast(error.response?.data?.message || "Login failed", "error")
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
            Welcome Back
          </Text>
          <Text className="text-base text-gray-600">
            Sign in to continue
          </Text>
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

          {/* Password */}
          <View className="mt-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Password
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

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => router.push("/(auth)/forgot-password" as any)}
            className="self-end mt-2"
          >
            <Text className="text-red-700 text-sm font-medium">
              Forgot Password?
            </Text>
          </TouchableOpacity>

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
                Login
              </Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mt-8">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="px-4 text-gray-500 text-sm">or continue with</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Social Login Buttons */}
          <View className="flex-row gap-4 mt-6">
            <TouchableOpacity
              className="flex-1 flex-row items-center justify-center py-3.5 border border-gray-300 rounded-lg"
              activeOpacity={0.7}
            >
              <Feather name="mail" size={20} color="#1F2937" />
              <Text className="ml-2 text-gray-700 font-medium">Google</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="flex-1 flex-row items-center justify-center py-3.5 border border-gray-300 rounded-lg"
              activeOpacity={0.7}
            >
              <Feather name="facebook" size={20} color="#1F2937" />
              <Text className="ml-2 text-gray-700 font-medium">Facebook</Text>
            </TouchableOpacity>
          </View>

          {/* Register Link */}
          <View className="flex-row justify-center items-center mt-8 mb-8">
            <Text className="text-gray-600 text-sm">
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/register" as any)}>
              <Text className="text-red-700 text-sm font-semibold">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
