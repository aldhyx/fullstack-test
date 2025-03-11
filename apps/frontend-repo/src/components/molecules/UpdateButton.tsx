"use client";

import { Button, Typography, Grid2 } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  fetchUserFailure,
  fetchUserStart,
  fetchUserSuccess,
} from "@/store/userSlice";
import { fetchUser } from "@/apis/userApi";
import { getErrorMessage } from "@/lib/utils";

export const UpdateButton = () => {
  const dispatch = useDispatch();

  const {
    loading,
    data: user,
    error,
  } = useSelector((state: RootState) => state.user);

  const handleFetchUser = async () => {
    if (!user?.uid) return;

    dispatch(fetchUserStart());
    try {
      const userData = await fetchUser(user.uid, user.token);
      dispatch(fetchUserSuccess(userData));
    } catch (error) {
      dispatch(fetchUserFailure(getErrorMessage(error)));
    }
  };

  return (
    <Grid2 spacing={2} container width="100%">
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        onClick={handleFetchUser}
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch User Data"}
      </Button>
      {user && <Typography>Loaded User: {user.name}</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}
    </Grid2>
  );
};
