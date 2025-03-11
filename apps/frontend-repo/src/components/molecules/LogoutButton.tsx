"use client";

import { auth } from "@/lib/firebase";
import { logoutUser } from "@/store/userSlice";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

export const LogoutButton = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logoutUser());
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Button
      type="submit"
      fullWidth
      variant="outlined"
      color="secondary"
      size="large"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};
