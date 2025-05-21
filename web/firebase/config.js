import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA8LSehhUnWMaa9V_2YrpXyClxpgkReY3A",
  authDomain: "necxis-123.firebaseapp.com",
  projectId: "necxis-123",
  storageBucket: "necxis-123.firebasestorage.app",
  messagingSenderId: "332242961406",
  appId: "1:332242961406:web:d348d0284d1fa1885036af"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };