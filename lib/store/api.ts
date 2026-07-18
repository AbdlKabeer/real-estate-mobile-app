import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage'

const api = axios.create({
  baseURL: "https://your-api-base-url.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor to add auth token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("auth_token")
    console.log("Token from AsyncStorage:", token)  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    const method = config.method?.toUpperCase()
    const url = `${config.baseURL}${config.url}`
    console.log(`[API REQUEST] ${method} ${url}`)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle specific error cases here (e.g., token expiration)
    if (error.response?.status === 401) {
      // Token expired or invalid
      AsyncStorage.removeItem("auth_token")
      // You could trigger a logout action here
    }
    return Promise.reject(error)
  },
)

export default api
