"use client";

import { Button, Typography, Grid2 } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  fetchUserFailure,
  fetchUserStart,
  fetchUserSuccess,
  useUser,
} from "@/store/userSlice";
import { fetchUser } from "@/apis/userApi";
import { getErrorMessage } from "@/lib/utils";

export const UpdateButton = () => {
  const dispatch = useDispatch();

  const { loading, user, error } = useUser();

  const handleFetchUser = async () => {
    if (!user?.uid) return;

    dispatch(fetchUserStart());
    try {
      const userData = await fetchUser(user.uid, user.token);
      dispatch(fetchUserSuccess({ ...userData, token: user.token }));
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
