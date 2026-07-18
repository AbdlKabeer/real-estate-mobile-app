import React from "react"
import { View, Text, Image, Dimensions } from "react-native"

const { width } = Dimensions.get("window")

interface OnboardingSlideProps {
  image: any
  title: string
  description: string
}

export const OnboardingSlide = ({ image, title, description }: OnboardingSlideProps) => {
  return (
    <View style={{ width }} className="flex-1 items-center justify-center px-8 bg-white">
      <View className="flex-1 items-center justify-center">
        <Image
          source={image}
          className="w-80 h-80 mb-8"
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-center text-gray-900 mb-4 px-4">
          {title}
        </Text>
        <Text className="text-base text-center text-gray-600 px-6 leading-6">
          {description}
        </Text>
      </View>
    </View>
  )
}
