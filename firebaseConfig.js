// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Add this import
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHDJIsRprwqnChxObf4PFFIVrYUG99njY",
  authDomain: "your-gymbro.firebaseapp.com",
  databaseURL:
    "https://your-gymbro-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "your-gymbro",
  storageBucket: "your-gymbro.appspot.com",
  messagingSenderId: "229634580760",
  appId: "1:229634580760:web:33e6373bbc2ea7401dfe6d",
  measurementId: "G-7DR272ML02",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app); // Initialize Firebase Authentication

export { db, app, analytics, auth }; // Export auth as well
