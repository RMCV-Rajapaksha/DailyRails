import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, set, onValue, off } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAB9Brn4eOGECdPX7hUAWEEi9pKF652bZE",
  authDomain: "gps-tracker2-5889c.firebaseapp.com",
  databaseURL: "https://gps-tracker2-5889c-default-rtdb.firebaseio.com",
  projectId: "gps-tracker2-5889c",
  storageBucket: "gps-tracker2-5889c.appspot.com",
  messagingSenderId: "836375478546",
  appId: "1:836375478546:web:1acd25452ac9c3ff9d33cb",
  measurementId: "G-NVC81MFWYM",
};

// Initialize Firebase only if no app exists
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Realtime Database
const database = getDatabase(app);

export { database, ref, set, onValue, off };
