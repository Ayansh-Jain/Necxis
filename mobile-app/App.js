import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, Platform, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';

// Firebase imports - will work once Firebase is properly set up
// import messaging from '@react-native-firebase/messaging';

export default function App() {
  const [webviewUrl, setWebviewUrl] = useState('https://your-nextjs-app-url.com');
  const [fcmToken, setFcmToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Firebase messaging setup - uncomment once Firebase is configured
  /*
  // Request notification permissions on iOS
  async function requestUserPermission() {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken();
      }
    } else {
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
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to get FCM token:', error);
      setLoading(false);
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

  useEffect(() => {
    requestUserPermission();
    
    // Set up foreground notification handler
    const unsubscribeForeground = setupForegroundMessageHandler();
    
    // Listen for background notifications
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background:', remoteMessage);
    });
    
    return () => {
      if (unsubscribeForeground) {
        unsubscribeForeground();
      }
    };
  }, []);
  */

  // For now, we'll just set loading to false after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Function to inject the FCM token into the WebView for web app to use
  const injectFcmToken = `
    window.FIREBASE_FCM_TOKEN = "${fcmToken}";
    true;
  `;

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading QuoteSync...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <WebView
        source={{ uri: webviewUrl }}
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
    </SafeAreaView>
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