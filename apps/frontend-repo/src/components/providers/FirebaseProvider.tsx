"use client";

import { auth } from "@/lib/firebase";
import { fetchUserSuccess } from "@/store/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch } from "react-redux";

export const FirebaseProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          dispatch(
            fetchUserSuccess({
              uid: user.uid,
              email: user.email,
              name: user.displayName,
              token,
            })
          );
        } catch (error) {
          console.error("Error fetching ID token:", error);
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return children;
};
