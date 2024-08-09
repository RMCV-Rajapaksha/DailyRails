import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database };
