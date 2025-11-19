// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// TODO: Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA7nXQtP1jo2uNYcacybPU_bqESEIgAGTw",
  authDomain: "emmas-photography.firebaseapp.com",
  projectId: "emmas-photography",
  storageBucket: "emmas-photography.firebasestorage.app",
  messagingSenderId: "524273099922",
  appId: "1:524273099922:web:dc58fc5a10c7f68f7bf24b",
  measurementId: "G-X2RJQZ84MK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

export default app;
