# Firebase Setup Instructions for QuoteSync

To fully use the QuoteSync application with authentication and push notifications, you'll need to set up Firebase and configure your project with the necessary credentials.

## 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the steps to create a new project
3. Give your project a name (e.g., "QuoteSync")
4. Enable Google Analytics if desired (optional)
5. Click "Create project"

## 2. Set Up Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Enable the "Google" sign-in provider
   - Click "Google" in the list of providers
   - Toggle the "Enable" switch to on
   - Add your support email
   - Click "Save"

## 3. Add Your Web Application

1. From the project overview page, click the web icon (</>) to add a web app
2. Register your app with a nickname (e.g., "QuoteSync Web")
3. Check the box for "Also set up Firebase Hosting" if desired (optional)
4. Click "Register app"
5. You will see your Firebase configuration, which includes:
   - apiKey
   - authDomain
   - projectId
   - storageBucket
   - messagingSenderId
   - appId
6. Copy these values to update your web app's `.env.local` file with:
   
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

## 4. Set Up Android App for Firebase Messaging

1. From the project overview page, click the Android icon to add an Android app
2. Register your app with:
   - Android package name: "com.mobile" (as defined in our app.json)
   - App nickname: "QuoteSync Mobile"
   - Debug signing certificate SHA-1: (optional for development)
3. Click "Register app"
4. Download the `google-services.json` file
5. Replace the placeholder file at `mobile/android/app/google-services.json` with this downloaded file

## 5. Configure Firebase Cloud Messaging

1. In your Firebase project, go to "Project settings" > "Cloud Messaging"
2. Note your Server key (we'll use this to send push notifications)
3. For Android:
   - Ensure you have the proper dependencies in your Android app (already included in our project)
   
## 6. Set Up OAuth Credentials for Google Sign-In

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (same as your Firebase project)
3. Go to "APIs & Services" > "Credentials"
4. Click "Create credentials" > "OAuth client ID"
5. Select "Web application"
6. Add authorized JavaScript origins:
   - For development: `http://localhost:3000`
   - For production: Add your domain or Firebase hosting URL
7. Add authorized redirect URIs:
   - For development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://your-domain.com/api/auth/callback/google`
8. Click "Create"
9. Copy the "Client ID" and "Client secret"
10. Add these values to your web app's `.env.local` file:
    ```
    GOOGLE_ID=your_client_id
    GOOGLE_SECRET=your_client_secret
    NEXTAUTH_SECRET=random_string_for_jwt_encryption
    NEXTAUTH_URL=http://localhost:3000
    ```

## Testing the Configuration

1. Start your Next.js app: `cd web && npm run dev`
2. Try signing in with Google
3. If successful, you should be authenticated and redirected to the home page
4. For the mobile app, run `cd mobile && expo run:android`
5. The WebView should load your web app and receive Firebase notifications