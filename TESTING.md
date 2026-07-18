# Testing the App

## Current Backend Status

This app is configured to connect to a backend API, but **no backend is currently running**. Here are your options:

## Option 1: Test with Mock Data (Recommended for Frontend Testing)

### For Customer Login:
1. **Skip authentication for now** - You can modify the auth guard temporarily
2. **Use mock data** - Properties and features are loaded from the property store

### For Development/Testing:

Add this to your `app.json` or create test credentials:

```json
{
  "expo": {
    "extra": {
      "environment": "DEVELOPMENT",
      "debug": "true"
    }
  }
}
```

## Option 2: Register a New Account

1. **Click "Sign Up"** from the login screen
2. **Fill in your details**:
   - Full Name
   - Email
   - Phone  
   - Password (min 8 characters)
3. **Choose role**: Customer or Agent
4. **Verify email** with OTP (will need backend)

## Option 3: Connect Your Backend

Update the API base URL in `/lib/store/api.ts`:

```typescript
const api = axios.create({
  baseURL: "YOUR_BACKEND_URL", // e.g., "http://localhost:3000/api"
  timeout: 10000,
})
```

### Required Backend Endpoints:

**Authentication:**
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/verify-email` - Email verification
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/verify-reset-otp` - Verify reset OTP
- `POST /auth/reset-password` - Reset password
- `POST /auth/google-login` - Google authentication

**Properties (Customer):**
- `GET /properties` - List all properties
- `GET /properties/:id` - Get property details

**Bookings:**
- `POST /bookings` - Book inspection
- `GET /bookings/my-bookings` - Get user bookings
- `PATCH /bookings/:id/cancel` - Cancel booking

**Chat:**
- WebSocket or REST endpoints for messaging

## Option 4: Bypass Auth (Development Only)

Temporarily modify `components/auth/auth-guard.tsx`:

```typescript
const isDevelopmentDebug = true // Force bypass
```

Or add this environment variable to bypass auth checks.

## Test Credentials Structure

If your backend supports test accounts, credentials should be:

```json
{
  "email": "customer@test.com",
  "password": "password123"
}
```

or

```json
{
  "email": "agent@test.com", 
  "password": "password123"
}
```

## Fixing the Refresh Issue

The page refresh was caused by the auth guard redirecting too quickly. This has been fixed by:

1. ✅ Preventing redirects during active auth flow
2. ✅ Adding delay after login to allow state to update
3. ✅ Better route detection for protected pages

## Current App Flow

```
1. Onboarding (first time) → 2. Role Selection → 3. Login/Register → 4. Dashboard

Customer Dashboard:
- Browse properties
- Filter/search
- View property details
- Book inspections
- Chat with agents

Agent Dashboard:
- Manage properties
- View bookings
- Chat with customers
```

## Quick Development Setup

For quick testing without backend:

1. Open `lib/store/auth-store.ts`
2. Temporarily mock the login function:

```typescript
login: async (credentials) => {
  // Mock successful login
  set({
    user: {
      id: "1",
      userId: "user123",
      fullName: "Test Customer",
      email: credentials.email,
      phone: "+1234567890",
      role: "customer",
      isVerified: true
    },
    isAuthenticated: true,
    isLoading: false,
  })
  await asyncStorage.setItem("auth_token", "mock_token")
}
```

Then use any credentials to login!
