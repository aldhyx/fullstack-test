"use client";

import { auth } from "@/lib/firebase";
import { getErrorMessage } from "@/lib/utils";
import { fetchUserFailure, fetchUserSuccess, useUser } from "@/store/userSlice";
import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().min(3).required("Password is required"),
});

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { error } = useUser();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        dispatch(
          fetchUserSuccess({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
          })
        );

        router.push("/main");
      } catch (error) {
        dispatch(fetchUserFailure(getErrorMessage(error)));
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
      <Grid2 container spacing={2}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email Address"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </Grid2>

      {error && (
        <Typography marginTop={2} color="error">
          Error: {error}
        </Typography>
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        sx={{ mt: 2 }}
      >
        Register now
      </Button>

      <Typography marginTop={2}>
        Already have account? <Link href={"/login"}>Login here</Link>
      </Typography>
    </Box>
  );
};

export default RegisterForm;
