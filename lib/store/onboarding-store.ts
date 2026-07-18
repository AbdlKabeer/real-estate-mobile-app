import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import AsyncStorage from '@react-native-async-storage/async-storage'

interface OnboardingState {
  hasCompletedOnboarding: boolean
  completeOnboarding: () => void
  resetOnboarding: () => void
}

const asyncStorage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key)
    } catch (error) {
      console.error(`Error getting item ${key}:`, error)
      return null
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (error) {
      console.error(`Error setting item ${key}:`, error)
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing item ${key}:`, error)
    }
  },
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      
      completeOnboarding: () => {
        set({ hasCompletedOnboarding: true })
      },
      
      resetOnboarding: () => {
        set({ hasCompletedOnboarding: false })
      },
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => asyncStorage),
    },
  ),
)
