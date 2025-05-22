# 📚 Quote Sync (Web + Mobile Integration)

This is a **full-stack recipe tracking app** with the following components:

- **Web App** built with **Next.js** and **Material UI**
- **Google Sign-In** integration using Firebase Authentication
- **Mobile App** (Expo React Native) with **WebView**
- **Native Firebase Cloud Messaging (FCM)** setup (via `@react-native-firebase/messaging`)
- 📦 Includes server-side trigger support for hourly motivational notifications

---

## 🌐 Web App Features

- ✅ Built with **Next.js 13+**
- ✅ Styled using **MUI (Material-UI)**
- ✅ Secure **Google Sign-In** with Firebase Auth
- ✅ Future extensibility for recipe tracking and dashboard features

---

## 📱 Mobile App (Expo)

- ✅ Built with **React Native** via **Expo**
- ✅ Integrates the web app using `WebView`
- ✅ Configured with **native FCM** to deliver push notifications
- 🚫 *Note:* This app **does not use Expo's built-in notifications** – native FCM is used instead

---

## 🔔 Firebase Cloud Messaging (FCM)

- App registers with Firebase on first launch and receives a device token
- Server is designed to send **hourly motivational push notifications**
- Notifications appear directly on the mobile device, keeping users engaged

**How FCM Works in This App:**

1. App uses Firebase Messaging to request and retrieve the device token.
2. This token is stored or sent to a server.
3. Every hour, the server sends a motivational message through FCM.
4. The app receives it even in the background and displays a push notification.

---

## ⚠️ Current Limitations & Explanation for Review

Due to hardware restrictions on the developer's device:

- ❌ Android Studio is **not compatible** with the current system setup.
- ❌ As a result, **custom Expo development builds** cannot be compiled or shown in this demo.

### 🧑‍💻 What’s Still Complete:

- ✅ All required Firebase native modules are installed and configured.
- ✅ EAS configuration is complete (`eas.json`, `app.config.js`).
- ✅ Code and native setup are production-ready.
- ✅ FCM integration is done using `@react-native-firebase/messaging` — no Expo notifications.

---

## 📹 Video Walkthrough (Web + FCM Explanation)

This demo video covers:

- ✅ Live Web App (hosted on Replit or localhost)
- ✅ How Firebase Cloud Messaging (FCM) is integrated and works
- ✅ Reason why the Android mobile build is not running
- ✅ Description of the hourly motivational notifications system

---

## 🧪 Running Locally

### 1. Clone the repository
```bash
git clone https://github.com/your-username/personal-recipe-tracker.git
cd personal-recipe-tracker
```

### 2. Install dependencies
```bash
cd client
npm install
```

### 3. Set environment variables
Create a `.env.local` file in the `/client` folder:

```env
  apiKey: "AIzaSyA8LSehhUnWMaa9V_2YrpXyClxpgkReY3A",
  authDomain: "necxis-123.firebaseapp.com",
  projectId: "necxis-123",
  storageBucket: "necxis-123.firebasestorage.app",
  messagingSenderId: "332242961406",
  appId: "1:332242961406:web:d348d0284d1fa1885036af"
```

### 4. Start the dev server
```bash
npm run dev
```

---

## 📂 Folder Structure

```
/client           → Next.js frontend with Firebase Auth
/mobile-app       → Expo app with WebView and native Firebase Messaging
/firebase         → Firebase Cloud Functions or config (optional)
```

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, Material UI
- **Mobile App:** React Native, Expo, WebView
- **Authentication:** Firebase Auth (Google Sign-In)
- **Notifications:** Firebase Cloud Messaging (FCM)

---

## 🤝 Contribution

PRs and suggestions are welcome. If you'd like to help finish the mobile build or troubleshoot Android Studio issues, feel free to fork and submit a PR.

---

## 📬 Contact

For issues, feedback, or request for `.apk` builds:
**Email:** ayanshjain2006@gmail.com

---
