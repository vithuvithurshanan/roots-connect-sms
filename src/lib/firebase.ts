import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDsPcl6osSfKqXXAigECV5xWu_jJvKwNDM",
  authDomain: "woodcrest-tree-buffalo.firebaseapp.com",
  projectId: "woodcrest-tree-buffalo",
  storageBucket: "woodcrest-tree-buffalo.firebasestorage.app",
  messagingSenderId: "300513309023",
  appId: "1:300513309023:web:89234b629feb5fe43086ea",
  measurementId: "G-RS5TFFKLD2",
};

// Avoid re-initializing on hot reloads
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Analytics is browser-only — isSupported() guards against SSR
export async function initAnalytics() {
  const supported = await isSupported();
  if (supported) {
    getAnalytics(app);
  }
}

export { app };
