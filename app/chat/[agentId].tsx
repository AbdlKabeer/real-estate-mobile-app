import React, { useState, useEffect, useRef } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import { Feather } from "@expo/vector-icons"
import { useAuthStore } from "@/lib/store/auth-store"

type Message = {
  id: string
  senderId: string
  text: string
  timestamp: Date
  isRead: boolean
}

export default function ChatScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const { user } = useAuthStore()
  const scrollViewRef = useRef<ScrollView>(null)

  const agentId = params.agentId as string
  const agentName = params.agentName as string

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: agentId,
      text: "Hello! I'm here to help you with any questions about the property.",
      timestamp: new Date(Date.now() - 3600000),
      isRead: true,
    },
    {
      id: "2",
      senderId: user?.userId || "",
      text: "Hi! I'd like to know more about the property.",
      timestamp: new Date(Date.now() - 3000000),
      isRead: true,
    },
    {
      id: "3",
      senderId: agentId,
      text: "Of course! What would you like to know?",
      timestamp: new Date(Date.now() - 2400000),
      isRead: true,
    },
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: user?.userId || "",
        text: message.trim(),
        timestamp: new Date(),
        isRead: false,
      }

      setMessages([...messages, newMessage])
      setMessage("")

      // Simulate agent reply after 2 seconds
      setTimeout(() => {
        const agentReply: Message = {
          id: (Date.now() + 1).toString(),
          senderId: agentId,
          text: "Thank you for your message. I'll get back to you shortly!",
          timestamp: new Date(),
          isRead: false,
        }
        setMessages((prev) => [...prev, agentReply])
      }, 2000)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })
  }

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true })
  }, [messages])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-50"
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View className="bg-white pt-12 pb-4 px-6 border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Feather name="arrow-left" size={24} color="#1F2937" />
          </TouchableOpacity>

          <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center mr-3">
            <Feather name="user" size={20} color="#B91C1C" />
          </View>

          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-900">{agentName}</Text>
            <Text className="text-sm text-green-600">● Online</Text>
          </View>

          <TouchableOpacity className="w-10 h-10 items-center justify-center">
            <Feather name="phone" size={20} color="#1F2937" />
          </TouchableOpacity>

          <TouchableOpacity className="w-10 h-10 items-center justify-center ml-2">
            <Feather name="more-vertical" size={20} color="#1F2937" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        className="flex-1 px-6 py-4"
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => {
          const isSentByMe = msg.senderId === user?.userId

          return (
            <View
              key={msg.id}
              className={`mb-4 ${isSentByMe ? "items-end" : "items-start"}`}
            >
              <View
                className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                  isSentByMe
                    ? "bg-red-700 rounded-br-none"
                    : "bg-white rounded-bl-none"
                }`}
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 2,
                }}
              >
                <Text
                  className={`text-base ${
                    isSentByMe ? "text-white" : "text-gray-900"
                  }`}
                >
                  {msg.text}
                </Text>
                <Text
                  className={`text-xs mt-1 ${
                    isSentByMe ? "text-red-100" : "text-gray-500"
                  }`}
                >
                  {formatTime(msg.timestamp)}
                </Text>
              </View>
            </View>
          )
        })}
      </ScrollView>

      {/* Input */}
      <View className="bg-white border-t border-gray-200 px-4 py-3">
        <View className="flex-row items-center gap-2">
          <TouchableOpacity className="w-10 h-10 items-center justify-center">
            <Feather name="plus-circle" size={24} color="#6B7280" />
          </TouchableOpacity>

          <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-2">
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Type a message..."
              className="flex-1 text-base text-gray-900"
              multiline
              maxLength={500}
            />
            <TouchableOpacity className="ml-2">
              <Feather name="smile" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleSendMessage}
            disabled={!message.trim()}
            className={`w-10 h-10 rounded-full items-center justify-center ${
              message.trim() ? "bg-red-700" : "bg-gray-300"
            }`}
          >
            <Feather name="send" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
