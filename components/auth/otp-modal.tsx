import React, { useRef, useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Animated,
  StyleSheet,
} from "react-native"
import { Feather } from "@expo/vector-icons"

interface OTPModalProps {
  visible: boolean
  onClose: () => void
  onVerify: (otp: string) => void
  title?: string
  description?: string
  length?: number
  isLoading?: boolean
}

export default function OTPModal({
  visible,
  onClose,
  onVerify,
  title = "Enter Verification Code",
  description = "We've sent a verification code to your email",
  length = 6,
  isLoading = false,
}: OTPModalProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""))
  const inputRefs = useRef<(TextInput | null)[]>([])
  const fadeAnim = useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start()
    }
  }, [visible])

  const handleChange = (text: string, index: number) => {
    // Only allow numbers
    if (text && !/^\d+$/.test(text)) return

    const newOtp = [...otp]
    newOtp[index] = text

    setOtp(newOtp)

    // Auto-focus next input
    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all fields are filled
    if (newOtp.every((digit) => digit !== "") && index === length - 1) {
      onVerify(newOtp.join(""))
    }
  }

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = () => {
    const otpString = otp.join("")
    if (otpString.length === length) {
      onVerify(otpString)
    }
  }

  const handleResendCode = () => {
    // Implement resend logic
    setOtp(Array(length).fill(""))
    inputRefs.current[0]?.focus()
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <Animated.View
          style={[
            styles.modal,
            {
              transform: [
                {
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1],
                  }),
                },
              ],
            },
          ]}
        >
          {/* Close Button */}
          <TouchableOpacity
            onPress={onClose}
            className="absolute right-4 top-4 z-10"
          >
            <Feather name="x" size={24} color="#6B7280" />
          </TouchableOpacity>

          {/* Icon */}
          <View className="items-center mb-6">
            <View className="w-16 h-16 bg-red-100 rounded-full items-center justify-center">
              <Feather name="mail" size={32} color="#B91C1C" />
            </View>
          </View>

          {/* Title & Description */}
          <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
            {title}
          </Text>
          <Text className="text-sm text-gray-600 text-center mb-8 px-4">
            {description}
          </Text>

          {/* OTP Input */}
          <View className="flex-row justify-center gap-3 mb-8">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref
                }}
                className="w-12 h-14 border-2 border-gray-300 rounded-lg text-center text-xl font-semibold"
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                style={{
                  borderColor: digit ? "#B91C1C" : "#D1D5DB",
                }}
              />
            ))}
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isLoading || otp.some((digit) => !digit)}
            className={`w-full py-4 rounded-lg items-center ${
              otp.some((digit) => !digit) ? "bg-gray-300" : "bg-red-700"
            }`}
            activeOpacity={0.8}
          >
            <Text className="text-white text-base font-semibold">
              {isLoading ? "Verifying..." : "Verify Code"}
            </Text>
          </TouchableOpacity>

          {/* Resend */}
          <View className="flex-row justify-center items-center mt-6">
            <Text className="text-gray-600 text-sm">Didn't receive code? </Text>
            <TouchableOpacity onPress={handleResendCode}>
              <Text className="text-red-700 text-sm font-semibold">Resend</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: "90%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})
