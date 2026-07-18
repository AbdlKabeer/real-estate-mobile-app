# Onboarding Components

This folder contains components for the app's onboarding experience.

## Components

### OnboardingSlide
Renders an individual slide in the onboarding carousel with an image, title, and description.

## Usage

The onboarding screen is automatically shown to first-time users via the `AuthGuard` component, which checks the `hasCompletedOnboarding` flag from the onboarding store.

## Customization

To customize the onboarding:

1. **Images**: Replace the placeholder image URLs in `app/onboarding.tsx` with your actual images:
   ```typescript
   image: require("@/assets/images/your-image.png")
   ```

2. **Content**: Update the `onboardingData` array in `app/onboarding.tsx` with your titles and descriptions.

3. **Styling**: Modify the Tailwind classes in both `onboarding-slide.tsx` and `app/onboarding.tsx` to match your brand.

4. **Navigation**: Update the `handleFinish()` and `handleSkip()` functions to navigate to your desired screen (login, signup, etc.).

## Store

The onboarding completion state is persisted using Zustand and AsyncStorage in `lib/store/onboarding-store.ts`.

To reset onboarding (for testing):
```typescript
import { useOnboardingStore } from "@/lib/store/onboarding-store"

const { resetOnboarding } = useOnboardingStore()
resetOnboarding()
```
