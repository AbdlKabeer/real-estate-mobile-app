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

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const { signup, isLoading } = useAuthStore()
  const { showToast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userType, setUserType] = useState<"customer" | "agent">("customer")

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await signup({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        userType: userType,
      })

      showToast("Registration successful! Please verify your email.", "success")
      
      // Navigate to verification screen with userId
      router.push({
        pathname: "/(auth)/verify-email" as any,
        params: { userId: result.data.userId, email: data.email },
      })
    } catch (error: any) {
      showToast(error.response?.data?.message || "Registration failed", "error")
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
            Create Account
          </Text>
          <Text className="text-base text-gray-600">
            Sign up to get started
          </Text>
        </View>

        {/* Form */}
        <View className="space-y-4">
          {/* Role Selection */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">
              I want to register as
            </Text>
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => setUserType("customer")}
                className={`flex-1 p-4 rounded-lg border-2 ${
                  userType === "customer"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 bg-white"
                }`}
              >
                <View className="items-center">
                  <Feather
                    name="home"
                    size={32}
                    color={userType === "customer" ? "#2563EB" : "#6B7280"}
                  />
                  <Text
                    className={`mt-2 font-semibold ${
                      userType === "customer" ? "text-blue-700" : "text-gray-700"
                    }`}
                  >
                    Customer
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setUserType("agent")}
                className={`flex-1 p-4 rounded-lg border-2 ${
                  userType === "agent"
                    ? "border-red-600 bg-red-50"
                    : "border-gray-300 bg-white"
                }`}
              >
                <View className="items-center">
                  <Feather
                    name="briefcase"
                    size={32}
                    color={userType === "agent" ? "#DC2626" : "#6B7280"}
                  />
                  <Text
                    className={`mt-2 font-semibold ${
                      userType === "agent" ? "text-red-700" : "text-gray-700"
                    }`}
                  >
                    Agent
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Full Name */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Full Name
            </Text>
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="w-full px-4 py-3.5 border border-gray-300 rounded-lg text-base"
                  placeholder="John Doe"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="words"
                />
              )}
            />
            {errors.fullName && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.fullName.message}
              </Text>
            )}
          </View>

          {/* Email */}
          <View className="mt-4">
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

          {/* Phone */}
          <View className="mt-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </Text>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="w-full px-4 py-3.5 border border-gray-300 rounded-lg text-base"
                  placeholder="+1234567890"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="phone-pad"
                />
              )}
            />
            {errors.phone && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.phone.message}
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

          {/* Confirm Password */}
          <View className="mt-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Confirm Password
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
                Create Account
              </Text>
            )}
          </TouchableOpacity>

          {/* Login Link */}
          <View className="flex-row justify-center items-center mt-6 mb-8">
            <Text className="text-gray-600 text-sm">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push({ pathname: "/(auth)/login" as any, params: { userType } })}>
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
