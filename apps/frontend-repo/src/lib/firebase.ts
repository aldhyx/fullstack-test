import { initializeApp, getApps } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase if it hasn't been initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

if (process.env.NODE_ENV !== "production") {
  // Use emulators if in development environment
  // Firebase Emulator port mapping
  const PORT = {
    FIRESTORE: process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_PORT || 9000,
    FUNCTION: process.env.NEXT_PUBLIC_FUNCTION_EMULATOR_PORT || 9001,
    AUTH: process.env.NEXT_PUBLIC_AUTH_EMULATOR_PORT || 9099,
  };

  connectAuthEmulator(auth, `http://localhost:${PORT.AUTH}`);
  connectFirestoreEmulator(db, "localhost", Number(PORT.FIRESTORE));
  connectFunctionsEmulator(functions, "localhost", Number(PORT.FUNCTION));
}

export { app, auth, db, functions };
