import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

export default function PaymentMethodsScreen() {
  const [cards, setCards] = useState([
    {
      id: "1",
      type: "mastercard",
      last4: "4532",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: "2",
      type: "visa",
      last4: "8901",
      expiry: "08/26",
      isDefault: false,
    },
  ])

  const [bankAccounts, setBankAccounts] = useState([
    {
      id: "1",
      bank: "GTBank",
      accountNumber: "0123456789",
      accountName: "Agent Business Account",
      isDefault: true,
    },
  ])

  const handleAddCard = () => {
    Alert.alert("Add Card", "Card addition will be implemented with payment SDK")
  }

  const handleAddBank = () => {
    Alert.alert("Add Bank", "Bank account addition will be implemented")
  }

  const handleSetDefault = (id: string, type: "card" | "bank") => {
    if (type === "card") {
      setCards(cards.map((c) => ({ ...c, isDefault: c.id === id })))
    } else {
      setBankAccounts(bankAccounts.map((b) => ({ ...b, isDefault: b.id === id })))
    }
  }

  const handleDelete = (id: string, type: "card" | "bank") => {
    Alert.alert(
      "Delete Payment Method",
      "Are you sure you want to remove this payment method?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            if (type === "card") {
              setCards(cards.filter((c) => c.id !== id))
            } else {
              setBankAccounts(bankAccounts.filter((b) => b.id !== id))
            }
          },
        },
      ]
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white px-6 py-4 border-b border-gray-100 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900">
          Payment Methods
        </Text>
      </View>

      <ScrollView className="flex-1">
        {/* Debit/Credit Cards */}
        <View className="p-4">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-bold text-gray-900">
              Cards for Payments
            </Text>
            <TouchableOpacity
              onPress={handleAddCard}
              className="flex-row items-center"
            >
              <Ionicons name="add-circle" size={20} color="#B91C1C" />
              <Text className="text-red-700 font-semibold ml-1">Add Card</Text>
            </TouchableOpacity>
          </View>

          {cards.map((card) => (
            <View
              key={card.id}
              className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100"
            >
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center">
                  <View className="w-12 h-12 bg-blue-100 rounded-lg items-center justify-center">
                    <Ionicons name="card" size={24} color="#2563EB" />
                  </View>
                  <View className="ml-3">
                    <Text className="text-base font-semibold text-gray-900 capitalize">
                      {card.type}
                    </Text>
                    <Text className="text-sm text-gray-600">
                      •••• {card.last4}
                    </Text>
                  </View>
                </View>
                <Text className="text-sm text-gray-600">Exp: {card.expiry}</Text>
              </View>

              {card.isDefault && (
                <View className="bg-green-100 rounded-lg px-3 py-1.5 mb-2 self-start">
                  <Text className="text-green-700 text-xs font-semibold">
                    Default Payment
                  </Text>
                </View>
              )}

              <View className="flex-row gap-2">
                {!card.isDefault && (
                  <TouchableOpacity
                    onPress={() => handleSetDefault(card.id, "card")}
                    className="flex-1 bg-blue-600 rounded-lg py-2 items-center"
                  >
                    <Text className="text-white font-semibold text-sm">
                      Set as Default
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => handleDelete(card.id, "card")}
                  className="flex-1 bg-red-100 rounded-lg py-2 items-center"
                >
                  <Text className="text-red-700 font-semibold text-sm">
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Bank Accounts for Payouts */}
        <View className="px-4 pb-4">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-bold text-gray-900">
              Bank Accounts for Payouts
            </Text>
            <TouchableOpacity
              onPress={handleAddBank}
              className="flex-row items-center"
            >
              <Ionicons name="add-circle" size={20} color="#B91C1C" />
              <Text className="text-red-700 font-semibold ml-1">Add Bank</Text>
            </TouchableOpacity>
          </View>

          {bankAccounts.map((account) => (
            <View
              key={account.id}
              className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100"
            >
              <View className="flex-row items-center mb-3">
                <View className="w-12 h-12 bg-purple-100 rounded-lg items-center justify-center">
                  <Ionicons name="business" size={24} color="#9333EA" />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-base font-semibold text-gray-900">
                    {account.bank}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {account.accountNumber}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    {account.accountName}
                  </Text>
                </View>
              </View>

              {account.isDefault && (
                <View className="bg-green-100 rounded-lg px-3 py-1.5 mb-2 self-start">
                  <Text className="text-green-700 text-xs font-semibold">
                    Default Payout Account
                  </Text>
                </View>
              )}

              <View className="flex-row gap-2">
                {!account.isDefault && (
                  <TouchableOpacity
                    onPress={() => handleSetDefault(account.id, "bank")}
                    className="flex-1 bg-blue-600 rounded-lg py-2 items-center"
                  >
                    <Text className="text-white font-semibold text-sm">
                      Set as Default
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => handleDelete(account.id, "bank")}
                  className="flex-1 bg-red-100 rounded-lg py-2 items-center"
                >
                  <Text className="text-red-700 font-semibold text-sm">
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Payment Info */}
        <View className="px-4 pb-6">
          <View className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#2563EB" />
              <View className="ml-3 flex-1">
                <Text className="text-sm text-blue-900 font-semibold mb-1">
                  Secure Payments
                </Text>
                <Text className="text-xs text-blue-800">
                  Your payment information is encrypted and secure. Cards are used
                  for subscription fees. Bank accounts receive property commission
                  payouts.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
