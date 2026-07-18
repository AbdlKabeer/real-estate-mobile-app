import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

export default function CommissionSettingsScreen() {
  const [defaultCommission, setDefaultCommission] = useState("5")
  const [autoAcceptBookings, setAutoAcceptBookings] = useState(true)
  const [requirePaymentUpfront, setRequirePaymentUpfront] = useState(false)
  const [allowNegotiation, setAllowNegotiation] = useState(true)

  const [propertyTypeCommissions, setPropertyTypeCommissions] = useState([
    { type: "Apartment", rate: "5", enabled: true },
    { type: "House", rate: "5", enabled: true },
    { type: "Duplex", rate: "6", enabled: true },
    { type: "Land", rate: "4", enabled: true },
  ])

  const handleSave = () => {
    Alert.alert("Success", "Commission settings updated successfully")
  }

  const updateCommission = (index: number, rate: string) => {
    const updated = [...propertyTypeCommissions]
    updated[index].rate = rate
    setPropertyTypeCommissions(updated)
  }

  const toggleCommission = (index: number) => {
    const updated = [...propertyTypeCommissions]
    updated[index].enabled = !updated[index].enabled
    setPropertyTypeCommissions(updated)
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white px-6 py-4 border-b border-gray-100 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900 flex-1">
          Commission Settings
        </Text>
        <TouchableOpacity onPress={handleSave}>
          <Text className="text-red-700 font-semibold">Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Default Commission */}
        <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
          <Text className="text-base font-bold text-gray-900 mb-4">
            Default Commission Rate
          </Text>

          <View className="flex-row items-center mb-2">
            <TextInput
              value={defaultCommission}
              onChangeText={setDefaultCommission}
              keyboardType="numeric"
              className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900 flex-1"
              placeholder="5"
            />
            <Text className="text-2xl font-bold text-gray-900 ml-3">%</Text>
          </View>
          <Text className="text-xs text-gray-500">
            Applied to all properties unless customized below
          </Text>
        </View>

        {/* Property Type Commissions */}
        <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
          <Text className="text-base font-bold text-gray-900 mb-4">
            Property Type Commissions
          </Text>

          {propertyTypeCommissions.map((item, index) => (
            <View
              key={index}
              className={`flex-row items-center py-3 ${
                index !== propertyTypeCommissions.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              <Switch
                value={item.enabled}
                onValueChange={() => toggleCommission(index)}
                trackColor={{ false: "#D1D5DB", true: "#FCA5A5" }}
                thumbColor={item.enabled ? "#B91C1C" : "#f4f3f4"}
              />
              <Text className="text-base text-gray-900 ml-3 flex-1">
                {item.type}
              </Text>
              <View className="flex-row items-center">
                <TextInput
                  value={item.rate}
                  onChangeText={(text) => updateCommission(index, text)}
                  keyboardType="numeric"
                  editable={item.enabled}
                  className={`bg-gray-50 rounded-lg px-3 py-2 text-gray-900 w-16 text-center ${
                    !item.enabled && "opacity-50"
                  }`}
                />
                <Text className="text-lg font-bold text-gray-900 ml-2">%</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Booking Settings */}
        <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
          <Text className="text-base font-bold text-gray-900 mb-4">
            Booking Settings
          </Text>

          <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
            <View className="flex-1 mr-4">
              <Text className="text-base text-gray-900 mb-1">
                Auto-Accept Bookings
              </Text>
              <Text className="text-xs text-gray-600">
                Automatically approve inspection requests
              </Text>
            </View>
            <Switch
              value={autoAcceptBookings}
              onValueChange={setAutoAcceptBookings}
              trackColor={{ false: "#D1D5DB", true: "#FCA5A5" }}
              thumbColor={autoAcceptBookings ? "#B91C1C" : "#f4f3f4"}
            />
          </View>

          <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
            <View className="flex-1 mr-4">
              <Text className="text-base text-gray-900 mb-1">
                Require Payment Upfront
              </Text>
              <Text className="text-xs text-gray-600">
                Clients must pay inspection fee before booking
              </Text>
            </View>
            <Switch
              value={requirePaymentUpfront}
              onValueChange={setRequirePaymentUpfront}
              trackColor={{ false: "#D1D5DB", true: "#FCA5A5" }}
              thumbColor={requirePaymentUpfront ? "#B91C1C" : "#f4f3f4"}
            />
          </View>

          <View className="flex-row items-center justify-between py-3">
            <View className="flex-1 mr-4">
              <Text className="text-base text-gray-900 mb-1">
                Allow Price Negotiation
              </Text>
              <Text className="text-xs text-gray-600">
                Clients can propose different prices
              </Text>
            </View>
            <Switch
              value={allowNegotiation}
              onValueChange={setAllowNegotiation}
              trackColor={{ false: "#D1D5DB", true: "#FCA5A5" }}
              thumbColor={allowNegotiation ? "#B91C1C" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Commission Summary */}
        <View className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
          <Text className="text-base font-bold text-gray-900 mb-4">
            Commission Summary
          </Text>

          <View className="bg-gray-50 rounded-lg p-4">
            <View className="flex-row justify-between mb-3">
              <Text className="text-sm text-gray-600">Example: ₦1,500,000 rent</Text>
              <Text className="text-sm font-semibold text-gray-900">
                ₦{(1500000 * parseInt(defaultCommission)) / 100}
              </Text>
            </View>
            <View className="flex-row justify-between mb-3">
              <Text className="text-sm text-gray-600">Example: ₦85,000,000 sale</Text>
              <Text className="text-sm font-semibold text-gray-900">
                ₦{((85000000 * parseInt(defaultCommission)) / 100).toLocaleString()}
              </Text>
            </View>
            <View className="border-t border-gray-200 pt-3">
              <Text className="text-xs text-gray-500">
                Platform fee: 1.5% deducted from your commission
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
