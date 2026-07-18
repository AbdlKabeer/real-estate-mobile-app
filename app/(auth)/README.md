# Authentication System

Complete authentication flow for the Nexab React Native app built with Expo Router.

## 📁 Structure

```
app/(auth)/
├── _layout.tsx              # Auth stack navigation
├── login.tsx                # Login screen
├── register.tsx             # Registration/signup screen
├── forgot-password.tsx      # Request password reset
├── verify-email.tsx         # Email verification after signup
├── verify-reset-otp.tsx     # Verify OTP for password reset
└── set-new-password.tsx     # Set new password after reset

components/auth/
├── auth-guard.tsx           # Route protection & navigation logic
└── otp-modal.tsx            # Reusable OTP input modal
```

## 🔐 Authentication Flow

### 1. **Onboarding → Registration**
- First-time users see onboarding slides
- "Get Started" navigates to registration screen

### 2. **Registration Flow**
```
Register → Verify Email (OTP) → Home/Dashboard
```

### 3. **Login Flow**
```
Login → Home/Dashboard
```

### 4. **Password Reset Flow**
```
Forgot Password → Enter Email → Verify OTP → Set New Password → Login
```

## 🎨 Features

### Registration Screen (`register.tsx`)
- ✅ Full name, email, phone, password validation
- ✅ Password strength requirements
- ✅ Password visibility toggle
- ✅ Form validation with Zod + React Hook Form
- ✅ Error handling & toast notifications
- ✅ Navigation to verification screen
- ✅ Link to login screen

### Login Screen (`login.tsx`)
- ✅ Email & password fields
- ✅ Password visibility toggle
- ✅ "Forgot Password" link
- ✅ Social login buttons (Google, Facebook)
- ✅ Link to registration
- ✅ Loading states

### Forgot Password Screen (`forgot-password.tsx`)
- ✅ Email input
- ✅ Visual illustration
- ✅ Sends reset code to email
- ✅ Navigates to OTP verification

### OTP Modal (`otp-modal.tsx`)
- ✅ 6-digit code input
- ✅ Auto-focus next input
- ✅ Auto-submit on completion
- ✅ Backspace navigation
- ✅ Resend code functionality
- ✅ Smooth animations
- ✅ Reusable component

### Verify Email Screen (`verify-email.tsx`)
- ✅ OTP verification after signup
- ✅ Uses reusable OTP modal
- ✅ Integrates with auth store

### Set New Password Screen (`set-new-password.tsx`)
- ✅ Password & confirm password fields
- ✅ Password visibility toggles
- ✅ Password requirements display
- ✅ Validation with Zod
- ✅ Success navigation to login

## 🛡️ Auth Guard

The `AuthGuard` component manages navigation flow:

1. **First-time users** → Onboarding
2. **After onboarding** → Registration/Login
3. **Authenticated users accessing auth screens** → Redirect to home
4. **Unauthenticated users accessing protected routes** → Redirect to login

## 🔧 Customization

### Update API Endpoints

Edit the API calls in each screen to match your backend:

```typescript
// Example: Register screen
await api.post("/auth/register", userData)

// Example: Forgot password
await api.post("/auth/forgot-password", { email })
```

### Modify Validation Rules

Update Zod schemas in each file:

```typescript
const registerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  // Add custom validation
})
```

### Change Colors

All screens use Tailwind classes with red-700 theme:
- Primary: `bg-red-700`, `text-red-700`
- Change to match your brand colors

### Social Authentication

The login screen has placeholder social buttons. Implement handlers:

```typescript
// In login.tsx
const handleGoogleLogin = async () => {
  const { handleGoogleTokenAuth } = useAuthStore()
  // Implement Google Sign-In
}
```

## 🧪 Testing

### Reset Onboarding
```typescript
import { useOnboardingStore } from "@/lib/store/onboarding-store"
const { resetOnboarding } = useOnboardingStore()
resetOnboarding()
```

### Test Flow
1. Clear app data/storage
2. Launch app → See onboarding
3. Complete onboarding → See registration
4. Register → Verify email
5. Login → Access protected routes

## 📦 Dependencies

All authentication screens use:
- `react-hook-form` - Form management
- `@hookform/resolvers/zod` - Schema validation
- `zod` - Type-safe validation
- `expo-router` - Navigation
- `@expo/vector-icons` - Icons
- Tailwind CSS (NativeWind) - Styling

## 🔗 Navigation

The app uses Expo Router with file-based routing:
- `/(auth)/login` - Login screen
- `/(auth)/register` - Registration screen
- `/(auth)/forgot-password` - Password reset
- `/onboarding` - Onboarding slides

## 🚀 Next Steps

1. **Connect to your backend API**
2. **Implement social authentication** (Google, Facebook, Apple)
3. **Add biometric authentication** (Face ID, Touch ID)
4. **Implement refresh tokens** in auth store
5. **Add loading skeletons** for better UX
6. **Implement "Remember Me"** functionality
7. **Add email resend** functionality with rate limiting
