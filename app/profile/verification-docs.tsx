import React from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

export default function VerificationDocumentsScreen() {
  const documents = [
    {
      id: "1",
      name: "CAC Certificate",
      type: "Business Registration",
      status: "verified",
      uploadedDate: "Jan 15, 2025",
      icon: "document-text",
    },
    {
      id: "2",
      name: "Tax ID (TIN)",
      type: "Tax Identification",
      status: "verified",
      uploadedDate: "Jan 15, 2025",
      icon: "document-text",
    },
    {
      id: "3",
      name: "Agent License",
      type: "Professional License",
      status: "verified",
      uploadedDate: "Jan 20, 2025",
      icon: "ribbon",
    },
    {
      id: "4",
      name: "Proof of Address",
      type: "Utility Bill or Bank Statement",
      status: "pending",
      uploadedDate: "Not uploaded",
      icon: "location",
    },
  ]

  const handleUpload = (docType: string) => {
    Alert.alert(
      "Upload Document",
      `Upload ${docType} - Document picker will be implemented`
    )
  }

  const handleView = (docName: string) => {
    Alert.alert("View Document", `Viewing ${docName}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return { bg: "bg-green-100", text: "text-green-700", icon: "#16A34A" }
      case "pending":
        return { bg: "bg-yellow-100", text: "text-yellow-700", icon: "#EAB308" }
      case "rejected":
        return { bg: "bg-red-100", text: "text-red-700", icon: "#DC2626" }
      default:
        return { bg: "bg-gray-100", text: "text-gray-700", icon: "#6B7280" }
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white px-6 py-4 border-b border-gray-100 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900">
          Verification Documents
        </Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Info Banner */}
        <View className="bg-blue-50 rounded-2xl p-4 mb-4 border border-blue-200">
          <View className="flex-row items-start">
            <Ionicons name="information-circle" size={20} color="#2563EB" />
            <View className="ml-3 flex-1">
              <Text className="text-sm text-blue-900 font-semibold mb-1">
                Document Verification
              </Text>
              <Text className="text-xs text-blue-800">
                Upload required documents to complete your agent verification.
                All documents are encrypted and handled securely.
              </Text>
            </View>
          </View>
        </View>

        {/* Documents List */}
        {documents.map((doc) => {
          const statusColors = getStatusColor(doc.status)

          return (
            <View
              key={doc.id}
              className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100"
            >
              <View className="flex-row items-start mb-3">
                <View className={`w-12 h-12 ${statusColors.bg} rounded-full items-center justify-center`}>
                  <Ionicons
                    name={doc.icon as any}
                    size={24}
                    color={statusColors.icon}
                  />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-base font-semibold text-gray-900 mb-1">
                    {doc.name}
                  </Text>
                  <Text className="text-sm text-gray-600 mb-2">
                    {doc.type}
                  </Text>
                  <View
                    className={`${statusColors.bg} px-3 py-1 rounded-full self-start`}
                  >
                    <Text className={`text-xs font-semibold ${statusColors.text} capitalize`}>
                      {doc.status}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
                <Text className="text-xs text-gray-500">
                  {doc.uploadedDate}
                </Text>
                <View className="flex-row gap-2">
                  {doc.status === "verified" ? (
                    <TouchableOpacity
                      onPress={() => handleView(doc.name)}
                      className="bg-blue-600 rounded-lg px-4 py-2"
                    >
                      <Text className="text-white text-xs font-semibold">
                        View
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => handleUpload(doc.name)}
                      className="bg-red-700 rounded-lg px-4 py-2"
                    >
                      <Text className="text-white text-xs font-semibold">
                        Upload
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          )
        })}

        {/* Requirements */}
        <View className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
          <Text className="text-base font-bold text-gray-900 mb-3">
            Document Requirements
          </Text>

          <View className="mb-3">
            <Text className="text-sm font-semibold text-gray-700 mb-1">
              • File Format
            </Text>
            <Text className="text-xs text-gray-600 ml-3">
              PDF, JPG, or PNG (Max 5MB per file)
            </Text>
          </View>

          <View className="mb-3">
            <Text className="text-sm font-semibold text-gray-700 mb-1">
              • Document Quality
            </Text>
            <Text className="text-xs text-gray-600 ml-3">
              Clear, readable text with all corners visible
            </Text>
          </View>

          <View>
            <Text className="text-sm font-semibold text-gray-700 mb-1">
              • Processing Time
            </Text>
            <Text className="text-xs text-gray-600 ml-3">
              Verification typically takes 24-48 hours
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
