# Real App

A modern React Native application built with Expo Router, TypeScript, and NativeWind.

## Features

- 🚀 Built with Expo SDK 54
- 📱 Cross-platform (iOS, Android, Web)
- 🎨 Styled with NativeWind (TailwindCSS for React Native)
- 🔐 Authentication with Auth Guard
- 🌓 Dark mode support
- 📦 State management with Zustand
- 🔄 API integration with Axios
- 🎯 Type-safe with TypeScript
- 🎨 Custom UI components
- 📝 Form handling with React Hook Form
- ✨ Toast notifications

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [EAS CLI](https://docs.expo.dev/build/setup/) (for building)

For iOS development:
- macOS
- [Xcode](https://developer.apple.com/xcode/)

For Android development:
- [Android Studio](https://developer.android.com/studio)

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Update API Base URL

Update the API base URL in `lib/store/api.ts`:

```typescript
const api = axios.create({
  baseURL: "https://your-api-base-url.com/api/v1",
  // ...
})
```

### 3. Configure App Settings

Update the app configuration in `app.json`:
- Change `name`, `slug`, and `scheme`
- Update `bundleIdentifier` (iOS) and `package` (Android)
- Add your own icons and splash screen images in `assets/images/`

### 4. Start Development Server

```bash
npm start
# or
yarn start
```

This will start the Expo development server. You can then:
- Press `i` to open iOS simulator
- Press `a` to open Android emulator
- Press `w` to open in web browser
- Scan the QR code with Expo Go app on your physical device

## Project Structure

```
real-app/
├── app/                    # App routes (Expo Router)
│   ├── _layout.tsx        # Root layout
│   ├── +html.tsx          # HTML wrapper (web)
│   └── +not-found.tsx     # 404 page
├── assets/                # Static assets
│   ├── fonts/
│   ├── icons/
│   └── images/
├── components/            # Reusable components
│   ├── auth/             # Auth-related components
│   ├── ui/               # UI components
│   ├── Themed.tsx        # Themed components
│   └── useColorScheme.ts # Color scheme hook
├── constants/            # App constants
│   └── Colors.ts         # Color definitions
├── context/              # React Context providers
│   ├── theme-provider.tsx
│   └── toast-provider.tsx
├── hooks/                # Custom hooks
├── lib/                  # Utilities and configurations
│   ├── cn.ts            # Class name utility
│   └── store/           # State management
│       ├── api.ts       # API client
│       └── auth-store.ts # Auth state
├── types/                # TypeScript type definitions
├── app.json              # Expo configuration
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.js    # TailwindCSS configuration
└── metro.config.js       # Metro bundler configuration
```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start on Android
- `npm run ios` - Start on iOS
- `npm run web` - Start on web
- `npm test` - Run tests
- `npm run install:clean` - Clean install dependencies

## Building for Production

### Using EAS Build (Recommended)

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Login to Expo:
```bash
eas login
```

3. Configure your project:
```bash
eas build:configure
```

4. Build for specific platform:
```bash
# Development build
eas build --profile development --platform ios
eas build --profile development --platform android

# Production build
eas build --profile production --platform ios
eas build --profile production --platform android
```

### Publishing Updates

Publish over-the-air updates:
```bash
eas update --branch [branch-name] --message "Your update message"
```

## Configuration

### Environment Variables

Create environment-specific configurations in your `app.json` under the `extra` field:

```json
{
  "expo": {
    "extra": {
      "environment": "PRODUCTION",
      "debug": "false"
    }
  }
}
```

### Dark Mode

The app supports automatic dark mode based on system preferences. Users can also manually toggle between light and dark modes using the theme provider.

## Key Dependencies

- **Expo** - React Native framework
- **Expo Router** - File-based routing
- **NativeWind** - TailwindCSS for React Native
- **Zustand** - State management
- **React Query** - Data fetching and caching
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Axios** - HTTP client

## Customization

### Theming

Update colors in `tailwind.config.js` to match your brand:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#YOUR_COLOR',
        // ...
      }
    }
  }
}
```

### Adding New Routes

With Expo Router, simply create files in the `app/` directory:
- `app/about.tsx` → `/about` route
- `app/profile/index.tsx` → `/profile` route
- `app/profile/[id].tsx` → `/profile/:id` dynamic route

## Troubleshooting

### Clear Cache

If you encounter issues, try clearing the cache:

```bash
expo start --clear
```

### Reset Project

```bash
npm run install:clean
```

### Common Issues

1. **Metro bundler errors**: Clear cache with `expo start --clear`
2. **Module not found**: Run `npm install` again
3. **iOS build issues**: Run `cd ios && pod install` (if applicable)

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Documentation](https://expo.github.io/router/docs/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [React Native Documentation](https://reactnative.dev/)

## License

This project is licensed under the MIT License.

## Support

For support, email your-email@example.com or open an issue in the repository.
