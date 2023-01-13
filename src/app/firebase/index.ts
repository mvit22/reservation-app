// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth/react-native';
import { initializeFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCLN_ai5Fjh7qViHit4Tk_GcscJBysuKh8',
  authDomain: 'reservation-app-21a37.firebaseapp.com',
  projectId: 'reservation-app-21a37',
  storageBucket: 'reservation-app-21a37.appspot.com',
  messagingSenderId: '882359856378',
  appId: '1:882359856378:web:9f71413d1e2ef786b56d43',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = initializeAuth(firebaseApp);
const db = initializeFirestore(firebaseApp, {
  experimentalForceLongPolling: true,
});

export { auth, db };
