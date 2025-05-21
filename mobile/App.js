import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { WebView } from 'react-native-webview';

export default function App() {
  useEffect(() => {
    async function setupFirebaseMessaging() {
      // Request permission for notifications
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Firebase Messaging permission granted');
        
        // Get FCM token
        messaging()
          .getToken()
          .then(token => {
            console.log('FCM Token:', token);
            // Here you would typically send this token to your server
          });
      }

      // Handle notifications when the app is in the foreground
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert('Quote Notification', remoteMessage.notification.body);
      });

      return unsubscribe;
    }

    setupFirebaseMessaging();
  }, []);

  return (
    <WebView 
      source={{ uri: 'http://10.0.2.2:3000' }} 
      style={{ flex: 1 }} 
      javaScriptEnabled={true}
      domStorageEnabled={true}
    />
  );
}
