# Firebase Setup Instructions for QuoteSync

To use email/password authentication in your QuoteSync app, you need to enable it in your Firebase project settings. Here's how:

## Enable Email/Password Authentication

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. In the left sidebar, click on "Authentication"
4. Click on the "Sign-in method" tab
5. Find "Email/Password" in the list and click on it
6. Toggle the "Enable" switch to turn it on
7. Click "Save"

## Add Your App Domain to Authorized Domains (for Google Auth)

If you want to use Google authentication, you need to add your app's domain to the list of authorized domains:

1. While still in the Authentication section of the Firebase Console
2. Click on the "Sign-in method" tab if you're not already there
3. Scroll down to the "Authorized domains" section
4. Click "Add domain"
5. Add your Replit domain (e.g., yourapp.username.repl.co)
6. Click "Add"

After making these changes, return to QuoteSync and try logging in again with email/password. You should now be able to create accounts and log in successfully!