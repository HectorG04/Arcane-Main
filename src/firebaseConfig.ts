// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// --- Placeholder Configuration for AI Studio ---
// IMPORTANT: Replace these placeholder values with your actual Firebase project configuration.
// You can find this in your Firebase project settings under "General".
const AI_STUDIO_FALLBACK_CONFIG = {
  apiKey: "PASTE_YOUR_API_KEY_HERE",
  authDomain: "PASTE_YOUR_AUTH_DOMAIN_HERE",
  projectId: "PASTE_YOUR_PROJECT_ID_HERE",
  storageBucket: "PASTE_YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID_HERE",
  appId: "PASTE_YOUR_APP_ID_HERE"
};


// This allows the same codebase to connect to different Firebase projects.
// In the GitHub Actions workflow, VITE_FIREBASE_CONFIG will be set from Secrets.
// When running in AI Studio, it will be undefined and fall back to the config above.
// FIX: Safely access import.meta.env using optional chaining to prevent runtime errors
// in environments where it might not be defined (like the AI Studio preview).
const firebaseConfigString = (import.meta as any)?.env?.VITE_FIREBASE_CONFIG;

let firebaseConfig;

if (firebaseConfigString) {
  try {
    // Use the config from GitHub Secrets for Staging/Production builds
    firebaseConfig = JSON.parse(firebaseConfigString);
  } catch (e) {
    console.error("Failed to parse VITE_FIREBASE_CONFIG from environment. Using fallback.", e);
    firebaseConfig = AI_STUDIO_FALLBACK_CONFIG;
  }
} else {
  // Use the fallback for local development in AI Studio
  console.warn("VITE_FIREBASE_CONFIG not found. Using AI Studio fallback configuration. Please update placeholders with your project details.");
  firebaseConfig = AI_STUDIO_FALLBACK_CONFIG;
}


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);