
// Firebase product SDKs 
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
 
// ensuring firebase is not initialized during SSR or static export
let app;
if (typeof window !== "undefined" && getApps().length === 0) {
  app = initializeApp(firebaseConfig);
}

// Check if the Firebase configuration is complete. Force crash at build time if any field is missing.
if (
  !firebaseConfig.apiKey ||
  !firebaseConfig.authDomain ||
  !firebaseConfig.projectId ||
  !firebaseConfig.storageBucket ||
  !firebaseConfig.messagingSenderId ||
  !firebaseConfig.appId
) {
  console.error("Firebase configuration is missing or incomplete!", firebaseConfig);
  throw new Error("Invalid Firebase configuration — please check your environment variables!");
}


export const auth = typeof window !== "undefined" ? getAuth(app!) : null;

