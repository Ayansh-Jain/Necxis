# QuoteSync - Daily Motivation App

A cross-platform application that displays time-based motivational quotes with Google authentication and push notifications.

## Features

- **Web Application**:
  - Google authentication
  - Time-based motivational quotes (changes hourly)
  - Mobile-responsive design

- **Mobile Application**:
  - WebView to display web content
  - Push notifications via Firebase Cloud Messaging

## Setup Instructions

### 1. Web App Setup

#### a. Install Dependencies

```bash
cd web
npm install
```

#### b. Configure Environment Variables

Edit the `.env.local` file in the `/web` folder:

```env
GOOGLE_ID=<your-google-client-id>
GOOGLE_SECRET=<your-google-client-secret>
NEXTAUTH_SECRET=<random-32-byte-hex>
NEXTAUTH_URL=http://localhost:3000
```

To generate a secure value for `NEXTAUTH_SECRET`, you can use:
```bash
openssl rand -hex 32
```

#### c. Google Authentication Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Go to "APIs & Services" > "Credentials"
4. Create an OAuth 2.0 Client ID (Web application)
5. Add authorized JavaScript origins and redirect URIs (e.g., http://localhost:3000)
6. Copy the Client ID and Client Secret to your `.env.local` file

### 2. Mobile App Setup

#### a. Firebase Project Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use an existing one)
3. Add an Android app with package name "com.mobile"
4. Download the `google-services.json` file
5. Replace the placeholder file in `/mobile/android/app/google-services.json`

#### b. Install Dependencies and Build

```bash
cd mobile
npm install
```

#### c. Firebase Cloud Messaging Setup

1. In the Firebase Console, go to "Project settings"
2. Navigate to the "Cloud Messaging" tab
3. Configure Android app credentials
4. Set up an FCM server key

## Running the Applications

### Web App

```bash
cd web
npm run dev
```

The web app will be available at http://localhost:3000

### Android App

```bash
cd mobile
expo run:android
```

This will build and run the Android app, which will display your Next.js web app content and handle push notifications.

## Project Structure

- `/web` - Next.js web application
  - `/pages` - Web app pages
  - `/data` - Quote data
  - `/styles` - CSS styles
  - `/components` - Reusable components

- `/mobile` - Expo/React Native mobile app
  - `/android` - Android configuration files
  - `App.js` - Main app entry point with WebView and FCM integration

## Technologies Used

- **Frontend**: Next.js, React, Material UI
- **Authentication**: NextAuth.js with Google OAuth
- **Mobile**: React Native, Expo
- **Push Notifications**: Firebase Cloud Messaging (FCM)
- **WebView Integration**: React Native WebView

## Notes

- The mobile app accesses the web app via WebView, pointing to your local development server
- For production, you would want to point the WebView to your deployed web application
- Firebase Cloud Messaging is used for push notifications in the mobile app