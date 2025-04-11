
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

export const auth = typeof window !== "undefined" ? getAuth(app!) : null;


// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);


// Enable local persistence
// setPersistence(auth, browserLocalPersistence)
//   .then(() => {
//     console.log("Session persistence set to local");
//   })
//   .catch((error) => {
//     console.error("Error setting local persistence:", error);
//   });

