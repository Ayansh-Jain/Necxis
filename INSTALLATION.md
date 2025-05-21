# QuoteSync Installation Guide

This guide provides instructions for setting up and running both the web and mobile components of the QuoteSync application.

## Prerequisites

- Node.js (v14 or newer)
- npm (v6 or newer)
- Expo CLI (for mobile development)
- Firebase project (for authentication and push notifications)

## Step 1: Installation

### Web Application Setup

1. Navigate to the web directory:
   ```
   cd web
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Create or modify the `.env.local` file with your Google OAuth and Firebase credentials:
   ```
   GOOGLE_ID=your_google_client_id
   GOOGLE_SECRET=your_google_client_secret
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. Start the development server:
   ```
   npm run dev
   ```
   The web app will be available at http://localhost:3000

### Mobile Application Setup

1. Navigate to the mobile directory:
   ```
   cd mobile
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure Firebase:
   - Replace the placeholder `google-services.json` file in `mobile/android/app/` with your actual Firebase configuration file
   - Make sure your Firebase project has FCM (Firebase Cloud Messaging) enabled

4. Start the Expo development server:
   ```
   npm start
   ```

5. Run on Android:
   ```
   npm run android
   ```

## Step 2: Firebase Setup

See the [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) file for detailed instructions on setting up your Firebase project.

## Running the Application

### Web App Only

```
cd web
npm run dev
```

### Android App

```
cd mobile
npm run android
```

## Project Structure

- `/web` - Next.js web application
  - `/pages` - Web app pages
  - `/data` - Quote data
  - `/styles` - CSS styles
  - `/components` - Reusable components
  - `/firebase` - Firebase configuration

- `/mobile` - Expo/React Native mobile app
  - `/android` - Android configuration files
  - `/assets` - Image assets
  - `App.js` - Main app with WebView and FCM

## Notes

- The mobile app connects to the web app via WebView
- Push notifications are sent using Firebase Cloud Messaging
- The web app uses Google authentication via NextAuth.js