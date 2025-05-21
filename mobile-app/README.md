# QuoteSync Mobile App

A mobile application that displays time-based motivational quotes from the Next.js web app using WebView and implements push notifications with Firebase Cloud Messaging.

## Setup Instructions

### Prerequisites

- Node.js and npm
- Expo CLI (`npm install -g expo-cli`)
- A Firebase project with FCM enabled

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Firebase Setup:
   - Create a project in the [Firebase Console](https://console.firebase.google.com/)
   - Add an Android app with the package name `com.yourusername.quotesync` (match the name in app.json)
   - Download the `google-services.json` file and replace the placeholder file in `android/app/google-services.json`

3. Update WebView URL:
   - Open `App.js` and change the `webviewUrl` state to point to your deployed Next.js application
   - Example: `const [webviewUrl, setWebviewUrl] = useState('https://your-nextjs-app.com');`

4. Uncomment Firebase code:
   - Once Firebase is properly set up, uncomment the Firebase messaging code in `App.js`

### Running the App

Development:
```
npx expo start
```

For Android:
```
npx expo start --android
```

For iOS:
```
npx expo start --ios
```

### Building for Production

1. EAS Build (recommended):
   ```
   npm install -g eas-cli
   eas build --platform android
   ```

2. Expo Build (legacy):
   ```
   expo build:android
   ```

## Key Features

1. **WebView Integration**:
   - Displays the Next.js web app in a WebView
   - Passes FCM token to the web app for server-side notification targeting

2. **Firebase Cloud Messaging**:
   - Handles push notifications when app is in foreground, background, or terminated
   - Requests notification permissions on iOS
   - Auto-registers FCM token

## Customization

- Update app name, bundle identifier, and package name in `app.json`
- Add custom icons and splash screens in the `assets` folder
- Modify styles in the `styles` object in `App.js`

## Troubleshooting

- If you encounter issues with Firebase integration, ensure that:
  - The package name in `app.json` matches the one in Firebase Console
  - The `google-services.json` file is correctly placed
  - Firebase dependencies are properly installed

- For WebView issues:
  - Ensure the web URL is accessible and CORS is properly configured
  - Check if the `injectedJavaScript` is working correctly