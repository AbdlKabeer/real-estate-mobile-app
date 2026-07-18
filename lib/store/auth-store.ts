import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import api from "./api"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DEV_MODE, MOCK_USERS } from "../dev-config"

export type User = {
  id: string;
  userId: string
  fullName: string
  email: string
  phone: string
  role: "customer" | "agent" | "admin"
  isVerified: boolean
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  signup: (userData: SignupData) => Promise<{ data: { userId: string } }>
  login: (credentials: LoginData) => Promise<void>
  verify: (verificationData: VerifyData) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
  handleGoogleTokenAuth: (idToken: string, userInfo?: any) => Promise<void>
}

export type SignupData = {
  fullName: string
  email: string
  phone: string
  password: string
  userType: "customer" | "agent" | "admin"
}

export type LoginData = {
  email: string
  password: string
}

export type VerifyData = {
  userId: string
  verificationCode: string
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

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      signup: async (userData) => {
        try {
          set({ isLoading: true, error: null })
          const response = await api.post("/auth/register", userData)
          
          set({
            isLoading: false,
            user: { ...response.data.data, email: userData.email },
          })
          return response.data
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.message || "Failed to sign up",
          })
          throw error
        }
      },

      login: async (credentials) => {
        try {
          set({ isLoading: true, error: null })
          
          // DEVELOPMENT MODE: Use mock authentication
          if (DEV_MODE.MOCK_AUTH) {
            console.log("🔧 DEV MODE: Using mock authentication")
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500))
            
            // Check credentials against test accounts
            let mockUser = null
            if (credentials.email === "customer@test.com" && credentials.password === "password123") {
              mockUser = MOCK_USERS.customer
            } else if (credentials.email === "agent@test.com" && credentials.password === "password123") {
              mockUser = MOCK_USERS.agent
            } else {
              throw new Error("Invalid credentials. Use customer@test.com or agent@test.com with password123")
            }
            
            await asyncStorage.setItem("auth_token", "mock_token_" + Date.now())
            
            set({
              user: mockUser,
              isAuthenticated: true,
              isLoading: false,
            })
            return { data: mockUser }
          }
          
          // PRODUCTION MODE: Use real API
          const response = await api.post("/auth/login", credentials)
          const { user } = response.data.data

          await asyncStorage.setItem("auth_token", response.data.data.token)

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          })
          return response.data
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.message || error.message || "Failed to log in",
          })
          throw error
        }
      },

      verify: async (verificationData) => {
        try {
          set({ isLoading: true, error: null })
          const response = await api.post("/auth/verify-email", verificationData)
          const { user } = response.data.data

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          })
          return response.data
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.message || "Failed to verify account",
          })
          throw error
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true })
          
          await asyncStorage.removeItem("auth_token")

          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          })
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.message || "Failed to log out",
          })
          throw error
        }
      },

      clearError: () => set({ error: null }),

      handleGoogleTokenAuth: async (idToken: string, userInfo?: any) => {
        try {
          set({ isLoading: true, error: null })
          
          const response = await api.post('/auth/google-login', {
            idToken,
            userInfo: userInfo ? {
              email: userInfo.email,
              name: userInfo.name,
              photo: userInfo.photo,
              id: userInfo.id,
            } : undefined,
          })

          if (!response.data) {
            throw new Error('Authentication failed')
          }

          const { user, token } = response.data.data || response.data
          
          await asyncStorage.setItem("auth_token", token)

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          })

        } catch (error: any) {
          set({ 
            isLoading: false,
            error: error.response?.data?.message || "Failed to authenticate with Google"
          })
          throw error
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => asyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
