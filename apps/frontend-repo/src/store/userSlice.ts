import type { User } from "@ebuddy/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "./store";

interface UserState {
  data: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess(state, action: PayloadAction<User>) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchUserFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    logoutUser(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export function useUser() {
  const {
    data: user,
    loading,
    error,
  } = useSelector((state: RootState) => state.user);
  return { user, loading, error };
}

export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  logoutUser,
} = userSlice.actions;
export default userSlice.reducer;
