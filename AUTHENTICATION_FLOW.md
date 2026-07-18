# Authentication Flow Diagram

## Complete User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                         APP LAUNCH                               │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │   Auth Guard Check   │
              └──────────┬───────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
  [First Time]    [Not Logged In]  [Logged In]
         │               │               │
         │               │               └──────────────┐
         ▼               ▼                              ▼
┌─────────────┐   ┌──────────┐                  ┌──────────┐
│ ONBOARDING  │   │  LOGIN   │                  │   HOME   │
│   SLIDES    │   └────┬─────┘                  │DASHBOARD │
└──────┬──────┘        │                        └──────────┘
       │               │
       │ Skip/Finish   │
       │               │
       └───────┬───────┘
               │
               ▼
        ┌────────────┐
        │  REGISTER  │
        └──────┬─────┘
               │
               ▼
      ┌────────────────┐
      │  VERIFY EMAIL  │
      │   (OTP Modal)  │
      └────────┬───────┘
               │
               │ Success
               ▼
        ┌──────────┐
        │   HOME   │
        │DASHBOARD │
        └──────────┘
```

## Password Reset Flow

```
┌──────────┐
│  LOGIN   │
└────┬─────┘
     │
     │ Click "Forgot Password?"
     ▼
┌────────────────┐
│     FORGOT     │
│   PASSWORD     │
│ (Enter Email)  │
└────────┬───────┘
         │
         ▼
┌────────────────┐
│  VERIFY RESET  │
│      OTP       │
│  (OTP Modal)   │
└────────┬───────┘
         │
         ▼
┌────────────────┐
│  SET NEW       │
│  PASSWORD      │
└────────┬───────┘
         │
         │ Success
         ▼
    ┌──────────┐
    │  LOGIN   │
    └──────────┘
```

## Screen Components

### 1. Onboarding (`/onboarding`)
- 3 slides with pagination
- Skip & Next buttons
- Completes onboarding → Register

### 2. Registration (`/(auth)/register`)
- Full Name
- Email
- Phone
- Password (with toggle)
- Confirm Password
- Link to Login

### 3. Login (`/(auth)/login`)
- Email
- Password (with toggle)
- Forgot Password link
- Social login buttons
- Link to Register

### 4. Forgot Password (`/(auth)/forgot-password`)
- Email input
- Sends reset code
- → Verify Reset OTP

### 5. Verify Reset OTP (`/(auth)/verify-reset-otp`)
- Shows OTP Modal
- 6-digit code
- → Set New Password

### 6. Set New Password (`/(auth)/set-new-password`)
- New Password
- Confirm Password
- Password requirements
- → Login

### 7. Verify Email (`/(auth)/verify-email`)
- Shows OTP Modal
- 6-digit code
- → Home/Dashboard

## Auth Guard Logic

```javascript
if (!hasCompletedOnboarding && !inOnboarding) {
  → Navigate to /onboarding
}

if (hasCompletedOnboarding && !isAuthenticated && inProtectedRoute) {
  → Navigate to /(auth)/login
}

if (isAuthenticated && inAuthScreen) {
  → Navigate to / (home)
}
```

## State Management

### Onboarding Store
```typescript
{
  hasCompletedOnboarding: boolean
  completeOnboarding()
  resetOnboarding()
}
```

### Auth Store
```typescript
{
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  signup()
  login()
  verify()
  logout()
  handleGoogleTokenAuth()
}
```

## Navigation Paths

| Path | Screen | Description |
|------|--------|-------------|
| `/onboarding` | Onboarding | First-time user slides |
| `/(auth)/login` | Login | User authentication |
| `/(auth)/register` | Register | New account creation |
| `/(auth)/forgot-password` | Forgot Password | Request reset code |
| `/(auth)/verify-reset-otp` | Verify OTP | Verify reset code |
| `/(auth)/set-new-password` | Set Password | Create new password |
| `/(auth)/verify-email` | Verify Email | Verify after signup |
| `/` | Home | Protected dashboard |
