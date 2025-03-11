import { db } from "../config/firebaseConfig";
import type { User } from "@ebuddy/shared";

const USERS_COLLECTION = "USERS";

export const fetchUser = async (uid: string): Promise<User | null> => {
  const doc = await db.collection(USERS_COLLECTION).doc(uid).get();
  return doc.exists ? (doc.data() as User) : null;
};

export const updateUser = async (
  uid: string,
  userData: Partial<User>
): Promise<void> => {
  await db.collection(USERS_COLLECTION).doc(uid).update(userData);
};
