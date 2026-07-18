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

export default function AgencyInformationScreen() {
  const [agencyName, setAgencyName] = useState("Premium Properties Nigeria")
  const [agencyEmail, setAgencyEmail] = useState("info@premiumproperties.ng")
  const [agencyPhone, setAgencyPhone] = useState("+234 803 456 7890")
  const [rcNumber, setRcNumber] = useState("RC123456")
  const [yearsInBusiness, setYearsInBusiness] = useState("5")
  const [officeAddress, setOfficeAddress] = useState(
    "45 Ademola Adetokunbo Street, Victoria Island, Lagos"
  )
  const [website, setWebsite] = useState("www.premiumproperties.ng")
  const [description, setDescription] = useState(
    "Leading real estate agency specializing in luxury properties across Lagos and Abuja"
  )

  const handleSave = () => {
    Alert.alert("Success", "Agency information updated successfully")
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white px-6 py-4 border-b border-gray-100 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900 flex-1">
          Agency Information
        </Text>
        <TouchableOpacity onPress={handleSave}>
          <Text className="text-red-700 font-semibold">Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Basic Information */}
        <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
          <Text className="text-base font-bold text-gray-900 mb-4">
            Basic Information
          </Text>

          <Text className="text-sm text-gray-700 mb-2">Agency Name</Text>
          <TextInput
            value={agencyName}
            onChangeText={setAgencyName}
            className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900 mb-4"
          />

          <Text className="text-sm text-gray-700 mb-2">RC Number</Text>
          <TextInput
            value={rcNumber}
            onChangeText={setRcNumber}
            className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900 mb-4"
            placeholder="Company registration number"
          />

          <Text className="text-sm text-gray-700 mb-2">Years in Business</Text>
          <TextInput
            value={yearsInBusiness}
            onChangeText={setYearsInBusiness}
            keyboardType="numeric"
            className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900 mb-4"
          />

          <Text className="text-sm text-gray-700 mb-2">Agency Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900"
            textAlignVertical="top"
          />
        </View>

        {/* Contact Information */}
        <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
          <Text className="text-base font-bold text-gray-900 mb-4">
            Contact Information
          </Text>

          <Text className="text-sm text-gray-700 mb-2">Email</Text>
          <TextInput
            value={agencyEmail}
            onChangeText={setAgencyEmail}
            keyboardType="email-address"
            className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900 mb-4"
          />

          <Text className="text-sm text-gray-700 mb-2">Phone Number</Text>
          <TextInput
            value={agencyPhone}
            onChangeText={setAgencyPhone}
            keyboardType="phone-pad"
            className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900 mb-4"
          />

          <Text className="text-sm text-gray-700 mb-2">Office Address</Text>
          <TextInput
            value={officeAddress}
            onChangeText={setOfficeAddress}
            multiline
            numberOfLines={2}
            className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900 mb-4"
            textAlignVertical="top"
          />

          <Text className="text-sm text-gray-700 mb-2">Website</Text>
          <TextInput
            value={website}
            onChangeText={setWebsite}
            keyboardType="url"
            className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900"
          />
        </View>

        {/* Verification Status */}
        <View className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
          <Text className="text-base font-bold text-gray-900 mb-4">
            Verification Status
          </Text>

          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center">
              <Ionicons name="checkmark-circle" size={24} color="#16A34A" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-sm font-semibold text-gray-900">
                Email Verified
              </Text>
              <Text className="text-xs text-gray-600">
                Verified on Jan 15, 2025
              </Text>
            </View>
          </View>

          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center">
              <Ionicons name="checkmark-circle" size={24} color="#16A34A" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-sm font-semibold text-gray-900">
                Phone Verified
              </Text>
              <Text className="text-xs text-gray-600">
                Verified on Jan 15, 2025
              </Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center">
              <Ionicons name="checkmark-circle" size={24} color="#16A34A" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-sm font-semibold text-gray-900">
                Documents Verified
              </Text>
              <Text className="text-xs text-gray-600">
                Verified on Jan 20, 2025
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
