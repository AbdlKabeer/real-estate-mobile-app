import React, { useRef, useState } from "react"
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Dimensions,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native"
import { useRouter } from "expo-router"
import { OnboardingSlide } from "@/components/onboarding/onboarding-slide"
import { useOnboardingStore } from "@/lib/store/onboarding-store"

const { width } = Dimensions.get("window")

const onboardingData = [
  {
    id: "1",
    // Placeholder - replace with actual image
    image: { uri: "https://via.placeholder.com/320x320/FEF2F2/DC2626?text=Welcome" },
    title: "Welcome to Nexab",
    description: "Discover amazing features and services tailored just for you. Let's get started on this journey together.",
  },
  {
    id: "2",
    // Placeholder - replace with actual image
    image: { uri: "https://via.placeholder.com/320x320/FEF2F2/DC2626?text=Connect" },
    title: "Stay Connected",
    description: "Connect with people, share experiences, and build meaningful relationships in our vibrant community.",
  },
  {
    id: "3",
    // Placeholder - replace with actual image
    image: { uri: "https://via.placeholder.com/320x320/FEF2F2/DC2626?text=Achieve" },
    title: "Achieve Your Goals",
    description: "Track your progress, set milestones, and achieve your goals with our comprehensive tools and analytics.",
  },
]

export default function OnboardingScreen() {
  const router = useRouter()
  const { completeOnboarding } = useOnboardingStore()
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current
  const slidesRef = useRef<FlatList>(null)

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index)
    }
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const scrollTo = () => {
    if (currentIndex < onboardingData.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 })
    } else {
      handleFinish()
    }
  }

  const handleFinish = () => {
    completeOnboarding()
    // Navigate to login screen
    router.push("/(auth)/login" as any)
  }

  const handleSkip = () => {
    completeOnboarding()
    // Navigate to login screen
    router.push("/(auth)/login" as any)
  }

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1">
        <FlatList
          data={onboardingData}
          renderItem={({ item }) => (
            <OnboardingSlide
              image={item.image}
              title={item.title}
              description={item.description}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          ref={slidesRef}
        />
      </View>

      {/* Pagination & Controls */}
      <View className="pb-12 px-8">
        {/* Pagination Dots */}
        <View className="flex-row justify-center mb-8">
          {onboardingData.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ]

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 20, 8],
              extrapolate: "clamp",
            })

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            })

            return (
              <Animated.View
                key={index}
                style={{
                  width: dotWidth,
                  opacity,
                }}
                className="h-2 rounded-full bg-red-700 mx-1"
              />
            )
          })}
        </View>

        {/* Buttons */}
        <View className="flex-row justify-between items-center">
          {currentIndex < onboardingData.length - 1 ? (
            <TouchableOpacity
              onPress={handleSkip}
              className="py-3 px-6"
              activeOpacity={0.7}
            >
              <Text className="text-gray-600 text-base font-medium">Skip</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}

          <TouchableOpacity
            onPress={scrollTo}
            className="bg-red-700 py-4 px-8 rounded-full min-w-[120px] items-center"
            activeOpacity={0.8}
          >
            <Text className="text-white text-base font-semibold">
              {currentIndex === onboardingData.length - 1 ? "Get Started" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
