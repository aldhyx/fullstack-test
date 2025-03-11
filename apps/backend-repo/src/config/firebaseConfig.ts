import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const app = initializeApp({
  credential: applicationDefault(),
  projectId: process.env.FIREBASE_PROJECT_ID,
});

/**
 * Automatically use Firebase Emulator in local development when FIRESTORE_EMULATOR_HOST is set in .env
 * Make sure to start firebase emulator locally
 */
export const db = getFirestore(app);
/**
 * Automatically use Firebase Emulator in local development when FIREBASE_AUTH_EMULATOR_HOST is set in .env
 * Make sure to start firebase emulator locally
 */
export const auth = getAuth(app);
