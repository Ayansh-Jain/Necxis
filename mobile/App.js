import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import messaging from '@react-native-firebase/messaging';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [webviewUrl, setWebviewUrl] = useState('http://localhost:3000');
  const [fcmToken, setFcmToken] = useState(null);
  const [initialUrl, setInitialUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  // Request notification permissions on iOS
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFcmToken();
    }
  }

  // Get the FCM token
  async function getFcmToken() {
    try {
      const token = await messaging().getToken();
      if (token) {
        console.log('FCM Token:', token);
        setFcmToken(token);
      }
    } catch (error) {
      console.error('Failed to get FCM token:', error);
    }
  }

  // Handle incoming notifications when the app is in the foreground
  function setupForegroundMessageHandler() {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body
      );
    });

    return unsubscribe;
  }

  // Handle notification click when app is in background or terminated state
  async function checkInitialNotification() {
    const remoteMessage = await messaging().getInitialNotification();
    
    if (remoteMessage) {
      console.log('Notification caused app to open:', remoteMessage);
      // You can navigate to a specific screen here based on the notification
      setInitialUrl(`http://localhost:3000?notification=${remoteMessage.messageId}`);
    } else {
      setInitialUrl('http://localhost:3000');
    }
    
    setLoading(false);
  }

  // Setup Firebase messaging and permission requests
  async function setupFirebaseMessaging() {
    if (Platform.OS === 'ios') {
      await requestUserPermission();
    } else {
      getFcmToken();
    }
    
    checkInitialNotification();
  }

  useEffect(() => {
    setupFirebaseMessaging();
    
    // Set up foreground notification handler
    const unsubscribeForeground = setupForegroundMessageHandler();
    
    // Listen for background notifications
    const unsubscribeBackground = messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background:', remoteMessage);
    });
    
    return () => {
      unsubscribeForeground();
      // Background handler doesn't need unsubscribing
    };
  }, []);

  // Function to inject the FCM token into the WebView for web app to use
  const injectFcmToken = `
    window.FIREBASE_FCM_TOKEN = "${fcmToken}";
    true;
  `;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <WebView
        source={{ uri: initialUrl || webviewUrl }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        injectedJavaScript={fcmToken ? injectFcmToken : ''}
        onMessage={(event) => {
          // Handle messages from web app
          console.log('Message from WebView:', event.nativeEvent.data);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webview: {
    flex: 1,
  },
});